import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerListTableComponent } from './server-list-table.component';

describe('ServerListTableComponent', () => {
  let component: ServerListTableComponent;
  let fixture: ComponentFixture<ServerListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
