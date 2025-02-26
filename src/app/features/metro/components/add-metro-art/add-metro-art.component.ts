import { Component, inject, OnInit, viewChild } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnDialogComponent,
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { loadStations } from '../../store/metro.actions';
import { Store } from '@ngrx/store';
import { selectStations } from '../../store/metro.selectors';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { uploadArt } from '../../store/art.actions';

@Component({
  selector: 'app-add-metro-art',
  imports: [
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    BrnSelectImports,
    HlmSelectImports,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './add-metro-art.component.html',
  styleUrl: './add-metro-art.component.scss',
})
export class AddMetroArtComponent implements OnInit {
  store = inject(Store);
  stations$ = this.store.select(selectStations);
  userId!: string;
  file!: File;
  stationId!: number;
  description!: string;
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  public viewchildDialogRef = viewChild(BrnDialogComponent);

  ngOnInit(): void {
    this.store.dispatch(loadStations());
  }

  onSubmit() {
    if (this.file && this.stationId) {
      const fakeUserData = localStorage.getItem('fakeUser');
      if (fakeUserData) {
        this.userId = JSON.parse(fakeUserData).id;
      }

      this.store.dispatch(
        uploadArt({
          stationId: this.stationId,
          file: this.file,
          userId: this.userId,
          description: this.description,
        })
      );

      this.viewchildDialogRef()?.close({});
    }
  }
}
