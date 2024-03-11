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
import { ArtistsService } from './artists.service';
import { CreateArtistDto, Artist, UpdateArtistDto } from 'src/types/types';
import { Errors } from 'src/errors/errors';
import { isUUID } from 'class-validator';

@Controller()
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get('/artist')
  getArtists(): Artist[] {
    return this.artistsService.getArtists();
  }

  @Get('/artist/:id')
  getArtist(@Param('id') id: string): Artist {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const artist = this.artistsService.getArtist(id);
    if (!artist) {
      throw new HttpException(Errors.NOT_EXIST, HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Post('/artist')
  @Header('content-type', 'application/json')
  @UsePipes(new ValidationPipe({ skipNullProperties: true }))
  createArtist(@Body() dto: CreateArtistDto): Artist {
    return this.artistsService.createArtist(dto);
  }

  @Put('/artist/:id')
  @Header('content-type', 'application/json')
  @UsePipes(new ValidationPipe({ skipNullProperties: true }))
  updateArtist(@Param('id') id: string, @Body() dto: UpdateArtistDto) {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const Artist = this.artistsService.getArtist(id);
    if (!Artist) {
      throw new HttpException(Errors.NOT_EXIST, HttpStatus.NOT_FOUND);
    }

    const updatedArtist = this.artistsService.updateArtist(id, dto);

    if (updatedArtist === Errors.INVALID_OLD_PASSWORD) {
      throw new HttpException(
        Errors.INVALID_OLD_PASSWORD,
        HttpStatus.FORBIDDEN,
      );
    }
    return updatedArtist;
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const Artist = this.artistsService.getArtist(id);
    if (!Artist) {
      throw new HttpException(Errors.NOT_EXIST, HttpStatus.NOT_FOUND);
    }

    this.artistsService.deleteArtist(id);
  }
}
