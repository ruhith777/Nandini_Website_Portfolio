import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PPPComponent } from './ppp.component';

describe('PPPComponent', () => {
  let component: PPPComponent;
  let fixture: ComponentFixture<PPPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PPPComponent]
    });
    fixture = TestBed.createComponent(PPPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
