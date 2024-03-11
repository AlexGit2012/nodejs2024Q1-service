import { Favorites, FavoritesResponse } from 'src/types/types';
import { getAlbum, getAlbums } from './fakeAlbumsDatabase';
import { getArtist, getArtists } from './fakeArtistsDatabase';
import { getTrack, getTracks } from './fakeTracksDatabase';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Errors } from 'src/errors/errors';

let favorites: Favorites = {
  albums: [],
  artists: [],
  tracks: [],
};

export const getFavorites = (): Favorites => favorites;

export const getFavoritesWithEntities = (): FavoritesResponse => {
  const albums = getFavorites().albums.map((albumId) =>
    getAlbums().find((album) => album.id === albumId),
  );
  const artists = getFavorites().artists.map((artistId) =>
    getArtists().find((artist) => artist.id === artistId),
  );
  const tracks = getFavorites().tracks.map((trackId) =>
    getTracks().find((track) => track.id === trackId),
  );
  const favoritesWithEntities = { albums, artists, tracks };
  return favoritesWithEntities;
};

export const setFavorites = (newFavorites: Favorites) => {
  favorites = newFavorites;
};

export const addTrackToFavorites = (id: string) => {
  const track = getTrack(id);
  if (!track) {
    throw new HttpException(Errors.NOT_EXIST, HttpStatus.UNPROCESSABLE_ENTITY);
  }
  if (!getFavorites().tracks.includes(id)) favorites.tracks.push(id);
  return id;
};

export const addAlbumToFavorites = (id: string) => {
  const album = getAlbum(id);
  if (!album) {
    throw new HttpException(Errors.NOT_EXIST, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  if (!getFavorites().albums.includes(id)) favorites.albums.push(id);
  return id;
};

export const addArtistToFavorites = (id: string) => {
  const artist = getArtist(id);
  if (!artist) {
    throw new HttpException(Errors.NOT_EXIST, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  if (!getFavorites().artists.includes(id)) favorites.artists.push(id);
  return id;
};

export const removeTrackFromFavorites = (id: string) => {
  favorites = {
    ...getFavorites(),
    tracks: getFavorites().tracks.filter((trackId) => trackId !== id),
  };
};

export const removeAlbumFromFavorites = (id: string) => {
  favorites = {
    ...getFavorites(),
    albums: getFavorites().albums.filter((albumId) => albumId !== id),
  };
};

export const removeArtistFromFavorites = (id: string) => {
  favorites = {
    ...getFavorites(),
    artists: getFavorites().artists.filter((artistId) => artistId !== id),
  };
};

export const getTrackIdFromFavorites = (id: string) => {
  return getFavorites().tracks.find((trackId) => trackId === id);
};

export const getAlbumIdFromFavorites = (id: string) => {
  return getFavorites().albums.find((albumId) => albumId === id);
};

export const getArtistIdFromFavorites = (id: string) => {
  return getFavorites().artists.find((artistId) => artistId === id);
};
