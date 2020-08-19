/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, View, Text, StatusBar, Button} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import thumbIcon from './assets/thumbIcon.png';
import arrowRight from './assets/arrow-right.png';
import styles from './styles';

import SwipeButton from 'rn-swipe-button';
/**
 * Follow below steps to test live changes of rn-swipe-button.
 * 1. Copy 'src' folder from RNSwipeButton to 'RNSwipeButton/examples/RNSwipeButtonDemo' folder
 * 2. Comment above SwipeButton import and uncomment below one
 *
 * Note: NPM linking has some issue react-native/HAUL build tools.
 */
// import SwipeButton from './src/components/SwipeButton';


const App: () => React$Node = () => {
  const defaultStatusMessage = 'swipe status appears here';
  const [swipeStatusMessage, setSwipeStatusMessage] = useState(
    defaultStatusMessage,
  );

  const TwitterIcon = () => <Icon name="twitter" color="#3b5998" size={30} />;
  const FacebookIcon = () => <Icon name="facebook" color="#3b5998" size={30} />;

  setInterval(() => setSwipeStatusMessage(defaultStatusMessage), 5000);
  const updateSwipeStatusMessage = (message) => setSwipeStatusMessage(message);
  const renderSubHeading = (heading) => (
    <Text style={styles.subHeading}>{heading}</Text>
  );
  let forceResetLastButton = null;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.title}>React Native Swipe Button</Text>
          <Text style={styles.swipeStatus}>{swipeStatusMessage}</Text>
          {renderSubHeading('Disabled')}
          <SwipeButton thumbIconImageSource={arrowRight} disabled />
          {renderSubHeading('Swipe status callbacks')}
          <SwipeButton
            thumbIconImageSource={arrowRight}
            onSwipeStart={() => updateSwipeStatusMessage('Swipe started!')}
            onSwipeFail={() => updateSwipeStatusMessage('Incomplete swipe!')}
            onSwipeSuccess={() =>
              updateSwipeStatusMessage('Submitted successfully!')
            }
          />
          {renderSubHeading('Right to left swipe enabled')}
          <SwipeButton
            enableRightToLeftSwipe
            thumbIconBackgroundColor="#FFFFFF"
            thumbIconComponent={FacebookIcon}
            title="Slide to unlock"
            onSwipeSuccess={() => updateSwipeStatusMessage('Slide success!')}
          />
          {renderSubHeading('Set a component as thumb icon & use forceReset')}
          <SwipeButton
            thumbIconBackgroundColor="#FFFFFF"
            thumbIconComponent={TwitterIcon}
            title="Slide to unlock"
            railStyles={{
              backgroundColor: '#44000088',
              borderColor: '#880000FF',
            }}
            forceReset={ reset => {
              forceResetLastButton = reset
            }}
          />
          <View style={{ alignItems: 'center', marginBottom: 5 }}>
            <Button onPress={() => forceResetLastButton && forceResetLastButton()} title="Force reset" />
          </View>  
          {renderSubHeading('Set .png image as thumb icon')}
          <SwipeButton thumbIconImageSource={thumbIcon} />
          {renderSubHeading('Set height')}
          <SwipeButton height={25} />
          {renderSubHeading('Set height and width')}
          <SwipeButton height={35} width={150} title="Swipe" />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
