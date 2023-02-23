import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000';
  locationUrl: string = 'https://api.ipgeolocation.io/ipgeo?apiKey='

  @Output() signUpClickedEvent : EventEmitter<any> = new EventEmitter();
  signUpClicked(msg: any){
    return this.signUpClickedEvent.emit(msg);
  }

  @Output() logInClickedEvent : EventEmitter<any> = new EventEmitter();
  logInClicked(msg: any){
    return this.logInClickedEvent.emit(msg);
  }

  @Output() loggedInEvent : EventEmitter<any> = new EventEmitter();
  loggedIn(msg: any){
    return this.loggedInEvent.emit(msg);
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  getTodo(){
    return this.http.get(this.url + '/posts');
  }
  addTodo(todo: any){
    return this.http.post(this.url + '/posts', {todo});
  }
  deleteTodo(id: any){
    return this.http.delete(this.url + '/posts/' + id);
  }

  getLocation(apiKey: any){
    return this.http.get(this.locationUrl + apiKey);
  }
}
