import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';
import BackGround from '../components/background';
import Footer from '../components/footer';
import Header from '../components/header';
import { LineChart } from 'react-native-chart-kit';

import light from '../img/light.png';
import temperature from '../img/temperature.png';

import styles from '../style'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getRoom } from '../api/roomApi';
import { getStatistic } from '../api/statistic';

const Statistic = () => {
  const [name, setName] = useState(null)
  
  const [openTime, setOpenTime] = useState(false);
  const [valueTime, setValueTime] = useState('day');
  const [itemsTime, setItemsTime] = useState([
    {label: 'day', value: 'day'},
    {label: 'month', value: 'month'}
  ]);
  
  const [openRoom, setOpenRoom] = useState(false);
  const [valueRoom, setValueRoom] = useState('');
  const [itemsRoom, setItemsRoom] = useState([]);

  const [dataStt, setDataStt] = useState([])

  useEffect(() => {
    (async () => {
      setName(await AsyncStorage.getItem('name'))
      const token = await AsyncStorage.getItem('user')
      const Rooms = await getRoom(token)
      setItemsRoom(
        Rooms.map((item) => ({
          label: item.name,
          value: item._id
        })  
      ))
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('user')
      const res = await getStatistic(token, valueRoom, valueTime)
      if (res === undefined || !res.length)
        return
      if (res){
        setDataStt(
          res.map((item) => (
            {
              datasets: [
                {
                  data: item.records.map(x => x.value),
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }
              ],
              feed: item.feed
            }
          ))
        )
      }
    })()
  }, [valueTime, valueRoom])

  const chartConfig = {
    backgroundGradientFrom: '#9CF3FF',
    backgroundGradientTo: '#19BFF5',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    useShadowColorFromDataset: false
  };

    return (
      <BackGround>
        <View className="flex h-screen">
 
          <View className="h-full w-full pt-12 px-2 items-center">
              <Header  id={2} name={name} />
              {/* Selection */}
              <View className="flex flex-row gap-x-10 px-2 pt-6 z-10">
                <View className="w-2/5">
                  <DropDownPicker
                    open={openRoom}
                    value={valueRoom}
                    items={itemsRoom}
                    setOpen={setOpenRoom}
                    setValue={setValueRoom}
                    setItems={setItemsRoom}
                    className="rounded-3xl border border-blue-500"
                  />
                </View>

                <View className="w-2/5">
                  <DropDownPicker
                    open={openTime}
                    value={valueTime}
                    items={itemsTime}
                    setOpen={setOpenTime}
                    setValue={setValueTime}
                    setItems={setItemsTime}
                    className="rounded-3xl border border-blue-500"
                  />
                </View>

              </View>

              <ScrollView className="mt-4 gap-y-4">
              {
                dataStt.map((item, index) => (
                  <View key={index} className='flex justify-between'>
                    <LineChart
                      data={item}
                      width={400}
                      height={220}
                      chartConfig={chartConfig}
                      bezier
                    />
                    <Text className='text-[#333] font-medium text-base pb-2'>{item.feed}</Text>
                  </View>
                ))
              }
              </ScrollView>

              {/* <Pressable 
                  style={styles.shadow} 
                  className="bg-[#4682B4] rounded-2xl items-center px-8 py-4 mt-6">
                  <Text className="text-xl font-bold text-white">Generate report</Text>
              </Pressable> */}
          </View>
        
          {/* <Footer/>  */}

        </View>

      </BackGround>
    );
}

export default Statistic;
