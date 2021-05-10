import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageLegendComponent } from './add-image-legend.component';

describe('AddImageLegendComponent', () => {
  let component: AddImageLegendComponent;
  let fixture: ComponentFixture<AddImageLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImageLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
