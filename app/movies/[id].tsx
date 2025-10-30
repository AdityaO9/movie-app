import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">{value ?? 'N/A'}</Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  console.log('Movie ID from params:', id); // should now log a valid number

  // Only fetch if id exists
  const { data: movie, loading, error } = useFetch(
    id ? () => fetchMovieDetails(String(id)) : undefined
  );

  if (!id)
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-white">Movie ID not found</Text>
      </View>
    );

  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-white">Loading...</Text>
      </View>
    );

  if (error || !movie)
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-white">Failed to load movie details</Text>
      </View>
    );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://placehold.co/600x900/1a1a1a/ffffff.png',
          }}
          className="w-full h-[550px]"
          resizeMode="cover"
        />

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie.title ?? 'N/A'}</Text>

          <View className="flex-row items-center gap-x-2 mt-2">
            <Text className="text-light-200 text-sm">
              {movie.release_date?.split('-')[0] ?? 'N/A'}
            </Text>
            <Text className="text-light-200 text-sm">{movie.runtime ?? 'N/A'} mins</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">({movie.vote_count ?? 0} votes)</Text>
          </View>

          <MovieInfo label="Overview" value={movie.overview} />
          <MovieInfo
            label="Genres"
            value={movie.genres?.map((g) => g.name).join(' - ') ?? 'N/A'}
          />

          <View className="flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${((movie.budget ?? 0) / 1_000_000).toFixed(1)} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${((movie.revenue ?? 0) / 1_000_000).toFixed(1)} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={movie.production_companies?.map((c) => c.name).join(' - ') ?? 'N/A'}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
