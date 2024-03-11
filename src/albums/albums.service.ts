import { Injectable } from '@nestjs/common';
import {
  createAlbum,
  deleteAlbum,
  getAlbum,
  getAlbums,
  updateAlbum,
} from 'src/database/fakeAlbumsDatabase';
import { Errors } from 'src/errors/errors';
import { CreateAlbumDto, Album, UpdateAlbumDto } from 'src/types/types';

@Injectable()
export class AlbumsService {
  getAlbums(): Album[] {
    return getAlbums();
  }

  getAlbum(id: string): Album {
    return getAlbum(id);
  }

  createAlbum(dto: CreateAlbumDto): Album {
    return createAlbum(dto);
  }

  updateAlbum(id: string, dto: UpdateAlbumDto): Album | Errors {
    return updateAlbum(id, dto);
  }

  deleteAlbum(id: string) {
    deleteAlbum(id);
  }
}
