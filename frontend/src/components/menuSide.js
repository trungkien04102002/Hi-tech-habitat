import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import styles from '../style'

import bgTab from '../img/bg-bottomtab.png'

import home from '../img/home.png'
import statistic from '../img/static.png'
import user from '../img/user.png'
import setting from '../img/setting.png'
import logo from '../img/logo.png'
import back from '../img/back.png'
import bolt from '../img/bolt.png'
import exit from '../img/exit.png'

const MenuSide = ( props ) => {
  const id = props.id

  const navigation = useNavigation()

  return (
    <View className='w-4/5 left-[-10] border-r-2 border-blue-200'>
      <ImageBackground 
          source={bgTab} 
          resizeMode="cover" 
          className='h-screen px-4 py-16'
      >
        <View className='flex flex-row justify-between items-center'>
          <View className='flex flex-row items-center gap-x-3'>
            <Image source={logo}></Image>
            <Text className='text-[#1289F6] font-black text-xl opacity-90 tracking-wide'>High-tech Habitat</Text>
          </View>
        </View>

        <View className='flex mt-4'>
          <View className={'flex flex-row gap-x-4 items-center py-4 px-4' + (id===0? ' bg-blue-50 rounded-r-xl':'')} style={id===0 && styles.shadow}>
            <Image source={home} className='scale-[1.25] w-[24]'></Image>
            <Text className={'text-[#333333] font-medium text-lg tracking-wider' + (id ===0 ? '':' opacity-80')}>Home</Text>
          </View>

          <View className={'flex flex-row gap-x-4 items-center py-4 px-4' + (id===1? ' bg-blue-50 rounded-r-xl':'')} style={id===1 && styles.shadow}>
            <Image source={user} className='scale-[1.25] w-[24]'></Image>
            <Text className={'text-[#333333] font-medium text-lg tracking-wider' + (id===1? '':' opacity-80')}>Profile</Text>
          </View>

          <View className={'flex flex-row gap-x-4 items-center py-4 px-4' + (id===2? ' bg-blue-50 rounded-r-xl':'')} style={id===2 && styles.shadow}>
            <Image source={statistic} className='scale-[1.25] w-[24]'></Image>
            <Text className={'text-[#333333] font-medium text-lg tracking-wider' + (id===2? '':' opacity-80')}>Statistic</Text>
          </View>

          <View className={'flex flex-row gap-x-4 items-center py-4 px-4' + (id===3? ' bg-blue-50 rounded-r-xl':'')} style={id===3 && styles.shadow}>
            <Image source={setting} className='scale-[1.25] w-[24]'></Image>
            <Text className={'text-[#333333] font-medium text-lg tracking-wider' + (id===3? '':' opacity-80')}>Setting</Text>
          </View>

          <View className='flex flex-row gap-x-4 items-center py-4 pb-6 px-4'>
            <Image source={bolt} className='scale-[1.25] w-[24]'></Image>
            <Text className='text-[#FF4A00] font-medium text-lg tracking-wider'>Update to pro</Text>
          </View>

          <View className='flex flex-row gap-x-4 items-center py-6 px-4 border-[#7a7a7a] border-t-2 border-dotted'>
            <Image source={exit} className='scale-[1.25] w-[24]'></Image>
            <Text className='text-[#333333] font-medium text-lg tracking-wider opacity-80'>Logout</Text>
          </View>

        </View>
      </ImageBackground>
    </View>
  )
}

export default MenuSide