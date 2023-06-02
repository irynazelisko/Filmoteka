import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MovieCard from '../components/MovieCard';

test('renders movie title', () => {
  const movie = {
    Title: 'Test Movie',
    Poster: 'https://example.com/poster.jpg',
    Year: '2021',
    Type: 'movie',
    Actors: 'John Doe, Jane Doe',
    Plot: 'This is a test movie.',
    imdbRating: '7.5',
    Genre: 'Action, Drama',
  };

  const { getByText } = render(<MovieCard movie={movie} />);
  const titleElement = getByText('Test Movie');

  expect(titleElement).toBeInTheDocument();
});

test('calls addToFavorites when favorite button is clicked', () => {
  const movie = {
    Title: 'Test Movie',
    Poster: 'https://example.com/poster.jpg',
    Year: '2021',
    Type: 'movie',
    Actors: 'John Doe, Jane Doe',
    Plot: 'This is a test movie.',
    imdbRating: '7.5',
    Genre: 'Action, Drama',
  };

  const addToFavoritesMock = jest.fn();

  const { getByTestId } = render(
    <MovieCard movie={movie} addToFavorites={addToFavoritesMock} />
  );

  const favoriteButton = getByTestId('favorite-button');
  fireEvent.click(favoriteButton);

  expect(addToFavoritesMock).toHaveBeenCalledWith(movie);
});
test('calls removeFromFavorites when favorite button is clicked', () => {
  const movie = {
    Title: 'Test Movie',
    Poster: 'https://example.com/poster.jpg',
    Year: '2021',
    Type: 'movie',
    Actors: 'John Doe, Jane Doe',
    Plot: 'This is a test movie.',
    imdbRating: '7.5',
    Genre: 'Action, Drama',
  };

  const removeFromFavoritesMock = jest.fn();

  const { getByTestId } = render(
    <MovieCard
      movie={movie}
      removeFromFavorites={removeFromFavoritesMock}
      isFavorite={true}
    />
  );

  const favoriteButton = getByTestId('favorite-button');
  fireEvent.click(favoriteButton);

  expect(removeFromFavoritesMock).toHaveBeenCalledWith(movie);
});