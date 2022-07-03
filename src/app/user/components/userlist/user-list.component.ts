import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AgGridAngular } from "ag-grid-angular"
import { ButtonRendererComponent } from '../../renderer/button/button-renderer.component';
import { AlertService, LoaderService, SharedService } from '../../../shared/services';
import { UserService } from '../../services';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
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
	form: FormGroup;
	@ViewChild('agGrid') agGrid: AgGridAngular;
	constructor(
		private datePipe: DatePipe,
		private userService: UserService,
		private router: Router,
		public fb: FormBuilder,
		private alertService: AlertService,
		private loaderService: LoaderService) {
		this.frameworkComponents = {
			buttonRenderer: ButtonRendererComponent,
		}
	}

	columnDefs = [
		{ field: 'name', headerName: 'Name', sortable: true, filter: true, width: this.gridWidth / 3, resizable: true },
		{ field: 'email', headerName: 'Email', sortable: true, filter: true, width: this.gridWidth / 3, resizable: true },
		{
			headerName: 'Actions',
			cellRenderer: 'buttonRenderer',
			width: this.gridWidth / 3,
			cellRendererParams: {
				onClick: this.rowButtonClick.bind(this)
			}
		},
	]

	ngOnInit() {
		this.form = this.fb.group({
			"name": ['', Validators.required],
			"email": ['', Validators.required],
			"password": ['', Validators.required]
		})
		this.reloadData()
	}

	get name() {
		return this.form.get('name');
	}
	get email() {
		return this.form.get('email');
	}
	get password() {
		return this.form.get('password');
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
		this.userService.getUser(this.getParams()).subscribe((response) => {
			this.loaderService.display(false);
			this.rowData = response.body;
			this.setParams(response);
		}, (err) => {
			console.log(err.status);
			if(err.status==401){
				localStorage.removeItem('currentUser');
			}
			this.loaderService.display(false);
			this.alertService.error(err.error.message, true);
		})
	}

	addUser() {
		this.loaderService.display(true);
		this.userService.createUser(this.form.value).subscribe((response) => {
			document.getElementById('closeButton').click();
			this.form.reset();
			this.reloadData();
			this.loaderService.display(false);
			this.alertService.success('User created Successfully.', true);
		}, (err) => {
			this.loaderService.display(false);
			this.alertService.error(err.error.message, true);
		});

	}
	rowButtonClick(event, actionName) {
		const rowData = event.rowData
		const rowId = rowData._id;
		this.loaderService.display(true);
		this.userService.deleteUser(rowId).subscribe((response) => {
			this.reloadData();
			this.loaderService.display(false);
			this.alertService.success('User deleted Successfully.', true);
		}, (err) => {
			this.loaderService.display(false);
			this.alertService.error(err.error.message, true);
		});
	}
}
