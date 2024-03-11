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
import { TracksService } from './tracks.service';
import { CreateTrackDto, Track, UpdateTrackDto } from 'src/types/types';
import { Errors } from 'src/errors/errors';
import { isUUID } from 'class-validator';

@Controller()
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get('/track')
  getTracks(): Track[] {
    return this.tracksService.getTracks();
  }

  @Get('/track/:id')
  getTrack(@Param('id') id: string): Track {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const track = this.tracksService.getTrack(id);
    if (!track) {
      throw new HttpException(Errors.NOT_EXIST, HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Post('/track')
  @Header('content-type', 'application/json')
  @UsePipes(new ValidationPipe({ skipNullProperties: true }))
  createTrack(@Body() dto: CreateTrackDto): Track {
    return this.tracksService.createTrack(dto);
  }

  @Put('/track/:id')
  @Header('content-type', 'application/json')
  @UsePipes(new ValidationPipe({ skipNullProperties: true }))
  updateTrack(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const track = this.tracksService.getTrack(id);
    if (!track) {
      throw new HttpException(Errors.NOT_EXIST, HttpStatus.NOT_FOUND);
    }

    const updatedTrack = this.tracksService.updateTrack(id, dto);

    if (updatedTrack === Errors.INVALID_OLD_PASSWORD) {
      throw new HttpException(
        Errors.INVALID_OLD_PASSWORD,
        HttpStatus.FORBIDDEN,
      );
    }
    return updatedTrack;
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const track = this.tracksService.getTrack(id);
    if (!track) {
      throw new HttpException(Errors.NOT_EXIST, HttpStatus.NOT_FOUND);
    }

    this.tracksService.deleteTrack(id);
  }
}
