import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDecisionsMapComponent } from './location-decisions-map.component';

describe('LocationDecisionsMapComponent', () => {
  let component: LocationDecisionsMapComponent;
  let fixture: ComponentFixture<LocationDecisionsMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationDecisionsMapComponent]
    });
    fixture = TestBed.createComponent(LocationDecisionsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
