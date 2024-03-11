import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesResponse } from 'src/types/types';
import { FavoritesService } from './favorites.service';
import { isUUID } from 'class-validator';
import { Errors } from 'src/errors/errors';

@Controller()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('/favs')
  getTracks(): FavoritesResponse {
    return this.favoritesService.getFavorites();
  }

  @Post('/favs/track/:id')
  addTrackToFavorites(@Param('id') id: string): string {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    return this.favoritesService.addTrackToFavorites(id);
  }

  @Post('/favs/album/:id')
  addAlbumToFavorites(@Param('id') id: string): string {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Post('/favs/artist/:id')
  addArtistToFavorites(@Param('id') id: string): string {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('/favs/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const trackId = this.favoritesService.getTrackIdFromFavorites(id);
    if (!trackId) {
      throw new HttpException(Errors.NOT_FAVORITE, HttpStatus.NOT_FOUND);
    }

    this.favoritesService.removeTrackFromFavorites(id);
  }

  @Delete('/favs/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const albumId = this.favoritesService.getAlbumIdFromFavorites(id);
    if (!albumId) {
      throw new HttpException(Errors.NOT_FAVORITE, HttpStatus.NOT_FOUND);
    }

    this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Delete('/favs/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const artistId = this.favoritesService.getArtistIdFromFavorites(id);
    if (!artistId) {
      throw new HttpException(Errors.NOT_FAVORITE, HttpStatus.NOT_FOUND);
    }

    this.favoritesService.removeArtistFromFavorites(id);
  }
}
