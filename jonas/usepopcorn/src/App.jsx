/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import StarRating from './components/StarRating';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { useMovies } from './hooks/useMovies';

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

export const OMDB_API_URI = 'http://www.omdbapi.com/?apikey=bfb73349';
const WATCHED_LS_KEY = 'watched';

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
  const searchInputRef = useRef(null);

  useEffect(() => {
    const addKeydownEvent = (ev) => {
      if (document.activeElement === searchInputRef.current) return;

      if (ev.code === 'Enter') {
        searchInputRef.current.focus();
        setQuery('');
      }
    };
    document.addEventListener('keydown', addKeydownEvent);

    return () => document.removeEventListener('keydown', addKeydownEvent);
  }, [setQuery]);

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchInputRef}
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

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const abortController = new AbortController();

    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const response = await fetch(`${OMDB_API_URI}&i=${selectedId}`, {
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error('Error fetching Movie Details');
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error, error.message);
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
        setError(undefined);
      }
    }

    getMovieDetails();
    return () => {
      abortController.abort();
    };
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => (document.title = 'Use Popcorn');
  }, [title]);

  useEffect(
    function () {
      const handleKeydown = function (ev) {
        if (ev.code === 'Escape') {
          onCloseMovie();
        }
      };

      document.addEventListener('keydown', handleKeydown);

      return function () {
        document.removeEventListener('keydown', handleKeydown);
      };
    },
    [onCloseMovie]
  );

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button
              className='btn-back'
              onClick={() => {
                onCloseMovie();
              }}
            >
              &larr;
            </button>

            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              {isWatched ? (
                <p>
                  You rated this movie <span>{watchedUserRating}</span>
                </p>
              ) : (
                <>
                  <StarRating
                    size={24}
                    maxRating={10}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
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
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatcheMovie({ movie, handleRemoveMovie }) {
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
      <button
        type='button'
        className='btn-delete'
        onClick={() => handleRemoveMovie(movie.imdbID)}
      >
        X
      </button>
    </li>
  );
}

function WatchedMoviesList({ watched, handleRemoveMovie }) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatcheMovie
          key={movie.imdbID}
          movie={movie}
          handleRemoveMovie={handleRemoveMovie}
        />
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

  const [selectedId, setSelectedId] = useState(null);
  // const [watched, setWatched] = useState([]);
  const { value: watched, setValue: setWatched } = useLocalStorageState(
    [],
    WATCHED_LS_KEY
  );

  const { movies, isLoading, error } = useMovies(
    query,
    handleCloseSelectedMovie
  );

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseSelectedMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleRemoveWatchedMovie(movieId) {
    setWatched((currWatchedMovies) =>
      currWatchedMovies.filter((watched) => watched.imdbID !== movieId)
    );
  }

  /*   useEffect(() => {
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
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
        setError(undefined);
      }
    };

    if (query.length <= 2) {
      setMovies([]);
      setError(undefined);
      return;
    }

    handleCloseSelectedMovie();
    fetchMovies();

    return () => {
      abortController.abort();
    };
  }, [query]);
 */

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
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
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                handleRemoveMovie={handleRemoveWatchedMovie}
              />
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
