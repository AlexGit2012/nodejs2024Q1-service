import { Injectable } from '@nestjs/common';
import {
  createArtist,
  deleteArtist,
  getArtist,
  getArtists,
  updateArtist,
} from 'src/database/fakeArtistsDatabase';
import { Errors } from 'src/errors/errors';
import { CreateArtistDto, Artist, UpdateArtistDto } from 'src/types/types';

@Injectable()
export class ArtistsService {
  getArtists(): Artist[] {
    return getArtists();
  }

  getArtist(id: string): Artist {
    return getArtist(id);
  }

  createArtist(dto: CreateArtistDto): Artist {
    return createArtist(dto);
  }

  updateArtist(id: string, dto: UpdateArtistDto): Artist | Errors {
    return updateArtist(id, dto);
  }

  deleteArtist(id: string) {
    deleteArtist(id);
  }
}
