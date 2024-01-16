import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  @Input() navOpen = false;
  @Input() screenWidth = 0;

  ngOnInit(): void {
    
  }

  getBodyClass() : string {
    let styleClass = '';
    if (this.navOpen && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.navOpen && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
