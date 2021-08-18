import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Platform,
	StyleSheet,
	StatusBar,
	Alert,
	Dimensions,
	Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../components/context';
const {height, width} = Dimensions.get('screen');

const SignInScreen = ({navigation}) => {
	const [data, setData] = React.useState({
		email: '',
		password: '',
		check_textInputChange: false,
		secureTextEntry: true,
		isValidUser: true,
		isValidPassword: true,
		loading: false,
	});

	const {colors} = useTheme();

	const {signIn} = React.useContext(AuthContext);

	const textInputChange = val => {
		let rgx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		let isValid = rgx.test(val);
		if (isValid) {
			setData({
				...data,
				email: val,
				check_textInputChange: true,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				email: val,
				check_textInputChange: false,
				isValidUser: false,
			});
		}
	};

	const handlePasswordChange = val => {
		if (val.trim().length >= 8) {
			setData({
				...data,
				password: val,
				isValidPassword: true,
			});
		} else {
			setData({
				...data,
				password: val,
				isValidPassword: false,
			});
		}
	};

	const updateSecureTextEntry = () => {
		setData({
			...data,
			secureTextEntry: !data.secureTextEntry,
		});
	};

	const loginHandle = (email, password) => {

		// setData({
		// 	...data,
		// 	loading: true,
		// });
		if (data.email.length == 0 || data.password.length == 0) {
			return Alert.alert(
				'Empty fields!',
				'email or password field cannot be empty.',
				[{text: 'Okay'}],
			);
		}

		setData({
			...data,
			loading: true,
		});

		console.log('before:', data.loading);


	

		(async ()=>{
			const message = await signIn(email, password);
			
			setData({
				loading: false,
			});
			
		})()
		console.log('after:', data.loading);
	};

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#216719" barStyle="light-content" />

			<View style={styles.header}>
				<Animatable.View style={styles.header_image} animation="flipInX">
					<Image
						source={require('../assets/logo.png')}
						style={styles.logo}
						resizeMode="stretch"
					/>
				</Animatable.View>

				<Text style={styles.text_header}>Login</Text>
			</View>
			<Animatable.View
				animation="fadeInUpBig"
				style={[
					styles.footer,
					{
						backgroundColor: colors.background,
					},
				]}>
				<Text
					style={[
						styles.text_footer,
						{
							color: colors.text,
						},
					]}>
					Email
				</Text>
				<View style={styles.action}>
					<FontAwesome name="user-o" color={colors.text} size={20} />
					<TextInput
						placeholder="Your Email"
						placeholderTextColor="#666666"
						style={[
							styles.textInput,
							{
								color: colors.text,
							},
						]}
						autoCapitalize="none"
						onChangeText={val => textInputChange(val)}
						// onEndEditing={e => handleValidUser(e.nativeEvent.text)}
						keyboardType="email-address"
					/>
					{data.check_textInputChange ? (
						<Animatable.View animation="bounceIn">
							<Feather name="check-circle" color="green" size={20} />
						</Animatable.View>
					) : null}
				</View>
				{data.isValidUser ? null : (
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>Must be a valid email</Text>
					</Animatable.View>
				)}

				<Text
					style={[
						styles.text_footer,
						{
							color: colors.text,
							marginTop: 35,
						},
					]}>
					Password
				</Text>
				<View style={styles.action}>
					<Feather name="lock" color={colors.text} size={20} />
					<TextInput
						placeholder="Your Password"
						placeholderTextColor="#666666"
						secureTextEntry={data.secureTextEntry ? true : false}
						style={[
							styles.textInput,
							{
								color: colors.text,
							},
						]}
						autoCapitalize="none"
						onChangeText={val => handlePasswordChange(val)}
					/>
					<TouchableOpacity onPress={updateSecureTextEntry}>
						{data.secureTextEntry ? (
							<Feather name="eye-off" color="grey" size={20} />
						) : (
							<Feather name="eye" color="grey" size={20} />
						)}
					</TouchableOpacity>
				</View>
				{data.isValidPassword ? null : (
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>
							Password must be 8 characters long.
						</Text>
					</Animatable.View>
				)}

				<TouchableOpacity>
					<Text style={{color: '#FF6347', marginTop: 15}}>
						Forgot password?
					</Text>
				</TouchableOpacity>
				<View style={styles.button}>
					<TouchableOpacity
						style={styles.signIn}
						onPress={() => {
							loginHandle(data.email, data.password);
						}}>
						<LinearGradient
							colors={['#216719', '#216719']}
							style={styles.signIn}>
							<Text
								style={[
									styles.textSign,
									{
										color: '#fff',
									},
								]}>
								Sign In
							</Text>
						</LinearGradient>
					</TouchableOpacity>
					{data.loading == true ? (
						<Spinner 
							visible={data.loading}
							textContent={'Processing...'}
							textStyle={{color: '#333'}}
						/>
					) : null}
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginTop: 20,
							marginBottom: 5,
						}}>
						<View style={{flex: 1, height: 2, backgroundColor: 'black'}} />
						<View>
							<Text style={{width: 50, textAlign: 'center'}}>OR</Text>
						</View>
						<View style={{flex: 1, height: 2, backgroundColor: 'black'}} />
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate('SignUpScreen')}
						style={[
							styles.signIn,
							{
								borderColor: '#216719',
								borderWidth: 1,
								marginTop: 15,
							},
						]}>
						<Text
							style={[
								styles.textSign,
								{
									color: '#216719',
								},
							]}>
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
			</Animatable.View>
		</View>
	);
};

export default SignInScreen;

const height_logo = height * 0.1;
const width_logo = width * 0.2;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#216719',
	},
	logo: {
		width: height_logo,
		height: width_logo,
	},
	header: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		paddingBottom: 10,
		alignItems: 'center',
		marginBottom: 20,
	},
	header_image: {
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	footer: {
		flex: 2,
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 40,
	},
	text_header: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 30,
	},
	text_footer: {
		color: '#05375a',
		fontSize: 18,
	},
	action: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5,
	},
	actionError: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#FF0000',
		paddingBottom: 5,
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#05375a',
	},
	errorMsg: {
		color: '#FF0000',
		fontSize: 14,
	},
	button: {
		alignItems: 'center',
		marginTop: height * 0.08,
	},
	signIn: {
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	textSign: {
		fontSize: 18,
		fontWeight: 'bold',
	},
});
