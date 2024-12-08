import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { images } from "../../constants";
import { icons } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import Configuration from "../../components/Configuration";
import { account, getConfigurations } from "../lib/appwrite";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Array<any> | any>([]);
  const [authStore, setAuthStore] = useState<any>();
  const [itemData, setItemData] = useState<any>();

  let configurationTotal = 0;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getConfigurations();
      const auth = await account.get();
      setAuthStore(auth);
      if (result) {
        const filteredData = result.map((item) => {
          const parsed = JSON.parse(item.cpu);
          return { ...item, cpu: { ...parsed } };
        });

        setData(
          filteredData.filter((item) => {
            return item.cpu.userId === authStore?.$id;
          })
        );

        console.log(filteredData);
      }
    };
    fetchData();
  }, [itemData]);

  const handleToggle = (item: any) => {
    setItemData(item);
    console.log(itemData);
    setIsOpen(!isOpen);
  };

  const handleToggleExit = () => {
    setIsOpen(!isOpen);
    setItemData(null);
  };
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className=" flex items-center h-full  mx-12 my-9 relative">
          <Link href="/sing-in" className="absolute right-0 -top-4">
            <Image source={icons.logout} resizeMode="contain" className="w-6" />
          </Link>
          <View className="flex items-center ">
            <Image source={images.User} resizeMode="contain" />
            <Text className="text-2xl font-pregular text-white mt-7 text-center">
              {authStore?.name}
            </Text>
          </View>
          <View>
            <View className="flex items-center ">
              <Image
                source={icons.saved}
                resizeMode="contain"
                className="w-8"
              />
              <Text className="text-lg font-pregular text-white text-center">
                Saved
              </Text>
            </View>
          </View>
          {/* {data.length ? ( */}
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Configuration
                onToggle={(item: any) => handleToggle(item)}
                total={++configurationTotal}
                data={item}
              />
            )}
          />

          {/* ) : (
            <Text className="text-lg mt-5 font-pregular text-white text-center">
              You don't have any configurations
            </Text>
          )} */}
        </View>
      </ScrollView>
      {isOpen && (
        <View className="bottom-0 w-full">
          <ScrollView className="max-h-40">
            <View className="items-center px-4 flex flex-row justify-between w-full bg-black-100 min-h-16">
              <FlatList
                // Парсим `itemData.cpu` и извлекаем `configurations`
                data={itemData.cpu.configurations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View className="w-full flex flex-row justify-between items-center h-12">
                    <Text className="text-white text-xl ">{item.name}</Text>
                    <Text className="text-secondary ml-12 text-2xl ">
                      {item.price} тенге{" "}
                    </Text>
                  </View>
                )}
              />
            </View>
          </ScrollView>
          <View className="items-center px-4 flex flex-row justify-between w-full bg-black-200 h-20">
            <View className="text-center">
              <Text className="text-secondary text-2xl">
                {itemData?.cpu.totalPrice} тенге{" "}
              </Text>
            </View>
            <TouchableOpacity
              className="bg-black-400 w-12 h-10 rounded-lg shadow-md flex items-center justify-center"
              onPress={handleToggleExit}
            >
              <View className="w-[17px] h-0.5 bg-secondary" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
