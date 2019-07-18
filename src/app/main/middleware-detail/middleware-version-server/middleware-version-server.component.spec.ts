import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlewareVersionServerComponent } from './middleware-version-server.component';

describe('MiddlewareVersionServerComponent', () => {
  let component: MiddlewareVersionServerComponent;
  let fixture: ComponentFixture<MiddlewareVersionServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddlewareVersionServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddlewareVersionServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
