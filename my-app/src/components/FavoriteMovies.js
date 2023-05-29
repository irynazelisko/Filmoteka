import React from 'react';

const FavoriteMovies = ({ movies, removeFromFavorites }) => {
    return (
        <div>
            <h2 className='fav-movie'>Favorite Movies</h2>
            <div className="favorite-movies-row">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.imdbID} >
                            <div className="movie">
                                <div className="image-container">
                                    <img
                                        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
                                        alt={movie.Title}
                                        className='movieBox-image'
                                    />
                                    <h3>{movie.Title}</h3>
                                    <p>{movie.Year}</p>
                                    <button className="favorite-button" onClick={() => removeFromFavorites(movie)}>
                                        &#10084;&#65039;
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))

                ) : (
                    <p>No favorite movies yet.</p>
                )}
            </div>

        </div>

    );
};

export default FavoriteMovies;