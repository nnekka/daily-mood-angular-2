import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {HeaderComponent} from "./components/header/header.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./shared/auth.quard";
import {CreateCalendarComponent} from "./components/create-calendar/create-calendar.component";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {AddColorLegendComponent} from "./components/add-color-legend/add-color-legend.component";
import {AddImageLegendComponent} from "./components/add-image-legend/add-image-legend.component";

const routes: Routes = [
  {
    path: '', component: HeaderComponent, children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'create-calendar', component: CreateCalendarComponent, canActivate: [AuthGuard] },
      { path: 'calendar/:id', component: CalendarComponent, canActivate: [AuthGuard] },
      {
        path: 'calendar/:id/add-color-legend',
        component: AddColorLegendComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: 'calendar/:id/add-image-legend',
        component: AddImageLegendComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
