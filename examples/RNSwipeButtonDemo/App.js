/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import thumbIcon from './assets/thumbIcon.png';
import styles from './styles';

import SwipeButton from 'rn-swipe-button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'swipe status appears here',
    };
  }
  showToastMessage = message => this.setState({message});
  renderSubHeading = heading => (
    <Text style={styles.subHeading}>{heading}</Text>
  );
  renderSwipeStatus = () => (
    <Text style={styles.swipeStatus}>{this.state.message}</Text>
  );
  render() {
    const TwitterIcon = () => <Icon name="twitter" color="#3b5998" size={30} />;
    const FacebookIcon = () => (
      <Icon name="facebook" color="#3b5998" size={30} />
    );

    setInterval(
      () => this.setState({message: 'swipe status appears here'}),
      5000,
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>React Native Swipe Button</Text>
        {this.renderSwipeStatus()}
        {this.renderSubHeading('Disabled')}
        <SwipeButton disabled={true} />
        {this.renderSubHeading('Swipe status callbacks')}
        <SwipeButton
          disabled={false}
          onSwipeStart={() => this.showToastMessage('Swipe started!')}
          onSwipeFail={() => this.showToastMessage('Incomplete swipe!')}
          onSwipeSuccess={() =>
            this.showToastMessage('Submitted successfully!')
          }
        />
        {this.renderSubHeading('Right to left swipe enabled')}
        <SwipeButton
          enableRightToLeftSwipe
          thumbIconBackgroundColor="#FFFFFF"
          thumbIconComponent={FacebookIcon}
          title="Slide to unlock"
          onSwipeSuccess={() => this.showToastMessage('Slide success!')}
        />
        {this.renderSubHeading('Set a component as thumb icon')}
        <SwipeButton
          thumbIconBackgroundColor="#FFFFFF"
          thumbIconComponent={TwitterIcon}
          title="Slide to unlock"
        />
        {this.renderSubHeading('Set .png image as thumb icon')}
        <SwipeButton thumbIconImageSource={thumbIcon} />
        {this.renderSubHeading('Set height')}
        <SwipeButton height={25} />
        {this.renderSubHeading('Set height and width')}
        <SwipeButton height={35} width={150} title="Swipe" />
      </View>
    );
  }
}

export default App;
