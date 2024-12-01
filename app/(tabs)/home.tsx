import { Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { images } from "../../constants";
import { icons } from "../../constants";
import SearchInput from "../../components/SearchInput";
import ComponentsPc from "../../components/ComponentsPc";

const Home = () => {
  const [data, setData] = useState<any>(null);
  const loadData = () => {
    const jsonData = require("../../configuration.json");
    setData(jsonData);
  };

  useEffect(() => {
    loadData();
  }, []);
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

            <ComponentsPc
              data={data?.components.CPU}
              title="Процессор"
              imageSource={icons.iconCpu}
            />
            <ComponentsPc
              data={data?.components.cooling}
              title="Охлаждение"
              imageSource={icons.Cooling}
            />
            <ComponentsPc
              data={data?.components.motherboard}
              title="Материнская плата"
              imageSource={icons.Motherboard}
            />
            <ComponentsPc
              data={data?.components.RAM}
              title="Оперативная память"
              imageSource={icons.RAM}
            />
            <ComponentsPc
              data={data?.components.GPU}
              title="Видеокарта"
              imageSource={icons.VideoCard}
            />
            <ComponentsPc
              data={data?.components.hardDisk}
              title="Жёсткий диск"
              imageSource={icons.HardDrive}
            />
            <ComponentsPc
              data={data?.components.SSD}
              title="SSD"
              imageSource={icons.SSD}
            />
            <ComponentsPc
              data={data?.components.fans}
              title="Вентиляторы"
              imageSource={icons.Fans}
            />
            <ComponentsPc
              data={data?.components.frame}
              title="Корпус"
              imageSource={icons.Frame}
            />
            <ComponentsPc
              data={data?.components.powerUnit}
              title="Блок питания"
              imageSource={icons.PowerUnit}
            />
            <ComponentsPc
              data={data?.components.OS}
              title="Операционная система"
              imageSource={icons.Os}
            />
            <ComponentsPc
              data={data?.components.mouse}
              title="Мышь"
              imageSource={icons.Mouse}
            />
            <ComponentsPc
              data={data?.components.keyboard}
              title="Клавиатура"
              imageSource={icons.Keyboard}
            />
            <ComponentsPc
              data={data?.components.monitor}
              title="Монитор"
              imageSource={icons.Monitor}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
