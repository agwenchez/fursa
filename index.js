/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';


// useEffect(() => {
//     ( async ()=>{
//             let loggedout = await getLogout();
//             console.log('from auth context:', loggedout)
//             setState({
//                 loggedout: loggedout
//             })
//             console.log('from state :',state.loggedout)

//      })()

//     }, [])
AppRegistry.registerComponent(appName, () => App);
