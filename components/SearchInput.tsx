import { useEffect, useState } from "react";
import { router, usePathname } from "expo-router";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";

import { icons } from "../constants";
import React from "react";

const SearchInput = ({ onToggle, initialQuery }: any) => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<any>(null);

  const loadData = () => {
    const jsonData = require("../configuration.json");
    setData(jsonData);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Маппинг категорий для компонентов
  const componentCategories = {
    CPU: "CPU",
    cooling: "Cooling",
    motherboard: "Motherboard",
    RAM: "RAM",
    GPU: "GPU",
    hardDisk: "Hard Disk",
    SSD: "SSD",
    fans: "Fans",
    frame: "Frame",
    powerUnit: "Power Unit",
    wifi: "Wi-Fi",
    soundCard: "Sound Card",
    OS: "OS",
    mouse: "Mouse",
    keyboard: "Keyboard",
    monitor: "Monitor",
    headset: "Headset",
  };

  // Собираем все данные из различных компонентов
  const allData = Object.keys(componentCategories).reduce(
    (acc: any, key: any) => {
      const category = componentCategories[key];
      const items = data?.components[key] || [];
      const categoryItems = items.map((item: any) => ({
        ...item,
        category,
      }));
      return [...acc, ...categoryItems];
    },
    []
  );

  // Фильтрация данных на основе текста поиска
  const filteredData = allData.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className="w-full">
      <View className="flex flex-row items-center space-x-4 w-full h-16 px-2.5 bg-black-100  border-2 border-black-200 focus:border-secondary">
        <TextInput
          className="text-base mt-0.5 placeholder:text-white text-white flex-1 font-pregular"
          placeholder="ПОИСК ЭЛЕМЕНТА ПО НОМЕРУ"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </View>
      {searchText && (
        <ScrollView>
          <View className="flex flex-row items-center space-x-4 w-full max-h-32 px-2.5 bg-black-100  border-2 border-black-200 focus:border-secondary">
            <FlatList
              data={filteredData}
              className=""
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
        </ScrollView>
      )}
    </View>
  );
};

export default SearchInput;
