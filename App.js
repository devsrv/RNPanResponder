/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	PanResponder,
	Animated
} from 'react-native';


class App  extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pan: new Animated.ValueXY(),
			items: [1,2,3,4,5]
		};

		this.animY = new Animated.Value(0);
		this.lastY = 0;

		this._panResponder = PanResponder.create({
			// Ask to be the responder:
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
		
			onPanResponderGrant: (evt, gestureState) => {
			},
			onPanResponderMove: (evt, gestureState) => {
				let { dy } = gestureState;
				this.animY.setValue(this.lastY + dy);
				
				return Animated.event([null, {
					dx: this.state.pan.x,
					dy: this.state.pan.y,
				}])(evt, gestureState)
			  },
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderRelease: (evt, gestureState) => {
				let { dy } = gestureState;
				this.lastY += dy;
				// The user has released all touches while this view is the
				// responder. This typically means a gesture has succeeded
			},
		});
	}

	handleScroll = () => {
		console.log('scroll init');
	}

	render() {
		this.state.pan.addListener((value) => {
			// console.log(Animated.add(this.animY, this.state.pan.y).__getValue());
			console.log('animY', this.animY);
		});
		
		

		const AnimateHeaderHeight = Animated.diffClamp(this.animY, -200, 0).interpolate(
			{
				inputRange: [ -200, 0 ],
				outputRange: [ 50, 200 ],
				extrapolate: 'clamp'
			});

		return (
			<View style={{flex: 1}}>
				<Animated.View style={[{backgroundColor: '#4287f5', height: AnimateHeaderHeight}]}>
					<Text>Sample</Text>
				</Animated.View>
				<ScrollView style={{flex: 1, backgroundColor: '#e6efff'}}
					onScroll={this.handleScroll}
					{...this._panResponder.panHandlers}
					scrollEnabled={false}
				>
					{this.state.items.map((item, index) => {
						return (
							<View style={styles.item} key={index}>
								<Text>Sample</Text>
							</View>
						)
					})}	
				</ScrollView>
			</View>
		)
	}
};


export default App;

const styles = StyleSheet.create ({
	item: {
	   flexDirection: 'row',
	   justifyContent: 'space-between',
	   alignItems: 'center',
	   padding: 20,
	   margin: 5,
	   backgroundColor: '#daccff'
	}
 })