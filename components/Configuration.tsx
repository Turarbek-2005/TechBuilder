import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { images } from "../constants";

const Configuration = ({ onToggle, data, total }: any) => {
  return (
    <View className="flex items-center w-80 bg-black-100 h-conConfiguration rounded-2xl border-2 border-black-200 mt-5 pt-2 pb-7">
      <Image source={images.Configuration} resizeMode="contain" />

      <TouchableOpacity
        className="mt-3 flex items-center py-1 w-64 border-2  border-black-200 rounded-md"
        onPress={() => onToggle(data)}
      >
        <Text className="text-white text-lg text-center">
          Посмотреть конфигурацию
        </Text>
      </TouchableOpacity>

      <View>
        <Text className="text-xl font-pregular text-white mt-7 text-center">
          Configuration {total}
        </Text>
      </View>
    </View>
  );
};

export default Configuration;
