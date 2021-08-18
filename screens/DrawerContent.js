import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {
	useTheme,
	Avatar,
	Title,
	Caption,
	Paragraph,
	Drawer,
	Text,
	TouchableRipple,
	Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {Gravatar, GravatarApi} from 'react-native-gravatar';
import {AuthContext} from '../components/context';

const {height, width}= Dimensions.get('window');

export function DrawerContent(props) {
	const paperTheme = useTheme();
	const [data, setData] = useState({
		name: '',
		email: '',
	});

	const {signOut, toggleTheme, userData} = useContext(AuthContext);

	useEffect(() => {
		(async () => {
			let user = await userData();
			// console.log('userData drawercontent==>', user);

			setData({
				name: user.name,
				email: user.email,
			});
		})();
	}, []);

	return (
		<View style={{flex: 1}}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						<View style={styles.row}>
							<TouchableOpacity
							// style={styles.roundedProfileImage}
								onPress={() => {
									props.navigation.navigate('Profile');
								}}
							>
							<Gravatar
								options={{
									email: data.email,
									parameters: {size: '300', r: 'pg', d: 'mm'},
									secure: true,
								}}
								style={styles.roundedProfileImage}
							
							/>
							</TouchableOpacity>
							
							{/* <Avatar.Image 
                                source={{
                                    uri: 'https://scontent.fnbo10-1.fna.fbcdn.net/v/t1.0-9/52291543_2044099802377282_5288132187747516416_n.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeF1dK4bcUGaOe5t9EvFxAA7_0DtfQs74yr_QO19CzvjKrNZpxpM8cUDbnw0WF18iuiChrruWkprtG_X7fpPAB2j&_nc_ohc=_asp7UiIDPgAX_WFVr7&_nc_oc=AQmCJdCIwRlvgXezd7QMttpAixmYYX68uaZkTxHqUwwP8psZVC540BanjhqqKBhD9DU&_nc_pt=5&_nc_ht=scontent.fnbo10-1.fna&oh=4403ed2b593261396d7c9f04625c7b38&oe=6036B50D'
                                }}
                                size={60}
                            /> */}
							<View style={{marginLeft: 15, flexDirection: 'column'}}>
								<Title style={styles.title}>{data.name}</Title>
								<Caption style={styles.caption}>@{data.name}</Caption>
							</View>
						</View>

						{/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View> */}
					</View>

					<Drawer.Section style={styles.drawerSection}>
						<DrawerItem
							icon={({color, size}) => (
								<Icon name="home-outline" color={color} size={size} />
							)}
							label="Home"
							onPress={() => {
								props.navigation.navigate('Home');
							}}
						/>
						<DrawerItem
							icon={({color, size}) => (
								<Icon name="account-outline" color={color} size={size} />
							)}
							label="Profile"
							onPress={() => {
								props.navigation.navigate('Profile');
							}}
						/>
						<DrawerItem
							icon={({color, size}) => (
								<Icon name="briefcase" color={color} size={size} />
							)}
							label="My Jobs"
							onPress={() => {
								props.navigation.navigate('BookmarkScreen');
							}}
						/>
						<DrawerItem
							icon={({color, size}) => (
								<Icon name="car" color={color} size={size} />
							)}
							label="My Tenders"
							onPress={() => {
								props.navigation.navigate('SettingScreen');
							}}
						/>
						<DrawerItem
							icon={({color, size}) => (
								<Icon name="heart" color={color} size={size} />
							)}
							label="Favorites"
							onPress={() => {
								props.navigation.navigate('SupportScreen');
							}}
						/>
					</Drawer.Section>
					<Drawer.Section title="Preferences" style={{marginTop: 40}}>
						<TouchableRipple
							onPress={() => {
								toggleTheme();
							}}>
							<View style={styles.preference}>
								<Text>Dark Theme</Text>
								<View pointerEvents="none">
									<Switch value={paperTheme.dark} />
								</View>
							</View>
						</TouchableRipple>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomDrawerSection}>
				<DrawerItem
					icon={({color, size}) => (
						<Icon name="exit-to-app" color={color} size={size} />
					)}
					label="Sign Out"
					onPress={() => {
						signOut();
					}}
				/>
			</Drawer.Section>
		</View>
	);
}

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	userInfoSection: {
		paddingLeft: 20,
	},
	title: {
		fontSize: 16,
		marginTop: 3,
		fontWeight: 'bold',
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
	},
	row: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	section: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 15,
	},
	paragraph: {
		fontWeight: 'bold',
		marginRight: 3,
	},
	drawerSection: {
		marginTop: 15,
	},
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: '#f4f4f4',
		borderTopWidth: 1,
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
		paddingHorizontal: 16,
    },
    roundedProfileImage: {
        width:width * 0.15,
        height:height * 0.08,
        // borderWidth:3,
        // borderColor:'white',
        borderRadius:50
      }
});
