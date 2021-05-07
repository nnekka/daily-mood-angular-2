import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/internal/Subscription";
import {AuthService} from "../../services/auth.service";
import {User} from "../../shared/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterializeService} from "../../shared/materialize.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  email: string
  password: string
  sub: Subscription
  @ViewChild('loginForm') form: any

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.isAuth
      .subscribe(
        (state) => {
          if (state) {
            this.router.navigate(['/dashboard'])
          }
        }
      )

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {                                      //<-- после редиректа с регистрации
        MaterializeService.toast('Войдите со своим логином и паролем')
      } else if (params['accessDenied']) {                             //<-- после редиректа с auth.guard
        MaterializeService.toast('Авторизуйтесь для выполнения этого действия')
      }
    })
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  onSubmit() {
    const email = this.form.value.email
    const password = this.form.value.password
    this.sub = this.authService.login(email, password)
      .subscribe(
        (user: User) => {
          this.router.navigate(['/dashboard'])
        },
        error => {
          MaterializeService.toast(error.error.errors[0].msg)
        }
      )
  }

}
