import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';



@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule
  ],
  providers: [],
  entryComponents:[ToastComponent]
})
export class ToastModule { }
