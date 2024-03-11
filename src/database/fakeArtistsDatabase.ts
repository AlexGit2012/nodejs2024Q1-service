import { isUUID } from 'class-validator';
import { Errors } from 'src/errors/errors';
import { CreateArtistDto, Artist, UpdateArtistDto } from 'src/types/types';
import { v4 as uuidv4 } from 'uuid';
import { getTracks } from './fakeTracksDatabase';
import { getAlbums } from './fakeAlbumsDatabase';

let artists: Artist[] = [];

export const getArtists = (): Artist[] => artists;

export const setArtists = (newArtists: Artist[]) => {
  artists = newArtists;
};

export const findArtist = (id: string) => {
  if (isUUID(id)) {
    return Errors.INVALID_UUID;
  }
  const artist = getArtists().find((artist) => artist.id === id);
  return artist;
};

export const createArtist = (dto: CreateArtistDto) => {
  let artist: Artist = {
    id: uuidv4(),
    ...dto,
  };
  setArtists([...getArtists(), artist]);
  return artist;
};

export const getArtist = (id: string) => {
  return getArtists().find((artist: Artist) => artist.id === id);
};

export const updateArtist = (id: string, dto: UpdateArtistDto) => {
  const artistIndex = getArtists().findIndex((artist) => artist.id === id);
  const newArtistsArr = [...getArtists()];
  newArtistsArr[artistIndex] = { ...newArtistsArr[artistIndex], ...dto };
  setArtists(newArtistsArr);
  return getArtist(id);
};

export const deleteArtist = (id: string) => {
  const track = getTracks().find((track) => track.artistId === id);
  if (track) {
    track.artistId = null;
  }

  const album = getAlbums().find((album) => album.artistId === id);
  if (album) {
    album.artistId = null;
  }

  const newArtistsArr = getArtists().filter((artist) => artist.id !== id);
  setArtists(newArtistsArr);
};
