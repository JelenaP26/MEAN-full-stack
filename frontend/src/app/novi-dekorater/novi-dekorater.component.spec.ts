import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviDekoraterComponent } from './novi-dekorater.component';

describe('NoviDekoraterComponent', () => {
  let component: NoviDekoraterComponent;
  let fixture: ComponentFixture<NoviDekoraterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoviDekoraterComponent]
    });
    fixture = TestBed.createComponent(NoviDekoraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
