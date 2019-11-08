import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Image,
  PanResponder,
  TouchableNativeFeedback,
  View,
} from 'react-native';

// Styles
import styles from './styles';

class SwipeThumb extends React.Component {
  constructor(props) {
    super(props);
    this.onPanResponderStart = this.onPanResponderStart.bind(this);
    this.onPanResponderMove = this.onPanResponderMove.bind(this);
    this.onPanResponderRelease = this.onPanResponderRelease.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderStart: this.onPanResponderStart,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
      onShouldBlockNativeResponder: () => true,
    });
    this.props.reset();
  }

  onPanResponderStart() {
    if (this.props.disabled) {
      return;
    }
    this.props.setBackgroundColors();
    if (this.props.onSwipeStart) {
      this.props.onSwipeStart();
    }
  }

  onPanResponderMove(event, gestureState) {
    if (this.props.disabled) {
      return;
    }
    const rtlMultiplier = this.props.enableRightToLeftSwipe ? -1 : 1;
    const newWidth =
      this.defaultContainerWidth + rtlMultiplier * gestureState.dx;
    if (newWidth < this.defaultContainerWidth) {
      // Reached starting position
      this.props.reset();
    } else if (newWidth > this.maxWidth) {
      // Reached end position
      this.props.setBackgroundColors();
      this.props.setAnimatedWidth(this.maxWidth);
    } else {
      this.props.setAnimatedWidth(newWidth);
    }
  }

  onPanResponderRelease(event, gestureState) {
    if (this.props.disabled) {
      return;
    }
    const rtlMultiplier = this.props.enableRightToLeftSwipe ? -1 : 1;
    const newWidth =
      this.defaultContainerWidth + rtlMultiplier * gestureState.dx;
    const successThresholdWidth =
      this.maxWidth * (this.props.swipeSuccessThreshold / 100);
    if (newWidth < successThresholdWidth) {
      this.props.onSwipeNotMetSuccessThreshold();
      return;
    }
    this.props.onSwipeMetSuccessThreshold(newWidth);
  }

  render() {
    const {
      disabled,
      disabledThumbIconBackgroundColor,
      disabledThumbIconBorderColor,
      iconSize,
      thumbIconBackgroundColor,
      thumbIconBorderColor,
      thumbIconComponent: ThumbIconComponent,
      thumbIconImageSource,
      title,
      onSwipeSuccess,
      screenReaderEnabled,
      enableRightToLeftSwipe,
      backgroundColor,
      borderColor,
      animatedWidth,
    } = this.props;

    const dynamicStyles = {
      height: iconSize,
      width: iconSize,
      backgroundColor: disabled
        ? disabledThumbIconBackgroundColor
        : thumbIconBackgroundColor,
      borderColor: disabled
        ? disabledThumbIconBorderColor
        : thumbIconBorderColor,
      overflow: 'hidden',
    };

    const panStyle = {
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      transform: this.props.pan.getTranslateTransform(),
      ...(enableRightToLeftSwipe ? styles.containerRTL : styles.container),
    };

    if (screenReaderEnabled) {
      return (
        <TouchableNativeFeedback
          accessibilityLabel={`${title}. ${
            disabled ? 'Disabled' : 'Double-tap to activate'
          }`}
          accessible
          disabled={disabled}
          onPress={onSwipeSuccess}>
          <View
            style={[
              panStyle,
              styles.icon,
              {width: this.defaultContainerWidth},
            ]}>
            {!ThumbIconComponent && (
              <Image resizeMethod="resize" source={thumbIconImageSource} />
            )}
            {ThumbIconComponent && (
              <View>
                <ThumbIconComponent />
              </View>
            )}
          </View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <Animated.View
        style={[panStyle, styles.icon, {...dynamicStyles}]}
        {...this.panResponder.panHandlers}>
        {!ThumbIconComponent && (
          <Image resizeMethod="resize" source={thumbIconImageSource} />
        )}
        {ThumbIconComponent && (
          <View>
            <ThumbIconComponent />
          </View>
        )}
      </Animated.View>
    );
  }
}

SwipeThumb.defaultProps = {
  disabled: false,
  layoutWidth: 0,
  screenReaderEnabled: false,
};

SwipeThumb.propTypes = {
  disabled: PropTypes.bool,
  disabledThumbIconBackgroundColor: PropTypes.string,
  disabledThumbIconBorderColor: PropTypes.string,
  enableRightToLeftSwipe: PropTypes.bool,
  finishRemainingSwipe: PropTypes.func,
  iconSize: PropTypes.number,
  layoutWidth: PropTypes.number,
  onSwipeFail: PropTypes.func,
  onSwipeNotMetSuccessThreshold: PropTypes.func,
  onSwipeMetSuccessThreshold: PropTypes.func,
  reset: PropTypes.func,
  onSwipeStart: PropTypes.func,
  onSwipeSuccess: PropTypes.func,
  railFillBackgroundColor: PropTypes.string,
  railFillBorderColor: PropTypes.string,
  screenReaderEnabled: PropTypes.bool,
  swipeSuccessThreshold: PropTypes.number,
  thumbIconBackgroundColor: PropTypes.string,
  thumbIconBorderColor: PropTypes.string,
  thumbIconComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.func,
  ]),
  thumbIconImageSource: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  title: PropTypes.string,
};

export default SwipeThumb;
