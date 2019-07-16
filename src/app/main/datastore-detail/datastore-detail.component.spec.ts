import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreDetailComponent } from './datastore-detail.component';

describe('DatastoreDetailComponent', () => {
  let component: DatastoreDetailComponent;
  let fixture: ComponentFixture<DatastoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
