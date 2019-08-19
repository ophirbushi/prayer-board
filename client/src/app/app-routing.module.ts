import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', pathMatch: 'full', canActivate: [AuthGuard], loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'board/:id', canActivate: [AuthGuard], loadChildren: () => import('./board/board.module').then(m => m.BoardModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
