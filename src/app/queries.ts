'use server';

import axios from 'axios';

import {
  IMovie,
  IVideo,
  NonPaginatedResponse,
  PaginatedResponse,
} from '@/lib/types';

export async function getMovies(): Promise<PaginatedResponse<IMovie>> {
  const res = await axios.get(
    `${process.env.TMDB_API_URL}/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`,
  );

  return res.data;
}

export async function getMovie(id: string): Promise<IMovie> {
  const res = await axios.get(
    `${process.env.TMDB_API_URL}/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
  );

  return res.data;
}

export async function getSimilarMovies(
  id: string,
): Promise<PaginatedResponse<IMovie[]>> {
  const res = await axios.get(
    `${process.env.TMDB_API_URL}/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}`,
  );

  return res.data;
}

export async function searchMovies(
  query: string,
): Promise<PaginatedResponse<IMovie>> {
  const res = await axios.get(
    `${process.env.TMDB_API_URL}/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}`,
  );

  return res.data;
}

export async function getMovieVideos(
  id: string,
): Promise<NonPaginatedResponse<IVideo>> {
  const res = await axios.get(
    `${process.env.TMDB_API_URL}/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`,
  );

  return res.data;
}
