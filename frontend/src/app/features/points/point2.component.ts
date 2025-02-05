import {Component, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-point2-component',
  standalone: false,
  template: '<div>points2 section</div>'
})
export class Point2Component {

}

@NgModule({
  declarations: [Point2Component],
  imports: [
    CommonModule
  ],
  exports: [
    Point2Component
  ]
})
export class Point2Module {

}
