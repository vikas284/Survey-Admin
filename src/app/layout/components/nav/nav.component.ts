import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
	currentUser: any;
	pageTitle: string = "FND";

	constructor(private sharedService: SharedService,
		private router: Router,
		private activatedRoute: ActivatedRoute) {

	}

	ngOnInit() {
		this.currentUser = this.sharedService.getCurrentUser();
	}

	logout() {
		this.sharedService.logout();
		this.router.navigate(['/login'])
	}
}