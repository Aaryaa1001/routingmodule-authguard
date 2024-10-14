import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commondash',
  templateUrl: './commondash.component.html',
  styleUrls: ['./commondash.component.scss']
})
export class CommondashComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  click(){
    this.route.navigate(['/common/maindash'])
    // this.route.navigateByUrl('maindash')
    // console.log(this.route.url)
  }
}
