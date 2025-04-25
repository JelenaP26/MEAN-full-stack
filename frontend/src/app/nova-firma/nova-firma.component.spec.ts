import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaFirmaComponent } from './nova-firma.component';

describe('NovaFirmaComponent', () => {
  let component: NovaFirmaComponent;
  let fixture: ComponentFixture<NovaFirmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovaFirmaComponent]
    });
    fixture = TestBed.createComponent(NovaFirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
