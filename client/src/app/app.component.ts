import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(){
    const user = JSON.parse(localStorage.getItem('user'))

    if (user != null){
      this.authService.setToken(user.token)
      this.authService.setUser(user)
      this.authService.loggedUser.next(user)
      this.authService.isAuth.next(true)
    }
  }
}
