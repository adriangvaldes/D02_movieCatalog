import { useEffect, useState, ReactNode, useContext } from 'react';
import { createContext } from 'react';
import { api } from '../services/api';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MoviesProviderProps {
  children: ReactNode;
}

interface handleClickButtonProps {
  id: number;
}

interface MoviesContextData {
  movies: MovieProps[];
  genres: GenreResponseProps[];
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
  handleClickButton: (id: number) => void;
}

export const MoviesContext = createContext<MoviesContextData>(
  {} as MoviesContextData
);
 
export function  MoviesProvider({ children }: MoviesProviderProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);
  

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
  
  return (
    <MoviesContext.Provider value={{ movies, genres, selectedGenre, selectedGenreId, handleClickButton}}>
      {children}
    </MoviesContext.Provider>
  )
}

export function useMovies() {
  const context = useContext(MoviesContext)

  return context;
}

