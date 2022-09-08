import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftCompComponent } from './shift-comp.component';

describe('ShiftCompComponent', () => {
  let component: ShiftCompComponent;
  let fixture: ComponentFixture<ShiftCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
