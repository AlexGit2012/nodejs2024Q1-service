import { Injectable } from '@nestjs/common';
import {
  addAlbumToFavorites,
  addArtistToFavorites,
  addTrackToFavorites,
  getAlbumIdFromFavorites,
  getArtistIdFromFavorites,
  getFavoritesWithEntities,
  getTrackIdFromFavorites,
  removeAlbumFromFavorites,
  removeArtistFromFavorites,
  removeTrackFromFavorites,
} from 'src/database/fakeFavoritesDatabase';
import { FavoritesResponse } from 'src/types/types';

@Injectable()
export class FavoritesService {
  getFavorites(): FavoritesResponse {
    return getFavoritesWithEntities();
  }
  addTrackToFavorites(id: string) {
    return addTrackToFavorites(id);
  }
  addAlbumToFavorites(id: string) {
    return addAlbumToFavorites(id);
  }
  addArtistToFavorites(id: string) {
    return addArtistToFavorites(id);
  }
  removeTrackFromFavorites(id: string) {
    return removeTrackFromFavorites(id);
  }
  removeAlbumFromFavorites(id: string) {
    return removeAlbumFromFavorites(id);
  }
  removeArtistFromFavorites(id: string) {
    return removeArtistFromFavorites(id);
  }
  getTrackIdFromFavorites(id: string) {
    return getTrackIdFromFavorites(id);
  }
  getAlbumIdFromFavorites(id: string) {
    return getAlbumIdFromFavorites(id);
  }
  getArtistIdFromFavorites(id: string) {
    return getArtistIdFromFavorites(id);
  }
}
