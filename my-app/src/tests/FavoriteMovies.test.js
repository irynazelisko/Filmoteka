import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavoriteMovies from '../components/FavoriteMovies';

test('renders favorites correctly', () => {
    const favorites = [
        { imdbID: '1', Title: 'Movie 1', Year: '2021', Poster: 'http://example.com/poster1.jpg' },
        { imdbID: '2', Title: 'Movie 2', Year: '2022', Poster: 'http://example.com/poster2.jpg' },
    ];
    const removeFromFavorites = jest.fn();

    const { getByTestId, getAllByTestId, getByAltText } = render(
        <FavoriteMovies movies={favorites} removeFromFavorites={removeFromFavorites} />
    );
    const favoriteMovies = favorites.map((movie) =>
        getByAltText(movie.Title)
    );
    expect(favoriteMovies.length).toBe(favoriteMovies.length);

    fireEvent.click(getByTestId(`remove-button-${favorites[0].imdbID}`));
    expect(removeFromFavorites).toHaveBeenCalledWith(favorites[0]);

});
