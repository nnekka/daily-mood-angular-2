import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColorLegendComponent } from './add-color-legend.component';

describe('AddColorLegendComponent', () => {
  let component: AddColorLegendComponent;
  let fixture: ComponentFixture<AddColorLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddColorLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddColorLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
