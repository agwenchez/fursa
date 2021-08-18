import React, {useReducer, useEffect} from 'react';
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
	TouchableOpacity,
	Button,
	ScrollView
} from 'react-native';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width, height} = Dimensions.get('window');

const initialState = {
	loading: true,
	news: [],
	error: '',
	recruiting: false,
};

const JobsReducer = (initialState, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				...initialState,
				loading: false,
				news: action.payload,
				error: '',
			};

		case 'FETCH_FAILED':
			return {
				...initialState,
				loading: false,
				Jobs: [],
				error: Alert.alert('Something went wrong', error.message),
			};

		default:
			return state;
	}
};

const JobsScreen = () => {
	const [state, dispatch] = useReducer(JobsReducer, initialState);

	useEffect(() => {
		Axios.get(
			'https://demos.mediapal.net/mygov-scraper/scraper/public/api/ministries',
		)
			.then(response => {
				let data = response.data.data;
				data = data.slice(0, 10);
				dispatch({type: 'FETCH_SUCCESS', payload: data});
			})
			.catch(error => Alert.alert('Something went wrong', error.message));
	}, []);

	if (state.loading) {
		return (
			 <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:'center'}}>
			<SkeletonPlaceholder>
				<View
					style={{flexDirection: 'row', alignItems: 'center', height: null}}>
					<View
						style={{
							width: width * 0.35,
							height: height * 0.2,
							borderBottomLeftRadius: 10,
							borderTopLeftRadius: 10,
							marginLeft: 10,
						}}
					/>
					<View style={{marginLeft: 20}}>
						<View
							style={{
								width: width * 0.5,
								height: 40,
								borderRadius: 4,
								marginTop: -5,
							}}
						/>
						<View
							style={{
								marginTop: 30,
								width: width * 0.5,
								height: 20,
								borderRadius: 4,
							}}
						/>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: null,
						marginTop: 10,
					}}>
					<View
						style={{
							width: width * 0.35,
							height: height * 0.2,
							borderBottomLeftRadius: 10,
							borderTopLeftRadius: 10,
							marginLeft: 10,
						}}
					/>
					<View style={{marginLeft: 20}}>
						<View
							style={{
								width: width * 0.5,
								height: 40,
								borderRadius: 4,
								marginTop: -5,
							}}
						/>
						<View
							style={{
								marginTop: 30,
								width: width * 0.5,
								height: 20,
								borderRadius: 4,
							}}
						/>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: null,
						marginTop: 10,
					}}>
					<View
						style={{
							width: width * 0.35,
							height: height * 0.2,
							borderBottomLeftRadius: 10,
							borderTopLeftRadius: 10,
							marginLeft: 10,
						}}
					/>
					<View style={{marginLeft: 20}}>
						<View
							style={{
								width: width * 0.5,
								height: 40,
								borderRadius: 4,
								marginTop: -5,
							}}
						/>
						<View
							style={{
								marginTop: 30,
								width: width * 0.5,
								height: 20,
								borderRadius: 4,
							}}
						/>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: null,
						marginTop: 10,
					}}>
					<View
						style={{
							width: width * 0.35,
							height: height * 0.2,
							borderBottomLeftRadius: 10,
							borderTopLeftRadius: 10,
							marginLeft: 10,
						}}
					/>
					<View style={{marginLeft: 20}}>
						<View
							style={{
								width: width * 0.5,
								height: 40,
								borderRadius: 4,
								marginTop: -5,
							}}
						/>
						<View
							style={{
								marginTop: 30,
								width: width * 0.5,
								height: 20,
								borderRadius: 4,
							}}
						/>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: null,
						marginTop: 10,
					}}>
					<View
						style={{
							width: width * 0.35,
							height: height * 0.2,
							borderBottomLeftRadius: 10,
							borderTopLeftRadius: 10,
							marginLeft: 10,
						}}
					/>
					<View style={{marginLeft: 20}}>
						<View
							style={{
								width: width * 0.5,
								height: 40,
								borderRadius: 4,
								marginTop: -5,
							}}
						/>
						<View
							style={{
								marginTop: 30,
								width: width * 0.5,
								height: 20,
								borderRadius: 4,
							}}
						/>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: null,
						marginTop: 10,
					}}>
					<View
						style={{
							width: width * 0.35,
							height: height * 0.2,
							borderBottomLeftRadius: 10,
							borderTopLeftRadius: 10,
							marginLeft: 10,
						}}
					/>
					<View style={{marginLeft: 20}}>
						<View
							style={{
								width: width * 0.5,
								height: 40,
								borderRadius: 4,
								marginTop: -5,
							}}
						/>
						<View
							style={{
								marginTop: 30,
								width: width * 0.5,
								height: 20,
								borderRadius: 4,
							}}
						/>
					</View>
				</View>
				
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: null,
						marginTop: 10,
					}}>
					<View
						style={{
							width: width * 0.35,
							height: height * 0.2,
							borderBottomLeftRadius: 10,
							borderTopLeftRadius: 10,
							marginLeft: 10,
						}}
					/>
					<View style={{marginLeft: 20}}>
						<View
							style={{
								width: width * 0.5,
								height: 40,
								borderRadius: 4,
								marginTop: -5,
							}}
						/>
						<View
							style={{
								marginTop: 30,
								width: width * 0.5,
								height: 20,
								borderRadius: 4,
							}}
						/>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: null,
						marginTop: 10,
					}}>
					<View
						style={{
							width: width * 0.35,
							height: height * 0.2,
							borderBottomLeftRadius: 10,
							borderTopLeftRadius: 10,
							marginLeft: 10,
						}}
					/>
					<View style={{marginLeft: 20}}>
						<View
							style={{
								width: width * 0.5,
								height: 40,
								borderRadius: 4,
								marginTop: -5,
							}}
						/>
						<View
							style={{
								marginTop: 30,
								width: width * 0.5,
								height: 20,
								borderRadius: 4,
							}}
						/>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: null,
						marginTop: 10,
					}}>
					<View
						style={{
							width: width * 0.35,
							height: height * 0.2,
							borderBottomLeftRadius: 10,
							borderTopLeftRadius: 10,
							marginLeft: 10,
						}}
					/>
					<View style={{marginLeft: 20}}>
						<View
							style={{
								width: width * 0.5,
								height: 40,
								borderRadius: 4,
								marginTop: -5,
							}}
						/>
						<View
							style={{
								marginTop: 30,
								width: width * 0.5,
								height: 20,
								borderRadius: 4,
							}}
						/>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: null,
						marginTop: 10,
					}}>
					<View
						style={{
							width: width * 0.35,
							height: height * 0.2,
							borderBottomLeftRadius: 10,
							borderTopLeftRadius: 10,
							marginLeft: 10,
						}}
					/>
					<View style={{marginLeft: 20}}>
						<View
							style={{
								width: width * 0.5,
								height: 40,
								borderRadius: 4,
								marginTop: -5,
							}}
						/>
						<View
							style={{
								marginTop: 30,
								width: width * 0.5,
								height: 20,
								borderRadius: 4,
							}}
						/>
					</View>
				</View>
			</SkeletonPlaceholder>
			</ScrollView>
		);
	} else {
		return (
			<View style={styles.container}>
				{/* <View style={styles.news}> */}
				<FlatList
					data={state.news}
					renderItem={({item}) => {
						return (
							<TouchableOpacity
								onPress={() => alert('functionality inamuok soonest')}>
								<View style={styles.card}>
									<View style={styles.cardImgWrapper}>
										<Image
											source={{uri: item.image_link}}
											resizeMode="cover"
											style={styles.cardImg}
										/>
									</View>
									<View style={{flex: 2}}>
										<View style={styles.cardInfo}>
											<Text style={styles.cardTitle}>{item.title}</Text>
											<View
												style={{
													flex: 1,
													flexDirection: 'row',
													bottom: 15,
													position: 'absolute',
													marginLeft: 5,
												}}>
												{initialState.recruiting ? (
													<View
														style={{
															flex: 1,
															flexDirection: 'row',
															paddingLeft: 30,
														}}>
														<Icon
															name="check-circle"
															size={24}
															style={{color: 'green'}}
														/>
														<Text
															style={{
																marginLeft: 5,
																marginTop: 2,
																fontSize: 14,
															}}>
															Recruitment closed
														</Text>
													</View>
												) : (
													<View
														style={{
															flex: 1,
															flexDirection: 'row',
															paddingLeft: 30,
														}}>
														<Icon
															name="check-square-o"
															size={24}
															style={{color: 'green'}}
														/>
														<Text
															style={{
																marginLeft: 5,
																marginTop: 2,
																fontSize: 14,
															}}>
															Actively recruiting
														</Text>
													</View>
												)}
											</View>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						);
					}}
					keyExtractor={item => item.id.toString()}
				/>
				{/* </View> */}
			</View>
		);
	}
};

export default JobsScreen;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	card: {
		height: 130,
		marginVertical: 10,
		flexDirection: 'row',
		shadowColor: '#999',
		shadowOffset: {width: 0, height: 1},
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
		marginLeft: 10,
		marginRight: 10,
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
		alignContent: 'center',
		justifyContent: 'space-between',
		paddingLeft: 20,
	},
	cardTitle: {
		fontWeight: 'bold',
		fontSize: 15,
	},
	cardDetails: {
		fontSize: 12,
		color: '#444',
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
});
