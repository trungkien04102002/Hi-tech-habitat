import React from 'react';
import {View, Text, Image, ScrollView,Button,TouchableOpacity,TextInput, Pressable, ImageBackground} from 'react-native';
import BackGround from '../components/background';
import back_2 from '../img/back_2.png'
import profile from '../img/profile2.png'
import next from '../img/next.png'
import setting from '../img/settingRound.png'
import account from '../img/account.png'

import Footer from '../components/footer';

import styles from '../style'

const Profile = ({ navigation }) => {
    return (
        <BackGround>
            <View className='justify-between'>
                <View className="flex flex-col h-screen justify-between">
                    
                    <ImageBackground source={require('../img/bg_profile.png')} className='min-h-[50%] max-h-[50%] items-center z-30'>
                        {/* Info */}
                        <View className="flex flex-row items-center justify-between px-6 bg-white rounded-2xl mt-60 w-[90%]" style={styles.shadow}>
                            <View className="flex flex-col items-center">
                                <Image source={profile} className=""></Image>
                                <Text className="font-bold text-2xl">Taylor Swift</Text>
                            </View>

                            <View className="flex flex-col py-8 px-8">
                                <Text className="font-bold text-lg">Email</Text>
                                <Text className="font-semibold text-[#12BEF6] pb-2">123456@gmail.com</Text>

                                <Text className="font-bold text-lg">Contact</Text>
                                <Text className="font-semibold text-[#12BEF6] pb-2">0123456789</Text>

                                <Text className="font-bold text-lg">Account created</Text>
                                <Text className="font-semibold text-[#12BEF6] pb-2">4:15:30 Feb 23 2023</Text>
                            </View>
                        </View>
                    </ImageBackground>

                    <View className='mb-12'>
                        <View className="flex flex-col gap-y-6 bg-white rounded-xl mx-5 mt-4 pb-6 px-2" style={styles.shadow}>
                            <View className="flex flex-row justify-between items-center px-4">
                                <View className="flex flex-row gap-x-4 items-center">
                                    <Image source={setting} className="scale-[1.1]"></Image>
                                    <Text className="text-lg font-semibold">Setting</Text>
                                </View>
                                <Image source={next}></Image>
                            </View>
    
                            <View className="flex flex-row justify-between items-center px-4">
                                <View className="flex flex-row gap-x-4 items-center">
                                    <Image source={account} className="scale-[1.1]"></Image>
                                    <Text className="text-lg font-semibold">Account</Text>
                                </View>
                                <Image source={next}></Image>
                            </View>
                        </View>

                        {/* Logout */}

                        <Pressable 
                            style={styles.shadow} 
                            className="bg-[#4682B4] rounded-2xl w-fit items-center mx-32 py-2 mt-6"
                            onPress={() => navigation.navigate('SignIn')}
                        >
                            <Text className="text-xl font-bold text-white py-1">Log out</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* <Footer/> */}

        </BackGround>
    );
}

export default Profile;
