import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { I18nManager } from 'react-native';
import {
  Animated,
  Image,
  PanResponder,
  TouchableNativeFeedback,
  View,
} from 'react-native';

// Styles
import styles, { borderWidth, margin } from './styles';

// Constants
import { TRANSPARENT_COLOR } from '../../constants';
const DEFAULT_ANIMATION_DURATION = 400;
const RESET_AFTER_SUCCESS_DEFAULT_DELAY = 1000;

const SwipeThumb = props => {
  const paddingAndMarginsOffset = borderWidth + 2 * margin;
  var defaultContainerWidth = 0;
  if (props.thumbIconWidth == undefined) {
    defaultContainerWidth = props.thumbIconHeight;
  } else {
    defaultContainerWidth = props.thumbIconWidth;
  }
  const forceReset = props.forceReset;
  const maxWidth = props.layoutWidth - paddingAndMarginsOffset;
  const isRTL = I18nManager.isRTL;

  const animatedWidth = useRef(new Animated.Value(defaultContainerWidth))
    .current;
  const [defaultWidth, setDefaultWidth] = useState(defaultContainerWidth);
  const [shouldDisableTouch, disableTouch] = useState(false);

  const [backgroundColor, setBackgroundColor] = useState(TRANSPARENT_COLOR);
  const [borderColor, setBorderColor] = useState(TRANSPARENT_COLOR);

  const panResponder = useCallback(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onShouldBlockNativeResponder: () => true,
      onPanResponderStart,
      onPanResponderMove,
      onPanResponderRelease,
    }),
    [props],
  );

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: defaultWidth,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [animatedWidth, defaultWidth]);

  useEffect(() => {
    forceReset && forceReset(reset);
  }, [forceReset]);

  function onSwipeNotMetSuccessThreshold() {
    // Animate to initial position
    setDefaultWidth(defaultContainerWidth);
    props.onSwipeFail && props.onSwipeFail();
  }

  function onSwipeMetSuccessThreshold(newWidth) {
    if (newWidth !== maxWidth) {
      finishRemainingSwipe();
      return;
    }
    invokeOnSwipeSuccess();
    reset();
  }

  function onPanResponderStart() {
    if (props.disabled) {
      return;
    }
    props.onSwipeStart && props.onSwipeStart();
  }

  async function onPanResponderMove(event, gestureState) {
    if (props.disabled) {
      return;
    }
    const reverseMultiplier = props.enableReverseSwipe ? -1 : 1;
    const rtlMultiplier = isRTL ? -1 : 1;
    const newWidth =
      defaultContainerWidth +
      rtlMultiplier * reverseMultiplier * gestureState.dx;
    if (newWidth < defaultContainerWidth) {
      // Reached starting position
      reset();
    } else if (newWidth > maxWidth) {
      // Reached end position
      setBackgroundColors();
      setDefaultWidth(maxWidth);
    } else {
      setBackgroundColors();
      await Animated.timing(animatedWidth, {
        toValue: newWidth,
        duration: 0,
        useNativeDriver: false,
      }).start();
      setDefaultWidth(newWidth);
    }
  }

  function onPanResponderRelease(event, gestureState) {
    if (props.disabled) {
      return;
    }
    const reverseMultiplier = props.enableReverseSwipe ? -1 : 1;
    const rtlMultiplier = isRTL ? -1 : 1;
    const newWidth =
      defaultContainerWidth +
      rtlMultiplier * reverseMultiplier * gestureState.dx;
    const successThresholdWidth =
      maxWidth * (props.swipeSuccessThreshold / 100);
    newWidth < successThresholdWidth
      ? onSwipeNotMetSuccessThreshold()
      : onSwipeMetSuccessThreshold(newWidth);
  }

  function setBackgroundColors() {
    const { railFillBackgroundColor, railFillBorderColor } = props;
    // Set backgroundColor only if not already set
    if (backgroundColor === TRANSPARENT_COLOR) {
      setBackgroundColor(railFillBackgroundColor);
      setBorderColor(railFillBorderColor);
    }
  }

  function finishRemainingSwipe() {
    // Animate to final position
    setDefaultWidth(maxWidth);
    invokeOnSwipeSuccess();

    //Animate back to initial position after successfully swiped
    const resetDelay =
      DEFAULT_ANIMATION_DURATION +
      (props.resetAfterSuccessAnimDelay !== undefined
        ? props.resetAfterSuccessAnimDelay
        : RESET_AFTER_SUCCESS_DEFAULT_DELAY);
    setTimeout(() => {
      props.shouldResetAfterSuccess && reset();
    }, resetDelay);
  }

  function invokeOnSwipeSuccess() {
    disableTouch(props.disableResetOnTap);
    props.onSwipeSuccess && props.onSwipeSuccess();
  }

  function reset() {
    disableTouch(false);
    setDefaultWidth(defaultContainerWidth);

    if (backgroundColor !== TRANSPARENT_COLOR) {
      setBackgroundColor(TRANSPARENT_COLOR);
      setBorderColor(TRANSPARENT_COLOR);
    }
  }

  function renderThumbIcon() {
    const {
      disabled,
      disabledThumbIconBackgroundColor,
      disabledThumbIconBorderColor,
      thumbIconBackgroundColor,
      thumbIconBorderColor,
      thumbIconComponent: ThumbIconComponent,
      thumbIconHeight,
      thumbIconImageSource,
      thumbIconStyles,
      thumbIconWidth,
    } = props;
    var iconWidth = 0;
    if (thumbIconWidth == undefined) {
      iconWidth = thumbIconHeight;
    } else {
      iconWidth = thumbIconWidth;
    }
    const dynamicStyles = {
      ...thumbIconStyles,
      height: thumbIconHeight,
      width: iconWidth,
      backgroundColor: disabled
        ? disabledThumbIconBackgroundColor
        : thumbIconBackgroundColor,
      borderColor: disabled
        ? disabledThumbIconBorderColor
        : thumbIconBorderColor,
      overflow: 'hidden',
    };

    return (
      <View style={[styles.icon, { ...dynamicStyles }]}>
        {!ThumbIconComponent && thumbIconImageSource && (
          <Image resizeMethod="resize" source={thumbIconImageSource} />
        )}
        {ThumbIconComponent && (
          <View>
            <ThumbIconComponent />
          </View>
        )}
      </View>
    );
  }

  const {
    disabled,
    enableReverseSwipe,
    onSwipeSuccess,
    railStyles,
    screenReaderEnabled,
    title,
  } = props;

  const panStyle = {
    backgroundColor,
    borderColor,
    width: animatedWidth,
    ...(enableReverseSwipe ? styles.containerRTL : styles.container),
    ...railStyles,
  };

  return (
    <>
      {screenReaderEnabled ? (
        <TouchableNativeFeedback
          accessibilityLabel={`${title}. ${
            disabled ? 'Disabled' : 'Double-tap to activate'
          }`}
          disabled={disabled}
          onPress={onSwipeSuccess}
          accessible>
          <View style={[panStyle, { width: defaultContainerWidth }]}>
            {renderThumbIcon()}
          </View>
        </TouchableNativeFeedback>
      ) : (
        <Animated.View
          style={[panStyle]}
          {...panResponder.panHandlers}
          pointerEvents={shouldDisableTouch ? 'none' : 'auto'}>
          {renderThumbIcon()}
        </Animated.View>
      )}
    </>
  );
};

SwipeThumb.defaultProps = {
  disabled: false,
  layoutWidth: 0,
  resetAfterSuccessAnimDuration: 200,
  disableResetOnTap: false,
  screenReaderEnabled: false,
  thumbIconStyles: {},
};

SwipeThumb.propTypes = {
  disabled: PropTypes.bool,
  disableResetOnTap: PropTypes.bool,
  disabledThumbIconBackgroundColor: PropTypes.string,
  disabledThumbIconBorderColor: PropTypes.string,
  enableReverseSwipe: PropTypes.bool,
  forceReset: PropTypes.func,
  layoutWidth: PropTypes.number,
  onSwipeFail: PropTypes.func,
  onSwipeStart: PropTypes.func,
  onSwipeSuccess: PropTypes.func,
  railFillBackgroundColor: PropTypes.string,
  railFillBorderColor: PropTypes.string,
  railStyles: PropTypes.object,
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
  thumbIconHeight: PropTypes.number,
  thumbIconImageSource: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  thumbIconStyles: PropTypes.object,
  thumbIconWidth: PropTypes.number,
  title: PropTypes.string,
};

export default SwipeThumb;
