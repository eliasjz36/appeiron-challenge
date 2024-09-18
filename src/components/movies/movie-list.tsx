import { IMovie } from '@/lib/types';

import { Movie } from './movie';

export function MovieList({ movies }: { movies: IMovie[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
