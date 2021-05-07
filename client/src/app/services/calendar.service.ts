import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Calendar} from "../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private http: HttpClient
  ) {}

  getCalendarsOfUser(): Observable<Calendar[]>{
    return this.http.get<Calendar[]>('/api/calendars')
  }
}
