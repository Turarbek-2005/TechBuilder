import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { icons } from "../constants";

const ComponentsPc = ({ title, imageSource }) => {
  const [isOpen, setIsOpen] = useState(false); // Состояние для управления списком и поворотом

  const handleToggle = () => {
    setIsOpen(!isOpen); // Переключение состояния
  };

  const options = ["Intel Core i3", "Intel Core i5", "Intel Core i7"]; // Пример списка

  return (
    <View className="flex mt-6 w-full">

      <View className="flex flex-row justify-between ">
<View className="flex flex-row justify-between alagine-center text-center items-center mb-5">
  <Image 
  className="mr-4 ml-2"
   source={imageSource}
   />
   <Text className="text-white ">{title}</Text>
</View>
<View className="flex flex-row items-center">
  <Image 
   source={icons.line}
   />
</View>
</View>

      <TouchableOpacity
        className="flex flex-row justify-between items-center space-x-4 w-full h-16 px-2.5 bg-black-100  border-2 border-black-200 focus:border-secondary"
        onPress={handleToggle}
      >
        <Text className="text-white">{isOpen ? "Открыто" : "не выбрано"}</Text>
        <Image
          source={icons.downArrow}
          className={`transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </TouchableOpacity>

      {/* Список */}
      {isOpen && (
        <View className="border-2 border-black-200 ">
        <FlatList
        
          data={options}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="px-4 py-2  bg-black-100  ">
              <Text className="text-white">{item}</Text>
            </View>
          )}
        />
         </View>
      )}
    </View>
  );
};

export default ComponentsPc;

