import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  textvalue: string = ""

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  submitfun(){
    if(!!this.textvalue){
      console.log('textvalue',this.textvalue)
      localStorage.setItem('savedcheckuser',this.textvalue)
      this.router.navigate(['/common'])
    }
  }

}
