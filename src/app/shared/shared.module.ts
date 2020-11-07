import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';

const sharedComponents = [
  DataTableComponent
];

@NgModule({
  declarations: [...sharedComponents],
  imports: [
    CommonModule
  ],
  exports: [...sharedComponents]
})
export class SharedModule { }
