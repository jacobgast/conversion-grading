import { Component, OnInit, Input } from '@angular/core';
import { Grade } from './grade';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {

  @Input() grade: Grade;

  constructor() { }

  ngOnInit() {
  }

}
