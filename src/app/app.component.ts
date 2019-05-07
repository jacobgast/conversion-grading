import { Component, Input } from '@angular/core';
import { Grade } from './grade/grade';
import { round } from 'lodash';
import { resetCompiledComponents } from '@angular/core/src/render3/jit/module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  arraySize: number;
  initState = false;
  gradeArray: Grade[];

  createGradingView() {
    this.gradeArray = [];
    if (this.arraySize == null || this.arraySize < 1) {
      this.arraySize = 1;
    }
    for (let i = 0; i < this.arraySize; i++) {
      this.gradeArray.push(new Grade());
    }
    this.initState = true;
  }

  grade() {
    this.gradeArray.forEach(grade => {
      let answer;
      let problem = false;
      const valid = (grade.initValue != null
                  && grade.initFormat != null
                  && grade.targetFormat != null);

      if (valid && grade.inputValue == null) {
        grade.result = 'Incorrect';
        return;
      }

      if (valid) {
        switch (grade.initFormat) {
          case 'Farenheit':
            switch (grade.targetFormat) {
              case 'Celsius':
                answer = (grade.initValue - 32) / 1.8;
                break;
              case 'Kelvin':
                answer = ((grade.initValue - 32) / 1.8) + 273.15;
                break;
              case 'Rankine':
                answer = grade.initValue + 459.67;
                break;
              default:
                problem = true;
            }
            break;
          case 'Celsius':
            switch (grade.targetFormat) {
              case 'Farenheit':
                answer = (grade.initValue * 1.8) + 32;
                break;
              case 'Kelvin':
                answer = grade.initValue + 273.15;
                break;
              case 'Rankine':
                answer = (grade.initValue + 273.15) * 1.8;
                break;
              default:
                problem = true;
            }
            break;
          case 'Kelvin':
            switch (grade.targetFormat) {
              case 'Farenheit':
                answer = (grade.initValue * 1.8) - 459.67;
                break;
              case 'Celsius':
                answer = grade.initValue - 273.15;
                break;
              case 'Rankine':
                answer = grade.initValue * 1.8;
                break;
              default:
                problem = true;
            }
            break;
          case 'Rankine':
            switch (grade.targetFormat) {
              case 'Farenheit':
                answer = grade.initValue - 459.67;
                break;
              case 'Celsius':
                answer = (grade.initValue - 491.67) / 1.8;
                break;
              case 'Kelvin':
                answer = grade.initValue / 1.8;
                break;
              default:
                problem = true;
            }
            break;
          default:
            problem = true;
        }

        if (!problem) {
          if (round(answer) === round(grade.inputValue)) {
            grade.result = 'Correct';
          } else {
            grade.result = 'Incorrect';
          }
        } else {
          grade.result = 'Invalid';
        }
      } else {
        grade.result = 'Invalid';
      }
    });
  }

  reset() {
    this.initState = false;
    this.arraySize = null;
  }

  clear() {
    const currentSize = this.arraySize;
    this.reset();
    this.arraySize = currentSize;
    this.createGradingView();
  }
}
