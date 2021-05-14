import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../../services/calendar.service";
import {Calendar} from "../../shared/interfaces";
import {MaterializeService} from "../../shared/materialize.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  calendars: Calendar[] = []
  pending = true

  constructor(
    private calendarService: CalendarService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.refresh()

    this.route.queryParams
      .subscribe(
        (params: Params) => {
          if (params['calendarCreated']) {
            MaterializeService.toast('Теперь добавьте легенду в свой календарь')
          }
        }
      )
  }

  refresh(){
    this.calendarService.getCalendarsOfUser()
      .subscribe(
        (calendars: Calendar[]) => {
          this.calendars = calendars
          this.pending = false
        },
        error => {
          MaterializeService.toast(error.error.errors[0].msg)
          console.error(error)
          this.pending = false
        }
      )
  }

  onDeleteCalendar(id: string) {
    if (window.confirm('Вы точно хотите удалить этот календарь?')){
      this.calendarService.deleteCalendar(id)
        .subscribe(
          (response) => {
            MaterializeService.toast(response.msg)
            this.refresh()
          },
          error => {
            MaterializeService.toast(error.error.errors[0].msg)
          }
        )
    }
  }
}
