import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { images } from "../../constants";
import { icons } from "../../constants";
import SearchInput from "../../components/SearchInput";
import ComponentsPc from "../../components/ComponentsPc";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary ">
      <ScrollView>
        <View className="flex px-4 pb-8 space-y-6 ">
          <View className="w-full flex items-center h-full px-4 ">
            <View className=" absolute">
              <Image source={images.bgFon} resizeMode="contain" />
            </View>
            <View className=" ">
              <Image source={images.LogoMin} resizeMode="contain" />
            </View>

            <View className="items-center text-center mt-1">
              <Text className="text-2xl font-psemibold text-white ">
                Конфигуратор ПК
              </Text>
              <Text className="indent-5 font-pmedium text-center text-white my-7">
                Позволяет собрать компьютер, о котором вы мечтали. Изменить
                комплектацию представленных на сайте сборок, узнать цену онлайн,
                сравнить характеристики. Оформить заказ и получить готовый ПК с
                абсолютно бесплатной профессиональной сборкой. Продвинутый
                онлайн-сервис для модификации ПК
              </Text>
            </View>

            <SearchInput initialQuery={undefined} />

            <ComponentsPc title="Процессор" imageSource={icons.iconCpu} />
            <ComponentsPc title="Охлаждение" imageSource={icons.Cooling} />
            <ComponentsPc
              title="Материнская плата"
              imageSource={icons.Motherboard}
            />
            <ComponentsPc title="Оперативная память" imageSource={icons.RAM} />
            <ComponentsPc title="Видеокарта" imageSource={icons.VideoCard} />
            <ComponentsPc title="Жёсткий диск" imageSource={icons.HardDrive} />
            <ComponentsPc title="SSD" imageSource={icons.SSD} />
            <ComponentsPc title="Вентиляторы" imageSource={icons.Fans} />
            <ComponentsPc title="Корпус" imageSource={icons.Frame} />
            <ComponentsPc title="Блок питания" imageSource={icons.PowerUnit} />
            <ComponentsPc title="Операционная система" imageSource={icons.Os} />
            <ComponentsPc title="Мышь" imageSource={icons.Mouse} />
            <ComponentsPc title="Клавиатура" imageSource={icons.Keyboard} />
            <ComponentsPc title="Монитор" imageSource={icons.Monitor} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
