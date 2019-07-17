import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlewareVersionApplicationComponent } from './middleware-version-application.component';

describe('MiddlewareVersionApplicationComponent', () => {
  let component: MiddlewareVersionApplicationComponent;
  let fixture: ComponentFixture<MiddlewareVersionApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddlewareVersionApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddlewareVersionApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
