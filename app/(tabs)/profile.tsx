import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { images } from "../../constants";
import { icons } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Link } from "expo-router";
import Configuration from "../../components/Configuration";
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
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
              Username
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
          <Configuration onToggle={handleToggle} />
          <Configuration onToggle={handleToggle} />
        </View>
      </ScrollView>
      {isOpen && (
        <View className="flex absolute bottom-0 w-full bg-black-200 ">
          <View className="pt-1 px-7 pb-7">
            <View className="flex  flex-row justify-between pt-3">
              <Text className="text-white text-lg">1000</Text>
              <Text className="text-white mr-2.5 text-lg">1000</Text>
            </View>
            <View className="flex  flex-row justify-between pt-3">
              <Text className="text-white text-lg">1000</Text>
              <Text className="text-white mr-2.5 text-lg">1000</Text>
            </View>
          </View>

          <View className="flex flex-row justify-between h-20 bg-black-300 py-3.5 px-4">
            <View>
              <Text className="text-secondary text-2xl">5000 тенге </Text>
            </View>

            <TouchableOpacity
              className="bg-black-400 w-12 h-10  rounded-lg shadow-md flex items-center justify-center"
              onPress={handleToggle}
            >
              {/* Зелёная линия */}
              <View className="w-[17px] h-0.5 bg-secondary" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
