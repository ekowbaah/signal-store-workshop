import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMetroArtComponent } from './add-metro-art.component';

describe('AddMetroArtComponent', () => {
  let component: AddMetroArtComponent;
  let fixture: ComponentFixture<AddMetroArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMetroArtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMetroArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
