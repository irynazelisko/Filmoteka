import React from 'react';

const FavoriteMovies = ({ movies, removeFromFavorites }) => {
    return (
        <div className="movie">
            <h2 className='fav-movie'>Favorite Movies</h2>
            {movies.length > 0 ? (
                <div className='favorites'>
                    {movies.map((movie) => (
                        <div key={movie.imdbID}>
                            <div className="image-container">
                                <img
                                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
                                    alt={movie.Title}
                                />
                                <div>
                                    <h3>{movie.Title}</h3>
                                    <p>{movie.Year}</p>
                                    <button className="favorite-button" onClick={() => removeFromFavorites(movie)}>
                                        &#10084;&#65039;
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No favorite movies yet.</p>
            )}
        </div>
    );
};

export default FavoriteMovies;