import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlewareDetailComponent } from './middleware-detail.component';

describe('MiddlewareDetailComponent', () => {
  let component: MiddlewareDetailComponent;
  let fixture: ComponentFixture<MiddlewareDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddlewareDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddlewareDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
