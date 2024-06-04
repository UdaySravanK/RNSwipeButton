/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, View, Text, StatusBar, Button} from 'react-native';

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
  const [disableCBButton, setDisableCBButton] = useState(false)
  const defaultStatusMessage = 'swipe status appears here';
  const [swipeStatusMessage, setSwipeStatusMessage] = useState(
    defaultStatusMessage,
  );

  setInterval(() => setSwipeStatusMessage(defaultStatusMessage), 5000);
  const updateSwipeStatusMessage = (message) => setSwipeStatusMessage(message);
  const renderSubHeading = (heading) => (
    <Text style={styles.subHeading}>{heading}</Text>
  );
  let forceResetLastButton = null;

  const CheckoutButton = () => {
    return(
        <View style={{width: 100, height: 30, backgroundColor: '#C70039', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#ffffff'}}>Checkout</Text>
        </View>
    );
  } 

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
            containerStyles={{borderRadius: 5}}
            height={30}
            onSwipeFail={() => updateSwipeStatusMessage('Incomplete swipe!')}
            onSwipeStart={() => updateSwipeStatusMessage('Swipe started!')}
            onSwipeSuccess={() =>
              updateSwipeStatusMessage('Submitted successfully!')
            }
            railBackgroundColor="#31a57c"
            railStyles={{borderRadius: 5}}
            thumbIconComponent={CheckoutButton}
            thumbIconImageSource={arrowRight}
            thumbIconStyles={{borderRadius: 5}}
            thumbIconWidth={100} 
            title="Submit order"
          />
          {renderSubHeading('Reverse swipe enabled')}
          <SwipeButton
            enableReverseSwipe
            onSwipeSuccess={() => updateSwipeStatusMessage('Slide success!')}
            railBackgroundColor="#a493d6"
            thumbIconBackgroundColor="#FFFFFF"
            title="Slide to unlock"
          />
          {renderSubHeading('Set a component as thumb icon & use forceReset')}
          <SwipeButton
            disableResetOnTap
            forceReset={ reset => {
              forceResetLastButton = reset
            }}
            railBackgroundColor="#9fc7e8"
            railStyles={{
              backgroundColor: '#44000088',
              borderColor: '#880000FF',
            }}
            thumbIconBackgroundColor="#FFFFFF"
            title="Slide to unlock"
          />
          <View style={{ alignItems: 'center', marginBottom: 5 }}>
            <Button onPress={() => forceResetLastButton && forceResetLastButton()} title="Force reset" />
          </View>  
          {renderSubHeading('Set .png image as thumb icon')}
          <SwipeButton thumbIconImageSource={thumbIcon} railBackgroundColor="#cfb0dd"/>
          {renderSubHeading('Set height & reset after successful swipe')}
          <SwipeButton height={25} shouldResetAfterSuccess={true} resetAfterSuccessAnimDelay={1000} />
          {renderSubHeading('Set height and width')}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SwipeButton height={35} width={200} title="Swipe" disabled={disableCBButton} />
            <View style={{ marginLeft: 15, width: 150, height: 32 }}><Button onPress={() => setDisableCBButton(!disableCBButton)} title="Toggle disable" /></View>
          </View>  
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;