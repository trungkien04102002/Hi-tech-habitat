import React from 'react';
import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import BackGround from '../components/background';
import Footer from '../components/footer';
import Header from '../components/header';

import light from '../img/light.png';
import temperature from '../img/temperature.png';

import styles from '../style'
const Statistic = () => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('1 month');
  const [items, setItems] = useState([
    {label: '1 Month', value: '1 month'},
    {label: '6 Months', value: '6 months'},
    {label: '1 year', value: '1 year'},
  ]);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState('living room');
  const [items1, setItems1] = useState([
    {label: 'Living room', value: 'living room'},
    {label: 'Bed room', value: 'bed room'},
    {label: 'Studio', value: 'studio'},
  ]);

    return (
      <BackGround>
        <View className="flex h-screen">
 
          <View className="h-full w-full pt-12 px-2 items-center">
              <Header  id={2} />
              {/* Selection */}
              <View className="flex flex-row gap-x-10 px-2 pt-6 z-10">
                <View className="w-2/5">
                  <DropDownPicker
                    open={open1}
                    value={value1}
                    items={items1}
                    setOpen={setOpen1}
                    setValue={setValue1}
                    setItems={setItems1}
                    className="rounded-3xl border border-blue-500"
                  />
                </View>

                <View className="w-2/5">
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    className="rounded-3xl border border-blue-500"
                  />
                </View>

              </View>

              <Image source={temperature} className="w-full my-4"></Image>
              <Image source={light} className="w-full my-4"></Image>

              <Pressable 
                  style={styles.shadow} 
                  className="bg-[#4682B4] rounded-2xl items-center px-8 py-4 mt-6">
                  <Text className="text-xl font-bold text-white">Generate report</Text>
              </Pressable>
          </View>
        
          {/* <Footer/>  */}

        </View>

      </BackGround>
    );
}

export default Statistic;
