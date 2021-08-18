import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	Animated,
	ScrollView,
	TouchableOpacity,
	Image,
	Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window')
const img1 = require('../assets/opportunity.png');
const img2 = require('../assets/hiring.png');
const img3 = require('../assets/newspaper.png');
const img4 = require('../assets/getjob.png');

const onBoardings = [
	{
		tittle: 'Opportunity at your fingertips',
		description: ' Be bold enough and let opportunities find you wherever you are. ',
		img: img1,
	},
	{
		tittle: 'Find Jobs and get tenders',
		description: ' Landing a job or tender is just a button click away. Apply now and draw closer to that opportunity of a lifetime',
		img: img2,
	},
	{
		tittle: 'Get the latest news on the go!',
		description: ' Get updated news about your county, ministry of choice, the Big 4 agenda, the Presidency and much much more ',
		img: img3,
	},{
		tittle: 'Opportunity waiting to be discovered',
		description: 'Register a new account or login with an existing account to access our myriad of opportunities waiting to be discovered by you.',
		img: img4,
	}
];

const SplashScreen = ({navigation}) => {
	const [completed, setCompleted] = React.useState(false);

    const scrollX = new Animated.Value(0);

    React.useEffect(() => {
        scrollX.addListener(({ value }) => {
            if (Math.floor(value / width) === onBoardings.length - 1) {
                setCompleted(true);
            }
        });

        return () => scrollX.removeListener();
    }, []);

	const renderContent = () => {
		return (
			<Animated.ScrollView
			horizontal
			pagingEnabled
			scrollEnabled
			snapToAlignment='center'
			decelerationRate = {0}
			scrollEventThrottle = {16}
			showsHorizontalScrollIndicator= {false}
			onScroll={Animated.event([
				{ nativeEvent: { contentOffset: { x: scrollX } } },
			], { useNativeDriver: false })}
			>
				{onBoardings.map((item, index) => (
					<View 
					key={index}
					style = {{ width: width}}
					>
						<View style={{flex:1}} >
							<Image 
							source= {item.img}
							resizeMode = 'center'
							style = {{
								width: width * 1,
								height: height * 0.8
							}}
							/>
						</View>
						<View style={{ position:'absolute', bottom:'20%'}} > 
							<Text style={{textAlign:'center', fontSize: 26, paddingLeft:15,paddingRight:15}} >{item.tittle}</Text>
							<Text  style={{textAlign:'center', fontSize: 16, marginTop: 20, paddingLeft:15, paddingRight:15}}>{item.description}</Text>
						</View>

						<TouchableOpacity
                            style={{
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                                width: width * 0.4,
                                height: height * 0.09,
                                paddingLeft: 20,
                                justifyContent: 'center',
                                borderTopLeftRadius:height * 0.09,
                                borderBottomLeftRadius: height * 0.09,
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 0,
                                backgroundColor: '#216719'
                            }}
                            onPress={() => navigation.navigate('SignUpScreen')}
                        >
                            <Text style={{color: 'white', textAlign:'center' , fontSize: 20}}>{completed ? "Get started" : "Skip"}</Text>
                        </TouchableOpacity>
					</View>
				))}
			</Animated.ScrollView>
		);
	};
	function renderDots() {

        const dotPosition = Animated.divide(scrollX, width);

        return (
            <View style={styles.dotsContainer}>
                {onBoardings.map((item, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    });

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [8, 17,8],
                        extrapolate: "clamp"
                    });

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={[styles.dot, { width: dotSize, height: dotSize, }]}
                        />
                    );
                })}
            </View>
        );
    }

	return (
		<SafeAreaView style={styles.container}>
			<View>
				{renderContent()}
			</View>
			<View>
				{renderDots()}
			</View>
				
		</SafeAreaView>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageAndTextContainer: {
        width: width
    },
    dotsRootContainer: {
        position: 'absolute',
        bottom: height > 700 ? '20%' : '16%',
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24/ 2,
        marginBottom: 24 * 3,
        height: 24,
    },
    dot: {
        borderRadius: 12,
        backgroundColor: '#216719',
        marginHorizontal: 12 / 2
    }
});
