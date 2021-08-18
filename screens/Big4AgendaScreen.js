import React from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, Image, ActivityIndicator , TouchableWithoutFeedback, ScrollView} from 'react-native';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width, height } = Dimensions.get('window');

export default class Big4AgendaScreen extends React.Component {
    state = {
        news: [],
        loading: true
    };

    fetchnews = () => {
        fetch(
            'https://demos.mediapal.net/mygov-scraper/scraper/public/api/big4agenda',
        )
            .then(res => res.json())
            .then(response => {
                this.setState({
                    news: response.data,
                    loading: false
                });
            });
    };

    componentDidMount() {
        this.fetchnews();
    }

    render() {

        if (this.state.loading) {
            return (
                <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:'center'}}>
				<SkeletonPlaceholder>
					<View style={{alignItems: 'center', justifyContent: 'center'}}>
						{/* <View style={{ width: 60, height: 60, borderRadius: 50 }} /> */}
						
							<View
								style={{
									width: width * 0.9,
									height: height * 0.35,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
                            <View
								style={{
									width: width * 0.9,
									height: height * 0.35,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
                            <View
								style={{
									width: width * 0.9,
									height: height * 0.35,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
                            <View
								style={{
									width: width * 0.9,
									height: height * 0.35,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
                            <View
								style={{
									width: width * 0.9,
									height: height * 0.35,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
							<View
								style={{
									width: width * 0.9,
									height: height * 0.35,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
							<View
								style={{
									width: width * 0.9,
									height: height * 0.35,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
                            <View
								style={{
									width: width * 0.9,
									height: height * 0.35,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
                            <View
								style={{
									width: width * 0.9,
									height: height * 0.35,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
                            <View
								style={{
									width: width * 0.9,
									height: height * 0.35,
									borderRadius: 10,
									marginTop: 10,
								}}
							/>
						
					</View>
				</SkeletonPlaceholder>
			</ScrollView>
              );


        } else {

            return (


                <View style={styles.container}>
                    <View style={styles.news}>
                        <FlatList
                            data={this.state.news}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableWithoutFeedback onPress={() => { alert('Functionality inamuok soon') }}>
                                        <View style={styles.card} >
                                            <Image source={{ uri: item.image_link }} style={[StyleSheet.absoluteFill, { borderRadius: 15 }]} />
                                            <View style={styles.gradient}>
                                                <Text style={{ color: '#fff', position: 'absolute', bottom: 10, left: 5, fontSize: 18 }}>{item.title}</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }}
                        />
                    </View>
                </View>

            );
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    card: {
        width: width - 50,
        height: 180,
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 15
    },
    news: {
        alignSelf: 'center',
        paddingTop: 10
    },
    gradient: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15
    }
});
