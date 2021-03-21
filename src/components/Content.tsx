import '../styles/content.scss';

import { MovieCard } from './MovieCard';


interface ContentProps {
  listOfMovies: {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }[];
  selectedGenre: string;
 }

export function Content({listOfMovies,  selectedGenre} : ContentProps) {

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {listOfMovies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
  // Complete aqui
}