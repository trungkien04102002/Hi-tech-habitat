import React from 'react';

import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import bell from '../img/bell_icon.png';
import heart from '../img/heart.png';
import sheld from '../img/sheld.png';
import account from '../img/account_icon.png';
import logout from '../img/logout.png';
import next from '../img/next.png';
import styles from '../style';
import BackGround from '../components/background';
import Footer from '../components/footer';
import Header from '../components/header';
const Setting = () => {
    const navigation = useNavigation()
    return (

        <BackGround>

        <View className="flex flex-col h-screen">
            <View className="pt-12 items-center px-2">
                <Header  id={3} />
                 
                {/* Setting option */}
                <View className='mb-8'>
                    <Text className="font-bold text-gray-700 px-5 text-lg mt-8">Settings</Text>

                    <View className="flex flex-col gap-y-6 bg-white rounded-xl mx-5 mt-4 pb-6 px-2" style={styles.shadow}>
                        {/* Options */}
                        <View className="flex flex-row justify-between items-center px-4">
                            <View className="flex flex-row gap-x-4 items-center">
                                <Image source={account} className="scale-[1.1]"></Image>
                                <Pressable className="flex flex-col" onPress={() => navigation.navigate('Profile')}>
                                    <Text className="text-lg font-semibold">My account</Text>
                                    <Text className="text-sm text-gray-400">Make changes to your account</Text>
                                </Pressable>
                            </View>
                            <Image source={next}></Image>
                        </View>
                        
                        <View className="flex flex-row justify-between items-center px-4">
                            <View className="flex flex-row gap-x-4 items-center">
                                <Image source={account} className="scale-[1.1]"></Image>
                                <Pressable className="flex flex-col">
                                    <Text className="text-lg font-semibold">Notification</Text>
                                    <Text className="text-sm text-gray-400">Manage your notifications</Text>
                                </Pressable>
                            </View>
                            <Image source={next}></Image>
                        </View>

                        <View className="flex flex-row justify-between items-center px-4">
                            <View className="flex flex-row gap-x-4 items-center">
                                <Image source={sheld} className="scale-[1.1]"></Image>
                                <Pressable className="flex flex-col">
                                    <Text className="text-lg font-semibold">Cache</Text>
                                    <Text className="text-sm text-gray-400">Delete your app cache</Text>
                                </Pressable>
                            </View>
                            <Image source={next}></Image>
                        </View>

                        <View className="flex flex-row justify-between items-center px-4">
                            <View className="flex flex-row gap-x-4 items-center">
                                <Image source={logout} className="scale-[1.1]"></Image>
                                <Pressable className="flex flex-col" onPress={() => navigation.navigate('SignIn')}>
                                    <Text className="text-lg font-semibold">Logout</Text>
                                    <Text className="text-sm text-gray-400">Further secure your account for safety</Text>
                                </Pressable>
                            </View>
                            <Image source={next}></Image>
                        </View>
                        
                    </View>
                </View>

                {/* More */}
                <View className='w-[94%]'>
                    <Text className="font-bold text-gray-700 text-lg">More</Text>

                    <View className="flex flex-col gap-y-6 bg-white rounded-xl mt-4 pb-6 px-2" style={styles.shadow}>
                        {/* Options */}
                        <View className="flex flex-row justify-between items-center px-4">
                            <View className="flex flex-row gap-x-4 items-center">
                                <Image source={bell} className="scale-[1.1]"></Image>
                                <Pressable className="flex flex-col">
                                    <Text className="text-lg font-semibold">Help & Support</Text>
                                </Pressable>
                            </View>
                            <Image source={next}></Image>
                        </View>

                        <View className="flex flex-row justify-between items-center px-4">
                            <View className="flex flex-row gap-x-4 items-center">
                                <Image source={heart} className="scale-[1.1]"></Image>
                                <Pressable className="flex flex-col">
                                    <Text className="text-lg font-semibold">About App</Text>
                                </Pressable>
                            </View>
                            <Image source={next}></Image>
                        </View>
                    </View>
                </View>

            </View>
        </View>

        {/* <Footer/> */}
        </BackGround>

    );
}

export default Setting;
