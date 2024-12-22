import { Image, Text, View, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { singIn } from "../lib/appwrite";

const SingIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmittig, setIsSubmittig] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setIsSubmittig(true);

    try {
      const result: any = await singIn(form.email, form.password);
      console.log(result);
      if (result) {
        console.log("Login successful:", result);
        router.replace("/home");
      } else {
        Alert.alert("email или пароль не верны");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmittig(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6 ">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[326px] h-[71px] -ml-14"
          />
          <Text className="text-3xl text-white text-psemibold mt-10">
            Sing in
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Log in"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmittig}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account
            </Text>
            <Link
              href="/sing-up"
              className="text-lg text-secondary font-psemibold"
            >
              Sing Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingIn;
