import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../shared/interfaces";
import {Observable} from "rxjs/internal/Observable";
import {tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string
  user: User
  loggedUser: BehaviorSubject<User> = new BehaviorSubject(null)
  isAuth: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthorized())

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<User>{
    return this.http.post<User>('/api/users/login', {email, password})
      .pipe(
        tap(
          (user: User) => {
            localStorage.setItem('user', JSON.stringify(user))
            this.setToken(user.token)
            this.setUser(user)
            this.isAuth.next(true)
            this.loggedUser.next(user)
          }
        )
      )
  }

  register(name: string, email: string, password: string, avatar: string): Observable<User>{
    return this.http.post<User>('/api/users', {name, email, password, avatar})

  }

  setToken(token: string){
    this.token = token
  }

  setUser(user: User){
    this.user = user
  }

  getToken(){
    return this.token
  }

  getUser(){
    return this.user
  }

  isAuthorized() {
    return !!this.token
  }

  logout(){
    this.isAuth.next(false)
    this.loggedUser.next(null)
    this.setToken(null)
    this.setUser(null)
    localStorage.clear()
    this.router.navigate(['/login'])
  }


}
