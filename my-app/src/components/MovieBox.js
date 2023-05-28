import React, { useState } from 'react';

const MovieCard = ({ movie, addToFavorites, removeFromFavorites, isFavorite }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  return (
    <div className="movie">
      <div className="image-container">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
          alt={movie.Title}
          onClick={toggleDetails}
          style={{ cursor: 'pointer' }}
        />
        {isFavorite ? (
          <button className="favorite-button" onClick={() => removeFromFavorites(movie)}>
            &#10084;&#65039;
          </button>
        ) : (
          <button className="favorite-button" onClick={() => addToFavorites(movie)}>
            &#128148;
          </button>
        )}
      </div>
      <h3>{movie.Title}</h3>
      <p>
        {movie.Year} - <span className="type">{movie.Type}</span>
      </p>
      {showDetails && (
        <div className="modal-details">
          <div className="modal-content-details">
            <span className="close-details" onClick={toggleDetails}>&times;</span>
            <img src={movie.Poster}></img>
            <h2>{movie.Title}</h2>
            <p>Actors: {movie.Actors}</p>
            <p>Plot: {movie.Plot}</p>
            <p>Rating: {movie.imdbRating}</p>
            <p>Genre: {movie.Genre}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;