import {View, Text, Image, TouchableWithoutFeedback, Pressable, ImageBackground} from 'react-native';
import React from 'react';

import styles from '../style'

const ProfileHeader = () => {

    return (
        <View className='mt-16 mx-auto w-[92%] '>
            <ImageBackground 
              source={require('../img/bg-new.png')} resizeMode='cover'
              className="flex flex-row flex-end py-2 px-2 mx-1 overflow-hidden rounded-xl"
              style={styles.shadow}  
            >
                <Pressable>
                    <Image className="object-cover scale-[1.4]" source={require('../img/editprofile.png')}></Image>
                </Pressable>

            </ImageBackground>
        </View>
    );
}

export default ProfileHeader;
