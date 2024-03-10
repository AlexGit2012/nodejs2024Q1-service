import { Injectable } from '@nestjs/common';
import {
  createTrack,
  deleteTrack,
  getTrack,
  getTracks,
  updateTrack,
} from 'src/database/fakeTracksDatabase';
import { Errors } from 'src/errors/errors';
import { CreateTrackDto, Track, UpdateTrackDto } from 'src/types/types';

@Injectable()
export class TracksService {
  getTracks(): Track[] {
    return getTracks();
  }

  getTrack(id: string): Track {
    return getTrack(id);
  }

  createTrack(dto: CreateTrackDto): Track {
    return createTrack(dto);
  }

  updateTrack(id: string, dto: UpdateTrackDto): Track | Errors {
    return updateTrack(id, dto);
  }

  deleteTrack(id: string) {
    deleteTrack(id);
  }
}
