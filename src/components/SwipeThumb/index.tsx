import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  ReactElement,
  useMemo,
} from "react";
import {
  I18nManager,
  Animated,
  Image,
  PanResponder,
  View,
  ViewStyle,
  ImageSourcePropType,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";

// Styles
import styles, { borderWidth, margin } from "./styles";

// Constants
import {
  DEFAULT_ANIMATION_DURATION,
  SWIPE_SUCCESS_THRESHOLD,
  TRANSPARENT_COLOR,
} from "../../constants";
const RESET_AFTER_SUCCESS_DEFAULT_DELAY = 1000;

interface SwipeThumbProps {
  disabled?: boolean;
  disableResetOnTap?: boolean;
  disabledThumbIconBackgroundColor?: string;
  disabledThumbIconBorderColor?: string;
  enableReverseSwipe?: boolean;
  finishRemainingSwipeAnimationDuration?: number;
  forceCompleteSwipe?: (forceComplete: () => void) => void;
  forceReset?: (forceReset: () => void) => void;
  layoutWidth?: number;
  onSwipeFail?: () => void;
  onSwipeStart?: () => void;
  onSwipeSuccess?: (isForceComplete: boolean) => void;
  railFillBackgroundColor?: string;
  railFillBorderColor?: string;
  railStyles?: ViewStyle;
  resetAfterSuccessAnimDelay?: number;
  shouldResetAfterSuccess?: boolean;
  swipeSuccessThreshold?: number;
  thumbIconBackgroundColor?: string;
  thumbIconBorderColor?: string;
  thumbIconComponent?: () => ReactElement;
  thumbIconHeight?: number;
  thumbIconImageSource?: ImageSourcePropType | undefined;
  thumbIconStyles?: ViewStyle;
  thumbIconWidth?: number;
  screenReaderEnabled?: boolean;
}

const SwipeThumb: React.FC<SwipeThumbProps> = React.memo((props) => {
  const {
    disabled = false,
    disableResetOnTap = false,
    disabledThumbIconBackgroundColor,
    disabledThumbIconBorderColor,
    enableReverseSwipe,
    finishRemainingSwipeAnimationDuration = DEFAULT_ANIMATION_DURATION,
    forceCompleteSwipe,
    forceReset,
    layoutWidth = 0,
    onSwipeFail,
    onSwipeStart,
    onSwipeSuccess,
    railFillBackgroundColor,
    railFillBorderColor,
    railStyles,
    resetAfterSuccessAnimDelay,
    shouldResetAfterSuccess,
    swipeSuccessThreshold,
    thumbIconBackgroundColor,
    thumbIconBorderColor,
    thumbIconComponent: ThumbIconComponent,
    thumbIconHeight,
    thumbIconImageSource,
    thumbIconStyles = {},
    thumbIconWidth,
    screenReaderEnabled = false,
  } = props;

  const paddingAndMarginsOffset = borderWidth + 2 * margin;
  var defaultContainerWidth = 0;
  if (thumbIconWidth == undefined && thumbIconHeight != undefined) {
    defaultContainerWidth = thumbIconHeight;
  } else if (thumbIconWidth != undefined) {
    defaultContainerWidth = thumbIconWidth;
  }
  const maxWidth = layoutWidth - paddingAndMarginsOffset;
  const isRTL = I18nManager.isRTL;

  const animatedWidth = useRef(
    new Animated.Value(defaultContainerWidth),
  ).current;
  const [defaultWidth, setDefaultWidth] = useState(defaultContainerWidth);
  const [shouldDisableTouch, disableTouch] = useState(false);

  const [backgroundColor, setBackgroundColor] = useState(TRANSPARENT_COLOR);
  const [borderColor, setBorderColor] = useState(TRANSPARENT_COLOR);

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: defaultWidth,
      duration: finishRemainingSwipeAnimationDuration,
      useNativeDriver: false,
    }).start();
  }, [defaultWidth]);

  useEffect(() => {
    forceReset && forceReset(reset);
  }, [forceReset]);

  useEffect(() => {
    forceCompleteSwipe && forceCompleteSwipe(forceComplete);
  }, [forceCompleteSwipe]);

  function onSwipeNotMetSuccessThreshold() {
    // Animate to initial position
    setDefaultWidth(defaultContainerWidth);
    onSwipeFail && onSwipeFail();
  }

  function onSwipeMetSuccessThreshold(newWidth: number) {
    if (newWidth !== maxWidth) {
      finishRemainingSwipe();
      return;
    }
    invokeOnSwipeSuccess(false);
    reset();
  }

  function onPanResponderStart() {
    if (disabled) {
      return;
    }
    onSwipeStart && onSwipeStart();
  }

  const onPanResponderMove = useCallback(
    async (_: any, gestureState: PanResponderGestureState) => {
      if (disabled || screenReaderEnabled) return;

      const reverseMultiplier = enableReverseSwipe ? -1 : 1;
      const rtlMultiplier = isRTL ? -1 : 1;
      const newWidth =
        defaultContainerWidth +
        rtlMultiplier * reverseMultiplier * gestureState.dx;

      if (newWidth < defaultContainerWidth) {
        reset();
      } else if (newWidth > maxWidth) {
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
    },
    [
      disabled,
      screenReaderEnabled,
      defaultContainerWidth,
      maxWidth,
      isRTL,
      enableReverseSwipe,
      reset,
      setBackgroundColors,
      animatedWidth,
    ],
  );

  function onPanResponderRelease(
    _: any,
    gestureState: PanResponderGestureState,
  ) {
    if (disabled) {
      return;
    }
    const threshold = swipeSuccessThreshold
      ? swipeSuccessThreshold
      : SWIPE_SUCCESS_THRESHOLD;
    const reverseMultiplier = enableReverseSwipe ? -1 : 1;
    const rtlMultiplier = isRTL ? -1 : 1;
    const newWidth =
      defaultContainerWidth +
      rtlMultiplier * reverseMultiplier * gestureState.dx;
    const successThresholdWidth = maxWidth * (threshold / 100);
    newWidth < successThresholdWidth
      ? onSwipeNotMetSuccessThreshold()
      : onSwipeMetSuccessThreshold(newWidth);
  }

  function setBackgroundColors() {
    if (railFillBackgroundColor != undefined) {
      setBackgroundColor(railFillBackgroundColor);
    }
    if (railFillBorderColor != undefined) {
      setBorderColor(railFillBorderColor);
    }
  }

  function finishRemainingSwipe() {
    // Animate to final position
    setDefaultWidth(maxWidth);
    invokeOnSwipeSuccess(false);

    //Animate back to initial position after successfully swiped
    const resetDelay =
      DEFAULT_ANIMATION_DURATION +
      (resetAfterSuccessAnimDelay !== undefined
        ? resetAfterSuccessAnimDelay
        : RESET_AFTER_SUCCESS_DEFAULT_DELAY);
    setTimeout(() => {
      shouldResetAfterSuccess && reset();
    }, resetDelay);
  }

  function invokeOnSwipeSuccess(isForceComplete: boolean) {
    disableTouch(disableResetOnTap);
    onSwipeSuccess && onSwipeSuccess(isForceComplete);
  }

  function reset() {
    disableTouch(false);
    setDefaultWidth(defaultContainerWidth);
  }

  function forceComplete() {
    setDefaultWidth(maxWidth);
    invokeOnSwipeSuccess(true);
  }

  const dynamicStyles: ViewStyle = useMemo(() => {
    const iconWidth = thumbIconWidth ?? thumbIconHeight ?? 0;
    return {
      ...thumbIconStyles,
      height: thumbIconHeight,
      width: iconWidth,
      backgroundColor: disabled
        ? disabledThumbIconBackgroundColor
        : thumbIconBackgroundColor,
      borderColor: disabled
        ? disabledThumbIconBorderColor
        : thumbIconBorderColor,
      overflow: "hidden",
    };
  }, [
    thumbIconWidth,
    thumbIconHeight,
    thumbIconStyles,
    disabled,
    disabledThumbIconBackgroundColor,
    thumbIconBackgroundColor,
    disabledThumbIconBorderColor,
    thumbIconBorderColor,
  ]);

  const renderThumbIcon = useCallback(() => {
    return (
      <View
        style={[styles.icon, { ...dynamicStyles }]}
        testID="DefaultThumbIcon"
      >
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
  }, [ThumbIconComponent, thumbIconImageSource, dynamicStyles]);

  const panResponder = useCallback(
    PanResponder.create({
      onStartShouldSetPanResponder: (e: any, s: any) => true,
      onStartShouldSetPanResponderCapture: (e: any, s: any) => true,
      onMoveShouldSetPanResponder: (e: any, s: any) => true,
      onMoveShouldSetPanResponderCapture: (e: any, s: any) => true,
      onShouldBlockNativeResponder: (e: any, s: any) => true,
      onPanResponderGrant: onPanResponderStart,
      onPanResponderMove: onPanResponderMove,
      onPanResponderRelease: onPanResponderRelease,
    }) as any,
    [props], // [disabled, enableReverseSwipe, defaultContainerWidth, maxWidth, setBackgroundColors, animatedWidth, screenReaderEnabled],
  );

  const panStyle = {
    backgroundColor,
    borderColor,
    width: animatedWidth,
    ...(enableReverseSwipe ? styles.containerRTL : styles.container),
    ...railStyles,
  };

  return (
    <Animated.View
      style={[panStyle]}
      {...panResponder.panHandlers}
      pointerEvents={shouldDisableTouch ? "none" : "auto"}
      testID="SwipeThumb"
    >
      {renderThumbIcon()}
    </Animated.View>
  );
});

export default SwipeThumb;
