import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {HeaderComponent} from "./components/header/header.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./shared/auth.quard";

const routes: Routes = [
  {
    path: '', component: HeaderComponent, children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
