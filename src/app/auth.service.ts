import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  checkuser(){
    const user = localStorage.getItem('savedcheckuser')

    if(!!user && user == 'aaryaa'){
      console.log('trieee')
      return true
    }
    else{
      console.log('falseeeee')
      return false
    }
  }
}
