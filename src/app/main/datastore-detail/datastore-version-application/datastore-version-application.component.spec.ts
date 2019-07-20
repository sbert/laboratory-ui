import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreVersionApplicationComponent } from './datastore-version-application.component';

describe('DatastoreVersionApplicationComponent', () => {
  let component: DatastoreVersionApplicationComponent;
  let fixture: ComponentFixture<DatastoreVersionApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreVersionApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreVersionApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
