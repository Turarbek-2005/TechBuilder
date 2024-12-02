import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { images } from "../constants";

const Configuration = ({ onToggle }) => {
  return (
    <View className="flex items-center w-80 bg-black-100 h-conConfiguration rounded-2xl border-2 border-black-200 mt-5">
      <Image source={images.Configuration} resizeMode="contain" />

      <TouchableOpacity
        className="flex items-center py-1.5 w-64 border-2  border-black-200 rounded-md"
        onPress={onToggle} // Вызов переданного коллбэка
      >
        <Text className="text-white text-center">Посмотреть конфигурацию</Text>
      </TouchableOpacity>

      <View>
        <Text className="text-2xl font-pregular text-white mt-7 text-center">
          Configuration
        </Text>
      </View>
    </View>
  );
};

export default Configuration;
