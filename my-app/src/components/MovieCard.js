import React, { useState } from 'react';

const MovieCard = ({ movie, addToFavorites, removeFromFavorites, isFavorite }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  return (
    <div className="movie">
      <div className="image-container">
        < img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
          alt={movie.Title}
          onClick={toggleDetails}
          className='movieBox-image'
        />
 </div>
        {isFavorite ? (
          <button className="favorite-button"
           onClick={() => removeFromFavorites(movie)}
           data-testid="favorite-button"
           >
            &#10084;&#65039;
          </button>
        ) : (
          <button className="favorite-button" 
          onClick={() => addToFavorites(movie)}
          data-testid="favorite-button"
          >
            &#128148;
          </button>
        )}
     
      <h3>{movie.Title}</h3>
      <p>
        {movie.Year} - <span className="type">{movie.Type}</span>
      </p>
      {showDetails && (
        <div className="modal-details">
          <div className="modal-content-details">
            <span className="close-details" onClick={toggleDetails}>&times;</span>
            <img className='modal-image' src={movie.Poster}></img>
            <h2>{movie.Title}</h2>
            <p> <span>Actors:</span> {movie.Actors}</p>
            <p> <span>Plot:</span>  {movie.Plot}</p>
            <p> <span>Rating:</span> {movie.imdbRating}</p>
            <p> <span>Genre:</span> {movie.Genre}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;