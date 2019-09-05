<h2 style="color:darkgreen;">React Native Swipe Button Component</h2>
<hr>
<div style="color:darkcyan; font-size: 15px;">
  <code>
    <p>npm install rn-swipe-button --save</p>
    <p>import SwipeButton from 'rn-swipe-button';</p>
    &lt;SwipeButton /&gt; 
  </code>
</div>
<hr>
<div>
  <h2 style="color:darkgreen;">Screenshots of Android and iOS</h2>
  <img src="https://udaysravank.github.io/RNSwipeButton/rn-swipe-button-ios.png" width="200" style="margin-right: 30px;"/>
  <img src="https://udaysravank.github.io/RNSwipeButton/rn-swipe-button.png" style="margin-right: 30px;" width="230"/>
  <img src="https://udaysravank.github.io/RNSwipeButton/rn-swipe-button.gif" width="230" />
  <p>These screenshots are from demo app under examples folder in the repo</p>
</div>
<hr>
<h2 style="color:darkgreen;">Component properties</h2>
<pre style="font-size: 15px; color: brown;">
    <b>disabled</b>: PropTypes.bool,
    <b>disabledRailBackgroundColor</b>: PropTypes.string,
    <b>disabledThumbIconBackgroundColor</b>: PropTypes.string,
    <b>disabledThumbIconBorderColor</b>: PropTypes.string,
    <b>height</b>: PropTypes.number,
    <b>onSwipeSuccess</b>: PropTypes.func,
    <b>railBackgroundColor</b>: PropTypes.string,
    <b>railBorderColor</b>: PropTypes.string,
    <b>railFillBackgroundColor</b>: PropTypes.string,
    <b>railFillBorderColor</b>: PropTypes.string,
    <b>swipeSuccessThreshold</b>: PropTypes.number, <span style="color: blueviolet">// Ex: 70. Swipping 70% will be considered as successful swipe</span>
    <b>thumbIconBackgroundColor</b>: PropTypes.string,
    <b>thumbIconBorderColor</b>: PropTypes.string,
    <b>thumbIconImageSource</b>: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    <b>title</b>: PropTypes.string,
    <b>titleColor</b>: PropTypes.string,
    <b>titleFontSize</b>: PropTypes.number,
    <b>width</b>: PropTypes.number,
</pre>
<hr>
<h2 style="color:darkgreen;">Code for above screenshots</h2>

```
import React, {Fragment} from 'react';
import {Text, ToastAndroid} from 'react-native';
import thumbIcon from './assets/thumbIcon.png';

import SwipeButton from 'rn-swipe-button';

const App = () => {
  return (
    <View style={{padding: 15}}>
      <Text style={{color: '#700D99', fontSize: 25}}>
        React Native Swipe Button
      </Text>
      <Text style={{color: '#059478', fontSize: 30}}>**************</Text>
      <Text style={{color: '#140866', fontSize: 20}}>
        Set onSwipeSuccess callback and width
      </Text>
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
      <Text style={{color: '#140866', fontSize: 20}}>
        Enabled and thumb icon
      </Text>
      <SwipeButton thumbIconImageSource={thumbIcon} />
      <Text style={{color: '#140866', fontSize: 20}}>Disabled</Text>
      <SwipeButton disabled={true} />
      <Text style={{color: '#140866', fontSize: 20}}>Set height</Text>
      <SwipeButton height={25} />
      <Text style={{color: '#140866', fontSize: 20}}>Set height and width</Text>
      <SwipeButton height={35} width={150} title="Swipe" />
    </View>
  );
};
```
