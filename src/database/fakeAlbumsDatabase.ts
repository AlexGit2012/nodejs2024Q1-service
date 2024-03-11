import { isUUID } from 'class-validator';
import { Errors } from 'src/errors/errors';
import { CreateAlbumDto, Album, UpdateAlbumDto } from 'src/types/types';
import { v4 as uuidv4 } from 'uuid';
import { getTracks } from './fakeTracksDatabase';
import { getFavorites, setFavorites } from './fakeFavoritesDatabase';

let albums: Album[] = [];

export const getAlbums = (): Album[] => albums;

export const setAlbums = (newAlbums: Album[]) => {
  albums = newAlbums;
};

export const findAlbum = (id: string) => {
  if (isUUID(id)) {
    return Errors.INVALID_UUID;
  }
  const album = getAlbums().find((album) => album.id === id);
  return album;
};

export const createAlbum = (dto: CreateAlbumDto) => {
  const album: Album = {
    id: uuidv4(),
    ...dto,
  };
  setAlbums([...getAlbums(), album]);
  return album;
};

export const getAlbum = (id: string) => {
  return getAlbums().find((album: Album) => album.id === id);
};

export const updateAlbum = (id: string, dto: UpdateAlbumDto) => {
  const albumIndex = getAlbums().findIndex((album) => album.id === id);
  const newAlbumsArr = [...getAlbums()];
  newAlbumsArr[albumIndex] = { ...newAlbumsArr[albumIndex], ...dto };
  setAlbums(newAlbumsArr);
  return getAlbum(id);
};

export const deleteAlbum = (id: string) => {
  const track = getTracks().find((track) => track.albumId === id);
  if (track) {
    track.albumId = null;
  }
  const newAlbumsArr = getAlbums().filter((album) => album.id !== id);
  setAlbums(newAlbumsArr);

  let newFavorites = getFavorites();
  newFavorites = {
    ...newFavorites,
    albums: newFavorites.albums.filter((albumId) => albumId !== id),
  };
  setFavorites(newFavorites);
};
