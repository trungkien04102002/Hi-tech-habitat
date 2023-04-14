import React from 'react';
import {View, Image, Pressable, ImageBackground} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import bgTab from '../img/bg-bottomtab.png'

import home from '../img/home.png'
import statistic from '../img/static.png'
import user from '../img/user.png'
import setting from '../img/setting.png'

const Footer = () => {
    const navigation = useNavigation()

    return (
        <View className='absolute bottom-0 left-0 right-0 rounded-t-xl' >
            <ImageBackground 
                source={bgTab} 
                resizeMode="cover" 
                className='flex flex-row rounded-t-xl items-center justify-around py-4 border-2 border-gray-500 overflow-hidden	'
            >
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <Image source={home}></Image>  
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Profile')}>
                    <Image source={user}></Image>  
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Statistic')}>
                    <Image source={statistic}></Image>  
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Setting')}>
                    <Image source={setting}></Image>  
                </Pressable>  
            </ImageBackground>
        </View>
    );
}

export default Footer;
