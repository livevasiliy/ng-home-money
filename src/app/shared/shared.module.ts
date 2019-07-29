import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, NgxChartsModule],
  exports: [ReactiveFormsModule, FormsModule, HttpClientModule, NgxChartsModule]
})
export class SharedModule { }
