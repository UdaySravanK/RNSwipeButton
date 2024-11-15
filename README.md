## React Native Swipe Button Component 
[![star this repo](https://img.shields.io/github/stars/UdaySravanK/RNSwipeButton?style=flat-square&labelColor=purple)](https://github.com/UdaySravanK/RNSwipeButton)
[![fork this repo](https://img.shields.io/github/forks/UdaySravanK/RNSwipeButton?style=flat-square&labelColor=purple)](https://github.com/UdaySravanK/RNSwipeButton)
[![NPM Version](https://img.shields.io/npm/v/rn-swipe-button.svg?style=flat-square)](https://www.npmjs.com/package/rn-swipe-button)
[![npm total downloads](https://img.shields.io/npm/dt/rn-swipe-button.svg)](https://www.npmjs.com/package/rn-swipe-button)
[![Npm Downloads](https://img.shields.io/npm/dm/rn-swipe-button.svg)](https://www.npmjs.com/package/rn-swipe-button)
[![Socke Score](https://socket.dev/api/badge/npm/package/rn-swipe-button/2.0.0#1731228050357)](https://socket.dev/npm/package/rn-swipe-button)
[![Contribuutions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat&labelColor=darkgreen)](https://github.com/UdaySravanK/RNSwipeButton/blob/master/CONTRIBUTING.md)


<hr>

## Installation 

```bash
npm install rn-swipe-button --save

# OR

yarn add rn-swipe-button

```

## react-native compatibility

|rn-swipe-button|react-native|  react  |
|---------------|------------|---------|
|   <= v1.3.8   |  >= 0.60.5 | >= 16.8.6|
|   >= v2.0.0   |  >= 0.70.0 | >= 18.1.0|

## Usage
```js
import SwipeButton from 'rn-swipe-button'; 

<SwipeButton/>
```

<hr>
<div>
  <h2 style="color:darkgreen;">NPM Package</h2>
  <a href="https://www.npmjs.com/package/rn-swipe-button">https://www.npmjs.com/package/rn-swipe-button</a>
</div>
<hr>
<div>
  <h2 style="color:darkgreen;">Screenshots</h2>
  <table border>
	<tr">
	  <td style="padding: 5px;"><span>iOS</span></td>
	  <td style="padding: 5px;"><span>Android</span></td>
  	<td style="padding: 5px;"><span>iOS GIF</span></td>
    <td style="padding: 5px;"><span>Android RTL</span></td>
	</tr>
	<tr>
    <td>
      <img src="https://github.com/UdaySravanK/RNSwipeButtonDemo/blob/main/assets/rn-swipe-button-ios.png" width="200" style="margin-right: 30px;"/>
    </td>
    <td>
      <img src="https://github.com/UdaySravanK/RNSwipeButtonDemo/blob/main/assets/rn-swipe-button.png" style="margin-right: 30px;" width="200"/>
    </td>
    <td>
      <img src="https://github.com/UdaySravanK/RNSwipeButtonDemo/blob/main/assets/rn-swipe-button.gif" style="margin-right: 30px;" width="200"/>
    </td>
    <td>
      <img src="https://github.com/UdaySravanK/RNSwipeButtonDemo/blob/main/assets/rn-swipe-button-rtl.png" style="margin-right: 30px;" width="200"/>
    </td>
	</tr>
  </table>
  <p>These screenshots are from <a href="https://github.com/UdaySravanK/RNSwipeButtonDemo.git" target="_blank">the demo app</a>.</p>
</div>
<hr>

<h2 style="color:darkgreen;">Component properties</h2>
<pre style="font-size: 15px; color: brown;">
    <b>containerStyles</b>: PropTypes.object,
    <b>disabled</b>: PropTypes.bool,
    <b>disableResetOnTap</b>: PropTypes.bool,
    <b>disabledRailBackgroundColor</b>: PropTypes.string,
    <b>disabledThumbIconBackgroundColor</b>: PropTypes.string,
    <b>disabledThumbIconBorderColor</b>: PropTypes.string,
    <b>enableReverseSwipe</b>: PropTypes.bool,
    <b>forceReset</b>: PropTypes.func, <span style="color: blueviolet"> // RNSwipeButton will call this function by passing a "reset" function as argument. Calling "reset" will reset the swipe thumb.</span>
    <b>height</b>: PropTypes.oneOfType([
       PropTypes.string,
       PropTypes.number,
    ]),
    <b>onSwipeFail</b>: PropTypes.func,
    <b>onSwipeStart</b>: PropTypes.func,
    <b>onSwipeSuccess</b>: PropTypes.func,
    <b>railBackgroundColor</b>: PropTypes.string,
    <b>railBorderColor</b>: PropTypes.string,
    <b>railFillBackgroundColor</b>: PropTypes.string,
    <b>railFillBorderColor</b>: PropTypes.string,
    <b>railStyles</b>: PropTypes.object,
    <b>resetAfterSuccessAnimDelay</b>: PropTypes.number, <span style="color: blueviolet">// This is delay before resetting the button after successful swipe When shouldResetAfterSuccess = true </span>
    <b>screenReaderEnabled</b>: PropTypes.bool,
    <b>shouldResetAfterSuccess</b>: PropTypes.bool, <span style="color: blueviolet">// If set to true, buttun resets automatically after swipe success with default delay of 1000ms</span>
    <b>swipeSuccessThreshold</b>: PropTypes.number, <span style="color: blueviolet">// Ex: 70. Swipping 70% will be considered as successful swipe</span>
    <b>thumbIconBackgroundColor</b>: PropTypes.string,
    <b>thumbIconBorderColor</b>: PropTypes.string,
    <b>thumbIconComponent</b>: PropTypes.node, <span style="color: blueviolet">Pass any react component to replace swipable thumb icon</span>
    <b>thumbIconImageSource</b>: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    <b>thumbIconStyles</b>: PropTypes.object,
    <b>thumbIconWidth</b>: PropTypes.number,
    <b>title</b>: PropTypes.string,
    <b>titleColor</b>: PropTypes.string,
    <b>titleFontSize</b>: PropTypes.number,
    <b>titleMaxFontScale</b>: PropTypes.number, <span style="color: blueviolet">// Ex: 2. will limit font size increasing to 200% when user increases font size in device properties</span>
    <b>titleMaxLines</b>: PropTypes.number, <span style="color: blueviolet">// Use other title related props for additional UI customization</span>
    <b>titleStyles</b>: PropTypes.object,
    <b>width</b>: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
</pre>
<hr>
<h2 style="color:darkgreen;">Code for above screenshots</h2>

```js
import React, {useState} from 'react';
import {SafeAreaView, View, Text, StatusBar, Button} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import thumbIcon from './assets/thumbIcon.png';
import arrowRight from './assets/arrow-right.png';
import styles from './styles';

import SwipeButton from 'rn-swipe-button';


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
```
<hr/>

### Note 
<ul>
  <li>In accessibility mode this component works like a regular button (double tap to activate)</li>
  <li>We are supporting RTL out of the box. For RTL layouts, swipe button works by default as right to left swipe.</li>
</ul>

<h2 style="color:darkgreen;">Tech Stack</h2>
<ul>
<li>Node</li>
<li>Yarn/NPM</li>
<li>JavaScript</li>
<li>TypeScript</li>
<li>ReactNative</li>
</ul>

<div>
  <h2 style="color:darkgreen;">Running the demo app</h2>
  <ol>
    <li><code>git clone https://github.com/UdaySravanK/RNSwipeButtonDemo.git</code></li>
    <li><code>cd RNSwipeButtonDemo</code></li>
    <li><code>yarn</code></li>
    <li><p>To run on an android emulator</p>
      <code>yarn android</code> 
      <details>
        <summary>Make sure of</summary>
        <ul>
          <li>Android Studio is configured</li>
          <li>Global paths set correctly for Android SDK i.e ANDROID_HOME, tools, platform-tools</li>
          <li>Java8 is installed</li>
          <li>At least one emulator is ready</li>
        </ul>
      </details>
    </li>
    <li><p>To run on an ios simulator</p>
      <code>yarn ios</code> 
      <details>
        <summary>Make sure of</summary>
        <ul>
          <li>xcode is configured</li>
          <li>cocoapods installed</li>
          <li>If seeing issues then run <code>pod deintegrate & pod install</code></li>
          <li>If seeing issues with fonts
              <ol>
                <li>Open ios workspace project in xcode</li>
                <li>Select RNSwipeButtonDemo</li>
                <li>Go to Build phases</li>
                <li>Open 'Copy Bundle Resources' and delete all .ttf files</li>
              </ol>
          </li>
        </ul>
      </details>
    </li>
  </ol>
</div>

<div>
  <h2 style="color:darkgreen;">Making changes and seeing them in the demo app</h2>
  <p>Mapping the local npm package using `npm link` is not working for me but you can give a try and update this readme to help others.<p>
  <p>Workaroud is simply copy the `src` folder from the `RNSwipeButton` and paste it in `RNSwipeButtonDemo` app. In the demo app, you see `App.tsx`. When you open it, you will see a commented import and a note. Simply use the copied source code. I understand it is not the ideal way to work but this is a simple component and won't take more than 10seconds to do this.</p>
</div>
