import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView,Button,TouchableOpacity,TextInput, Pressable, ImageBackground,Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackGround from '../components/background';
import profile from '../img/profile2.png'
import next from '../img/next.png'
import setting from '../img/settingRound.png'
import account from '../img/account.png'
import bgAddDevice from '../img/Rectangle.png'
import gamepad from '../img/Gamepad.png'
import addsuccess from '../img/Done_ring_round.png'
import closeModal from '../img/close_ring.png'
import Footer from '../components/footer';
import {updateUserInfo} from '../api/userApi'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style'

const logout = async (navigation) => {
    await AsyncStorage.removeItem('user')
    navigation.navigate('SignIn')
}

const Profile = () => {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [contact, setContact] = useState(null)
    const [createdAt, setCreatedAt] = useState(null)

    const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
    const [stateAdd ,setStateAdd] = useState(true)
    const [formAddValue, setformAddValue] = useState({
        name:'',
        contact:''
      });
    
    async function updateInfo(){
        const res = await updateUserInfo(await AsyncStorage.getItem('user'),formAddValue)
        setName(await AsyncStorage.getItem('name'))
        setEmail(await AsyncStorage.getItem('email'))
        setContact(await AsyncStorage.getItem('contact'))
        setCreatedAt(await AsyncStorage.getItem('createdAt'))
        console.log(res)
    }

    useEffect (() => {
        (async () => {
            setName(await AsyncStorage.getItem('name'))
            setEmail(await AsyncStorage.getItem('email'))
            setContact(await AsyncStorage.getItem('contact'))
            setCreatedAt(await AsyncStorage.getItem('createdAt'))
            setformAddValue({'name':name, 'contact':contact })
        })()
    }, [])

    const handleAdd = (event,name) => {
        setformAddValue({
            ...formAddValue,
            [name]: event.nativeEvent.text,
        });
      }
    

    const navigation = useNavigation()

    return (
        <BackGround>
            <View className='justify-between'>
                <View className="flex flex-col h-screen justify-between">
                    
                    <ImageBackground source={require('../img/bg_profile.png')} className='min-h-[50%] max-h-[50%] items-center z-30'>
                        {/* Info */}
                        <View className="flex flex-row items-center justify-between px-6 bg-white rounded-2xl mt-60 w-[90%]" style={styles.shadow}>
                            <View className="flex flex-col items-center">
                                <Image source={profile} className=""></Image>
                                <Text className="font-bold text-2xl">{name}</Text>
                            </View>

                            <View className="flex flex-col py-8 px-8">
                                <Text className="font-bold text-lg">Email</Text>
                                <Text className="font-semibold text-[#12BEF6] pb-2">{email}</Text>

                                <Text className="font-bold text-lg">Contact</Text>
                                <Text className="font-semibold text-[#12BEF6] pb-2">{contact}</Text>

                                <Text className="font-bold text-lg">Account created</Text>
                                <Text className="font-semibold text-[#12BEF6] pb-2">{createdAt}</Text>
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
    
                            <Pressable onPress={()=>{setModalVisibleAdd(!modalVisibleAdd)}} className="flex flex-row justify-between items-center px-4">
                                <View  className="flex flex-row gap-x-4 items-center">
                                    <Image source={account} className="scale-[1.1]"></Image>
                                    <Text className="text-lg font-semibold">Account</Text>
                                </View>
                                <Image source={next}></Image>
                            </Pressable>
                        </View>

                        {/* Logout */}

                        <Pressable 
                            style={styles.shadow} 
                            className="bg-[#4682B4] rounded-2xl w-fit items-center mx-32 py-2 mt-6"
                            onPress={() => logout(navigation)}
                        >
                            <Text className="text-xl font-bold text-white py-1">Log out</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisibleAdd}
              onRequestClose={() => {
                setModalVisibleAdd(!modalVisibleAdd);
              }}>
              
              <View className='justify-center my-auto mx-auto w-[90%] border border-black-2 rounded-xl'>
                <ImageBackground 
                  source={bgAddDevice} 
                  imageStyle={{ borderRadius: 12 }}
                >
                  <View className='flex flex-row px-10 py-5 gap-x-3 items-center'>
                    <Image source={gamepad} className='scale-[1.2]'></Image>
                    <Text className='text-[#414141] font-medium opacity-80 text-xl tracking-wider'>
                      Update infomation
                    </Text>
                  </View>
                  <View className='flex items-center gap-y-4'>  
                    <TextInput 
                      onChange={event => handleAdd(event,'name')}
                      className="py-2.5 rounded-xl border w-[80%] px-4 bg-white border-white" 
                      placeholder="Update your name" 
                      style={styles.shadow} 
                    />
                    <TextInput 
                      onChange={event => handleAdd(event,'contact')}
                      className="py-2.5 rounded-xl border w-[80%] px-4 bg-white border-white mb-4" 
                      placeholder="Update contact" 
                      style={styles.shadow} 
                    />
                  </View>
                  
                  <View className='flex flex-row bg-[#e6e6e6] rounded-xl mt-4'>
                    <Pressable 
                      onPress={() => {updateInfo();setModalVisibleAdd(!modalVisibleAdd)}}
                      className='w-1/2 items-center scale-125 py-3'
                    >
                      <Image source={addsuccess}></Image>
                    </Pressable>

                    <Pressable 
                      onPress={() => setModalVisibleAdd(!modalVisibleAdd)}
                      className='w-1/2 items-center scale-125 py-3'
                    >
                      <Image source={closeModal}></Image>
                    </Pressable>
                  </View>
                </ImageBackground>
              </View>
            </Modal>

            {/* <Footer/> */}

        </BackGround>
    );
}

export default Profile;
