import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Calendar, NewCalendar} from "../shared/interfaces";

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

  getCalendarById(id: string): Observable<Calendar>{
    return this.http.get<Calendar>(`/api/calendars/${id}`)
  }

  createCalendar(calendar: NewCalendar): Observable<Calendar>{
    return this.http.post<Calendar>('/api/calendars', calendar )
  }

  addColorLegend(id: string, color: string, text: string): Observable<Calendar>{
    return this.http.put<Calendar>(`/api/calendars/${id}/legend`, {color, text})
  }

}
