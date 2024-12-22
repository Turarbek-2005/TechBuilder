import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { images } from "../../constants";
import { icons } from "../../constants";

import SearchInput from "../../components/SearchInput";
import ComponentsPc from "../../components/ComponentsPc";
import {
  account,
  addConfigurationToBase,
  getConfigurations,
} from "../lib/appwrite";
const Home = () => {
  const [data, setData] = useState<any>(null);
  const loadData = () => {
    const jsonData = require("../../configuration.json");
    setData(jsonData);
  };

  useEffect(() => {
    loadData();
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [sendData, setSendData] = useState<Array<any>>([]);

  // Функция для добавления цены к общей сумме
  const handleAddPrice = (item: any) => {
    setIsOpen(true);
    setTotalPrice((prevPrice) => prevPrice + item.price);
    setSendData((prevData) => [...prevData, item]);
    console.log(sendData);
  };

  const handleClearPrice = () => {
    setIsOpen(false);
    setTotalPrice(0);
    setSendData([]);
  };

  const addConfiguration = async () => {
    const user = await account.get();
    try {
      if (sendData.length) {
        const sendDataFormatted = {
          configurations: sendData,
          userId: user.$id,
          totalPrice: totalPrice,
        };
        const result = await addConfigurationToBase(sendDataFormatted);
        console.log("Данные успешно сохранены:", result);
      }
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    } finally {
      setIsOpen(false);
      setTotalPrice(0);
      setSendData([]);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="flex px-4 pb-8 space-y-6 relative">
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

            <SearchInput
              onToggle={(item: any) => handleAddPrice(item)}
              initialQuery={undefined}
            />

            <ComponentsPc
              onToggle={(item: any) => handleAddPrice(item)}
              data={data?.components.CPU}
              title="Процессор"
              imageSource={icons.iconCpu}
            />
            <ComponentsPc
              onToggle={(item: any) => handleAddPrice(item)}
              data={data?.components.cooling}
              title="Охлаждение"
              imageSource={icons.Cooling}
            />
            <ComponentsPc
              onToggle={(item: any) => handleAddPrice(item)}
              data={data?.components.motherboard}
              title="Материнская плата"
              imageSource={icons.Motherboard}
            />
            <ComponentsPc
              onToggle={(item: any) => handleAddPrice(item)}
              data={data?.components.RAM}
              title="Оперативная память"
              imageSource={icons.RAM}
            />
            <ComponentsPc
              onToggle={(item: any) => handleAddPrice(item)}
              data={data?.components.GPU}
              title="Видеокарта"
              imageSource={icons.VideoCard}
            />
            <ComponentsPc
              onToggle={(item: any) => handleAddPrice(item)}
              data={data?.components.hardDisk}
              title="Жёсткий диск"
              imageSource={icons.HardDrive}
            />
            <ComponentsPc
              onToggle={(item: any) => handleAddPrice(item)}
              data={data?.components.SSD}
              title="SSD"
              imageSource={icons.SSD}
            />
            <ComponentsPc
              onToggle={(item: any) => handleAddPrice(item)}
              data={data?.components.fans}
              title="Вентиляторы"
              imageSource={icons.Fans}
            />
            <ComponentsPc
              onToggle={(item: any) => handleAddPrice(item)}
              data={data?.components.frame}
              title="Корпус"
              imageSource={icons.Frame}
            />
            <ComponentsPc
              onToggle={(item: any) => handleAddPrice(item)}
              data={data?.components.powerUnit}
              title="Блок питания"
              imageSource={icons.PowerUnit}
            />
            <ComponentsPc
              onToggle={(item: any) => handleAddPrice(item)}
              data={data?.components.OS}
              title="Операционная система"
              imageSource={icons.Os}
            />
            <ComponentsPc
              onToggle={(item: any) => handleAddPrice(item)}
              data={data?.components.mouse}
              title="Мышь"
              imageSource={icons.Mouse}
            />
            <ComponentsPc
              onToggle={(item: any) => handleAddPrice(item)}
              data={data?.components.keyboard}
              title="Клавиатура"
              imageSource={icons.Keyboard}
            />
            <ComponentsPc
              onToggle={(item: any) => handleAddPrice(item)}
              data={data?.components.monitor}
              title="Монитор"
              imageSource={icons.Monitor}
            />
          </View>
        </View>
      </ScrollView>
      {isOpen && (
        <View className="w-full">
          <ScrollView className="max-h-40">
            <View className="items-center px-4 flex flex-row justify-between  w-full bg-black-100 min-h-16 ">
              <FlatList
                data={sendData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View className="w-full flex flex-row justify-between items-center h-12">
                    <Text className="text-white text-lg ">{item.name}</Text>
                    <Text className="text-secondary ml-12 text-2xl ">
                      {item.price} тенге{" "}
                    </Text>
                  </View>
                )}
              />
            </View>
          </ScrollView>
          <View className=" items-center px-4 flex flex-row justify-between  w-full bg-black-200 h-20 ">
            <View className="text-center  ">
              <Text className="text-secondary  text-2xl ">
                {totalPrice} тенге{" "}
              </Text>
            </View>

            <View className="flex flex-row gap-4">
              <TouchableOpacity
                className="w-32 h-14 bg-red-500 flex items-center justify-center rounded-lg"
                onPress={handleClearPrice}
              >
                <Text className="text-white">Очистить</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={addConfiguration}
                className="w-32 h-14 bg-secondary flex items-center justify-center rounded-lg"
              >
                <Text className="text-center text-white">Сохранить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
