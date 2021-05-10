import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {TokenInterceptor} from "./shared/token.interceptor";
import { LoaderComponent } from './components/loader/loader.component';
import { CreateCalendarComponent } from './components/create-calendar/create-calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddColorLegendComponent } from './components/add-color-legend/add-color-legend.component';
import { AddImageLegendComponent } from './components/add-image-legend/add-image-legend.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LoaderComponent,
    CreateCalendarComponent,
    AddColorLegendComponent,
    AddImageLegendComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
