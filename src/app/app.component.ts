import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gozem-testimonial-page';
  activeRoute = 1;
  constructor() {}

  ngOnInit() {}

  changePage(val: any) {
    this.activeRoute = val;
  }
}
