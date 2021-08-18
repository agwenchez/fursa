import React from 'react'
import {View, Text, Button} from 'react-native'

function ShowmoreScreen() {
    return (
      <View>
          <Text>
            Explore screen
          </Text>
          <Button onPress={()=>{alert('i have been clicked')}} />
      </View>
    )
}

export default ShowmoreScreen
