import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/interfaces";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.loggedUser
      .subscribe(
        (user: User) => {
          if (user != null) {
            this.user = user
          }
        }
      )
  }

  onLogout() {
    this.authService.logout()
  }

}
