import React from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet,
	Animated,
	TouchableOpacity,
	Dimensions,
	ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ExploreScreen = ({navigation}) => {
	return (
		<ScrollView style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate('Big4AgendaScreen')}>
				<View style={styles.card}>
					<View>
						<Icon style={styles.cardIcon} size={30} name="home" />
					</View>

					<Text style={styles.cardText}>Big 4 Agenda</Text>
					<View>
						<Icon style={styles.chevron} size={30} name="chevron-right" />
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Big4AgendaScreen')}>
				<View style={styles.card}>
					<View>
						<Icon style={styles.cardIcon} size={30} name="building" />
					</View>

					<Text style={styles.cardText}>Ministries</Text>

					<View>
						<Icon style={styles.chevron} size={30} name="chevron-right" />
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('NewsScreen')}>
				<View style={styles.card}>
					<View>
						<Icon style={styles.cardIcon} size={30} name="bicycle" />
					</View>

					<Text style={styles.cardText}>Counties</Text>
					<View>
						<Icon style={styles.chevron} size={30} name="chevron-right" />
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Big4AgendaScreen')}>
				<View style={styles.card}>
					<View>
						<Icon style={styles.cardIcon} size={30} name="car" />
					</View>

					<Text style={styles.cardText}>The Presidency</Text>
					<View>
						<Icon style={styles.chevron} size={30} name="chevron-right" />
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('NoticesScreen')}>
				<View style={styles.card}>
					<View>
						<Icon style={styles.cardIcon} size={30} name="bell" />
					</View>

					<Text style={styles.cardText}>Notices</Text>
					<View>
						<Icon style={styles.chevron} size={30} name="chevron-right" />
					</View>
				</View>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate('Big4AgendaScreen')}>
				<View style={[styles.card, {marginBottom: 40}]}>
					<View>
						<Icon style={styles.cardIcon} size={30} name="briefcase" />
					</View>

					<Text style={styles.cardText}>Tenders</Text>
					<View>
						<Icon style={styles.chevron} size={30} name="chevron-right" />
					</View>
				</View>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default ExploreScreen;

const {height} = Dimensions.get('window');
const card_height = height * 0.12;
// const card_width = width * 0.20
const styles = StyleSheet.create({
	container: {
		// flex: 1,
	},
	card: {
		backgroundColor: '#ddd',
		height: card_height,
		width: null,
		borderRadius: 10,
		margin: 10,
	},
	cardText: {
		fontSize: 24,
		left: 100,
		bottom: 10,
	},
	cardIcon: {
		left: 55,
		top: 20,
	},
	chevron: {
		left: 300,
		bottom: 40,
	},
});
