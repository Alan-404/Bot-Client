import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  seeProducts: boolean = false

  hover(see: boolean){
    this.seeProducts = see
  }
}
