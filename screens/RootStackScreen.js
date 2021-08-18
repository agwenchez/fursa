import React, {useEffect, useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../components/context';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {
    const [state, setState] = useState({
        loggedout : null
    })

    const {getLogout} = React.useContext(AuthContext);

    useEffect(() => {
    ( async ()=>{
            let loggedout = await getLogout();

            setState({
                loggedout : loggedout
            })
            console.log('from state:',loggedout)
     })()


    }, [])
	return (
		<RootStack.Navigator headerMode="none">
            { state.loggedout !== null ?(
                <>
                  <RootStack.Screen name="SignInScreen" component={SignInScreen} />
                  <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
                </>
            )
          
        :
        (
            <>
            <RootStack.Screen name="SplashScreen" component={SplashScreen} />
			<RootStack.Screen name="SignInScreen" component={SignInScreen} />
			<RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
            </>
        )
        }
			
		</RootStack.Navigator>
	);
};

export default RootStackScreen;
