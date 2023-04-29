import React, { useState, useEffect, useLayoutEffect } from 'react';
import {View, Text, Image, ScrollView, Modal, Pressable, ImageBackground, Animated, TextInput} from 'react-native';
import { BlurView } from 'expo-blur';
import { StyledComponent } from "nativewind";
import Swiper from 'react-native-swiper';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

import Header from '../components/header';
import BackGround from '../components/background';
import bedRoom from '../img/bedRoom.png';
import livingRoom from '../img/livingRoom.png';
import kitchen from '../img/kitchen.png';
import studioRoom from '../img/studioRoom.png';
import energy from '../img/energy.png'
import energybg from '../img/energybg.png'
import temperatureIcon from '../img/temperatureIcon.png'
import temperaturebg from '../img/temperaturebg.png'
import bgAddDevice from '../img/Rectangle.png'
import gamepad from '../img/Gamepad.png'
import addsuccess from '../img/Done_ring_round.png'
import closeModal from '../img/close_ring.png'

import { getRoom, getRoomDetail, addRoom } from '../api/roomApi'
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../style'

let name = null

const Home = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    
    const [state,setState] = useState(true)
    const [loadRoom, setLoadRoom] = useState(true)

    const [formValue, setformValue] = useState({
        name:'',
        roomType:'' 
    });

    const handleChange = (event,name) => {
        setformValue({
            ...formValue,
            [name]: event.nativeEvent.text,
        });
    }

    useEffect(()=>{
        (async () => {
            const token = await AsyncStorage.getItem('user')
            const res = await addRoom(token, formValue); 
            
            if (res && res.message) {
              Toast.show({
                type: 'error',
                text1: 'Add new Room Failed',
                text2: res.message,
                visibilityTime: 2000,
              });
            }

            else if (res) {
                setModalVisible(!modalVisible)
                setLoadRoom(!loadRoom)
            }
        })()
    },[state]);

    useLayoutEffect(() => {
        if (isFocused) {
            setLoadRoom(!loadRoom)
        }
    }, [isFocused])

    const [Rooms,setRooms] = useState([])
    const [listDS, setListDS] = useState(null)
    useEffect (() => {
        (async () => {
            const token = await AsyncStorage.getItem('user')
            name = await AsyncStorage.getItem('name')
            // console.log(token)
            const res = await getRoom(token)
            setRooms(res)
            // console.log(res) 
            listDevicesSensors = {}
            for (item of res) {
                const roomDetail = await getRoomDetail(token, item._id)
                listDevicesSensors[item._id] = roomDetail.roomDevices.concat(roomDetail.roomSensors)
            }
            setListDS(listDevicesSensors)
        })()
    }, [loadRoom])

    function genImg(){
       const imgList = [bedRoom,kitchen,livingRoom,studioRoom]
       const num = Math.floor(Math.random() * 4)
       return imgList[num]
    }

    const [position] = useState(new Animated.Value(-10));
    const [scale] = useState(new Animated.Value(0.9));
    const [animatedvisible, setanimatedVisible] = useState(true);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(position, {
                    toValue: 10,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(position, {
                    toValue: -10,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ]) 
        ).start(() => setanimatedVisible(!animatedvisible));
    }, [animatedvisible]); 

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 0.9,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ]) 
        ).start(() => setanimatedVisible(!animatedvisible));
    }, [animatedvisible]); 

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <BackGround>
        
            <View className="flex flex-col h-screen ">
            
                <StyledComponent component={View} className="items-center h-full w-full pt-12 px-2">
                    <Header id={0} name={name} />
                    
                    {/* slider */}
                    <View className='rounded-2xl bg-[#D4E9EE] w-[92%] mt-6 h-[180]' style={styles.innerShadow}>
                        <Swiper>
                            <View>
                                <ImageBackground 
                                    source={energybg} 
                                    resizeMode="cover" 
                                    className='rounded-2xl flex flex-row justify-between items-center overflow-hidden h-full'
                                >
                                    <View className='flex gap-y-2 px-6'>
                                        <Text className='text-xl font-bold tracking-wider'>Energy Saving</Text>
                                        <Text className='text-[#09D241] text-3xl font-black tracking-wider'>+35%</Text>
                                        <Text className='text-[#959595] text-base font-bold tracking-wider'>23.5 kWh</Text>
                                    </View> 
                                    <Animated.View style={{ transform: [{ translateX: position }] }}>
                                        {animatedvisible && <Image className='scale-[0.8]' source={energy}></Image>}
                                    </Animated.View>
                                </ImageBackground>
                            </View>
                            <View>
                                <ImageBackground 
                                    source={temperaturebg} 
                                    resizeMode="cover" 
                                    className='rounded-2xl flex flex-row justify-between items-center overflow-hidden h-full'
                                >
                                    <View className='flex gap-y-2 px-6'>
                                        <Text className='text-xl font-bold tracking-wider'>Temperature</Text>
                                        <Text className='text-[#959595] text-3xl font-black tracking-wider'>~21°C</Text>
                                        <Text className='text-[#1FC8FF] text-base font-bold tracking-wider'>Cool</Text>
                                    </View>
                                    <Animated.View style={{ transform: [{ scale: scale }] }}>
                                        {animatedvisible && <Image className='scale-[0.8]' source={temperatureIcon}></Image>}
                                    </Animated.View> 
                                </ImageBackground>    
                            </View>
                        </Swiper>
                    </View>

                    <View className="flex flex-row justify-between px-4 w-full pt-8">
                        <Text className="flex text-[#414141] font-medium opacity-80 text-base">All rooms ({Rooms.length})</Text>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                            className="flex flex-row gap-x-2 items-center"
                        >
                            <Text className="flex text-[#414141] font-medium opacity-80 text-base">Add room</Text>
                            <StyledComponent component={Image} className="object-cover opacity-90" 
                                source={require('../img/Add_ring.png')}></StyledComponent>
                        </Pressable>
                        
                    </View>

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
                                New Room
                            </Text>
                            </View>
                            <View className='flex items-center gap-y-4'>  
                                <TextInput 
                                    onChange={event => handleChange(event,'name')}
                                    className="py-2.5 rounded-xl border w-[80%] px-4 bg-white border-white" 
                                    placeholder="Enter room name" 
                                    style={styles.shadow} 
                                />
                                <TextInput 
                                    onChange={event => handleChange(event,'roomType')}
                                    className="py-2.5 rounded-xl border w-[80%] px-4 bg-white border-white mb-4" 
                                    placeholder="Choose Type Of Room" 
                                    style={styles.shadow} 
                                />
                            </View>
                            
                            <View className='flex flex-row bg-[#e6e6e6] rounded-xl mt-4'>
                            <Pressable 
                                onPress={() => setState(!state)}
                                className='w-1/2 items-center scale-125 py-3'
                            >
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

                    {/* room */}
                    <ScrollView className="h-full mb-6">
                        <View className='flex flex-wrap flex-row grid-cols-2 gap-4 items-center mx-auto mt-2'>
                            {Rooms.map((item, index) => ( 
                                <Pressable 
                                    className='border border-2 border-[#12BEF6] rounded-xl py-4 px-5 bg-white w-[45%]' 
                                    key={index} 
                                    style={styles.shadow}
                                    onPress={() => navigation.push('Room', {id: item._id})}
                                >
                                    <Image source={genImg()}></Image>
                                    <Text className='text-[#3D3D3D] font-bold text-lg py-2'>{item.name}</Text>
                                    <Text className='text-[#7D7D7D] pb-2'>{(listDS && listDS[item._id]? listDS[item._id].length: 0) + ' devices'} </Text>
                                    <Text className='text-[#7D7D7D] pb-8'>Temperature: 20 °C</Text>
                                </Pressable>
                            ))}
                        </View> 
                    </ScrollView>
            
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
            <Toast toastRef={(toastRef) => Toast.setRef(toastRef)}/>
        </BackGround>
    );
}

export default Home;