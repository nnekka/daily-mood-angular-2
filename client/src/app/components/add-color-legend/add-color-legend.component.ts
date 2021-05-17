import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {CalendarService} from "../../services/calendar.service";
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {Calendar} from "../../shared/interfaces";
import {MaterializeService} from "../../shared/materialize.service";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-add-color-legend',
  templateUrl: './add-color-legend.component.html',
  styleUrls: ['./add-color-legend.component.css']
})
export class AddColorLegendComponent implements OnInit, OnDestroy {

  @ViewChild('legendForm') form: FormGroup
  colors: string[] = [
    'red', 'blue', 'black', 'teal', 'green', 'pink', 'purple', 'bisque', 'indigo',
    'salmon', 'Crimson', 'DarkGreen', 'Lime', 'OrangeRed', 'Orange', 'Navy', 'MediumSlateBlue'
  ]
  sub: Subscription
  selectedColor: string
  calendarId: string
  calendar: Calendar
  calendarChanged: BehaviorSubject<Calendar> = new BehaviorSubject<Calendar>(null)

  constructor(
    private calendarService: CalendarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.calendarChanged.subscribe(
      (state) => {
        if(state) {
          MaterializeService.toast('Легенда добавлена!')
        }
      }
    )

    this.refresh()

  }

  ngOnDestroy(): void {
    if (this.sub){
      this.sub.unsubscribe()
    }

  }

  refresh(){
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (params.has('id')){
          this.calendarId = params.get('id')
          this.calendarService.getCalendarById(this.calendarId)
            .subscribe(
              (calendar: Calendar) => {
                this.calendar = calendar
              },
              error => {
                console.error(error)
                MaterializeService.toast(error.error.errors[0].msg)
              }
            )
        }
      }
    )
  }

  onColorClick(color: string){
    this.selectedColor = color
  }

  onSubmit(){
    this.sub = this.calendarService.addColorLegend(this.calendarId, this.selectedColor, this.form.value.text)
      .subscribe(
        (calendar: Calendar) => {
          this.calendarChanged.next(calendar)
          this.refresh()
          this.form.reset()
        },
        error => {
          MaterializeService.toast(error.error.errors[0].msg)
        }
      )
  }

  onDeleteLegend(legendId: string){
    this.calendarService.deleteLegend(this.calendarId, legendId)
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
