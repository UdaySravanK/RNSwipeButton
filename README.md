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

<SwipeButton />
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
	</tr>
	<tr>
    <td>
      <img src="https://github.com/UdaySravanK/RNSwipeButtonDemo/blob/main/assets/images/rn-swipe-button-ios.png" width="260" style="margin-right: 30px;"/>
    </td>
    <td>
      <img src="https://github.com/UdaySravanK/RNSwipeButtonDemo/blob/main/assets/images/rn-swipe-button.png" style="margin-right: 30px;" width="260"/>
    </td>
    <td>
      <img src="https://github.com/UdaySravanK/RNSwipeButtonDemo/blob/main/assets/images/rn-swipe-button.gif" style="margin-right: 30px;" width="260"/>
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
    <b>finishRemainingSwipeAnimationDuration</b>: PropTypes.number,
    <b>forceCompleteSwipe</b>: PropTypes.func, // <span style="color: blueviolet">RNSwipeButton will call this function by passing a  function as an argument. Calling the returned function will force complete the swipe.</span>
    <b>forceReset</b>: PropTypes.func, <span style="color: blueviolet"> // RNSwipeButton will call this function by passing a "reset" function as an argument. Calling "reset" will reset the swipe thumb.</span>
    <b>height</b>: PropTypes.oneOfType([
       PropTypes.string,
       PropTypes.number,
    ]),
    <b>onSwipeFail</b>: PropTypes.func,
    <b>onSwipeStart</b>: PropTypes.func,
    <b>onSwipeSuccess</b>: PropTypes.func, // Returns a boolean to indicate the swipe completed with real gesture or forceCompleteSwipe was called
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

<p style="color:#9c5d12; font-weight: bold;">You can also check type definitions in <a href="https://github.com/UdaySravanK/RNSwipeButton/blob/master/types.d.ts">types.d.ts</a> file.<p>

<hr>
<h2 style="color:darkgreen;">Example</h2>

```js
import React, { useState } from 'react';
import { View, Text } from 'react-native';

import SwipeButton from 'rn-swipe-button';


function Example() {
  let forceResetLastButton: any = null;
  let forceCompleteCallback: any = null;
  const [finishSwipeAnimDuration, setFinishSwipeAnimDuration] = useState(400)
  
  const forceCompleteButtonCallback = useCallback(() => {
    setFinishSwipeAnimDuration(0)
    forceCompleteCallback()
  }, [])

  const forceResetButtonCallback = useCallback(() => {
    forceResetLastButton()
    setInterval(() => setFinishSwipeAnimDuration(400) , 1000)
  }, [])
  
  return (
    <View>
      <SwipeButton
        disableResetOnTap
        forceReset={ (reset: any) => {
          forceResetLastButton = reset
        }}
        finishRemainingSwipeAnimationDuration={finishSwipeAnimDuration}
        forceCompleteSwipe={ (forceComplete: any) => {
          forceCompleteCallback = forceComplete
        }}
        railBackgroundColor="#9fc7e8"
        railStyles={{
          backgroundColor: '#147cbb',
          borderColor: '#880000FF',
        }}
        thumbIconBackgroundColor="#FFFFFF"
        thumbIconImageSource={require('@/assets/images/react-logo.png')}
        title="Slide to unlock"
      />
      <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'center' }}>
        <Text onPress={forceCompleteButtonCallback}>Force Complete</Text>
        <Text onPress={forceResetButtonCallback}>Force Reset</Text>
      </View>
    </View>
  )
};
```

<p>Please check <a href="https://github.com/UdaySravanK/RNSwipeButtonDemo/blob/main/app/(tabs)/index.tsx" target="_blank">the demo app</a> for more examples.</p>

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

<hr>

## Contributing
I request more developers from the open-source community to contributing to improve this project. You can find the work by visiting the [project](https://github.com/users/UdaySravanK/projects/1) associated with this repository. You can find issues related to defects, new feature requests and dev only related tasks like writing unit tests. 
