import { inject, Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environment/environment';

import { Store } from '@ngrx/store';
import { notifyNewLike } from '../../../store/notifications/notifications.actions';
import { MetroStation } from '../../../features/metro/store/metro.reducer';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  store = inject(Store);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  getStations(): Observable<MetroStation[]> {
    return from(this.supabase.from('metro_stations').select('*')).pipe(
      map((response) => response.data as MetroStation[])
    );
  }
  async saveUser(userId: string, username: string) {
    await this.supabase.from('users').insert({ id: userId, username });
  }

  async getUser(userId: string) {
    const { data } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    return data;
  }

  uploadArtImage(
    stationId: number,
    file: File,
    userId: string,
    description: string
  ) {
    const filePath = `art-images/station-${stationId}/${file.name}`;

    return from(
      this.supabase.storage
        .from('art-images')
        .upload(filePath, file, { upsert: true })
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) throw error;

        const publicUrl = `${this.getPublicUrl(filePath)}`;
        return from(
          this.supabase
            .from('station_art')
            .insert({
              station_id: stationId,
              image_url: publicUrl,
              uploaded_by: userId,
              description: description,
            })
            .select()
            .single()
        );
      }),
      map(({ data, error }) => {
        if (error) throw error;

        return data;
      })
    );
  }

  likeArt(artId: number, userId: string, userName: string) {
    return from(
      this.supabase.from('art_likes').insert({
        art_id: artId,
        liked_by_id: userId,
        liked_by: userName,
      })
    ).pipe(
      switchMap(({ error }) => {
        if (error && error.code !== '23505') {
          // 23505 = unique constraint violation => user already liked
          throw error;
        }

        return from(
          this.supabase
            .from('art_likes')
            .select('*', { count: 'exact' })
            .eq('art_id', artId)
        );
      }),
      map(({ count }) => count || 0)
    );
  }

  loadStationArt(stationId: number) {
    return from(
      this.supabase
        .from('station_art')
        .select('*')
        .eq('station_id', stationId)
        .order('created_at', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data;
      })
    );
  }

  private getPublicUrl(filePath: string): string {
    const { data } = this.supabase.storage
      .from('art-images')
      .getPublicUrl(filePath);
    return data?.publicUrl || '';
  }

  async getAllArt() {
    const { data, error } = await this.supabase.from('station_art').select(`
        id,
        image_url,
        uploaded_by,
        description ,
        users:uploaded_by (username),
        metro_stations!fk_station (name),
        art_likes!art_likes_art_id_fkey (id)
      `);
    if (error) {
      console.error('Error fetching all art:', error);
      return [];
    }

    const artList = data.map((art: any) => ({
      id: art.id,
      imageUrl: art.image_url,
      uploadedBy: art.uploaded_by,
      uploaderName: art.users.username || 'Unknown',
      stationId: art.station_id,
      stationName: art.metro_stations.name || 'Unknown',
      artDescription: art.description || 'No description available',
      likeCount: art.art_likes?.length || 0,
    }));

    return artList;
  }

  listenForLikes() {
    this.supabase
      .channel('realtime-art-likes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'art_likes' },
        (payload) => {
          const artId = payload.new['art_id'];
          const likedById = payload.new['liked_by_id'];
          const likedBy = payload.new['liked_by'];
          this.store.dispatch(notifyNewLike({ artId, likedById, likedBy }));
        }
      )
      .subscribe();
  }
}
