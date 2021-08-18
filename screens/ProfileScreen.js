import React, {useContext, useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';

import Share from 'react-native-share';
import{ AuthContext } from '../components/context';
import files from '../assets/filesBase64';
import {Gravatar, GravatarApi} from 'react-native-gravatar';

const ProfileScreen = () => {
  const { userData} = useContext(AuthContext);
  const [data,setData]= useState({
    name:'',
    email:'',
    location:'',
    occupation:'',
    phone:'',
    avatar:''
  })

  const myCustomShare = async() => {
    const shareOptions = {
      message: 'Use Fursa to get jobs and/or tenders in your county. I have used it and it\'s awesome. Download it and try it',
      url: files.appLogo,
      // urls: [files.image1, files.image2]
    }

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch(error) {
      console.log('Error => ', error);
    }
  };

  useEffect(()=>{
   

   ( async ()=>{
      let user = await userData();

    setData({
      name:user.name,
      email:user.email,
      phone: user.phone,
      occupation:user.occupation,
      location:user.location,
      avatar:user.avatar
    })
    })()

 }, [])

  return (
    <ScrollView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          {/* <Avatar.Image 
            source={{
              uri: 'www.gravatar.com/avatar/4b5a1002a71deb47d2c983653d3d050b?s=200&r=pg&d=mm'
            }}
            size={80}
          /> */}
          <Gravatar options={{
              email: data.email,
              parameters: { "size": "300", "r":"pg","d": "mm" },
              secure: true
            }}
            style={styles.roundedProfileImage} />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{data.name}</Title>
            <Caption style={styles.caption}>@{data.name}</Caption>
          </View>
        </View>
      </View>

      <View style={[styles.userInfoSection, {marginTop: height * 0.02}]}>
      <View style={styles.row}>
          <Icon name="envelope-open" color="#777777" size={23}/>
          <Text style={{color:"#777777", marginLeft: 15, fontSize:18}}>{data.email}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={25}/>
          <Text style={{color:"#777777", marginLeft: 15,fontSize:18}}>{data.phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="map-marker" color="#777777" size={25}/>
          <Text style={{color:"#777777", marginLeft: 20, fontSize:18}}>{data.location}</Text>
        </View>
        <View style={[styles.row, {marginTop:2}]}>
          <Icon name="briefcase" color="#777777" size={23}/>
          <Text style={{color:"#777777", marginLeft: 15, fontSize:18, marginTop:-3}}>{data.occupation}</Text>
        </View>
      </View>

      {/* <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹140.50</Title>
            <Caption>Jobs</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View>
      </View> */}

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart" color="#FF6347" size={30}/>
            <Text style={styles.menuItemText}>My Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="briefcase" color="#FF6347" size={30}/>
            <Text style={styles.menuItemText}>My Jobs</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={myCustomShare}>
          <View style={styles.menuItem }>
            <Icon name="share" color="#FF6347" size={30}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="building" color="#FF6347" size={30}/>
            <Text style={styles.menuItemText}>My Tenders</Text>
          </View>
        </TouchableRipple>
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple> */}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop:height * 0.06,
    // position:'absolute',
    // bottom:height * -0.2
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 26,
  },
  roundedProfileImage: {
    width:width * 0.2,
    height:height * 0.105,
    // borderWidth:3,
    // borderColor:'white',
    borderRadius:50
  }
});
