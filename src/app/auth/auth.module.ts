import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authRouting } from './auth.routing';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent, LoginComponent } from './components/index';

import { AuthenticationService } from './services';


@NgModule({
	imports: [
		CommonModule,
		authRouting,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule
	],
	declarations: [
		AuthComponent,
		LoginComponent
	],
	providers: [
		AuthenticationService
	]
})
export class AuthModule { }
