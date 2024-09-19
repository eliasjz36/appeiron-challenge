import { MovieList } from '@/components/movies/movie-list';

import { getMovies } from './queries';

export default async function Home() {
  const movies = await getMovies();

  return (
    <main className="min-h-screen space-y-8 p-8">
      <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
        Popular Movies
      </h1>

      <MovieList initialMovies={movies.results} />
    </main>
  );
}
