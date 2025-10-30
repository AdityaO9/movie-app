export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: '5bb7f3c36034f45d2b0b47f992fe9e8b',
  headers: {
    Accept: 'application/json', // no Authorization header
  },
};

export const fetchMovies = async ({ query }: { query?: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${TMDB_CONFIG.API_KEY}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${TMDB_CONFIG.API_KEY}`;

  const response = await fetch(endpoint, { headers: TMDB_CONFIG.headers });
  if (!response.ok) throw new Error('Failed to fetch movies');
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (movieId: string) => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
    { headers: TMDB_CONFIG.headers }
  );
  if (!response.ok) throw new Error('Failed to fetch movie details');
  const data = await response.json();
  return data;
};
