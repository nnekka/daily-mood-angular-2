import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CalendarService} from "../../services/calendar.service";
import {Calendar, Day} from "../../shared/interfaces";
import {MaterialInstance, MaterializeService} from "../../shared/materialize.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarId: string
  isPending = false
  calendar: Calendar
  clear = false


  days = Array(32).fill(0).map((p, i) => i)
  months: string[] = ['', 'Янв', 'Фев', 'Мар', 'Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']
  selectedLegendID: string

  constructor(
    private route: ActivatedRoute,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.refresh()
  }

  refresh(){
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (params.has('id')){
          this.isPending = true
          this.calendarId = params.get('id')
          this.calendarService.getCalendarById(this.calendarId)
            .subscribe(
              (calendar: Calendar) => {
                this.calendar = calendar
                this.isPending = false
              }
            )
        }
      }
    )
  }

  selectLegend(id: string){
    this.clear = false
    this.selectedLegendID = id
  }

  addDay(day: number, month: string){
    const monthIndex = this.months.indexOf(month)
    if (this.clear && !this.selectedLegendID){
      const dayToDelete = this.calendar.days.find(d => d.day === day && d.month === monthIndex)
      if (dayToDelete){
        this.calendarService.deleteDay(this.calendarId, dayToDelete._id)
          .subscribe(
            (data) => {
              MaterializeService.toast(data.msg)
              this.refresh()
            },
            error => {
              MaterializeService.toast(error.error.errors[0].msg)
            }
          )
      }
    } else {
      this.calendarService.addDayToCalendar(day, monthIndex, this.selectedLegendID, this.calendarId)
        .subscribe(
          (calendar: Calendar) => {
            MaterializeService.toast('Day added')
            this.refresh()
          },
          error => {
            MaterializeService.toast(error.error.errors[0].msg)
          }
        )
    }

  }

  setLegend(day: number, month: string): Day | undefined{
    const monthIndex = this.months.indexOf(month)
    const dayToColor = this.calendar.days.find(p => p.day === day && p.month === monthIndex)
    return dayToColor
  }

  selectClear(){
    this.selectedLegendID = null
    this.clear = true
  }

}
