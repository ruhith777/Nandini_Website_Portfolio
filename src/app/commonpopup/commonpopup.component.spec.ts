import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonpopupComponent } from './commonpopup.component';

describe('CommonpopupComponent', () => {
  let component: CommonpopupComponent;
  let fixture: ComponentFixture<CommonpopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonpopupComponent]
    });
    fixture = TestBed.createComponent(CommonpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
