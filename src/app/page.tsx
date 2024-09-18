import { MovieList } from '@/components/movies/movie-list';

import { getMovies } from './queries';

export default async function Home() {
  const movies = await getMovies();

  return (
    <main className="min-h-screen p-8">
      <MovieList movies={movies.results} />
    </main>
  );
}
