import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PointComponent} from './features/points/point.component';
import {Point2Component, Point2Module} from './features/points/point2.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PointComponent,
    Point2Module
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'frontend';
}
