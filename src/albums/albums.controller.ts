import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto, Album, UpdateAlbumDto } from 'src/types/types';
import { Errors } from 'src/errors/errors';
import { isUUID } from 'class-validator';

@Controller()
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get('/album')
  getAlbums(): Album[] {
    return this.albumsService.getAlbums();
  }

  @Get('/album/:id')
  getAlbum(@Param('id') id: string): Album {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const album = this.albumsService.getAlbum(id);
    if (!album) {
      throw new HttpException(Errors.NOT_EXIST, HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Post('/album')
  @Header('content-type', 'application/json')
  @UsePipes(new ValidationPipe({ skipNullProperties: true }))
  createAlbum(@Body() dto: CreateAlbumDto): Album {
    return this.albumsService.createAlbum(dto);
  }

  @Put('/album/:id')
  @Header('content-type', 'application/json')
  @UsePipes(new ValidationPipe({ skipNullProperties: true }))
  updateAlbum(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const Album = this.albumsService.getAlbum(id);
    if (!Album) {
      throw new HttpException(Errors.NOT_EXIST, HttpStatus.NOT_FOUND);
    }

    const updatedAlbum = this.albumsService.updateAlbum(id, dto);

    if (updatedAlbum === Errors.INVALID_OLD_PASSWORD) {
      throw new HttpException(
        Errors.INVALID_OLD_PASSWORD,
        HttpStatus.FORBIDDEN,
      );
    }
    return updatedAlbum;
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const Album = this.albumsService.getAlbum(id);
    if (!Album) {
      throw new HttpException(Errors.NOT_EXIST, HttpStatus.NOT_FOUND);
    }

    this.albumsService.deleteAlbum(id);
  }
}
