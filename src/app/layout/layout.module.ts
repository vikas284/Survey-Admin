import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { layoutRouting } from './layout.routing';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent, HeaderComponent, SidebarComponent, NavComponent } from './components';

@NgModule({
	imports: [
		CommonModule,
		layoutRouting,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	declarations: [
		LayoutComponent,
		HeaderComponent,
		SidebarComponent,
		NavComponent
	]
})
export class LayoutModule { }
