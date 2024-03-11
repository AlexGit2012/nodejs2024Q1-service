import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string; // previous password
  @IsNotEmpty()
  @IsString()
  newPassword: string; // new password
}

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  artistId: string | null; // refers to Artist
  @IsNotEmpty()
  @IsString()
  albumId: string | null; // refers to Album
  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  artistId: string | null; // refers to Artist
  @IsNotEmpty()
  @IsString()
  albumId: string | null; // refers to Album
  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsNotEmpty()
  @IsString()
  artistId: string | null;
}

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsNotEmpty()
  @IsString()
  artistId: string | null;
}
