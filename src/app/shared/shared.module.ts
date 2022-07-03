import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ConvertUtctoLocalPipe, DateDiffPipe, GetObjectToKeysPipe } from './filter/index';
import { AlertComponent, LoaderComponent } from './components';
import { SharedService, AlertService, LoaderService, } from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AlertComponent,
    LoaderComponent,
    ConvertUtctoLocalPipe,
    DateDiffPipe,
    GetObjectToKeysPipe
  ],
  providers: [
    SharedService,
    AlertService,
    LoaderService
  ],
  exports: [
    AlertComponent,
    ConvertUtctoLocalPipe,
    DateDiffPipe,
    GetObjectToKeysPipe,
    LoaderComponent
  ],
})
export class SharedModule { }
