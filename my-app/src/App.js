import React, { useState } from 'react';
import MovieCard from './components/MovieBox';
import FavoriteMovies from './components/FavoriteMovies';
import './App.css';


const API_URL = 'https://www.omdbapi.com/?apikey=8dd8db7e';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const searchMovies = async (title) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === "True") {
        const movies = data.Search;
        const movieDetailsPromises = movies.map(async (movie) => {
          const detailsResponse = await fetch(`${API_URL}&i=${movie.imdbID}`);
          const detailsData = await detailsResponse.json();
          return detailsData;
        });

        const moviesWithDetails = await Promise.all(movieDetailsPromises);

        setMovies(moviesWithDetails);
      } else {
        setMovies([]);
      }
    } catch (error) {
      setError('Error with fetching movies. Please try again later.');
    }
    setLoading(false);
  };

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, { ...movie, id: `${movie.imdbID}_${prevFavorites.length}` }]);
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favMovie) => favMovie.id !== movie.id)
    );
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <header>
        <h1 className="header-title">Filmoteka</h1>
        <button className="about-button" onClick={openModal}>
          About
        </button>
      </header>
      <div className="app">
        <div className="search">
          <input
            placeholder="Enter Movie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="button" onClick={() => searchMovies(searchTerm)}>
            Search
          </button>
        </div>
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="container">
            {movies?.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                isFavorite={favorites.some(
                  (favMovie) => favMovie.imdbID === movie.imdbID
                )}
              />
            ))}
          </div>
        )}
        <div>
          <FavoriteMovies
            movies={favorites}
            removeFromFavorites={removeFromFavorites}
          />
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Filmoteka: about app</h2>
              <p>
                The general idea of your "Filmoteka" application is to find and
                store movies, which allows you to conveniently organize your
                favorite movies and have access to them from one place.
              </p>
              <p>
                The application allows you to search for movies and save them in
                the list of favorites. With the interface, you can enter the name
                of the movie in the search field, and the application uses an API
                to retrieve search results from the movie database.
              </p>
              <button onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;