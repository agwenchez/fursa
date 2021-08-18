import React, {useReducer, useEffect, useMemo, useState} from 'react';
import {
	View,
	StyleSheet,
	Text,
	FlatList,
	Dimensions,
	Image,
	ActivityIndicator,
	TouchableWithoutFeedback,
	Alert,
	ScrollView,
} from 'react-native';
import Axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Button, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

// const initialState = {
// 	loading: true,
// 	news: {},
// 	error: '',
// 	favID: null
// };

// const NewsReducer = (initialState, action) => {
// 	switch (action.type) {
// 		case 'FETCH_SUCCESS':
// 			return {
// 				...initialState,
// 				loading: false,
// 				news: action.payload,
// 				error: '',
// 			};

// 		case 'FETCH_FAILED':
// 			return {
// 				...initialState,
// 				loading: false,
// 				news: [],
// 				error: Alert.alert('Something went wrong', error.message),
// 			};

// 		default:
// 			return state;
// 	}
// };

const NewsScreen = () => {
	// const [state, dispatch] = useReducer(NewsReducer, initialState);
	const [data, setData] = useState({
		news: [],
		loading: true,
		error: ''
	});

	// const [visible, setVisible] = React.useState(false);

	// const onToggleSnackBar = () => setVisible(!visible);
  
	// const onDismissSnackBar = () => setVisible(false);

	// const fetchNews = async () => {
	// 	await Axios.get(
	// 		'https://demos.mediapal.net/mygov-scraper/scraper/public/api/ministries',
	// 	)
	// 		.then(response => {
	// 			let data = response.data.data;
	// 			dispatch({type: 'FETCH_SUCCESS', payload: data});
	// 		})
	// 		.catch(err => Alert.alert('Something went wrong', err.message));
	// };

	const News = async () => {
		await Axios.get(
			'https://demos.mediapal.net/mygov-scraper/scraper/public/api/ministries',
		)
			.then(response => {
				let newsData = response.data.data;
				let arr = newsData.map((item, index) => {
					item.isFavorite = false;
					return {...item};
				});

			
				setData({
					...data,
					loading: false,
					news: arr,

				});
				
				return arr;
			})
			.catch(err => Alert.alert('Something went wrong', err.message));

			
	};

	const addFavorite =async (favID) => {
		const {news} = data;

		let Foundfavorite = news[favID];
		let fav = Foundfavorite.id - 1;

		let arr = news.map((item, index) => {
			if (item.id == fav) {
				item.isFavorite = true;
			}
			return {...item};
		});
		Alert.alert('Success', 'Added to favorites successfuly ');
		

		// console.log(news)
		setData({news: arr});
		// console.log('news state',news)

		// let favorite = news.find(element => element.id == fav);

		try {
			await AsyncStorage.setItem('updated news state', JSON.stringify(news))
			
		} catch (error) {
			console.log(error);
		}

	console.log('Async favorite found ==>', news);
		
		
	};


	const getFavorite = async () =>{
		try {
			const value = await AsyncStorage.getItem('updated news state');
			if (value !== null) {
				// We have data!!
				console.log('async fetched updated state ==>',value);
				// setData({news:value})
			}
		} catch (error) {
			// Error retrieving data
			console.log(error)
		}

	}

	const renderItem = ({item}) => {
		return (
			<Item
				item={item}
				onPress={() => {
					alert('Functionality inamuok soon');
				}}
				addFavorite={() => {
					addFavorite(item.id);
				}}
			/>
		);
	};

	const Item = ({item, onPress, addFavorite}) => {
		const {title, image_link} = item;
		return (
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={styles.card}>
					<Image
						source={{uri: image_link}}
						style={[StyleSheet.absoluteFill, {borderRadius: 15}]}
					/>
					<View style={styles.gradient}>
						<Text
							style={{
								color: '#fff',
								position: 'absolute',
								bottom: 10,
								left: 5,
								fontSize: 18,
							}}>
							{title}
						</Text>
						<View style={{right: 5, top: 10, position: 'absolute'}}> 
							 <Icon
								name={item.isFavorite ? 'heart' : 'heart-o'}
								size={35}
								color="red"
								onPress={addFavorite}
							/> 
							
						 </View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	};

	useEffect(() => {

		News();

	}, []);

	if (data.loading) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" />
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<View style={styles.news}>
					<FlatList
						extraData={addFavorite}
						data={Object.values(data.news)}
						renderItem={renderItem}
						keyExtractor={item => item.id.toString()}
					/>
				</View>
			</View>
		);
	}
};

export default React.memo(NewsScreen);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	card: {
		width: width - 50,
		height: height * 0.33,
		backgroundColor: '#fff',
		marginBottom: 15,
		borderRadius: 15,
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
	heart:{
		height: height * 0.03,
		width: width * 0.03
	}
});
