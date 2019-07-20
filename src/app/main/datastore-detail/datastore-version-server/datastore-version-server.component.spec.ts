import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreVersionServerComponent } from './datastore-version-server.component';

describe('DatastoreVersionServerComponent', () => {
  let component: DatastoreVersionServerComponent;
  let fixture: ComponentFixture<DatastoreVersionServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreVersionServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreVersionServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
