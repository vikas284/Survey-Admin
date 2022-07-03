import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AgGridAngular } from "ag-grid-angular"
import { ButtonRendererComponent } from '../../renderer/button/button-renderer.component';
import { AlertService, LoaderService, SharedService } from '../../../shared/services';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from "@angular/material/chips";
import { SurveyService } from '../../services';
import { Router } from '@angular/router';

@Component({
	selector: 'app-survey-list',
	templateUrl: './survey-list.component.html',
	styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
	//search and Pagination Varaible
	params: any = {
		searchText: '',
		skip: 0,
		limit: 25
	}
	pageSize = 25;
	initialRowNumber: number;
	endRowNumber: number;
	currentPage = 1;
	totalPage: number;
	totalCount: number;

	rowData: any[];
	gridWidth = window.innerWidth - 140;
	frameworkComponents: any;
	questionsData;
	@ViewChild('agGrid') agGrid: AgGridAngular;
	form: FormGroup;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
	formType;
	surveyDetail;
	constructor(
		private datePipe: DatePipe,
		private svService: SurveyService,
		private router: Router,
		private alertService: AlertService,
		private loaderService: LoaderService,
		readonly fb: FormBuilder) {
		this.frameworkComponents = {
			buttonRenderer: ButtonRendererComponent,
		}
	}

	columnDefs = [
		{ field: 'name', headerName: 'Name', sortable: true, filter: true, width: this.gridWidth / 3, resizable: true },
		{ field: 'description', headerName: 'Description', sortable: true, filter: true, width: this.gridWidth / 3, resizable: true },
		{
			headerName: 'Actions',
			cellRenderer: 'buttonRenderer',
			width: this.gridWidth / 3,
			cellRendererParams: {
				onClick: this.rowButtonClick.bind(this)
			}
		}
	]

	ngOnInit() {
		this.reloadData();
	}

	initAddForm() {
		this.formType = 'add';
		this.form = this.fb.group({
			"name": ['', Validators.required],
			"description": ['', Validators.required],
			"questions": this.fb.array([this.fb.group({
				'question': ['', [Validators.required]],
				'type': ['radio'],
				'answer': [''],
				'options': this.fb.array([])
			})])
		})

	}

	get questions(): FormArray {
		return this.form.get('questions') as FormArray;
	}

	addQuestion() {
		this.questions.push(this.fb.group({
			'question': ['', [Validators.required]],
			'type': ['radio'],
			'answer': [''],
			'options': this.fb.array([])
		}))
	}

	removeQuestion(i) {
		this.questions.removeAt(i)
	}

	getOptions(question) {
		return question.controls.options as FormArray;
	}

	addOption(i, event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;
		if ((value || "").trim()) {
			const control = <FormArray>this.questions.controls[i].get('options');
			control.push(this.fb.control(value));
		}
		if (input) {
			input.value = "";
		}
	}

	removeOption(i, j): void {
		if (j >= 0) {
			const control = <FormArray>this.questions.controls[i].get('options');
			control.removeAt(j);
		}
	}

	getParams() {
		this.params.skip = (this.currentPage - 1) * this.pageSize;
		this.params.limit = this.pageSize;
		return this.params;
	}

	setParams(response) {
		this.totalCount = response.headers.get('x-total-count');
		this.initialRowNumber = (this.currentPage - 1) * this.pageSize + 1;
		this.endRowNumber = (this.currentPage - 1) * this.pageSize + response.body.length;
		this.totalPage = Math.ceil(this.totalCount / this.pageSize);
	}

	reloadData() {
		this.loaderService.display(true);
		this.svService.getSurvey(this.getParams()).subscribe((response) => {
			this.loaderService.display(false);
			this.rowData = response.body;
			this.setParams(response);
		}, (err) => {
			this.loaderService.display(false);
			this.alertService.error(err.error.message, true);
		})
	}

	addSurvey() {
		let surveyObject = this.form.value;
		this.loaderService.display(true);
		this.svService.addSurvey(surveyObject).subscribe((response) => {
			this.reloadData();
			this.loaderService.display(false);
			this.alertService.success('Survey got added Successfully.', true);
		}, (err) => {
			this.loaderService.display(false);
			this.alertService.error(err.error.message, true);
		});

	}

	updateSurvey() {
		let surveyObject = this.form.value;
		this.loaderService.display(true);
		this.svService.updateSurvey(surveyObject._id, surveyObject).subscribe((response) => {
			this.reloadData();
			this.loaderService.display(false);
			this.alertService.success('Survey got updated Successfully.', true);
		}, (err) => {
			this.loaderService.display(false);
			this.alertService.error(err.error.message, true);
		});
	}

	assignSurvey(event) {
		this.svService.assignSurveyToUser(this.surveyDetail._id, event.value).subscribe((response) => {
			this.reloadData();
			this.loaderService.display(false);
			this.alertService.success('User got assigned to Survey Successfully.', true);
			document.getElementById('closeAssignSurvey').click()
		}, (err) => {
			this.loaderService.display(false);
			this.alertService.error(err.error.message, true);
		});

	}

	rowButtonClick(event, actionName) {
		const rowData = event.rowData
		const rowId = rowData._id;
		this.surveyDetail = rowData;
		switch (actionName) {
			case 'view':
				this.questionsData = rowData.questions;
				document.getElementById('svviewModal').click();
				break;
			case 'edit':
				//Setting the Form Parameter during Edit
				this.formType = 'edit';
				this.form = this.fb.group({
					"_id": [rowData._id],
					"assigne": [rowData.assigne],
					"name": [rowData.name, Validators.required],
					"description": [rowData.description, Validators.required],
					"questions": this.fb.array([])
				});
				for (let i = 0; i < rowData.questions.length; i++) {
					this.questions.push(this.fb.group({
						'question': [rowData.questions[i].question, [Validators.required]],
						'type': [rowData.questions[i].type],
						'answer': [''],
						'options': this.fb.array([])
					}));
					let control = <FormArray>this.questions.controls[i].get('options');
					for (const option of rowData.questions[i].options) {
						control.push(this.fb.control(option));
					}
				}
				document.getElementById('editButton').click();
				break;
			case 'assign':
				document.getElementById('assignButton').click();
				break;
			case 'delete':
				this.loaderService.display(true);
				this.svService.deleteSurvey(rowId).subscribe((response) => {
					this.reloadData();
					this.loaderService.display(false);
					this.alertService.success('Survey got removed Successfully.', true);
				}, (err) => {
					this.loaderService.display(false);
					this.alertService.error(err.error.message, true);
				});
				break;

		}
	}
}
