import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeComponent } from './grade.component';
import { FormsModule } from '@angular/forms';

describe('GradeComponent', () => {
  let component: GradeComponent;
  let fixture: ComponentFixture<GradeComponent>;
  const fakeGrade = {
    initValue: 1,
    initFormat: 'Farenheit',
    targetFormat: 'Celsius',
    inputValue: 3,
    result: 'Incorrect'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GradeComponent
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeComponent);
    component = fixture.componentInstance;
    component.grade = fakeGrade;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
