import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactListTableComponent } from './artifact-list-table.component';

describe('ArtifactListTableComponent', () => {
  let component: ArtifactListTableComponent;
  let fixture: ComponentFixture<ArtifactListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtifactListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
