import React from 'react';
import {
	View,
	Text,
	Button,
	Image,
	Alert,
	TouchableOpacity,
	Dimensions,
	TextInput,
	Platform,
	StyleSheet,
	ScrollView,
	StatusBar,
	ActivityIndicator 
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../components/context';
import {useTheme} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

const SignUpScreen = ({navigation}) => {
	const [data, setData] = React.useState({
		name: '',
		email: '',
		phone: '',
		occupation: '',
		location: '',
		password: '',
		password_confirmation: '',
		isValidname: true,
		isValidemail: true,
		isValidoccupation: true,
		isValidlocation: true,
		isValidphone: true,
		isValidPassword: true,
		isValidconfirmPassword: true,
		check_nameInputChange: false,
		check_emailInputChange: false,
		check_phoneInputChange: false,
		check_locationInputChange: false,
		check_occupationInputChange: false,
		secureTextEntry: true,
		confirm_secureTextEntry: true,
		loading: false,
	});
	const {colors} = useTheme();

	const {signUp, signIn} = React.useContext(AuthContext);

	const nameInputChange = val => {
		if (val.length !== 0 && val.trim().length >= 4) {
			setData({
				...data,
				name: val,
				isValidname: true,
				check_nameInputChange: true,
			});
		} else {
			setData({
				...data,
				name: '',
				isValidname: false,
				check_nameInputChange: false,
			});
		}
	};

	const emailInputChange = val => {
		let rgx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		let isValid = rgx.test(val);
		if (isValid) {
			setData({
				...data,
				email: val,
				check_emailInputChange: true,
				isValidemail: true,
			});
		} else {
			setData({
				...data,
				email: val,
				check_emailInputChange: false,
				isValidemail: false,
			});
		}
	};

	const occupationInputChange = val => {
		if (val.length !== 0 && val.trim().length >= 3) {
			setData({
				...data,
				occupation: val,
				isValidoccupation: true,
				check_occupationInputChange: true,
			});
		} else {
			setData({
				...data,
				occupation: '',
				isValidoccupation: false,
				check_occupationInputChange: false,
			});
		}
	};
	const locationInputChange = val => {
		if (val.length !== 0 && val.trim().length >= 4) {
			setData({
				...data,
				location: val,
				isValidlocation: true,
				check_locationInputChange: true,
			});
		} else {
			setData({
				...data,
				location: '',
				isValidlocation: false,
				check_locationInputChange: false,
			});
		}
	};
	const phoneInputChange = val => {
		if (val.length !== 0 && val.trim().length == 10) {
			setData({
				...data,
				phone: val,
				isValidphone: true,
				check_phoneInputChange: true,
			});
		} else {
			setData({
				...data,
				phone: '',
				isValidphone: false,
				check_phoneInputChange: false,
			});
		}
	};

	const handlePasswordChange = val => {
		if (val.length !== 0 && val.trim().length >= 8) {
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

	const handleConfirmPasswordChange = val => {
		if (val.length !== 0 && val == data.password) {
			setData({
				...data,
				password_confirmation: val,
				isValidconfirmPassword: true,
			});
		} else {
			setData({
				...data,
				password_confirmation: '',
				isValidconfirmPassword: false,
			});
		}
	};

	const updateSecureTextEntry = () => {
		setData({
			...data,
			secureTextEntry: !data.secureTextEntry,
		});
	};

	const updateConfirmSecureTextEntry = () => {
		setData({
			...data,
			confirm_secureTextEntry: !data.confirm_secureTextEntry,
		});
	};

	const signupHandle = (email, password, phone, location, occupation, name) => {
		setData({
			...data
		});
		if (
			data.email.length === 0 ||
			data.name.length === 0 ||
			data.phone.length === 0 ||
			data.occupation.length === 0 ||
			data.location.length === 0 ||
			data.password.length === 0
		) {
	
				return Alert.alert(
					'Empty field(s)!',
					'All fields are required fields. Kindly fill them all to proceed.If non-empty, kindly check to confirm they are valid values.',
					[{text: 'Okay'}],
				);
			
			}

			setData({
				...data,
				loading: true
			});

		(async ()=>{
			const message = await signUp(email, password, phone, location, occupation, name);
			
			setData({
				loading: false,
			});
			if(message.msg == 'User created successfully. Kindly login to proceed'){
				setTimeout(() => {
					navigation.navigate('SignInScreen');
				}, 500);
			
			}
		})()
		
	};

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#216719" barStyle="light-content" />
			{/* <Animatable.View style={styles.header_image} animation= "flipInX">
            <Image
					source={require('../assets/logo.png')}
					style={styles.logo}
					resizeMode="stretch"
				/>
            </Animatable.View> */}
			<Animatable.View style={styles.header} animation="bounceInLeft">
				<Text style={styles.text_header}>Register Now!</Text>
			</Animatable.View>
			<Animatable.View animation="fadeInUpBig" style={styles.footer}>
				<ScrollView>
					<View style={{marginBottom: 15}}>
						<Text
							style={[
								styles.text_footer,
								{
									marginTop: 10,
								},
							]}>
							Name
						</Text>
						<View style={styles.action}>
							<FontAwesome name="user-o" color="#05375a" size={20} />
							<TextInput
								placeholder="Your Name"
								style={styles.textInput}
								autoCapitalize="none"
								onChangeText={val => nameInputChange(val)}
							/>
							{data.check_nameInputChange ? (
								<Animatable.View animation="bounceIn">
									<Feather name="check-circle" color="green" size={20} />
								</Animatable.View>
							) : null}
						</View>
					</View>
					{data.isValidname ? null : (
						<Animatable.View animation="fadeInLeft" duration={500}>
							<Text style={styles.errorMsg}>Must be at least 4 characters</Text>
						</Animatable.View>
					)}

					<View style={{marginBottom: 15}}>
						<Text
							style={[
								styles.text_footer,
								{
									marginTop: 10,
								},
							]}>
							Email
						</Text>
						<View style={styles.action}>
							<FontAwesome name="envelope-open" color="#05375a" size={20} />
							<TextInput
								placeholder="Your Email"
								style={styles.textInput}
								autoCapitalize="none"
								onChangeText={val => emailInputChange(val)}
								keyboardType="email-address"
							/>
							{data.check_emailInputChange ? (
								<Animatable.View animation="bounceIn">
									<Feather name="check-circle" color="green" size={20} />
								</Animatable.View>
							) : null}
						</View>
						{data.isValidemail ? null : (
							<Animatable.View animation="fadeInLeft" duration={500}>
								<Text style={styles.errorMsg}>Must be a valid email</Text>
							</Animatable.View>
						)}
					</View>
					<View style={{marginBottom: 15}}>
						<Text
							style={[
								styles.text_footer,
								{
									marginTop: 10,
								},
							]}>
							Phone
						</Text>
						<View style={styles.action}>
							<FontAwesome name="phone" color="#05375a" size={20} />
							<TextInput
								placeholder="Your Phone"
								style={styles.textInput}
								autoCapitalize="none"
								onChangeText={val => phoneInputChange(val)}
								keyboardType="phone-pad"
							/>
							{data.check_phoneInputChange ? (
								<Animatable.View animation="bounceIn">
									<Feather name="check-circle" color="green" size={20} />
								</Animatable.View>
							) : null}
						</View>
						{data.isValidphone ? null : (
							<Animatable.View animation="fadeInLeft" duration={500}>
								<Text style={styles.errorMsg}>
									Must be a valid phone number e.g 0712345678
								</Text>
							</Animatable.View>
						)}
					</View>

					<View style={{marginBottom: 15}}>
						<Text
							style={[
								styles.text_footer,
								{
									marginTop: 10,
								},
							]}>
							Occupation
						</Text>
						<View style={styles.action}>
							<FontAwesome name="briefcase" color="#05375a" size={20} />
							<TextInput
								placeholder="Your Occupation"
								style={styles.textInput}
								autoCapitalize="none"
								onChangeText={val => occupationInputChange(val)}
							/>
							{data.check_occupationInputChange ? (
								<Animatable.View animation="bounceIn">
									<Feather name="check-circle" color="green" size={20} />
								</Animatable.View>
							) : null}
						</View>
						{data.isValidoccupation ? null : (
							<Animatable.View animation="fadeInLeft" duration={500}>
								<Text style={styles.errorMsg}>
									Must contain at least 3 characters
								</Text>
							</Animatable.View>
						)}
					</View>

					{/* <View style={{marginBottom: 15}}> */}
					<Text
						style={[
							styles.text_footer,
							{
								marginTop: 10,
							},
						]}>
						Location
					</Text>
					<View style={styles.action}>
						<FontAwesome name="map-marker" color="#05375a" size={20} />
						<TextInput
							placeholder="Your Location"
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={val => locationInputChange(val)}
						/>
						{data.check_locationInputChange ? (
							<Animatable.View animation="bounceIn">
								<Feather name="check-circle" color="green" size={20} />
							</Animatable.View>
						) : null}
					</View>
					{data.isValidlocation ? null : (
						<Animatable.View animation="fadeInLeft" duration={500}>
							<Text style={styles.errorMsg}>
								Must contain at least 4 characters
							</Text>
						</Animatable.View>
					)}
					{/* </View> */}

					<View style={{marginBottom: 15}}>
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
									Must be at least 8 characters long.
								</Text>
							</Animatable.View>
						)}
					</View>

					<Text
						style={[
							styles.text_footer,
							{
								marginTop: 10,
							},
						]}>
						Confirm Password
					</Text>
					<View style={styles.action}>
						<Feather name="lock" color="#05375a" size={20} />
						<TextInput
							placeholder="Confirm Your Password"
							secureTextEntry={data.confirm_secureTextEntry ? true : false}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={val => handleConfirmPasswordChange(val)}
						/>
						<TouchableOpacity onPress={updateConfirmSecureTextEntry}>
							{data.confirm_secureTextEntry ? (
								<Feather name="eye-off" color="grey" size={20} />
							) : (
								<Feather name="eye" color="grey" size={20} />
							)}
						</TouchableOpacity>
					</View>
					{data.isValidconfirmPassword ? null : (
						<Animatable.View animation="fadeInLeft" duration={500}>
							<Text style={styles.errorMsg}>
								Passwords do not match
							</Text>
						</Animatable.View>
					)}
					<View style={styles.textPrivate}>
						<Text style={styles.color_textPrivate}>
							By signing up you agree to our
						</Text>
						<Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
							{' '}
							Terms of service
						</Text>
						<Text style={styles.color_textPrivate}> and</Text>
						<Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
							{' '}
							Privacy policy
						</Text>
					</View>
				
					<View style={styles.button}>
						<TouchableOpacity
							style={styles.signIn}
							onPress={() => {
								signupHandle(
									data.name,
									data.email,
									data.phone,
									data.location,
									data.occupation,
									data.password,
								);
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
									Sign Up
								</Text>
							</LinearGradient>
						</TouchableOpacity>
						<View style={{flexDirection: 'row', alignItems: 'center', marginTop:20, marginBottom: 5}}>
							<View style={{flex: 1, height: 2, backgroundColor: 'black'}} />
							<View>
								<Text style={{width: 50, textAlign: 'center'}}>OR</Text>
							</View>
							<View style={{flex: 1, height: 2, backgroundColor: 'black'}} />
						</View>
						<TouchableOpacity
							onPress={() => navigation.navigate('SignInScreen')}
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
								Sign In
							</Text>
						</TouchableOpacity>
						{data.loading == true ?(<Spinner
						visible={data.loading}
						textContent={'Processing...'}
						textStyle={{  color: '#333'}}
					/>):null}
					</View>
				</ScrollView>
			</Animatable.View>
		</View>
	);
};

export default SignUpScreen;
const {height, width} = Dimensions.get('screen');
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
	errorMsg: {
		color: '#FF0000',
		fontSize: 14,
	},
	header: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		paddingBottom: 40,
		alignItems: 'center',
	},
	footer: {
		flex: Platform.OS === 'ios' ? 3 : 5,
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30,
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
	header_image: {
		justifyContent: 'flex-end',
		// paddingHorizontal: 20,
		alignItems: 'center',
		marginTop: height * 0.04,
		marginBottom: height * -0.07,
	},
	action: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 0,
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#05375a',
	},
	button: {
		alignItems: 'center',
		marginTop: 50,
		marginBottom: 30,
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
	textPrivate: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 20,
	},
	color_textPrivate: {
		color: 'grey',
	},
});
