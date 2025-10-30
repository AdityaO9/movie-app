import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { icons } from '@/constants/icons';

interface Movie {
  id: number | string;
  poster_path?: string | null;
  title?: string;
  vote_average?: number;
  release_date?: string;
}

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
  const router = useRouter();

  const handlePress = () => {
    // Navigate directly using the router
    router.push(`/movies/${id}`);
  };

  return (
    <TouchableOpacity className="w-[30%]" onPress={handlePress}>
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : 'https://placehold.co/600x900/1a1a1a/ffffff.png',
        }}
        className="w-full h-52 rounded-lg"
        resizeMode="cover"
      />

      <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
        {title ?? 'N/A'}
      </Text>

      <View className="flex-row items-center justify-start gap-x-1">
        <Image source={icons.star} className="size-4" />
        <Text className="text-xs text-white font-bold">
          {vote_average ? Math.round(vote_average / 2) : 'N/A'}
        </Text>
      </View>

      <Text className="text-xs text-light-300 font-medium mt-1">
        {release_date?.split('-')[0] ?? 'N/A'}
      </Text>
    </TouchableOpacity>
  );
};

export default MovieCard;
