import Image from 'next/image';

import { FilmIcon } from 'lucide-react';

import { getMovie, getSimilarMovies } from '@/app/queries';
import { MovieList } from '@/components/movies/movie-list';
import { Badge } from '@/components/ui/badge';
import { Ratings } from '@/components/ui/ratings';
import { getImageUrl } from '@/lib/utils';

interface MoviePageProps {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movie = await getMovie(params.id);
  const similarMovies = await getSimilarMovies(params.id);

  return (
    <div className="min-h-screen space-y-10 p-8">
      <div className="mx-auto max-w-7xl gap-8 md:flex">
        {movie.poster_path ? (
          <Image
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            width={300}
            height={400}
            className="rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-80 w-60 items-center justify-center rounded-xl border bg-background/30">
            <FilmIcon className="h-14 w-14 text-muted-foreground" />
          </div>
        )}
        <div className="grid gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">{movie.title}</h1>
            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <Ratings variant="yellow" rating={movie.vote_average} />
              </div>

              <p>{movie.vote_average.toFixed(1)}</p>
            </div>
            <div className="text-md leading-loose text-opacity-90">
              <p>{movie.overview}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-6 text-sm font-semibold">
                <h3>Released</h3>
                <h3>{movie.release_date}</h3>
              </div>
              <div className="flex gap-6 text-sm font-semibold">
                <h3>Genders:</h3>

                <div className="space-x-2">
                  {movie.genres.map((genre) => (
                    <Badge key={genre.id} className="w-fit">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Similar Movies</h2>

        <MovieList movies={similarMovies.results} />
      </div>
    </div>
  );
}
