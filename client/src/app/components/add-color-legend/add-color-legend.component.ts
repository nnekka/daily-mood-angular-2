import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {CalendarService} from "../../services/calendar.service";
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {Calendar} from "../../shared/interfaces";
import {MaterializeService} from "../../shared/materialize.service";

@Component({
  selector: 'app-add-color-legend',
  templateUrl: './add-color-legend.component.html',
  styleUrls: ['./add-color-legend.component.css']
})
export class AddColorLegendComponent implements OnInit {

  @ViewChild('legendForm') form: FormGroup
  colors: string[] = ['red', 'blue', 'black', 'teal', 'green', 'pink', 'purple', 'bisque', 'indigo']
  selectedColor: string
  calendarId: string
  calendar: Calendar

  constructor(
    private calendarService: CalendarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (params.has('id')){
          this.calendarId = params.get('id')
          this.calendarService.getCalendarById(this.calendarId)
            .subscribe(
              (calendar: Calendar) => {
                this.calendar = calendar
                console.log(this.calendar)
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
    console.log(this.calendarId, this.form.value)
    this.calendarService.addColorLegend(this.calendarId, this.selectedColor, this.form.value.text)
      .subscribe(
        (calendar: Calendar) => {
          console.log(calendar)
        },
        error => {
          MaterializeService.toast(error.error.errors[0].msg)
          console.log(error)
        }
      )
  }
}
