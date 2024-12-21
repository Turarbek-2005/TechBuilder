import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { icons } from "../constants";

const ComponentsPc = ({ onToggle, title, imageSource, data }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View className="flex mt-6 w-full">
      <View className="flex flex-row justify-between ">
        <View className="flex flex-row justify-between alagine-center text-center items-center mb-5">
          <Image className="mr-4 ml-2" source={imageSource} />
          <Text className="text-white ">{title}</Text>
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

      {isOpen && (
        <View className="border-2 border-black-200 ">
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="px-4 py-2  bg-black-100"
                onPress={() => onToggle(item)}
              >
                <Text className="text-white">{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default ComponentsPc;
