/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import messaging from '@react-native-firebase/messaging';
import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';
import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import { AuthContext } from './components/context';
import RootStackScreen from './screens/RootStackScreen';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';


// import { fcmService } from "./notifications/FCMService";
// import { localNotificationService } from "./notifications/LocalNotificationService";

const Drawer = createDrawerNavigator();

const App = ({navigation}) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = React.useState(null); 


  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          email: action.email,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          email: action.email,
          location:action.location,
          name:action.name,
          occupation:action.occupation,
          password:action.password,
          phone:action.phone,
          isLoading: false,
        };
      case 'USER_DATA':
        return{
          ...prevState,
          userData:action.user
        }
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (email, password) => {
      let message = null;
      try {
        const res = await fetch(
          'https://fursa-backend.herokuapp.com/users/login',
          {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'content-type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password}),
          },
        );

        const resData = await res.json();
        // let userToken = null;
        message = resData;
        let userToken = resData.token;
        let userData = JSON.stringify(resData.user);

        if (userToken == undefined ) {
          alert('Email and password do not match');
        } else {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userData', userData);
          

          dispatch({type: 'LOGIN', email: email, token: userToken});
        }
      } catch (error) {
        Alert.alert('Something went wrong', error.message);
      }

      return message;
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      let logout = 'logged out'
      try {
        await AsyncStorage.removeItem('userToken');
        // await AsyncStorage.setItem('logged out', logout)
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    getLogout: async()=>{
      let loggedout = null
      try {
       loggedout = await AsyncStorage.getItem('logged out')

      } catch(e) {
        console.log(e);
      }

      console.log(loggedout);
      return loggedout
    },
    signUp:async (name, email, phone, location, occupation, password) => {
      let message = null;
      loginState.isLoading = true

      // initialLoginState.isLoading = true
      try {
        const res = await fetch(
          'https://fursa-backend.herokuapp.com/users/register',
          {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'content-type': 'application/json',
            },
            body: JSON.stringify({name:name, email:email, phone:phone, location:location, occupation:occupation, password:password}),
          },
        );

        const resData = await res.json();
        message = resData;
       
        initialLoginState.isLoading = false
       if(resData.msg == 'Email already exists' || resData.msg == 'Please enter all fields'){
         Alert.alert('Error occured', resData.msg)
       }else{
        Alert.alert('Success', resData.msg)
       }
       
      } catch (error) {
        initialLoginState.isLoading = false
        Alert.alert('Something went wrong', error.message);
      }
      dispatch({type: 'REGISTER', name:name, email:email, phone:phone, location:location, occupation:occupation, password:password});


      return message
    },
    userData: async () =>{

      let userData = null;
      try {
        userData = await AsyncStorage.getItem('userData');
        userData = JSON.parse(userData);
        // console.log()
      } catch(e) {
        console.log(e);
      }
      
      dispatch({ type: 'USER_DATA', user:userData});
      // console.log(userData)
      return userData;
      
    }
    ,
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 500);


  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
      { loginState.userToken !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        </Drawer.Navigator>
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;
