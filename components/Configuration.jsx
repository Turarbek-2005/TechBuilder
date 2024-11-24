import { View, Text, Image, ScrollView } from "react-native";
import { images } from "../constants";

const Configuration = () => {
  return (
    <View className="flex pt-2 pb-8 items-center w-80 bg-black-100  rounded-2xl border-2 border-black-200 mt-5">
      <Image source={images.Configuration} resizeMode="contain" />
      <View className="flex items-center py-1.5 w-64 border-2 border-black-200 rounded-md mt-5">
        <Text className="text-white text-center">Посмотреть конфигурацию</Text>
      </View>
      <View>
        <Text className="text-xl font-pregular text-white mt-5 text-center">
          Configuration
        </Text>
      </View>
    </View>
  );
};

export default Configuration;
