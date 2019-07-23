import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
  exports: [ReactiveFormsModule, FormsModule, HttpClientModule]
})
export class SharedModule { }
