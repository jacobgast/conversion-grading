import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { GradeComponent } from './grade/grade.component';

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GradeComponent
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should set initState to false by default', () => {
    expect(app.initState).toBeFalsy();
  });

  describe('createGradingView()', () => {
    it('should set arraySize to 1 if not specified', () => {
      app.createGradingView();
      expect(app.arraySize).toBe(1);
    });

    it('should create gradeArray', () => {
      app.createGradingView();
      expect(app.gradeArray.length).toBe(1);
    });

    it('should have variable number of elements in gradeArray', () => {
      app.arraySize = 5;
      app.createGradingView();
      expect(app.gradeArray.length).toBe(5);
    });

    it('should set initState to true', () => {
      app.createGradingView();
      expect(app.initState).toBeTruthy();
    });
  });

  describe('grade()', () => {
    let grade;

    beforeEach(() => {
      app.arraySize = 3;
      app.createGradingView();
      grade = app.gradeArray[0];
      grade.initValue = 0;
    });

    describe('should convert Farenheit', () => {
      beforeEach(() => {
        grade.initFormat = 'Farenheit';
      });

      afterEach(() => {
        app.grade();
        expect(grade.result).toBe('Correct');
      });

      it('to Celsius', () => {
        grade.targetFormat = 'Celsius';
        grade.inputValue = -18;
      });

      it('to Kelvin', () => {
        grade.targetFormat = 'Kelvin';
        grade.inputValue = 255;
      });

      it('to Rankine', () => {
        grade.targetFormat = 'Rankine';
        grade.inputValue = 460;
      });
    });

    describe('should convert Celsius', () => {
      beforeEach(() => {
        grade.initFormat = 'Celsius';
      });

      afterEach(() => {
        app.grade();
        expect(grade.result).toBe('Correct');
      });

      it('to Farenheit', () => {
        grade.targetFormat = 'Farenheit';
        grade.inputValue = 32;
      });

      it('to Kelvin', () => {
        grade.targetFormat = 'Kelvin';
        grade.inputValue = 273;
      });

      it('to Rankine', () => {
        grade.targetFormat = 'Rankine';
        grade.inputValue = 492;
      });
    });

    describe('should convert Kelvin', () => {
      beforeEach(() => {
        grade.initFormat = 'Kelvin';
      });

      afterEach(() => {
        app.grade();
        expect(grade.result).toBe('Correct');
      });

      it('to Farenheit', () => {
        grade.targetFormat = 'Farenheit';
        grade.inputValue = -460;
      });

      it('to Celsius', () => {
        grade.targetFormat = 'Celsius';
        grade.inputValue = -273;
      });

      it('to Rankine', () => {
        grade.targetFormat = 'Rankine';
        grade.inputValue = 0;
      });
    });

    describe('should convert Rankine', () => {
      beforeEach(() => {
        grade.initFormat = 'Rankine';
      });

      afterEach(() => {
        app.grade();
        expect(grade.result).toBe('Correct');
      });

      it('to Farenheit', () => {
        grade.targetFormat = 'Farenheit';
        grade.inputValue = -460;
      });

      it('to Celsius', () => {
        grade.targetFormat = 'Celsius';
        grade.inputValue = -273;
      });

      it('to Kelvin', () => {
        grade.targetFormat = 'Kelvin';
        grade.inputValue = 0;
      });
    });

    it('should set grade.result to invalid when at least one field is blank', () => {
      app.grade();
      expect(grade.result).toBe('Invalid');
    });

    it('should set grade.result to incorrect when the student response doesn\'t match answer', () => {
      grade.initFormat = 'Farenheit';
      grade.targetFormat = 'Celsius';
      grade.inputValue = 0;
      app.grade();
      expect(grade.result).toBe('Incorrect');
    });

    it('should set grade.result to incorrect when the student response is NaN', () => {
      grade.initFormat = 'Farenheit';
      grade.targetFormat = 'Celsius';
      grade.inputValue = 'cat';
      app.grade();
      expect(grade.result).toBe('Incorrect');
    });

    it('should grade all elements in app.gradeArray', () => {
      grade.initFormat = 'Celsius';
      grade.targetFormat = 'Farenheit';
      grade.inputValue = 32;

      const grade2 = app.gradeArray[1];
      grade2.initValue = 0;
      grade2.initFormat = 'Rankine';
      grade2.targetFormat = 'Celsius';
      grade2.inputValue = 0;

      const grade3 = app.gradeArray[2];

      app.grade();

      expect(grade.result).toBe('Correct');
      expect(grade2.result).toBe('Incorrect');
      expect(grade3.result).toBe('Invalid');
    });

    it('should set grade.result to invalid if error is reached in conversion', () => {
      grade.initFormat = 'Farenheit';
      grade.targetFormat = 'Farenheit';
      grade.inputValue = 0;
      app.grade();
      expect(grade.result).toBe('Invalid');
    });

    it('should round grade.inputValue to nearest whole number', () => {
      grade.initFormat = 'Farenheit';
      grade.targetFormat = 'Kelvin';
      grade.inputValue = 255.3722;
      app.grade();
      expect(grade.result).toBe('Correct');
    });
  });

  describe('reset()', () => {
    it('should set initState to false', () => {
      app.initState = true;
      app.reset();
      expect(app.initState).toBeFalsy();
    });

    it('should set arraySize to null', () => {
      app.arraySize = 5;
      app.reset();
      expect(app.arraySize).toBeNull();
    });
  });

  describe('clear()', () => {
    it('should recreate gradeArray', () => {
      app.arraySize = 5;
      app.createGradingView();
      app.gradeArray[0].initValue = 1;
      app.clear();
      expect(app.gradeArray[0].initValue).toBeUndefined();
    });

    it('should set arraySize to value before clearing', () => {
      app.arraySize = 5;
      app.clear();
      expect(app.arraySize).toBe(5);
    });
  });
});
