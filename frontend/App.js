import React, {useState, useEffect, useRef} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from './src/screens/signIn';
import Started from './src/screens/started';
import SignUp from './src/screens/signUp';
import Home from './src/screens/home';
import Room from './src/screens/room';
import Profile from './src/screens/profile';
import Statistic from './src/screens/statistic';
import Setting from './src/screens/setting';

import Footer from './src/components/footer';

const Stack = createNativeStackNavigator();

export default function App() {
  const [screen, setScreen] = useState('Started')
  const navigationRef = useRef(null);

  useEffect(() => {
    const unsubscribe = navigationRef.current?.addListener('state', () => {
      const currentRouteName = navigationRef.current.getCurrentRoute().name;
      setScreen(currentRouteName);
    });

    return unsubscribe;
  }, []);

  return (
      <NavigationContainer ref={navigationRef} className='flex-1'>
        <Stack.Navigator
          initialRouteName="Started"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Onboard" component={Started} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={SignIn} options={{animation: 'none'}} />
          <Stack.Screen name="SignUp" component={SignUp} options={{animation: 'none'}} />
          <Stack.Screen name="Room" component={Room} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Statistic" component={Statistic} />
          <Stack.Screen name="Setting" component={Setting} />

        </Stack.Navigator>

        {
          ['Home', 'Room', 'Profile', 'Statistic', 'Setting'].includes(screen) && <Footer />
        }

      </NavigationContainer>
  );
}