/* eslint-disable camelcase */

'use client';

import { getMovies } from '@/app/queries';
import { useInfiniteScroll } from '@/lib/hooks/use-infinite-scroll';
import { IMovie } from '@/lib/types';

import { Movie } from './movie';

interface MovieListProps {
  initialMovies: IMovie[];
}

export function MovieList({ initialMovies }: MovieListProps) {
  const fetchMovies = async (page: number) => {
    const { results, total_pages } = await getMovies({ page });

    return { results, total_pages };
  };

  const { items: movies, lastItemRef } = useInfiniteScroll<IMovie>({
    fetchFunction: fetchMovies,
    initialData: initialMovies,
  });

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}

      <div ref={lastItemRef} />
    </div>
  );
}
