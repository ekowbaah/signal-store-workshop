import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

import { MetroArtExplorerComponent } from './metro-art-explorer.component';

describe('MetroArtExplorerComponent', () => {
  let component: MetroArtExplorerComponent;
  let fixture: ComponentFixture<MetroArtExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetroArtExplorerComponent],
      providers: [provideMockStore(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetroArtExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
