import {Client} from 'react-native-mqtt';
import { ip } from './ip';
export const socket = (token, roomID) => {
    const options = {
        host: `http://${ip}`,
        port: 5000,
        protocol: 'mqtts',
        username: 'bachkhoa',
        password: 'aio_kQyv75T7h2v3TP22YrQmMpTiTnox',
        headers: {
          Authorization: `Bearer ${token}`,
          'roomID': roomID
        }
    };
    
    const client = mqtt.connect(options);
    
    client.on('connect', () => {
    console.log('connected to server-side MQTT broker with headers on client-side');
    client.subscribe('bachkhoa/feeds/temperature', () => {
        console.log('subscribed to topic bachkhoa/feeds/temperature on client-side');
    });
    });
    
    client.on('message', (topic, message) => {
    console.log('received message on client-side:', message.toString(), 'on topic:', topic);
    });
}
