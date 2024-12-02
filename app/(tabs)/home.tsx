import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { images } from "../../constants";
import { icons } from "../../constants";
import SearchInput from "../../components/SearchInput";
import ComponentsPc from "../../components/ComponentsPc";
import { account, addConfigurationToBase } from "../lib/appwrite";
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
      const sendDataFormatted = {
        configurations: sendData,
        userId: user.$id,
      };
      const result = await addConfigurationToBase(sendDataFormatted);
      console.log("Данные успешно сохранены:", result);
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    }
  };
  return (
    <SafeAreaView className="bg-primary">
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
        <View className=" py-3.5 px-4 flex flex-row justify-between absolute bottom-0 w-full bg-black-200 h-20 ">
          <View className="text-center h-full ">
            <Text className="text-secondary  text-2xl h-full ">
              {totalPrice} тенге{" "}
            </Text>
          </View>

          <TouchableOpacity
            className="w-24 h-10 bg-red-500 flex items-center justify-center rounded-lg"
            onPress={handleClearPrice}
          >
            <Text className="text-white">Очистить цену</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={addConfiguration}
            className="w-24 h-10 bg-secondary flex items-center justify-center rounded-lg"
          >
            <Text className="text-center">Сохранить</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
