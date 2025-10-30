import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import MaskedView from '@react-native-masked-view/masked-view';
import { images } from '@/constants/images';

interface TrendingCardProps {
  movie: {
    movie_id: number | string; // TMDB ID
    title: string;
    poster_url?: string | null;
  };
  index: number;
}

const TrendingCard = ({ movie: { movie_id, title, poster_url }, index }: TrendingCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    // Navigate using router with actual movie ID
    router.push(`/movies/${movie_id}`);
  };

  return (
    <TouchableOpacity className="w-32 relative pl-5" onPress={handlePress}>
      <Image
        source={{ uri: poster_url }}
        className="w-32 h-48 rounded-lg"
        resizeMode="cover"
      />

      <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
        <MaskedView
          maskElement={
            <Text className="font-bold text-white text-6xl">{index + 1}</Text>
          }
        >
          <Image
            source={images.rankingGradient}
            className="size-14"
            resizeMode="cover"
          />
        </MaskedView>
      </View>

      <Text className="text-sm font-bold mt-2 text-light-200" numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TrendingCard;
