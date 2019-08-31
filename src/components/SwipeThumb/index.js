import React from 'react';
import PropTypes from 'prop-types';
import {
  PanResponder,
  Animated,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import arrowRight from '../../assets/images/arrow-right.png';
import styles, {iconSize, borderWidth, margin} from './styles';
import {
  RAIL_FILL_BORDER_COLOR,
  RAIL_FILL_BACKGROUND_COLOR,
  TRANSPARENT_COLOR,
} from '../../constants';

export const SWIPE_SUCCESS_THRESHOLD = 70;

class SwipeThumb extends React.Component {
  constructor(props) {
    super(props);
    const paddingAndMarginsOffset = borderWidth + 2 * margin;
    this.defaultContainerWidth = iconSize;
    this.maxWidth = props.layoutWidth - paddingAndMarginsOffset;
    this.state = {
      animatedWidth: new Animated.Value(),
      backgroundColor: TRANSPARENT_COLOR,
      borderColor: TRANSPARENT_COLOR,
      pan: new Animated.ValueXY(),
    };
    this.finishRemainingSwipe = this.finishRemainingSwipe.bind(this);
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
  }

  onSwipeMetSuccessThreshold(newWidth) {
    if (newWidth !== this.maxWidth) {
      this.finishRemainingSwipe();
      return;
    }
    if (this.props.onSwipeSuccess) this.props.onSwipeSuccess();
    this.reset();
  }

  onPanResponderMove(event, gestureState) {
    if (this.props.disabled) return;
    const newWidth = this.defaultContainerWidth + gestureState.dx;
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
    if (this.props.disabled) return;
    const newWidth = this.defaultContainerWidth + gestureState.dx;
    const successThresholdWidth =
      this.maxWidth * (SWIPE_SUCCESS_THRESHOLD / 100);
    if (newWidth < successThresholdWidth) {
      this.onSwipeNotMetSuccessThreshold();
      return;
    }
    this.onSwipeMetSuccessThreshold(newWidth);
  }

  setBackgroundColors() {
    // Set backgroundColor only if not already set
    if (this.state.backgroundColor === TRANSPARENT_COLOR) {
      this.setState({
        backgroundColor: RAIL_FILL_BACKGROUND_COLOR,
        borderColor: RAIL_FILL_BORDER_COLOR,
      });
    }
  }

  finishRemainingSwipe() {
    // Animate to final position
    Animated.timing(this.state.animatedWidth, {
      toValue: this.maxWidth,
      duration: 200,
    }).start(() => {
      if (this.props.onSwipeSuccess) this.props.onSwipeSuccess();
      // this.reset(); // Enable this line to reset the thumb after successful swipe
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
    const {disabled} = this.props;
    return (
      <View style={[styles.icon, disabled ? styles.iconDisabled : '']}>
        <Image
          resizeMethod="scale"
          source={disabled ? arrowRight : arrowRight}
          style={styles.chevronImage}
        />
      </View>
    );
  }

  render() {
    const {disabled, title, onSwipeSuccess, screenReaderEnabled} = this.props;
    const panStyle = {
      backgroundColor: this.state.backgroundColor,
      borderColor: this.state.borderColor,
      width: this.state.animatedWidth,
      ...styles.container,
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
  screenReaderEnabled: false,
  title: '',
};

SwipeThumb.propTypes = {
  disabled: PropTypes.bool,
  layoutWidth: PropTypes.number,
  onSwipeSuccess: PropTypes.func,
  screenReaderEnabled: PropTypes.bool,
  title: PropTypes.string,
};

export default SwipeThumb;
