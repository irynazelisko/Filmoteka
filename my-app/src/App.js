import React, { useState, useEffect } from 'react';
import MovieCard from './components/MovieBox';
import FavoriteMovies from './components/FavoriteMovies';
import './styles/styles.css';

const API_KEY = '8dd8db7e';
const BASE_URL = 'https://www.omdbapi.com/?';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const searchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      let apiUrl = `${BASE_URL}apikey=${API_KEY}&type=movie`;
      if (searchTerm) {
        apiUrl += `&s=${searchTerm}`;
      }
      if (selectedYear) {
        apiUrl += `&y=${selectedYear}`;
      }
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.Response === 'True') {
        const movies = data.Search;
        const movieDetailsPromises = movies.map(async (movie) => {
          const detailsResponse = await fetch(`${BASE_URL}apikey=${API_KEY}&i=${movie.imdbID}`);
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
  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}apikey=${API_KEY}&s=matrix`);
        const data = await response.json();

        if (data.Response === 'True') {
          const movies = data.Search;
          const movieDetailsPromises = movies.map(async (movie) => {
            const detailsResponse = await fetch(`${BASE_URL}apikey=${API_KEY}&i=${movie.imdbID}`);
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

    fetchPopularMovies();
  }, []);



  useEffect(() => {
    searchMovies();
  }, [searchTerm, selectedYear]);


  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    searchMovies();
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    searchMovies();
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
  const handleLogoClick = () => {
    window.location.reload();
  };
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchMovies();
    }
  };
  

  return (
    <div>
      <header>
        <h1 className="header-title" onClick={handleLogoClick}>Filmoteka </h1>
        <button className="about-button" onClick={openModal}>
          About 
        </button>
      </header>
      <div className="app">
        <div className="search">
          <input
            placeholder="Search Movie"
            value={searchTerm}
            onChange={handleSearchTermChange}
            onKeyDown={handleSearchKeyPress}
          />
          <button className="button" onClick={searchMovies}>
            Search
          </button>
        </div>

        <div className="filters">
          <select  value={selectedYear} onChange={handleYearChange}>
            <option value="">All Years</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
          </select>
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
        <div className="container">
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
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default App;