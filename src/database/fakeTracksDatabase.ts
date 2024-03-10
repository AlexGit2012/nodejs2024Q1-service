import { isUUID } from 'class-validator';
import { Errors } from 'src/errors/errors';
import { CreateTrackDto, Track, UpdateTrackDto } from 'src/types/types';
import { v4 as uuidv4 } from 'uuid';

let tracks: Track[] = [];

export const getTracks = (): Track[] => tracks;

export const setTracks = (newTracks: Track[]) => {
  tracks = newTracks;
};

export const findTrack = (id: string) => {
  if (isUUID(id)) {
    return Errors.INVALID_UUID;
  }
  const track = getTracks().find((track) => track.id === id);
  return track;
};

export const createTrack = (dto: CreateTrackDto) => {
  let track: Track = {
    id: uuidv4(),
    ...dto,
  };
  setTracks([...getTracks(), track]);
  return track;
};

export const getTrack = (id: string) => {
  return getTracks().find((track: Track) => track.id === id);
};

export const updateTrack = (id: string, dto: UpdateTrackDto) => {
  const trackIndex = getTracks().findIndex((track) => track.id === id);
  const newTracksArr = [...getTracks()];
  newTracksArr[trackIndex] = { ...newTracksArr[trackIndex], ...dto };
  setTracks(newTracksArr);
  return getTrack(id);
};

export const deleteTrack = (id: string) => {
  const newTracksArr = getTracks().filter((track) => track.id !== id);
  setTracks(newTracksArr);
};
