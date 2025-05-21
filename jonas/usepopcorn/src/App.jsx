/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

/***************************/
/***************************/
/***************************/
/* COMPONENTS */
/***************************/

function Logo() {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className='num-results'>
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

function Navbar({ children }) {
  return (
    <nav className='nav-bar'>
      <Logo />
      {children}
    </nav>
  );
}

function MovieDetails({ selectedId, onCloseMovie }) {
  return (
    <div className='details'>
      <button
        className='btn-back'
        onClick={() => {
          onCloseMovie();
        }}
      >
        &larr;
      </button>
      {selectedId}
    </div>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MoviesList({ movies, onSelectMovie }) {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatcheMovie({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatcheMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

function Main({ children }) {
  return <main className='main'>{children}</main>;
}

function Loader() {
  return <p className='loader'>Loading...</p>;
}

function ErrorMessage({ error }) {
  return <p className='error'>{error}</p>;
}

function App() {
  const [query, setQuery] = useState('');
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const [selectedId, setSelectedId] = useState(null);

  const OMDB_API_URI = 'http://www.omdbapi.com/?i=tt3896198&apikey=bfb73349';

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseSelectedMovie() {
    setSelectedId(null);
  }

  useEffect(() => {
    const abortController = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(undefined);
        const response = await fetch(`${OMDB_API_URI}&s=${query}`, {
          signal: abortController.signal,
        });
        if (!response.ok) throw new Error('Something went wrong');
        const jsonRes = await response.json();

        if (jsonRes.Response === 'False') {
          throw new Error('Movie not found');
        }

        setMovies(jsonRes.Search);
      } catch (error) {
        if (error.message === 'signal is aborted without reason') {
          setError(undefined);
        } else {
          console.log(typeof error, error, error.message);
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length <= 2) {
      setMovies([]);
      setError(undefined);
      return;
    }
    fetchMovies();

    return () => {
      abortController.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {error ? (
            <ErrorMessage error={error} />
          ) : isLoading ? (
            <Loader />
          ) : (
            <MoviesList movies={movies} />
          )} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage error={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseSelectedMovie}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;

/* 
Component Composition:
  - Build better layouts
  - Resolve Prop Drilling
  - Create reusable components

  Implicit:
    <Box>
      <MoviesList movies={movies} />
    </Box>

  function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className='box'>
        <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
          {isOpen ? '–' : '+'}
        </button>
        {isOpen && children}
      </div>
  );
}

  Explicit:
    <Box element={<MoviesList movies={movies} />} />
    <Box element={
        <>
          <Summary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      }
    />

    function Box({ element }) {
      const [isOpen, setIsOpen] = useState(true);
      return (
        <div className='box'>
          <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
            {isOpen ? '–' : '+'}
          </button>
          {isOpen && element}
        </div>
    );
}
*/
