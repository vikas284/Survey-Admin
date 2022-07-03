import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserRouting } from './user.routing';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from './renderer/button/button-renderer.component';
import { UserComponent, UserListComponent } from './components';
import { UserService } from './services';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		UserRouting,
		SharedModule,
		AgGridModule.withComponents([ButtonRendererComponent])
	],
	declarations: [
		UserComponent,
		UserListComponent,
		ButtonRendererComponent
	],
	providers: [
		UserService,
		DatePipe
	]
})
export class UserModule { }


