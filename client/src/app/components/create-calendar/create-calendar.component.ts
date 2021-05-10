import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CalendarService} from "../../services/calendar.service";
import {Calendar} from "../../shared/interfaces";
import {Router} from "@angular/router";
import {MaterializeService} from "../../shared/materialize.service";

@Component({
  selector: 'app-create-calendar',
  templateUrl: './create-calendar.component.html',
  styleUrls: ['./create-calendar.component.css']
})
export class CreateCalendarComponent implements OnInit {

  @ViewChild('calendarForm') calendarForm: any

  title: string
  year: number = 2021
  description: string
  legendType: string

  constructor(
    private calendarService: CalendarService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  onSubmit(){
    this.calendarForm.value.legendType = this.legendType
    this.calendarService.createCalendar(this.calendarForm.value)
      .subscribe(
        (calendar: Calendar) => {
          this.router.navigate(['/dashboard'], {
            queryParams: {
              calendarCreated: true
            }
          })
        },
        error => {
          MaterializeService.toast(error.error.errors[0].msg)
        }
      )
  }

}
