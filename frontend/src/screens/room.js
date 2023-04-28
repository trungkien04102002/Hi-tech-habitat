import {View, Text, Image, ScrollView, Modal, Pressable, TextInput, ImageBackground, TouchableOpacity, Switch} from 'react-native';
import { StyledComponent } from "nativewind";
import React, { useState,useEffect } from 'react';
import { BlurView } from 'expo-blur';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { socket } from '../api/socket'

import BackGround from '../components/background';

import temperatureImg from '../img/temper.png'
import intensityImg from '../img/inten.png'
import bluePlus from '../img/Add_square.png'

import fanIcon from '../img/fanIcon.png'
import lightIcon from '../img/lightIcon.png'
import temIcon from '../img/temIcon.png'
import humiIcon from '../img/humiIcon.png'
import rightArrow from '../img/rightArrow.png'
import bgAddDevice from '../img/Rectangle.png'
import addsuccess from '../img/Done_ring_round.png'
import closeModal from '../img/close_ring.png'
import gamepad from '../img/Gamepad.png'

import styles from '../style'
import { getRoomDetail, deleteRoom, updateRoom } from '../api/roomApi';
import { addDevice, getDevice, deleteDevice, updateDevice, changeMode, changeState } from '../api/deviceApi';
import { addSensor, getSensor, deleteSensor, updateSensor } from '../api/sensorApi'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Room = ({ route }) => {
  const [name, setName] = useState('')
  const [Rooms, setRooms] = useState({
    room: {name: ''},
    roomDevices: [],
    roomSensors: [],
  })
  const { id } = route.params
  const navigation = useNavigation()

  const [loadRoom, setLoadRoom] = useState(true)
  const [listD, setListD] = useState(null)
  const [listS, setListS] = useState(null)

  const [switchState, setSwitchState] = useState({});
  const [switchState2, setSwitchState2] = useState({});

  useEffect (() => {
    (async () => {
      const token = await AsyncStorage.getItem('user')
      for (_id in switchState) {
        const res = await changeState(token, _id, {'on': switchState[_id]? '1':'0'})
      }
      console.log(switchState)
    })()
  }, [switchState])

  useEffect (() => {
    (async () => {
      const token = await AsyncStorage.getItem('user')
      for (_id in switchState2) {
        const res = await changeMode(token, _id, {'on': switchState2[_id]? '0':'1'})
      }
    })()
  }, [switchState2])

  useEffect (() => {
    (async () => {
      setName(await AsyncStorage.getItem('name'))
      const token = await AsyncStorage.getItem('user')
      const res = await getRoomDetail(token, id)
      setRooms(res)
      
      listDevices = {}
      listSensors = {}
      for (item of res.roomDevices) {
        const dvdetail = await getDevice(token,item._id)
        listDevices[item._id] = dvdetail.stateFeed
        setSwitchState({ ...switchState, [item._id]: false})
        setSwitchState2({ ...switchState2, [item._id]: false})
      }
      for (item of res.roomSensors) {
        const ssdetail = await getSensor(token,item._id)
        listSensors[item._id] = ssdetail.feed
      }
      setListD(listDevices)
      setListS(listSensors)
    })()
  }, [loadRoom])

  const deleteRoomHandle = async (id) => {
    const token = await AsyncStorage.getItem('user')
    const res = await deleteRoom(token, id)
    navigation.navigate('Home')
  } 

  const deleteDeviceHandle = async (id) => {
    const token = await AsyncStorage.getItem('user')
    const res = await deleteDevice(token, id)
    setLoadRoom(!loadRoom)
  } 

  const deleteSensorHandle = async (id) => {
    const token = await AsyncStorage.getItem('user')
    const res = await deleteSensor(token, id)
    setLoadRoom(!loadRoom)
  } 

  const [stateAdd ,setStateAdd] = useState(true)
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);

  const [stateAddSensor ,setStateAddSensor] = useState(true)
  const [modalVisibleAddSensor, setModalVisibleAddSensor] = useState(false);

  const [stateUpdateDevice,setStateUpdateDevice] = useState(true)
  const [modalVisibleUpdateDevice, setModalVisibleUpdateDevice] = useState(false);

  const [stateUpdateSensor,setStateUpdateSensor] = useState(true)
  const [modalVisibleUpdateSensor, setModalVisibleUpdateSensor] = useState(false);

  const [stateUpdate,setStateUpdate] = useState(true)
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);

  const [formAddValue, setformAddValue] = useState({
    name:'',
    type:'',
    stateFeed:'',
    modeFeed:'' 
  });

  const [formAddSensorValue, setformAddSensorValue] = useState({
    feed:'', 
    type:'',
    unit:''
  });
  
  const [formUpdateValue, setformUpdateValue] = useState({
    name:'',
    roomType:'' 
  });

  const [formUpdateDeviceValue, setformUpdateDeviceValue] = useState({
    name:''
  });

  const [formUpdateSensorValue, setformUpdateSensorValue] = useState({
    type:''
  });

  const handleAdd = (event,name) => {
    setformAddValue({
        ...formAddValue,
        [name]: event.nativeEvent.text,
    });
    if (name === 'type') {
      if (event.nativeEvent.text === 'Fan') {
        setformAddValue({
          ...formAddValue,
          ['stateFeed']: 'fanbutton',
          ['modeFeed']: 'fanmode'
        });
      }
      else if (event.nativeEvent.text === 'Light') {
        setformAddValue({
          ...formAddValue,
          ['stateFeed']: 'lightbutton',
          ['modeFeed']: 'lightmode'
        });
      }
    }
  }

  const handleAddSensor = (event,name) => {
    setformAddSensorValue({
        ...formAddSensorValue,
        [name]: event.nativeEvent.text,
    });
    if (name === 'feed') {
      if (event.nativeEvent.text === 'temperature') {
        setformAddSensorValue({
          ...formAddSensorValue,
          ['unit']: 'Celsius',
          ['feed']: 'temperature'
        });
      }
      else if (event.nativeEvent.text === 'humi') {
        setformAddSensorValue({
          ...formAddSensorValue,
          ['unit']: 'cd',
          ['feed']: 'humi'
        });
      }
    }
  }

  const handleUpdate = (event,name) => {
    setformUpdateValue({
        ...formUpdateValue,
        [name]: event.nativeEvent.text,
    });
  }

  const handleUpdateDevice = (event,name) => {
    setformUpdateDeviceValue({
        ...formUpdateDeviceValue,
        [name]: event.nativeEvent.text,
    });
  }

  const handleUpdateSensor = (event,name) => {
    setformUpdateSensorValue({
        ...formUpdateSensorValue,
        [name]: event.nativeEvent.text,
    });
  }

  useEffect(()=>{
    (async () => {
        const token = await AsyncStorage.getItem('user')
        const res = await addDevice(token, formAddValue, id); 
        
        if (res && res.message) {
          Toast.show({
            type: 'error',
            text1: 'Add devices Failed',
            text2: res.message,
            visibilityTime: 2000,
          });
        }

        else if (res) {
          setModalVisibleAdd(!modalVisibleAdd)
          setLoadRoom(!loadRoom)
        }
    })()
  },[stateAdd]);

  useEffect(()=>{
    (async () => {
        // console.log(formAddSensorValue)
        const token = await AsyncStorage.getItem('user')
        const res = await addSensor(token, formAddSensorValue, id); 
        
        if (res && res.message) {
          Toast.show({
            type: 'error',
            text1: 'Add sensors Failed',
            text2: res.message,
            visibilityTime: 2000,
          });
        }

        else if (res) {
          setModalVisibleAddSensor(!modalVisibleAddSensor)
          setLoadRoom(!loadRoom)
        }
    })()
  },[stateAddSensor]);

  useEffect(()=>{
    (async () => {
        const token = await AsyncStorage.getItem('user')
        const res = await updateRoom(token, id, formUpdateValue); 
        
        if (res && res.message) {
          Toast.show({
            type: 'error',
            text1: 'Update Room Failed',
            text2: res.message,
            visibilityTime: 2000,
          });
        }

        else if (res) {
          setModalVisibleUpdate(!modalVisibleUpdate)
          setLoadRoom(!loadRoom)
        }
    })()
  },[stateUpdate]);

  const [IDDevice, setIDDevice] = useState(null)
  const [IDSensor, setIDSensor] = useState(null)

  useEffect(()=>{
    (async () => {
        const token = await AsyncStorage.getItem('user')
        const res = await updateDevice(token, IDDevice, formUpdateDeviceValue); 
        
        if (res && res.message) {
          Toast.show({
            type: 'error',
            text1: 'Update Device Failed',
            text2: res.message,
            visibilityTime: 2000,
          });
        }

        else if (res) {
          setModalVisibleUpdateDevice(!modalVisibleUpdateDevice)
          setLoadRoom(!loadRoom)
        }
    })()
  },[stateUpdateDevice]);

  useEffect(()=>{
    (async () => {
        const token = await AsyncStorage.getItem('user')
        const res = await updateSensor(token, IDSensor, formUpdateSensorValue); 
        
        if (res && res.message) {
          Toast.show({
            type: 'error',
            text1: 'Update Sensor Failed',
            text2: res.message,
            visibilityTime: 2000,
          });
        }

        else if (res) {
          setModalVisibleUpdateSensor(!modalVisibleUpdateSensor)
          setLoadRoom(!loadRoom)
        }
    })()
  },[stateUpdateSensor]);


  const renderRightButtons = (id, typ) => {
    return (
      typ === 'device' ? 
      (
      <View className='flex flex-row rounded-r-lg bg-[#12BEF6] items-center'>
        <TouchableOpacity onPress={() => {setIDDevice(id); setModalVisibleUpdateDevice(!modalVisibleUpdateDevice)}}>
          <Image className="object-cover scale-[0.8]" source={require('../img/editIcon.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteDeviceHandle(id)}>
          <Image className="object-cover scale-[0.8]" source={require('../img/trashIcon.png')}></Image>
        </TouchableOpacity>
      </View> 
      )
      :
      (
        <View className='flex flex-row rounded-r-lg bg-[#12BEF6] items-center'>
          <TouchableOpacity onPress={() => {setIDSensor(id); setModalVisibleUpdateSensor(!modalVisibleUpdateSensor)}}>
            <Image className="object-cover scale-[0.8]" source={require('../img/editIcon.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteSensorHandle(id)}>
            <Image className="object-cover scale-[0.8]" source={require('../img/trashIcon.png')}></Image>
          </TouchableOpacity>
        </View> 
      )
    );
  };

  return (
    <BackGround>
      <View className="flex flex-col h-screen ">

        {/* header */}
        <StyledComponent component={View} className="h-full w-full pt-12 px-2 items-center">
          <StyledComponent component={View} className="flex flex-row justify-between w-full px-3 items-center">
              <Pressable onPress={() => navigation.pop()}>
                  <StyledComponent component={Image} className="object-cover scale-[1.4]" 
                      source={require('../img/back_3.png')}>
                  </StyledComponent>
              </Pressable>

              <Pressable onPress={() => navigation.navigate('Profile')}>
              <View className="flex flex-row gap-x-5 items-center">
                  <StyledComponent component={Image} className="object-cover" 
                      source={require('../img/profile.png')}>
                  </StyledComponent>
                  <StyledComponent component={View} className="flex flex-col">
                      <Text className="font-black text-xl">Hi {name}</Text>
                      <Text className="font-semibold text-[#838A8F]">Monday, 20 Jan</Text>
                  </StyledComponent>
              </View>
              </Pressable>
              
              <Pressable onPress={() => deleteRoomHandle(id)}>
                  <Image className="object-cover scale-[1.3]" source={require('../img/Trash.png')}></Image>
              </Pressable>

          </StyledComponent>
          {/* header */}

          <View className='bg-[#E0F2F9] w-[95%] rounded-2xl mx-auto my-8' style={styles.shadow}>

            <View className='bg-[#191970] px-2 rounded-2xl py-4 opacity-90' style={styles.shadow}>
              <View className='flex flex-row justify-between items-center px-4'>
                <Text className='text-white font-black text-xl tracking-wider pr-2 py-2'>{Rooms.room.name}</Text>
                <Pressable onPress={() => setModalVisibleUpdate(!modalVisibleUpdate)}>
                  <Image className='scale-[1.3]' source={require('../img/Edit.png')}></Image>
                </Pressable>
              </View>

              <View className='flex flex-row justify-between items-center px-4'> 
                <Text className='text-white tracking-wider text-base font-semibold'>{Rooms.roomDevices.length} devices</Text>
                <Text className='text-white tracking-wider text-base font-semibold'>{Rooms.roomSensors.length} sensors</Text>
              </View>

              <View className='flex flex-row justify-around pt-6'>

                <View className='flex flex-col w-[48%]' style={styles.shadow}>
                  <View className='flex flex-row bg-[#68C9E9] rounded-t-xl justify-center py-4'>
                    <Text className='text-white font-bold text-sm tracking-wider'>Temperature</Text>
                    <Image source={temperatureImg}></Image>
                  </View>
                  <View className='bg-white rounded-b-xl items-center my-auto py-4'>
                    <Text className='text-[#414141] text-xl font-medium'>{20} °C</Text>
                  </View>
                </View>

                <View className='flex flex-col w-[48%]' style={styles.shadow}>
                  <View className='flex flex-row bg-[#3A9DBD] rounded-t-xl justify-center py-4'>
                    <Text className='text-white font-bold text-sm tracking-wider pr-1'>Light Intensity</Text>
                    <Image source={intensityImg}></Image>
                  </View>
                  <View className='bg-white rounded-b-xl items-center my-auto py-4'>
                    <Text className='text-[#414141] text-xl font-medium'>{5} cd</Text>
                  </View>
                </View>

              </View>
            </View>

            <View className='flex flex-row items-center'> 
              <Pressable 
                  onPress={() => setModalVisibleAdd(!modalVisibleAdd)} 
                  className='flex flex-row py-3 px-4 border-r-2 border-[#04C1FE]'
                >
                  <Image source={bluePlus}></Image>
                  <Text className='text-[#04C1FE] font-semibold text-base tracking-wider'>Add new device</Text>
              </Pressable>
              <Pressable 
                onPress={() => setModalVisibleAddSensor(!modalVisibleAddSensor)}
                className='flex flex-row py-3 px-3'
              >
                <Image source={bluePlus}></Image>
                <Text className='text-[#04C1FE] font-semibold text-base tracking-wider'>Add new sensor</Text>
              </Pressable>
            </View>

            {/* Add new devive */}
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
                      New device
                    </Text>
                  </View>
                  <View className='flex items-center gap-y-4'>  
                    <TextInput 
                      onChange={event => handleAdd(event,'name')}
                      className="py-2.5 rounded-xl border w-[80%] px-4 bg-white border-white" 
                      placeholder="Enter device name" 
                      style={styles.shadow} 
                    />
                    <TextInput 
                      onChange={event => handleAdd(event,'type')}
                      className="py-2.5 rounded-xl border w-[80%] px-4 bg-white border-white mb-4" 
                      placeholder="Choose Type Of Device" 
                      style={styles.shadow} 
                    />
                  </View>
                  
                  <View className='flex flex-row bg-[#e6e6e6] rounded-xl mt-4'>
                    <Pressable 
                      onPress={() => setStateAdd(!stateAdd)}
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

            {/* Add new sensor */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisibleAddSensor}
              onRequestClose={() => {
                setModalVisibleAddSensor(!modalVisibleAddSensor);
              }}>
              
              <View className='justify-center my-auto mx-auto w-[90%] border border-black-2 rounded-xl'>
                <ImageBackground 
                  source={bgAddDevice} 
                  imageStyle={{ borderRadius: 12 }}
                >
                  <View className='flex flex-row px-10 py-5 gap-x-3 items-center'>
                    <Image source={gamepad} className='scale-[1.2]'></Image>
                    <Text className='text-[#414141] font-medium opacity-80 text-xl tracking-wider'>
                      New sensor
                    </Text>
                  </View>
                  <View className='flex items-center gap-y-4'>  
                    <TextInput 
                      onChange={event => handleAddSensor(event,'type')}
                      className="py-2.5 rounded-xl border w-[80%] px-4 bg-white border-white" 
                      placeholder="Enter sensor name" 
                      style={styles.shadow} 
                    />
                    <TextInput 
                      onChange={event => handleAddSensor(event,'feed')}
                      className="py-2.5 rounded-xl border w-[80%] px-4 bg-white border-white mb-4" 
                      placeholder="Choose Type Of Sensor" 
                      style={styles.shadow} 
                    />
                  </View>
                  
                  <View className='flex flex-row bg-[#e6e6e6] rounded-xl mt-4'>
                    <Pressable 
                      onPress={() => setStateAddSensor(!stateAddSensor)}
                      className='w-1/2 items-center scale-125 py-3'
                    >
                      <Image source={addsuccess}></Image>
                    </Pressable>

                    <Pressable 
                      onPress={() => setModalVisibleAddSensor(!modalVisibleAddSensor)}
                      className='w-1/2 items-center scale-125 py-3'
                    >
                      <Image source={closeModal}></Image>
                    </Pressable>
                  </View>
                </ImageBackground>
              </View>
            </Modal>

            {/* updateRoom */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisibleUpdate}
              onRequestClose={() => {
                setModalVisibleUpdate(!modalVisibleUpdate);
              }}>
              
              <View className='justify-center my-auto mx-auto w-[90%] border border-black-2 rounded-xl'>
                <ImageBackground 
                  source={bgAddDevice} 
                  imageStyle={{ borderRadius: 12 }}
                >
                  <View className='flex flex-row px-10 py-5 gap-x-3 items-center'>
                    <Image source={gamepad} className='scale-[1.2]'></Image>
                    <Text className='text-[#414141] font-medium opacity-80 text-xl tracking-wider'>
                      Update Room
                    </Text>
                  </View>
                  <View className='flex items-center gap-y-4'>  
                    <TextInput 
                      onChange={event => handleUpdate(event,'name')}
                      className="py-2.5 rounded-xl border w-[80%] px-4 bg-white border-white" 
                      placeholder="Enter new Room Name" 
                      style={styles.shadow} 
                    />
                    <TextInput 
                      onChange={event => handleUpdate(event,'roomType')}
                      className="py-2.5 rounded-xl border w-[80%] px-4 bg-white border-white mb-4" 
                      placeholder="Change new Type Of Room" 
                      style={styles.shadow} 
                    />
                  </View>
                  
                  <View className='flex flex-row bg-[#e6e6e6] rounded-xl mt-4'>
                    <Pressable 
                      onPress={() => setStateUpdate(!stateUpdate)}
                      className='w-1/2 items-center scale-125 py-3'
                    >
                      <Image source={addsuccess}></Image>
                    </Pressable>

                    <Pressable 
                      onPress={() => setModalVisibleUpdate(!modalVisibleUpdate)}
                      className='w-1/2 items-center scale-125 py-3'
                    >
                      <Image source={closeModal}></Image>
                    </Pressable>
                  </View>

                </ImageBackground>
              </View>
            </Modal>

            {/* updateDevice */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisibleUpdateDevice}
              onRequestClose={() => {
                setModalVisibleUpdateDevice(!modalVisibleUpdateDevice);
              }}>
              
              <View className='justify-center my-auto mx-auto w-[90%] border border-black-2 rounded-xl'>
                <ImageBackground 
                  source={bgAddDevice} 
                  imageStyle={{ borderRadius: 12 }}
                >
                  <View className='flex flex-row px-10 py-5 gap-x-3 items-center'>
                    <Image source={gamepad} className='scale-[1.2]'></Image>
                    <Text className='text-[#414141] font-medium opacity-80 text-xl tracking-wider'>
                      Update Device
                    </Text>
                  </View>
                  <View className='flex items-center gap-y-4'>  
                    <TextInput 
                      onChange={event => handleUpdateDevice(event,'name')}
                      className="py-2.5 rounded-xl border w-[80%] px-4 bg-white border-white" 
                      placeholder="Enter new Device Name" 
                      style={styles.shadow} 
                    />
                  </View>
                  
                  <View className='flex flex-row bg-[#e6e6e6] rounded-xl mt-4'>
                    <Pressable 
                      onPress={() => setStateUpdateDevice(!stateUpdateDevice)}
                      className='w-1/2 items-center scale-125 py-3'
                    >
                      <Image source={addsuccess}></Image>
                    </Pressable>

                    <Pressable 
                      onPress={() => setModalVisibleUpdateDevice(!modalVisibleUpdateDevice)}
                      className='w-1/2 items-center scale-125 py-3'
                    >
                      <Image source={closeModal}></Image>
                    </Pressable>
                  </View>

                </ImageBackground>
              </View>
            </Modal>

            {/* updateSensor */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisibleUpdateSensor}
              onRequestClose={() => {
                setModalVisibleUpdateSensor(!modalVisibleUpdateSensor);
              }}>
              
              <View className='justify-center my-auto mx-auto w-[90%] border border-black-2 rounded-xl'>
                <ImageBackground 
                  source={bgAddDevice} 
                  imageStyle={{ borderRadius: 12 }}
                >
                  <View className='flex flex-row px-10 py-5 gap-x-3 items-center'>
                    <Image source={gamepad} className='scale-[1.2]'></Image>
                    <Text className='text-[#414141] font-medium opacity-80 text-xl tracking-wider'>
                      Update Sensor
                    </Text>
                  </View>
                  <View className='flex items-center gap-y-4'>  
                    <TextInput 
                      onChange={event => handleUpdateSensor(event,'type')}
                      className="py-2.5 rounded-xl border w-[80%] px-4 bg-white border-white" 
                      placeholder="Enter new Sensor Name" 
                      style={styles.shadow} 
                    />
                  </View>
                  
                  <View className='flex flex-row bg-[#e6e6e6] rounded-xl mt-4'>
                    <Pressable 
                      onPress={() => setStateUpdateSensor(!stateUpdateSensor)}
                      className='w-1/2 items-center scale-125 py-3'
                    >
                      <Image source={addsuccess}></Image>
                    </Pressable>

                    <Pressable 
                      onPress={() => setModalVisibleUpdateSensor(!modalVisibleUpdateSensor)}
                      className='w-1/2 items-center scale-125 py-3'
                    >
                      <Image source={closeModal}></Image>
                    </Pressable>
                  </View>

                </ImageBackground>
              </View>
            </Modal>

          </View>

          <View className='h-[45%] w-full'>
            <Text className="text-[#414141] font-medium opacity-80 text-base px-6 pb-4">All devices & sensors ({Rooms.roomDevices.length + Rooms.roomSensors.length})</Text>
            
            <ScrollView>
              <View className='flex items-center gap-4 mb-6 mx-4'>
                {Rooms.roomDevices.concat(Rooms.roomSensors).map((item) => (
                  <View 
                    className='w-full border border-[#12BEF6] border-2 rounded-xl bg-white'
                    key={item._id}
                    style={styles.shadow}
                  >
                    <GestureHandlerRootView>
                      <Swipeable renderRightActions={() => renderRightButtons(item._id, item.name? 'device':'sensor')}>
                        <View className='flex flex-row justify-between items-center px-6 py-2'>
                          <View className='flex flex-row items-center'>
                            <Image source={(listD && item.name && listD[item._id] === 'fanbutton')? fanIcon: item.name? lightIcon: (listS && listS[item._id] === 'humi')? humiIcon: temIcon}></Image>
                            <Text className='text-[#414141] font-medium opacity-80 text-base tracking-wider px-2'>{item.name || item.type}</Text>
                          </View>

                          {item.name ?
                            <View className='flex flex-row items-center'>
                              <View>
                                <View className='flex flex-row items-center justify-between'>
                                  <Text className='text-[#414141] font-normal opacity-60 text-sm'>Auto</Text>
                                  <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={switchState2[item._id] ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => setSwitchState2({ ...switchState2, [item._id]: !switchState2[item._id]})}
                                    value={switchState2[item._id]}
                                  />
                                </View>
                                <View className='flex flex-row items-center justify-between'>
                                  <Text className='text-[#414141] font-normal opacity-60 text-sm'>On/Off</Text>
                                  <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={switchState[item._id] ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => setSwitchState({ ...switchState, [item._id]: !switchState[item._id]})}
                                    value={switchState[item._id]}
                                  />
                                </View>
                              </View>
                              <Image className='rotate-180' source={rightArrow}></Image>
                            </View>
                          :
                            <Image className='rotate-180' source={rightArrow}></Image>
                          }

                        </View>
                      </Swipeable>
                    </GestureHandlerRootView>
                  </View>
                ))}
                
              </View>
            </ScrollView>

          </View>
        </StyledComponent>

        {/* <Footer/> */}

      </View>
      <Toast toastRef={(toastRef) => Toast.setRef(toastRef)}/>

      {(modalVisibleAdd || modalVisibleUpdate || modalVisibleUpdateDevice || modalVisibleAddSensor || modalVisibleUpdateSensor) 
        && 
        <BlurView
          tint="light"
          intensity={100}
          className='absolute w-full h-full'
        />
      }

    </BackGround>
  )
}

export default Room