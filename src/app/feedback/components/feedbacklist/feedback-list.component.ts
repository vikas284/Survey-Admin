import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AgGridAngular } from "ag-grid-angular"
import { ButtonRendererComponent } from '../../renderer/button/button-renderer.component';
import { AlertService, LoaderService, SharedService } from '../../../shared/services';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from "@angular/material/chips";
import { FeedbackService } from '../../services';
import { Router } from '@angular/router';

@Component({
	selector: 'app-feedback-list',
	templateUrl: './feedback-list.component.html',
	styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
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
	surveyDetail;
	constructor(
		private datePipe: DatePipe,
		private fbService: FeedbackService,
		private router: Router,
		private alertService: AlertService,
		private loaderService: LoaderService,
		readonly fb: FormBuilder) {
		this.frameworkComponents = {
			buttonRenderer: ButtonRendererComponent,
		}
	}

	columnDefs = [
		{ field: 'surveyName', headerName: 'Survey Name', sortable: true, filter: true, width: this.gridWidth / 3, resizable: true },
		{ field: 'email', headerName: 'User Email', sortable: true, filter: true, width: this.gridWidth / 3, resizable: true },
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
		this.fbService.getSurvey(this.getParams()).subscribe((response) => {
			this.loaderService.display(false);
			this.rowData = response.body;
			this.setParams(response);
		}, (err) => {
			this.loaderService.display(false);
			this.alertService.error(err.error.message, true);
		})
	}

	rowButtonClick(event, actionName) {
		const rowData = event.rowData
		const rowId = rowData._id;
		this.surveyDetail = rowData;
		switch (actionName) {
			case 'view':
				document.getElementById('viewFeedbackModal').click();
				break;
		}
	}
}
