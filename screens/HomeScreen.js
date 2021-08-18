import React, {useState, useEffect, useReducer} from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
	ScrollView,
	Alert,
	Dimensions,
	FlatList,
	TouchableWithoutFeedback,
	ActivityIndicator,
	ImageBackground,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import LottieView from 'lottie-react-native';

// const [favorites, setFavorites] = useState([]);
// const [isFavorite, setFav] = useState(false)

const initialState = {
	news: [],
	loading: true,
};

const initialState2 = {
	loading: true,
	errors: '',
	id: null,
	tittle: null,
	excerpt: null,
	image_link: null,
	isFavorite: false,
};


const NewsReducer = (initialState, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				...initialState,
				loading: false,
				news: action.payload,
				errors: '',
			};

		case 'FETCH_FAILED':
			return {
				...initialState,
				loading: false,
				news: [],
				errors: Alert.alert('Something went wrong', errors.message),
			};
	}
};

const HomeScreen = ({navigation}) => {
	const theme = useTheme();
	const [state, dispatch] = useReducer(NewsReducer, initialState);

	const fetchNews = () => {
		Axios.get(
			'https://demos.mediapal.net/mygov-scraper/scraper/public/api/ministries',
		)
			.then(response => {
				let data = response.data.data;
				data = data.slice(0, 5);
				dispatch({type: 'FETCH_SUCCESS', payload: data});
			})
			.catch(error => Alert.alert('Something went wrong', error.message));
	};

	useEffect(() => {
		fetchNews();
	}, []);

	let images = [];
	images = state.news.map(images => images.image_link);

	return (
		<ScrollView style={styles.container}>
			<StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
			<View style={styles.sliderContainer}>
				<Swiper
					autoplay
					horizontal={false}
					height={200}
					activeDotColor="#216719">
					<View style={styles.slide}>
						<Image
							source={{uri: images[0]}}
							resizeMode="cover"
							style={styles.sliderImage}
						/>
					</View>
					<View style={styles.slide}>
						<Image
							source={{uri: images[1]}}
							resizeMode="cover"
							style={styles.sliderImage}
						/>
					</View>
					<View style={styles.slide}>
						<Image
							source={{uri: images[3]}}
							resizeMode="cover"
							style={styles.sliderImage}
						/>
					</View>
					<View style={styles.slide}>
						<Image
							source={{uri: images[4]}}
							resizeMode="cover"
							style={styles.sliderImage}
						/>
					</View>
				</Swiper>
			</View>

			<View style={styles.categoryContainer}>
				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => navigation.navigate('Big4AgendaScreen')}>
					<View style={styles.categoryIcon}>
						<Ionicons name="ios-business" size={35} color="#216719" />
					</View>
					<Text style={styles.categoryBtnTxt}>Big 4 Agenda</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => navigation.navigate('JobsScreen')}>
					<View style={styles.categoryIcon}>
						<Ionicons name="ios-briefcase" size={35} color="#216719" />
					</View>
					<Text style={styles.categoryBtnTxt}>Jobs</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => navigation.navigate('NewsScreen')}>
					<View style={styles.categoryIcon}>
						<Ionicons name="ios-paper" size={35} color="#216719" />
					</View>
					<Text style={styles.categoryBtnTxt}>News</Text>
				</TouchableOpacity>
			</View>
			<View style={[styles.categoryContainer, {marginTop: 10}]}>
				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => navigation.navigate('NoticesScreen')}>
					<View style={styles.categoryIcon}>
						<Ionicons name="ios-notifications" size={35} color="#216719" />
					</View>
					<Text style={styles.categoryBtnTxt}>Notices</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() =>
						navigation.navigate('CardListScreen', {title: 'Favorites'})
					}>
					<View style={styles.categoryIcon}>
						<Ionicons name="ios-heart" size={35} color="#216719" />
					</View>
					<Text style={styles.categoryBtnTxt}>Favorites</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => navigation.navigate('Explore')}>
					<View style={styles.categoryIcon}>
						<MaterialIcons name="navigate-next" size={50} color="#216719" />
					</View>
					<Text style={styles.categoryBtnTxt}>View More</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.container}>
				<View style={{alignItems: 'center'}}>
					<Text
						style={{
							paddingHorizontal: 20,
							fontSize: 18,
							fontWeight: 'bold',
							marginTop: 30,
							marginBottom: 20,
						}}>
						Featured Jobs
					</Text>
				</View>
				<View style={styles.news}>
					<FlatList
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						data={state.news}
						renderItem={({item}) => {
							return (
								<TouchableOpacity>
									<View style={styles.cardNews}>
										<Image
											source={{uri: item.image_link}}
											style={[StyleSheet.absoluteFill, {borderRadius: 15}]}
										/>
										<View style={styles.gradient}>
											<Text
												style={{
													color: '#fff',
													position: 'absolute',
													bottom: 10,
													left: 5,
													fontSize: 17,
												}}>
												{item.title}
											</Text>
											<View style={{right: 5, top: 10, position: 'absolute'}}>
											<LottieView
												source = {require('../assets/like-animation.json')}
												autoPlay = {false}
												style = {{ height: 20, width:20}}
												loop = {false}
											/>	
												{/* {initialState2.isFavorite == false ? (
													<Icon
														name="heart-o"
														size={35}
														color="red"
														onPress={() => {}}
													/>
												) : (
													<Icon
														name="heart"
														size={35}
														color="red"
														onPress={() => {
															// alert('already added to favorites');
														}}
													/>
												)} */}
											</View>
										</View>
									</View>
								</TouchableOpacity>
							);
						}}
						keyExtractor={item => item.id.toString()}
					/>
				</View>
			</View>

			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginRight: 10,
					marginBottom: -20,
				}}>
				<TouchableOpacity style={styles.newspaper}>
					<Text style={styles.newspaperText}>English Newspaper</Text>
					<Icon
						name="arrow-right"
						style={styles.newspaperIcon}
						onPress={() => alert('coming soon bazeng')}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.newspaper}>
					<Text style={styles.newspaperText}>Kiswahili Newspaper</Text>
					<Icon
						name="arrow-right"
						style={styles.newspaperIcon}
						onPress={() => alert('coming soon bazeng')}
					/>
				</TouchableOpacity>
			</View>

			<View style={[styles.container, {marginBottom: 25}]}>
				<View style={{alignItems: 'center'}}>
					<Text
						style={
							(theme.light ? 'dark-content' : 'light-content',
							{
								paddingHorizontal: 20,
								fontSize: 18,
								fontWeight: 'bold',
								marginTop: 30,
								marginBottom: 20,
							})
						}>
						Latest News
					</Text>
				</View>
				<View style={styles.news}>
					<FlatList
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						data={state.news}
						renderItem={({item}) => {
							return (
								<TouchableWithoutFeedback
									onPress={() => {
										alert('Functionality inamuok soon');
									}}>
									<View style={styles.cardNews}>
										<Image
											source={{uri: item.image_link}}
											style={[StyleSheet.absoluteFill, {borderRadius: 15}]}
										/>
										<View style={styles.gradient}>
											<Text
												style={{
													color: '#fff',
													position: 'absolute',
													bottom: 10,
													left: 5,
													fontSize: 17,
												}}>
												{item.title}
											</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
							);
						}}
						keyExtractor={item => item.id.toString()}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

export default HomeScreen;

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	newspaperIcon: {
		fontSize: 30,
		position: 'absolute',
		bottom: 30,
		right: 20,
	},
	newspaperText: {
		marginTop: 20,
		fontSize: 28,
	},
	cardNews: {
		width: width - 50,
		height: height * 0.35,
		backgroundColor: '#fff',
		marginBottom: 15,
		borderRadius: 15,
		marginLeft: 15,
		marginRight: 5,
	},
	news: {
		alignSelf: 'center',
		paddingTop: 10,
	},
	gradient: {
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.3)',
		borderRadius: 15,
	},
	newspaper: {
		height: 200,
		width: '45%',
		backgroundColor: '#216719',
		borderRadius: 15,
		marginTop: 50,
		marginLeft: 10,
		marginBottom: 50,
		flex: 1,
		padding: 10,
	},
	sliderContainer: {
		// height: '100%',
		width: '90%',
		marginTop: 15,
		justifyContent: 'center',
		alignSelf: 'center',
		borderRadius: 8,
		marginBottom: 30,
	},

	slide: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'transparent',
		borderRadius: 8,
		
	},
	sliderImage: {
		height: '100%',
		width: '100%',
		alignSelf: 'center',
		borderRadius: 8,
	},
	categoryContainer: {
		flexDirection: 'row',
		width: '90%',
		alignSelf: 'center',
		marginTop: 25,
		marginBottom: 10,
	},
	categoryBtn: {
		flex: 1,
		width: '30%',
		marginHorizontal: 0,
		alignSelf: 'center',
	},
	categoryIcon: {
		borderWidth: 0,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		width: 70,
		height: 70,
		backgroundColor: '#fdeae7' /* '#FF6347' */,
		borderRadius: 50,
	},
	categoryBtnTxt: {
		alignSelf: 'center',
		marginTop: 5,
		color: '#216719',
	},
	cardsWrapper: {
		marginTop: 20,
		width: '90%',
		alignSelf: 'center',
	},
	card: {
		height: 100,
		marginVertical: 10,
		flexDirection: 'row',
		shadowColor: '#999',
		shadowOffset: {width: 0, height: 1},
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
	},
	cardImgWrapper: {
		flex: 1,
	},
	cardImg: {
		height: '100%',
		width: '100%',
		alignSelf: 'center',
		borderRadius: 8,
		borderBottomRightRadius: 0,
		borderTopRightRadius: 0,
	},
	cardInfo: {
		flex: 2,
		padding: 10,
		borderColor: '#ccc',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderBottomRightRadius: 8,
		borderTopRightRadius: 8,
		backgroundColor: '#fff',
	},
	cardTitle: {
		fontWeight: 'bold',
	},
	cardDetails: {
		fontSize: 12,
		color: '#444',
		marginTop: 10,
	},
	newsCard: {
		height: 280,
		width: 280,
		marginLeft: 20,
		marginRight: 20,
		borderWidth: 0.5,
		borderRadius: 10,
		borderColor: '#dddd',
	},
});
