import {View, Text, Image, ScrollView, Modal, Pressable, TextInput, ImageBackground, TouchableOpacity} from 'react-native';
import { StyledComponent } from "nativewind";
import React, { useState,useEffect } from 'react';
import { BlurView } from 'expo-blur';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import BackGround from '../components/background';

import temperatureImg from '../img/temper.png'
import intensityImg from '../img/inten.png'
import bluePlus from '../img/Add_square.png'

import fanIcon from '../img/fanIcon.png'
import rightArrow from '../img/rightArrow.png'
import bgAddDevice from '../img/Rectangle.png'
import addsuccess from '../img/Done_ring_round.png'
import closeModal from '../img/close_ring.png'
import gamepad from '../img/Gamepad.png'

import styles from '../style'
import { getRoomDetail, deleteRoom } from '../api/roomApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Room = ({ route }) => {
  const [name, setName] = useState('')
  const [Rooms, setRooms] = useState({
    room: {name: ''},
    roomDevices: [],
    roomSensors: [],
  })
  const { id } = route.params
  const navigation = useNavigation()

  useEffect (() => {
    (async () => {
      setName(await AsyncStorage.getItem('name'))
      const token = await AsyncStorage.getItem('user')
      const res = await getRoomDetail(token, id)
      setRooms(res)
      console.log(res)
    })()
  }, [])

  const deleteRoomHandle = async (id) => {
    const token = await AsyncStorage.getItem('user')
    const res = await deleteRoom(token, id)
    console.log(token, res)
    navigation.navigate('Home')
  } 

  const [modalVisible, setModalVisible] = useState(false);

  const renderRightButtons = () => {
    return (
      <View className='flex flex-row rounded-r-lg bg-[#12BEF6]'>
        <TouchableOpacity>
          <Image className="object-cover scale-[0.8]" source={require('../img/infoIcon.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image className="object-cover scale-[0.8]" source={require('../img/trashIcon.png')}></Image>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <BackGround>
      <View className="flex flex-col h-screen ">

        {/* header */}
        <StyledComponent component={View} className="h-full w-full pt-12 px-2 items-center">
          <StyledComponent component={View} className="flex flex-row justify-between w-full px-3 items-center">
              <Pressable onPress={() => navigation.pop()}>
                  <StyledComponent component={Image} className="object-cover scale-[1.4]" 
                      source={require('../img/back_3.png')}>
                  </StyledComponent>
              </Pressable>

              <Pressable onPress={() => navigation.navigate('Profile')}>
              <View className="flex flex-row gap-x-5 items-center">
                  <StyledComponent component={Image} className="object-cover" 
                      source={require('../img/profile.png')}>
                  </StyledComponent>
                  <StyledComponent component={View} className="flex flex-col">
                      <Text className="font-black text-xl">Hi {name}</Text>
                      <Text className="font-semibold text-[#838A8F]">Monday, 20 Jan</Text>
                  </StyledComponent>
              </View>
              </Pressable>
              
              <Pressable onPress={() => deleteRoomHandle(id)}>
                  <Image className="object-cover scale-[1.3]" source={require('../img/Trash.png')}></Image>
              </Pressable>

          </StyledComponent>
          {/* header */}

          <View className='bg-[#E0F2F9] w-[95%] rounded-2xl mx-auto my-8' style={styles.shadow}>

            <View className='bg-[#191970] px-2 rounded-2xl py-4 opacity-90' style={styles.shadow}>
              <View className='flex flex-row items-center px-4'>
                <Text className='text-white font-black text-xl tracking-wider pr-2 py-2'>{Rooms.room.name}</Text>
              </View>

              <View className='flex flex-row justify-between items-center px-4'> 
                <Text className='text-white tracking-wider text-base font-semibold'>{Rooms.roomDevices.length} devices</Text>
                <Text className='text-white tracking-wider text-base font-semibold'>{Rooms.roomSensors.length} sensors</Text>
              </View>

              <View className='flex flex-row justify-around pt-6'>

                <View className='flex flex-col w-[48%]' style={styles.shadow}>
                  <View className='flex flex-row bg-[#68C9E9] rounded-t-xl justify-center py-4'>
                    <Text className='text-white font-bold text-sm tracking-wider'>Temperature</Text>
                    <Image source={temperatureImg}></Image>
                  </View>
                  <View className='bg-white rounded-b-xl items-center my-auto py-4'>
                    <Text className='text-[#414141] text-xl font-medium'>{20} °C</Text>
                  </View>
                </View>

                <View className='flex flex-col w-[48%]' style={styles.shadow}>
                  <View className='flex flex-row bg-[#3A9DBD] rounded-t-xl justify-center py-4'>
                    <Text className='text-white font-bold text-sm tracking-wider pr-1'>Light Intensity</Text>
                    <Image source={intensityImg}></Image>
                  </View>
                  <View className='bg-white rounded-b-xl items-center my-auto py-4'>
                    <Text className='text-[#414141] text-xl font-medium'>{5} cd</Text>
                  </View>
                </View>

              </View>
            </View>

            <Pressable 
                onPress={() => setModalVisible(true)} 
                className='flex flex-row items-center justify-center py-3'
              >
                <Image source={bluePlus}></Image>
                <Text className='text-[#04C1FE] font-semibold text-base tracking-wider'>Add new device</Text>
            </Pressable>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              
              <View className='justify-center my-auto mx-auto w-[90%] border border-black-2 rounded-xl'>
                <ImageBackground 
                  source={bgAddDevice} 
                  imageStyle={{ borderRadius: 12 }}
                >
                  <View className='flex flex-row px-10 py-5 gap-x-3 items-center'>
                    <Image source={gamepad} className='scale-[1.2]'></Image>
                    <Text className='text-[#414141] font-medium opacity-80 text-xl tracking-wider'>
                      New device
                    </Text>
                  </View>
                  <View className='flex items-center gap-y-4'>  
                    <TextInput 
                      className="py-2.5 rounded-xl border w-[80%] px-4 bg-white border-white" 
                      placeholder="Enter device name" 
                      style={styles.shadow} 
                    />
                    <TextInput 
                      className="py-2.5 rounded-xl border w-[80%] px-4 bg-white border-white mb-4" 
                      placeholder="Choose Type Of Device" 
                      style={styles.shadow} 
                    />
                  </View>
                  
                  <View className='flex flex-row bg-[#e6e6e6] rounded-xl mt-4'>
                    <Pressable className='w-1/2 items-center scale-125 py-3'>
                      <Image source={addsuccess}></Image>
                    </Pressable>

                    <Pressable 
                      onPress={() => setModalVisible(!modalVisible)}
                      className='w-1/2 items-center scale-125 py-3'
                    >
                      <Image source={closeModal}></Image>
                    </Pressable>
                  </View>
                </ImageBackground>
              </View>
            </Modal>

          </View>

          <View className='h-[45%] w-full'>
            <Text className="text-[#414141] font-medium opacity-80 text-base px-6 pb-4">All devices & sensors ({Rooms.roomDevices.length + Rooms.roomSensors.length})</Text>
            
            <ScrollView>
              <View className='flex items-center gap-4 mb-6 mx-4'>
                {Rooms.roomDevices.concat(Rooms.roomSensors).map((item, index) => (
                  <View 
                    className='w-full border border-[#12BEF6] border-2 rounded-xl bg-white'
                    key={index}
                    style={styles.shadow}
                  >
                    <GestureHandlerRootView>
                      <Swipeable renderRightActions={renderRightButtons}>
                        <View className='flex flex-row justify-between items-center px-6 py-2'>
                          <View className='flex flex-row items-center'>
                            <Image source={fanIcon}></Image>
                            <Text className='text-[#414141] font-medium opacity-80 text-base tracking-wider px-2'>{item}</Text>
                          </View>

                          <Image className='rotate-180' source={rightArrow}></Image>
                        </View>
                      </Swipeable>
                    </GestureHandlerRootView>
                  </View>

                ))}
              </View>
            </ScrollView>

          </View>
        </StyledComponent>

        {/* <Footer/> */}

      </View>

      {modalVisible && 
        <BlurView
          tint="light"
          intensity={100}
          className='absolute w-full h-full'
        />
      }

    </BackGround>
  )
}

export default Room