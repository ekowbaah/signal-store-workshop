import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

import { AddMetroArtComponent } from './add-metro-art.component';

describe('AddMetroArtComponent', () => {
  let component: AddMetroArtComponent;
  let fixture: ComponentFixture<AddMetroArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMetroArtComponent],
      providers: [provideMockStore(), provideRouter([])]
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
