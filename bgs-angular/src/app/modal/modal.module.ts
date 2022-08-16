import { BitformModule } from '../bitform/bitform.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BillModalComponent } from './bill-modal/bill-modal.component';
import { ModalComponent } from './modal.component';


@NgModule({
	imports: [
		BitformModule,
		CommonModule
	],
	declarations: [
		BillModalComponent,
		ModalComponent,
	],
	exports: [
		BillModalComponent
	]
})
export class ModalModule { }
