import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Calendar, NewCalendar} from "../shared/interfaces";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  calendarsChanged: BehaviorSubject<Calendar[]> = new BehaviorSubject<Calendar[]>([])

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

  addImageLegend(id: string, text: string, imageSrc: string): Observable<Calendar>{
    return this.http.put<Calendar>(`/api/calendars/${id}/legend`, {text, imageSrc})
  }

  deleteLegend(calendarId: string, legendId: string): Observable<{msg: string}>{
    return this.http.delete<{msg: string}>(`/api/calendars/${calendarId}/legend/${legendId}`)
  }

  deleteCalendar(id: string): Observable<{msg: string}>{
    return this.http.delete<{msg: string}>(`/api/calendars/${id}`)
  }

  addDayToCalendar(day: number, month: number, legendId: string, calendarId: string): Observable<Calendar>{
    return this.http.put<Calendar>(`/api/calendars/${calendarId}/day`, {day, month, legendId})
  }

  deleteDay(calendarId: string, dayId: string): Observable<{msg: string}>{
    return this.http.delete<{msg: string}>(`/api/calendars/${calendarId}/day/${dayId}`)
  }

}
