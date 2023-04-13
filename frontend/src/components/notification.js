import {View, Text, Image, ScrollView} from 'react-native';

import bedRoom from '../img/bedRoom.png';
import livingRoom from '../img/livingRoom.png';
import kitchen from '../img/kitchen.png';
import studioRoom from '../img/studioRoom.png';
import homeIcon from '../img/homeicon.png'
import bookmark from '../img/Bookmark.png'

import styles from '../style'

const notification = [
  {
    type: livingRoom,
    message: 'You added a new device in living room',
    time: '09:20AM',
    checked: false
  },
  {
    type: bedRoom,
    message: 'You added a new device in bed room',
    time: '09:30AM',
    checked: false
  },
  {
    type: kitchen,
    message: 'You added a new device in kitchen',
    time: '09:20AM',
    checked: true
  },
  {
    type: studioRoom,
    message: 'You added a new device in studio',
    time: '09:30AM',
    checked: true
  },
  {
    type: homeIcon,
    message: 'You added a new room',
    time: '02:30PM',
    checked: true
  },
]

const Notification = () => {
  return (
    <View className='z-50 bg-gray-100 w-[95%] top-[110] mx-auto rounded-xl h-[60%]' style={styles.shadow}>
      <View className='bg-[#252547] rounded-t-xl flex flex-row items-center px-4' >
        <Image source={bookmark}></Image>
        <Text className='text-[#fff] font-bold text-lg tracking-wider px-2 py-4'>Notifications</Text>
      </View>

      <ScrollView className='flex gap-y-4 px-4 mt-2 mb-2'>
        {
          notification.map((item, index) => (
            <View 
              className={'rounded-xl flex flex-row items-center ' + (item.checked? 'bg-white':'bg-[#9CF3FF]') }
              key={index} 
              style={styles.shadow}
            > 
              <Image className='w-[28] h-[28] mx-4' source={item.type}></Image>
              <View>
                <Text className='text-[#414141] font-medium text-sm py-2'>{item.message}</Text>
                <Text className='text-[#12BEF6] font-medium text-sm tracking-wider pb-2'>{item.time}</Text>
              </View>
            </View>
          ))
        }
      </ScrollView>

      <View className='flex items-end border-t-2 border-[#848484] mx-4'>
        <Text className='font-semibold text-base underline text-[#12BEF6] tracking-wider py-2 pb-4 px-4'>Read all</Text>
      </View>
    </View>
  )
}

export default Notification