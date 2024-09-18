import { useEffect, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AxiosError } from 'axios';
import { FilmIcon, Loader2Icon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import { searchMovies } from '@/app/queries';
import useClickOutside from '@/lib/hooks/use-click-outside';
import {
  clearResults,
  setError,
  setLoading,
  setResults,
} from '@/lib/store/slices/search';
import { AppDispatch, RootState } from '@/lib/store/store';
import { getImageUrl, getYear } from '@/lib/utils';

interface SearchDropdownProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchDropdown({
  search,
  setSearch,
}: SearchDropdownProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { results, isLoading } = useSelector(
    (state: RootState) => state.search,
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setSearch(''));

  useEffect(() => {
    const getMovies = async () => {
      if (!search) return;

      dispatch(setLoading(true));

      try {
        const data = await searchMovies(search);

        dispatch(setResults(data.results));
      } catch (err) {
        if (err instanceof AxiosError) {
          dispatch(setError(`Error de API: ${err.message}`));
          toast.error(`Error de API: ${err.message}`);
        } else {
          dispatch(setError(`Error inesperado: ${String(err)}`));
          toast.error(`Error inesperado: ${String(err)}`);
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    getMovies();

    return () => {
      dispatch(clearResults());
    };
  }, [search, dispatch]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-10 z-10 h-fit w-full rounded border border-border/40 bg-muted"
    >
      {isLoading ? (
        <div className="flex h-10 items-center justify-center">
          <Loader2Icon className="mr-2 h-6 w-6 animate-spin" />
        </div>
      ) : (
        <>
          {results?.slice(0, 5).map((movie) => (
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
  );
}
