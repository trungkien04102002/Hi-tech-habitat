import {View, Text, Image, TouchableWithoutFeedback, Pressable, Animated} from 'react-native';
import { StyledComponent } from "nativewind";
import React, { useState, useEffect } from 'react';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import MenuSide from './menuSide';
import Notification from './notification';

const Header = ( props ) => {
    const id = props.id
    const navigation = useNavigation()

    const [menuSideState, setMenuSideState] = useState(false)
    const [sideAnimation] = useState(new Animated.Value(0))
    const [notiState, setNotiState] = useState(false)
    const [notiAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(notiAnimation, {
          toValue: notiState ? 1 : 0,
          duration: 400,
          useNativeDriver: true,
        }).start();
    }, [notiState]);

    useEffect(() => {
        Animated.timing(sideAnimation, {
          toValue: menuSideState ? 1 : 0,
          duration: 700,
          useNativeDriver: true,
        }).start();
    }, [menuSideState]);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setNotiState(false);
                setMenuSideState(false);
            };
        }, [])
    );

    const translateX1 = sideAnimation.interpolate({
        inputRange: [0, 0.8, 1],
        outputRange: [-300, 30, 0],
    })

    const translateY = notiAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-200, 0],
    });
    
    const translateX = notiAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [200, 0],
    });

    const scale = notiAnimation.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [0, 1.2, 1],
    });

    return (
        <>
            {menuSideState && 
                <Animated.View
                    className='absolute h-screen w-full z-50'
                    style={{transform: [{ translateX: translateX1 }]}}    
                >
                    <MenuSide id={id} />

                    <TouchableWithoutFeedback onPress={() => setMenuSideState(!menuSideState)}>
                        <View className='absolute right-[-4] top-[-10] w-[25%] h-screen z-50'>
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            }

            {notiState && 
                <Animated.View 
                    className='absolute h-screen w-full z-30' 
                    style={{transform: [{ translateY }, { translateX }, { scale }]}}
                >
                    <Notification />
                    
                    <TouchableWithoutFeedback onPress={() => setNotiState(!notiState)}>
                        <View className='absolute left-0 right-0 top-0 h-screen z-30'>
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            }

            <View className="flex flex-row justify-between w-full px-3 items-center">
                <Pressable onPress={() => setMenuSideState(!menuSideState)}>
                    <StyledComponent component={Image} className="object-cover" 
                        source={require('../img/menuIcon.png')}>
                    </StyledComponent>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Profile')}>
                <View className="flex flex-row gap-x-5 items-center">
                    <StyledComponent component={Image} className="object-cover" 
                        source={require('../img/profile.png')}>
                    </StyledComponent>
                    <StyledComponent component={View} className="flex flex-col">
                        <Text className="font-black text-xl">Hi Taylor S.</Text>
                        <Text className="font-semibold text-[#838A8F]">Monday, 20 Jan</Text>
                    </StyledComponent>
                </View>
                </Pressable>
                
                <Pressable onPress={() => setNotiState(!notiState)}>
                    <Image className="object-cover" source={require('../img/bellicon.png')}></Image>
                </Pressable>

            </View>
        </>
    );
}

export default Header;
