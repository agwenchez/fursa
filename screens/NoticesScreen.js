import React, {useEffect, useReducer} from 'react';
import {
	View,
	StyleSheet,
	Text,
	FlatList,
	Dimensions,
	Image,
	ActivityIndicator,
    Linking,
    ScrollView,
    Alert,
    TouchableWithoutFeedback
} from 'react-native';
import Axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width, height} = Dimensions.get('window');

const initialState = {
	loading: true,
	notices: [],
	errors: '',
};

const NoticesReducer = (initialState, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				...initialState,
				loading: false,
				notices: action.payload,
				errors: '',
			};

		case 'FETCH_FAILED':
			return {
				...initialState,
				loading: false,
				notices: [],
				errors: Alert.alert('Something went wrong', errors.message),
			};

		default:
			return state;
	}
};

const NoticesScreen = () => {
	const [state, dispatch] = useReducer(NoticesReducer, initialState);

	useEffect(() => {
		Axios.get(
			'https://demos.mediapal.net/mygov-scraper/scraper/public/api/notices',
		)
			.then(response => {
				dispatch({type: 'FETCH_SUCCESS', payload: response.data.data});
			})
			.catch(err => Alert.alert('Something went wrong', err.message));
	}, []);

	if (state.loading) {
		return (
			<ScrollView style={{flex:1}} contentContainerStyle={{alignItems:'center'}}>
				<SkeletonPlaceholder speed="20">
					<View style={{alignItems: 'center', justifyContent: 'center'}}>
						{/* <View style={{ width: 60, height: 60, borderRadius: 50 }} /> */}
						<View>
							<View
								style={{
									width: width * 0.9,
									height: height * 0.3,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
                            <View
								style={{
									width: width * 0.9,
									height: height * 0.3,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
                            <View
								style={{
									width: width * 0.9,
									height: height * 0.3,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
                            <View
								style={{
									width: width * 0.9,
									height: height * 0.3,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
                            <View
								style={{
									width: width * 0.9,
									height: height * 0.3,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
							<View
								style={{
									width: width * 0.9,
									height: height * 0.3,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
							<View
								style={{
									width: width * 0.9,
									height: height * 0.3,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
                            <View
								style={{
									width: width * 0.9,
									height: height * 0.3,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
                            <View
								style={{
									width: width * 0.9,
									height: height * 0.3,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
                            <View
								style={{
									width: width * 0.9,
									height: height * 0.3,
									borderRadius: 10,
									marginTop: 10,
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
				<View style={styles.news}>
					<FlatList
						data={state.notices}
						keyExtractor={item => item.id.toString()}
						renderItem={({item}) => {
							return (
								<TouchableWithoutFeedback
									onPress={() => Linking.openURL(item.pdf_link)}>
									<View style={styles.card}>
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
													fontSize: 18,
												}}>
												{item.title}
											</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
							);
						}}
					/>
				</View>
			</View>
		);
	}
};

export default NoticesScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	card: {
		width: width - 50,
		height: height * 0.3,
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
		backgroundColor: 'rgba(0,0,0,0.5)',
		borderRadius: 15,
	},
});
