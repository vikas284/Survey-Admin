import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackRouting } from './feedback.routing';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from './renderer/button/button-renderer.component';
import { FeedbackComponent, FeedbackListComponent } from './components';
import { FeedbackService } from './services';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		FeedbackRouting,
		SharedModule,
		MatRadioModule,
		MatCheckboxModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatChipsModule,
		MatIconModule,
		AgGridModule.withComponents([ButtonRendererComponent])
	],
	declarations: [
		FeedbackComponent,
		FeedbackListComponent,
		ButtonRendererComponent
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
		NO_ERRORS_SCHEMA
	],
	providers: [
		FeedbackService,
		DatePipe
	]
})
export class FeedbackModule { }


