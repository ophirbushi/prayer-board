import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board.component';
import { BoardResolve } from './board.resolve';


const routes: Routes = [{ path: '', component: BoardComponent, resolve: { board: BoardResolve } }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [BoardResolve]
})
export class BoardRoutingModule { }
