import { View, Text, Image, ScrollView } from "react-native";
import { images } from "../../constants";
import { icons } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Configuration from "../../components/Configuration";
import React from "react";
import { Link } from "expo-router";

const Profile = () => {
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
          <Configuration />
          <Configuration />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
