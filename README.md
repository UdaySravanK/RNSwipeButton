## React Native Swipe Button component
<br>
code for below screenshot
<br>
```
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
```     
<br>
The below screenshot is from demo app under examples folder in the repo
<hr>
<img src="https://udaysravank.github.io/RNSwipeButton/rn-swipe-button.png" width="400" />

