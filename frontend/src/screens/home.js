import React, { useState, useEffect } from 'react';
import {View, Text, Image, ScrollView, Pressable, ImageBackground, Animated} from 'react-native';
import { StyledComponent } from "nativewind";
import Swiper from 'react-native-swiper';

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

import styles from '../style'

const Rooms = [
    {
        name: 'Living room',
        img: livingRoom,
        numOfDevices: 4,
        temperature: 20,
    },
    {
        name: 'Kitchen',
        img: kitchen,
        numOfDevices: 24,
        temperature: 20
    },
    {
        name: 'Bed room',
        img: bedRoom,
        numOfDevices: 1,
        temperature: 20
    },
    {
        name: 'Studio room',
        img: studioRoom,
        numOfDevices: 1,
        temperature: 20
    },
    {
        name: 'Studio room',
        img: studioRoom,
        numOfDevices: 1,
        temperature: 20
    },
    {
        name: 'Studio room',
        img: studioRoom,
        numOfDevices: 1,
        temperature: 20
    },
    {
        name: 'Studio room',
        img: studioRoom,
        numOfDevices: 1,
        temperature: 20
    }
]

const Home = ({ navigation }) => {
    const [position] = useState(new Animated.Value(-10));
    const [scale] = useState(new Animated.Value(0.9));
    const [visible, setVisible] = useState(true);

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
        ).start(() => setVisible(!visible));
    }, [visible]); 

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
        ).start(() => setVisible(!visible));
    }, [visible]); 

    return (
        <BackGround>
        
            <View className="flex flex-col h-screen ">
            
                <StyledComponent component={View} className="items-center h-full w-full pt-12 px-2">
                    <Header id={0} />

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
                                        {visible && <Image className='scale-[0.8]' source={energy}></Image>}
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
                                        {visible && <Image className='scale-[0.8]' source={temperatureIcon}></Image>}
                                    </Animated.View> 
                                </ImageBackground>    
                            </View>
                        </Swiper>
                    </View>

                    <View className="flex flex-row justify-between px-4 w-full pt-8">
                        <Text className="flex text-[#414141] font-medium opacity-80 text-base">All rooms ({Rooms.length})</Text>
                        <View className="flex flex-row gap-x-2 items-center">
                            <Text className="flex text-[#414141] font-medium opacity-80 text-base">Add room</Text>
                            <StyledComponent component={Image} className="object-cover opacity-90" 
                                source={require('../img/Add_ring.png')}></StyledComponent>
                        </View>
                        
                    </View>
                    <ScrollView className="h-full mb-6">
                        <View className='flex flex-wrap flex-row grid-cols-2 gap-4 items-center mx-auto mt-2'>
                            {Rooms.map((item, index) => ( 
                                <Pressable 
                                    className='border border-2 border-[#12BEF6] rounded-xl py-4 px-5 bg-white w-[45%]' 
                                    key={index} 
                                    style={styles.shadow}
                                    onPress={() => navigation.push('Room', {id: index})}
                                >
                                    <Image source={item.img}></Image>
                                    <Text className='text-[#3D3D3D] font-bold text-lg py-2'>{item.name}</Text>
                                    <Text className='text-[#7D7D7D] pb-2'>{item.numOfDevices} devices</Text>
                                    <Text className='text-[#7D7D7D] pb-8'>Temperature: {item.temperature} °C</Text>
                                </Pressable>
                            ))}
                        </View> 
                    </ScrollView>
            
                </StyledComponent>

                {/* <Footer/> */}

            </View>
          


        </BackGround>
    );
}

export default Home;
