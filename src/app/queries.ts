'use server';

import axios from 'axios';

import {
  IMovie,
  IMovieDetail,
  IVideo,
  NonPaginatedResponse,
  PaginatedRequest,
  PaginatedResponse,
} from '@/lib/types';

export async function getMovies(
  params: PaginatedRequest = {},
): Promise<PaginatedResponse<IMovie>> {
  const res = await axios.get(
    `${process.env.TMDB_API_URL}/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`,
    {
      params,
    },
  );

  console.log('eliasss', await res.data);

  return res.data;
}

export async function getMovie(id: string): Promise<IMovieDetail> {
  const res = await axios.get(
    `${process.env.TMDB_API_URL}/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
  );

  return res.data;
}

export async function getSimilarMovies({
  id,
}: PaginatedRequest & { id: number }): Promise<PaginatedResponse<IMovie>> {
  const res = await axios.get(
    `${process.env.TMDB_API_URL}/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}`,
  );

  return res.data;
}

export async function searchMovies(
  params: PaginatedRequest & { query: string },
): Promise<PaginatedResponse<IMovie>> {
  const res = await axios.get(
    `${process.env.TMDB_API_URL}/3/search/movie?api_key=${process.env.TMDB_API_KEY}`,
    { params },
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
