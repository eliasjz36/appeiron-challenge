/* eslint-disable camelcase */

'use client';

import { searchMovies } from '@/app/queries';
import { useInfiniteScroll } from '@/lib/hooks/use-infinite-scroll';
import { IMovie } from '@/lib/types';

import { Movie } from './movie';

interface MovieResultsListProps {
  query: string;
  initialMovies: IMovie[];
}

export function MovieResultsList({
  query,
  initialMovies,
}: MovieResultsListProps) {
  const fetchSimilarMovies = async (page: number) => {
    const { results, total_pages } = await searchMovies({ query, page });

    return { results, total_pages };
  };

  const { items: movies, lastItemRef } = useInfiniteScroll<IMovie>({
    fetchFunction: fetchSimilarMovies,
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
