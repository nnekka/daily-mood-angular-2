import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {MaterializeService} from "../../shared/materialize.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../shared/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') registerForm: any
  @ViewChild('input') inputRef: ElementRef

  name: string
  email: string
  password: string
  image: string = ''


  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.name, this.email, this.password, this.image)
      .subscribe(
        (user: User) => {
          this.router.navigate(['/login'], {
            queryParams: {
              registered: true
            }
          })
        },
        error => {
          MaterializeService.toast(error.error.errors[0].msg)
          console.log(error)
        }
      )
  }


  onFileUpload(event: any) {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    this.http.post('/api/upload', formData)
      .subscribe(
        (data) => {
          this.image = Object.values(data)[0]
        },
        error => {
          MaterializeService.toast(error)
          console.error(error)
        }
      )
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

}
