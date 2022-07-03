import { Component, OnInit } from '@angular/core';
import {SharedService, LoaderService } from '../../services';
@Component({
	selector: 'ch-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
	showLoader: boolean;
	constructor(
		private sharedService: SharedService,
		private loaderService: LoaderService
		) { }

	ngOnInit() {
		this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
	}

}
