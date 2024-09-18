'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AxiosError } from 'axios';
import { FilmIcon, Loader2Icon, SearchIcon } from 'lucide-react';
import { toast } from 'sonner';

import { searchMovies } from '@/app/queries';
import { Input } from '@/components/ui/input';
import { IMovie } from '@/lib/types';
import { getImageUrl, getYear } from '@/lib/utils';

import MainNav from './main-nav';
import ThemeToggle from './theme-toggle';

export default function Header() {
  const [search, setSearch] = useState<string | undefined>();
  const [movies, setMovies] = useState<IMovie[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      if (!search) return;

      try {
        setIsLoading(true);

        const data = await searchMovies(search);

        setMovies(data.results);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(`Error de API: ${error.message}`);
        } else {
          toast.error(`Error inesperado: ${String(error)}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [search]);

  return (
    <header className="z-10 border-b border-border/60 bg-muted/40 p-3">
      <div className="container mx-auto flex items-center justify-between">
        <MainNav />

        <div className="relative mx-auto">
          <Input
            type="search"
            placeholder="Search IMDb"
            className="h-8 pl-7 md:w-72 lg:w-[600px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            debounce
          />
          <SearchIcon className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />

          {search && (
            <div className="absolute top-10 z-10 h-fit w-full rounded border border-border/40 bg-muted">
              {isLoading ? (
                <div className="flex h-10 items-center justify-center">
                  <Loader2Icon className="mr-2 h-6 w-6 animate-spin" />
                </div>
              ) : (
                <>
                  {movies?.slice(0, 5).map((movie) => (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      onClick={() => setSearch('')}
                    >
                      <div className="flex gap-4 border-b border-muted-foreground/10 p-2 hover:bg-muted-foreground/10">
                        {movie.poster_path ? (
                          <Image
                            src={getImageUrl(movie.poster_path)}
                            alt="Vehicle Image"
                            className="w-{70px] rounded"
                            width={70}
                            height={70}
                          />
                        ) : (
                          <div className="flex h-[70px] w-[70px] items-center justify-center rounded bg-background/30">
                            <FilmIcon className="text-muted-foreground" />
                          </div>
                        )}

                        <div>
                          <h3>{movie.title}</h3>
                          <p className="text-muted-foreground">
                            {movie.release_date && getYear(movie.release_date)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href={{
                      pathname: '/search',
                      query: { q: search },
                    }}
                    className=""
                    onClick={() => setSearch('')}
                  >
                    <p className="w-full p-2 hover:bg-muted-foreground/10">
                      Ver todos los resultados para &quot;{search}&quot;
                    </p>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        <nav className="flex items-center gap-2">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
