import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommondashComponent } from './commondash.component';

describe('CommondashComponent', () => {
  let component: CommondashComponent;
  let fixture: ComponentFixture<CommondashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommondashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommondashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
