import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkParentChildComponent } from './bulk-parent-child.component';

describe('BulkParentChildComponent', () => {
  let component: BulkParentChildComponent;
  let fixture: ComponentFixture<BulkParentChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkParentChildComponent]
    });
    fixture = TestBed.createComponent(BulkParentChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
