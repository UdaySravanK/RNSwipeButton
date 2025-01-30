import React, { useState, useEffect, ReactElement, useCallback } from "react";
import {
  Text,
  AccessibilityInfo,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  LayoutChangeEvent,
} from "react-native";

// Components
import SwipeThumb from "../SwipeThumb";

// Styles
import styles from "./styles";

// Constants
import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_HEIGHT,
  DEFAULT_TITLE,
  DEFAULT_TITLE_FONT_SIZE,
  DEFAULT_TITLE_MAX_LINES,
  DISABLED_RAIL_BACKGROUND_COLOR,
  DISABLED_THUMB_ICON_BACKGROUND_COLOR,
  DISABLED_THUMB_ICON_BORDER_COLOR,
  RAIL_BACKGROUND_COLOR,
  RAIL_BORDER_COLOR,
  RAIL_FILL_BACKGROUND_COLOR,
  RAIL_FILL_BORDER_COLOR,
  SWIPE_SUCCESS_THRESHOLD,
  THUMB_ICON_BACKGROUND_COLOR,
  THUMB_ICON_BORDER_COLOR,
  TITLE_COLOR,
} from "../../constants";
import { TouchableOpacityProps } from "react-native-gesture-handler";

interface SwipeButtonProps extends TouchableOpacityProps {
  containerStyles?: ViewStyle;
  disabled?: boolean;
  disabledRailBackgroundColor?: string;
  disabledThumbIconBackgroundColor?: string;
  disabledThumbIconBorderColor?: string;
  disableResetOnTap?: boolean;
  enableReverseSwipe?: boolean;
  finishRemainingSwipeAnimationDuration?: number;
  forceCompleteSwipe?: (forceComplete: () => void) => void;
  forceReset?: (forceReset: () => void) => void;
  height?: number;
  onSwipeFail?: () => void;
  onSwipeStart?: () => void;
  onSwipeSuccess?: (isForceComplete: boolean) => void;
  railBackgroundColor?: string;
  railBorderColor?: string;
  railFillBackgroundColor?: string;
  railFillBorderColor?: string;
  railStyles?: ViewStyle;
  resetAfterSuccessAnimDelay?: number;
  shouldResetAfterSuccess?: boolean;
  swipeSuccessThreshold?: number;
  thumbIconBackgroundColor?: string;
  thumbIconBorderColor?: string;
  thumbIconComponent?: () => ReactElement;
  thumbIconImageSource?: ImageSourcePropType;
  thumbIconStyles?: ViewStyle;
  thumbIconWidth?: number;
  title?: string;
  titleColor?: string;
  titleFontSize?: number;
  titleMaxFontScale?: number;
  titleMaxLines?: number;
  titleStyles?: TextStyle;
  width?: number;
}

/**
 * - Height of the RNSwipeButton will be determines by the height of the inner ThumbIcon which we interact with to swipe.
 *
 * @param {*} param0
 * @returns
 */
const SwipeButton: React.FC<SwipeButtonProps> = ({
  containerStyles,
  disabled = false,
  disabledRailBackgroundColor = DISABLED_RAIL_BACKGROUND_COLOR,
  disabledThumbIconBackgroundColor = DISABLED_THUMB_ICON_BACKGROUND_COLOR,
  disabledThumbIconBorderColor = DISABLED_THUMB_ICON_BORDER_COLOR,
  disableResetOnTap = false,
  enableReverseSwipe,
  finishRemainingSwipeAnimationDuration = DEFAULT_ANIMATION_DURATION,
  forceCompleteSwipe,
  forceReset,
  height = DEFAULT_HEIGHT,
  onSwipeFail,
  onSwipeStart,
  onSwipeSuccess,
  railBackgroundColor = RAIL_BACKGROUND_COLOR,
  railBorderColor = RAIL_BORDER_COLOR,
  railFillBackgroundColor = RAIL_FILL_BACKGROUND_COLOR,
  railFillBorderColor = RAIL_FILL_BORDER_COLOR,
  railStyles,
  resetAfterSuccessAnimDelay,
  shouldResetAfterSuccess,
  swipeSuccessThreshold = SWIPE_SUCCESS_THRESHOLD,
  thumbIconBackgroundColor = THUMB_ICON_BACKGROUND_COLOR,
  thumbIconBorderColor = THUMB_ICON_BORDER_COLOR,
  thumbIconComponent,
  thumbIconImageSource,
  thumbIconStyles = {},
  thumbIconWidth,
  title = DEFAULT_TITLE,
  titleColor = TITLE_COLOR,
  titleFontSize = DEFAULT_TITLE_FONT_SIZE,
  titleMaxFontScale,
  titleMaxLines = DEFAULT_TITLE_MAX_LINES,
  titleStyles = {},
  width,
  ...rest // Include other TouchableOpacity props
}) => {
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  const [isUnmounting, setIsUnmounting] = useState(false);
  const [activationMessage, setActivationMessage] = useState(title);
  const [disableInteraction, setDisableInteraction] = useState(false);
  /**
   * Retrieve layoutWidth to set maximum swipeable area.
   * Correct layout width will be received only after first render but we need it before render.
   * So render SwipeThumb only if layoutWidth > 0
   */
  const onLayoutContainer = useCallback(
    (e: LayoutChangeEvent) => {
      const newWidth = e.nativeEvent.layout.width;
      if (!isUnmounting && newWidth !== layoutWidth) {
        setLayoutWidth(newWidth);
      }
    },
    [isUnmounting, layoutWidth],
  );

  /**
   * If we don't update `disabled` prop of TouchableOpacity through state changes,
   * switching from a11y to normal mode would still keep the button in disabled state.
   * Which results to all interactions disabled. Swipe gesture won't work.
   */
  useEffect(() => {
    if (disabled && screenReaderEnabled) {
      setDisableInteraction(true);
    } else {
      setDisableInteraction(false);
    }
  }, [disabled, screenReaderEnabled]);

  const handleScreenReaderToggled = (isEnabled: boolean) => {
    if (isUnmounting || screenReaderEnabled === isEnabled) {
      return;
    }
    setScreenReaderEnabled(isEnabled);
  };

  useEffect(() => {
    setIsUnmounting(false);
    const subscription = AccessibilityInfo.addEventListener(
      "screenReaderChanged",
      handleScreenReaderToggled,
    );

    AccessibilityInfo.isScreenReaderEnabled().then(handleScreenReaderToggled);

    return () => {
      setIsUnmounting(true);
      if (subscription) {
        subscription.remove();
      }
    };
  }, [setIsUnmounting, screenReaderEnabled, handleScreenReaderToggled]);

  useEffect(() => {
    // Update activation message based on disabled state and screen reader status
    if (disabled) {
      setActivationMessage("Button disabled");
    } else if (screenReaderEnabled) {
      setActivationMessage("Double tap to activate");
    } else {
      setActivationMessage(title);
    }
  }, [disabled, screenReaderEnabled]);

  const handlePress = useCallback(() => {
    if (disabled) return;
    if (screenReaderEnabled) {
      // Simulate swipe success for screen readers
      onSwipeSuccess && onSwipeSuccess(false);
    }
  }, [disabled, screenReaderEnabled, onSwipeSuccess]);

  const handleFocus = useCallback(() => {
    AccessibilityInfo.isScreenReaderEnabled().then(handleScreenReaderToggled);
  }, [handleScreenReaderToggled]);

  const dynamicContainerStyles: ViewStyle = {
    ...containerStyles,
    backgroundColor: disabled
      ? disabledRailBackgroundColor
      : railBackgroundColor,
    borderColor: railBorderColor,
    ...(width ? { width } : {}),
  };

  return (
    <TouchableOpacity
      onFocus={handleFocus}
      disabled={disableInteraction}
      accessible={true}
      accessibilityLabel={title}
      accessibilityHint={activationMessage}
      accessibilityRole="button"
      activeOpacity={disabled ? 1 : 0.5} // Make it feel like a button
      onPress={handlePress}
      style={[styles.container, { ...dynamicContainerStyles }]}
      onLayout={onLayoutContainer}
      testID="SwipeButton"
      {...rest}
    >
      <Text
        maxFontSizeMultiplier={titleMaxFontScale}
        ellipsizeMode={"tail"}
        numberOfLines={titleMaxLines}
        style={[
          styles.title,
          {
            color: titleColor,
            fontSize: titleFontSize,
            ...titleStyles,
          },
        ]}
      >
        {title}
      </Text>
      {layoutWidth > 0 && (
        <SwipeThumb
          disabled={disabled}
          disabledThumbIconBackgroundColor={disabledThumbIconBackgroundColor}
          disabledThumbIconBorderColor={disabledThumbIconBorderColor}
          disableResetOnTap={disableResetOnTap}
          enableReverseSwipe={enableReverseSwipe}
          finishRemainingSwipeAnimationDuration={
            finishRemainingSwipeAnimationDuration
          }
          forceCompleteSwipe={forceCompleteSwipe}
          forceReset={forceReset}
          layoutWidth={layoutWidth}
          onSwipeFail={onSwipeFail}
          onSwipeStart={onSwipeStart}
          onSwipeSuccess={onSwipeSuccess}
          railFillBackgroundColor={railFillBackgroundColor}
          railFillBorderColor={railFillBorderColor}
          railStyles={railStyles}
          resetAfterSuccessAnimDelay={resetAfterSuccessAnimDelay}
          screenReaderEnabled={screenReaderEnabled}
          shouldResetAfterSuccess={shouldResetAfterSuccess}
          swipeSuccessThreshold={swipeSuccessThreshold}
          thumbIconBackgroundColor={thumbIconBackgroundColor}
          thumbIconBorderColor={thumbIconBorderColor}
          thumbIconComponent={thumbIconComponent}
          thumbIconHeight={height}
          thumbIconImageSource={thumbIconImageSource}
          thumbIconStyles={thumbIconStyles}
          thumbIconWidth={thumbIconWidth}
        />
      )}
    </TouchableOpacity>
  );
};

export default React.memo(SwipeButton);
