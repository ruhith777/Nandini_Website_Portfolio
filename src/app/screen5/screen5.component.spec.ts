import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen5Component } from './screen5.component';

describe('Screen5Component', () => {
  let component: Screen5Component;
  let fixture: ComponentFixture<Screen5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Screen5Component]
    });
    fixture = TestBed.createComponent(Screen5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
