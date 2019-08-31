/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {Text, ToastAndroid} from 'react-native';

import SwipeButton from 'rn-swipe-button';

const App = () => {
  return (
    <Fragment>
      <Text>React Native Swipe Button - Enabled</Text>
      <SwipeButton />
      <Text>React Native Swipe Button - Disabled</Text>
      <SwipeButton disabled={true} />
      <Text>React Native Swipe Button - With onSwipeSuccess callback</Text>
      <SwipeButton
        disabled={false}
        onSwipeSuccess={() => {
          ToastAndroid.showWithGravity(
            'Submitted successfully!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }}
      />
    </Fragment>
  );
};

export default App;
