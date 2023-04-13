import {View, Text, Image, TouchableOpacity,TextInput, Animated} from 'react-native';
import { StyledComponent } from "nativewind";
import React, {useEffect, useRef, useLayoutEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import BackGround from '../components/background';

import styles from '../style';

const SignIn = ({ navigation }) => {
    const isFocused = useIsFocused();
    const translateY = useRef(new Animated.Value(500)).current

    useLayoutEffect(() => {
        if (isFocused) {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }, [isFocused])

    useEffect(() => {
        if (!isFocused) {
            translateY.setValue(500)
        }
    }, [isFocused])

    const handleHide = () => {
        Animated.timing(translateY, {
            toValue: 500,
            duration: 200,
            useNativeDriver: true
        }).start(() => navigation.navigate("SignUp"));
    }

    return (
        <BackGround> 
            <StyledComponent component={View} className="items-center flex flex-col h-full w-full ">
                <StyledComponent component={Image} className="scale-90 mx-auto" 
                source={require('../img/image_2.png')}></StyledComponent>

                <Animated.View 
                    style={{ transform: [{ translateY }] }} 
                    className="flex flex-col gap-y-4 bg-gray-300 rounded-3xl w-full items-center h-full"
                >
                    <StyledComponent component={Text} className="font-black text-2xl pt-4 pb-2">Sign In</StyledComponent>
                    <StyledComponent component={TextInput} className="py-2.5 rounded-xl border w-3/4 px-4 bg-white border-white" placeholder="Enter email" style={styles.shadow}/>
                    <StyledComponent component={TextInput} className="py-2.5 rounded-xl border w-3/4 px-4 bg-white border-white mb-4" placeholder="Enter password" style={styles.shadow}/>


                    <StyledComponent component={TouchableOpacity} onPress={() => navigation.navigate("Home")} className="mb-4 px-8 py-3 bg-[#4682B4] rounded-md w-3/4 " style={styles.shadow}>
                        <StyledComponent component={Text} className="font-bold text-white text-xl text-center">Login</StyledComponent>
                    </StyledComponent>
                    
                    <StyledComponent component={View} className="flex flex-col ">
                        <Text className="font-black font-medium text-center opacity-75">Don’t have an account yet?</Text>
                        <Text onPress={handleHide} className="font-bold text-center text-blue-600 underline">Create an account</Text>
                    </StyledComponent>
        
                </Animated.View>
            </StyledComponent>
        </BackGround>
    );
}

export default SignIn;
