import { MovieResultsList } from '@/components/movies/movie-results-list';

import { searchMovies } from '../queries';

interface SearchPageProps {
  searchParams: {
    q: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = searchParams;

  const { results: movies } = await searchMovies({ query: q });

  return (
    <main className="min-h-screen space-y-8 p-8">
      <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
        Resultados para: &quot;{q}&quot;
      </h1>

      <MovieResultsList query={q} initialMovies={movies} />
    </main>
  );
}
