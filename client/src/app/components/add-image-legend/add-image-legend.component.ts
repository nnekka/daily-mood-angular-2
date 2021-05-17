import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MaterializeService} from "../../shared/materialize.service";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Calendar} from "../../shared/interfaces";
import {CalendarService} from "../../services/calendar.service";
import {Subscription} from "rxjs/internal/Subscription";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Component({
  selector: 'app-add-image-legend',
  templateUrl: './add-image-legend.component.html',
  styleUrls: ['./add-image-legend.component.css']
})
export class AddImageLegendComponent implements OnInit, OnDestroy {

  form: FormGroup
  image: string
  imagePreview: string
  calendarId: string
  calendar: Calendar
  sub: Subscription
  calendarChanged: BehaviorSubject<Calendar> = new BehaviorSubject<Calendar>(null)


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {


    this.form = new FormGroup({
      imageSrc: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required)
    })

    this.calendarChanged.subscribe(
      (state) => {
        if (state) {
          MaterializeService.toast('Легенда добавлена!')
        }
      }
    )

    this.refresh()
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  refresh() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (params.has('id')) {
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

  onImageChoose(event: any) {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file)
    const formData = new FormData()
    formData.append('image', file)
    this.http.post('/api/upload', formData)
      .subscribe(
        (data) => {
          this.image = Object.values(data)[0]
          this.form.patchValue({
            imageSrc: this.image
          })
        },
        error => {
          MaterializeService.toast(error)
          console.error(error)
        }
      )
  }

  onSubmit() {
    this.sub = this.calendarService
      .addImageLegend(this.calendarId, this.form.value.text, this.form.value.imageSrc)
      .subscribe(
        (calendar: Calendar) => {
          console.log(calendar)
          this.calendarChanged.next(calendar)
          this.refresh()
          this.form.reset()
        },
        error => {
          MaterializeService.toast(error.error.errors[0].msg)
        }
      )
  }

  onDeleteLegend(id: string){
    this.calendarService.deleteLegend(this.calendarId, id)
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
