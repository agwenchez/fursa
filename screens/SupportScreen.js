import React, { Fragment } from 'react';
import {
	View,
  Button,
	Image,
	StyleSheet,
	Dimensions,
  Text,

} from 'react-native';


const SupportScreen = () => {
    return (
      <View style={styles.container} >
        <Button 
        title ="Click  me"
        onPress = {()=> alert('i am pressed but siendi choo')}
        />
      </View>
    );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignContent:'center',
    justifyContent:'center'
  }
});
