import { Component, inject, OnInit } from '@angular/core';
import { AddMetroArtComponent } from '../add-metro-art/add-metro-art.component';
import { selectAllArt } from '../../store/art.selectors';
import { likeArt, loadAllArt } from '../../store/art.actions';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { lucideHeart } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { selectUser } from '../../../../store/auth/auth.selectors';
import { SupabaseService } from '../../../../core/auth/services/supabase.service';
import { HlmToasterComponent } from '../../../../../../libs/ui/ui-sonner-helm/src/lib/hlm-toaster.component';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { selectLatestNotification } from '../../../../store/notifications/notifications.selectors';

@Component({
  selector: 'app-metro-art-explorer',
  imports: [
    AddMetroArtComponent,
    AsyncPipe,
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmIconDirective,
    HlmToasterComponent,
  ],
  providers: [provideIcons({ lucideHeart })],
  templateUrl: './metro-art-explorer.component.html',
  styleUrl: './metro-art-explorer.component.scss',
})
export class MetroArtExplorerComponent implements OnInit {
  store = inject(Store);
  allArt$ = this.store.select(selectAllArt);
  supabaseService = inject(SupabaseService);
  protected readonly toast = toast;

  ngOnInit(): void {
    this.store.dispatch(loadAllArt());
    this.supabaseService.listenForLikes();
    this.store.select(selectLatestNotification).subscribe((notification) => {
      const fakeUserData = localStorage.getItem('fakeUser');
      let userId;
      if (fakeUserData) {
        userId = JSON.parse(fakeUserData).id;
      }
      if (notification && notification.likedById !== userId) {
        toast('Someone liked an art', {
          description: notification.message,
        });
      }
    });
  }

  likeArt(artId: number) {
    this.store.select(selectUser).subscribe((user) => {
      if (user) {
        const userId = user.id;
        const userName = user.name;
        this.store.dispatch(likeArt({ artId, userId, userName }));
      }
    });
  }
}
