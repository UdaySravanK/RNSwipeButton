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
import styles, {borderWidth, margin} from './styles';

// Constants
import {TRANSPARENT_COLOR} from '../../constants';

class SwipeThumb extends React.Component {
  constructor(props) {
    super(props);
    const paddingAndMarginsOffset = borderWidth + 2 * margin;
    this.defaultContainerWidth = props.iconSize;
    this.maxWidth = props.layoutWidth - paddingAndMarginsOffset;
    this.state = {
      animatedWidth: new Animated.Value(),
      backgroundColor: TRANSPARENT_COLOR,
      borderColor: TRANSPARENT_COLOR,
      pan: new Animated.ValueXY(),
    };
    this.finishRemainingSwipe = this.finishRemainingSwipe.bind(this);
    this.onPanResponderStart = this.onPanResponderStart.bind(this);
    this.onPanResponderMove = this.onPanResponderMove.bind(this);
    this.onPanResponderRelease = this.onPanResponderRelease.bind(this);
    this.onSwipeMetSuccessThreshold = this.onSwipeMetSuccessThreshold.bind(
      this,
    );
    this.onSwipeNotMetSuccessThreshold = this.onSwipeNotMetSuccessThreshold.bind(
      this,
    );
    this.renderThumbIcon = this.renderThumbIcon.bind(this);
    this.reset = this.reset.bind(this);
    this.setBackgroundColors = this.setBackgroundColors.bind(this);
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
    this.reset();
  }

  onSwipeNotMetSuccessThreshold() {
    // Animate to initial position
    Animated.timing(this.state.animatedWidth, {
      toValue: this.defaultContainerWidth,
      duration: 200,
    }).start(() => {
      this.reset();
    });
    if (this.props.onSwipeFail) {
      this.props.onSwipeFail();
    }
  }

  onSwipeMetSuccessThreshold(newWidth) {
    if (newWidth !== this.maxWidth) {
      this.finishRemainingSwipe();
      return;
    }
    if (this.props.onSwipeSuccess) {
      this.props.onSwipeSuccess();
    }
    this.reset();
  }

  onPanResponderStart() {
    if (this.props.disabled) {
      return;
    }
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
      this.reset();
    } else if (newWidth > this.maxWidth) {
      // Reached end position
      this.setBackgroundColors();
      this.state.animatedWidth.setValue(this.maxWidth);
    } else {
      this.setBackgroundColors();
      this.state.animatedWidth.setValue(newWidth);
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
      this.onSwipeNotMetSuccessThreshold();
      return;
    }
    this.onSwipeMetSuccessThreshold(newWidth);
  }

  setBackgroundColors() {
    const {railFillBackgroundColor, railFillBorderColor} = this.props;
    // Set backgroundColor only if not already set
    if (this.state.backgroundColor === TRANSPARENT_COLOR) {
      this.setState({
        backgroundColor: railFillBackgroundColor,
        borderColor: railFillBorderColor,
      });
    }
  }

  finishRemainingSwipe() {
    // Animate to final position
    Animated.timing(this.state.animatedWidth, {
      toValue: this.maxWidth,
      duration: 200,
    }).start(() => {
      if (this.props.onSwipeSuccess) {
        this.props.onSwipeSuccess();
      }

      //Animate back to initial position
      if (this.props.shouldResetAfterSuccess) {
        Animated.timing(this.state.animatedWidth, {
          toValue: this.defaultContainerWidth,
          duration: this.props.resetAfterSuccessAnimDuration,
        }).start(() => this.reset());
      }
    });
  }

  reset() {
    this.state.animatedWidth.setValue(this.defaultContainerWidth);

    if (this.state.backgroundColor !== TRANSPARENT_COLOR) {
      this.setState({
        backgroundColor: TRANSPARENT_COLOR,
        borderColor: TRANSPARENT_COLOR,
      });
    }
  }

  renderThumbIcon() {
    const {
      disabled,
      disabledThumbIconBackgroundColor,
      disabledThumbIconBorderColor,
      iconSize,
      thumbIconBackgroundColor,
      thumbIconBorderColor,
      thumbIconComponent: ThumbIconComponent,
      thumbIconImageSource,
      thumbIconStyles,
    } = this.props;
    const dynamicStyles = {
      ...thumbIconStyles,
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

    return (
      <View style={[styles.icon, {...dynamicStyles}]}>
        {!ThumbIconComponent && thumbIconImageSource && (
          <Image resizeMethod="resize" source={thumbIconImageSource} />
        )}
        {ThumbIconComponent && (
          <View>
            <ThumbIconComponent />
          </View>
        )}
        {!ThumbIconComponent && !thumbIconImageSource && (
          <View style={styles.defaultThumbIcon} />
        )}
      </View>
    );
  }

  render() {
    const {
      disabled,
      enableRightToLeftSwipe,
      onSwipeSuccess,
      screenReaderEnabled,
      title,
    } = this.props;
    const panStyle = {
      backgroundColor: this.state.backgroundColor,
      borderColor: this.state.borderColor,
      width: this.state.animatedWidth,
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
          <View style={[panStyle, {width: this.defaultContainerWidth}]}>
            {this.renderThumbIcon()}
          </View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <Animated.View style={[panStyle]} {...this.panResponder.panHandlers}>
        {this.renderThumbIcon()}
      </Animated.View>
    );
  }
}

SwipeThumb.defaultProps = {
  disabled: false,
  layoutWidth: 0,
  resetAfterSuccessAnimDuration: 200,
  screenReaderEnabled: false,
  thumbIconStyles: {},
};

SwipeThumb.propTypes = {
  disabled: PropTypes.bool,
  disabledThumbIconBackgroundColor: PropTypes.string,
  disabledThumbIconBorderColor: PropTypes.string,
  enableRightToLeftSwipe: PropTypes.bool,
  iconSize: PropTypes.number,
  layoutWidth: PropTypes.number,
  onSwipeFail: PropTypes.func,
  onSwipeStart: PropTypes.func,
  onSwipeSuccess: PropTypes.func,
  railFillBackgroundColor: PropTypes.string,
  railFillBorderColor: PropTypes.string,
  resetAfterSuccessAnimDuration: PropTypes.number,
  screenReaderEnabled: PropTypes.bool,
  shouldResetAfterSuccess: PropTypes.bool,
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
  thumbIconStyles: PropTypes.object,
  title: PropTypes.string,
};

export default SwipeThumb;
