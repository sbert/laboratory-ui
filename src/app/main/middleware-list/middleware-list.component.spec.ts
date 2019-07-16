import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlewareListComponent } from './middleware-list.component';

describe('MiddlewareListComponent', () => {
  let component: MiddlewareListComponent;
  let fixture: ComponentFixture<MiddlewareListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddlewareListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddlewareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
