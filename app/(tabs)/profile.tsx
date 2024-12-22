import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Configuration from "../../components/Configuration";
import { account, getConfigurations } from "../lib/appwrite";
import { images, icons } from "../../constants";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Array<any>>([]);
  const [authStore, setAuthStore] = useState<any | null>(null);
  const [itemData, setItemData] = useState<any>();

  let configurationTotal = 0;

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const auth = await account.get();
        setAuthStore(auth);
      } catch (error) {
        console.log("Error fetching account:", error);
      }
    };
    fetchAuth();
    if (authStore) {
      setData((prevData) =>
        prevData.filter((item) => item.cpu.userId === authStore.$id)
      );
    }
  }, [authStore]);

  const fetchData = async () => {
    try {
      const result = await getConfigurations();
      if (result) {
        const parsedData = result.map((item) => {
          const parsed = JSON.parse(item.cpu);
          return { ...item, cpu: { ...parsed } };
        });
        setData(parsedData);
      }
    } catch (error) {
      console.log("Error fetching configurations:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleToggle = (item: any) => {
    setItemData(item);
    setIsOpen(!isOpen);
  };

  const handleToggleExit = () => {
    setIsOpen(false);
    setItemData(null);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (nativeEvent.contentOffset.y <= 0) {
            fetchData();
            console.log("Scrolled up! Fetching data...");
          }
        }}
        scrollEventThrottle={16}
      >
        <View className="flex items-center min-h-[83vh] mx-12 my-9 relative">
          <Link href="/sing-in" className="absolute right-0 -top-4">
            <Image source={icons.logout} resizeMode="contain" className="w-6" />
          </Link>
          <View className="flex items-center">
            <Image source={images.User} resizeMode="contain" />
            <Text className="text-2xl font-pregular text-white mt-7 text-center">
              {authStore?.name || "Loading..."}
            </Text>
          </View>
          <View>
            <View className="flex items-center">
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
            ListEmptyComponent={
              <Text className="text-lg mt-5 font-pregular text-white text-center">
                You don't have any configurations
              </Text>
            }
          />
        </View>
      </ScrollView>
      {isOpen && itemData && (
        <View className="w-full">
          <ScrollView className="max-h-40">
            <View className="items-center px-4 flex flex-row justify-between w-full bg-black-100 min-h-16">
              <FlatList
                data={itemData.cpu.configurations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View className="w-full flex flex-row justify-between items-center h-12">
                    <Text className="text-white text-lg ">{item.name}</Text>
                    <Text className="text-secondary ml-12 text-2xl">
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
                {itemData.cpu.totalPrice} тенге
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
