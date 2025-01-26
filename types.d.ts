import { Component, ReactElement } from 'react';
import { StyleProp, ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';

interface Props {
    containerStyles?: StyleProp<ViewStyle>;
    disabled?: boolean;
    disabledRailBackgroundColor?: string;
    disabledThumbIconBackgroundColor?: string;
    disabledThumbIconBorderColor?: string;
    /**
     * Without setting this to true, the completed swipe will be reset to start position upon a tap.
     */
    disableResetOnTap?: boolean;
    /**
     * Enable swipe from right to left for RTL apps support
     */
    enableReverseSwipe?: boolean;
    /**
     * When the swipe reaches a default 70% threshold or a custom `swipeSuccessThreshold`, the remaining swipe will be auto completed with an animation.
     * The default animation duration is 400ms. This value can be contolled with this prop.
     */
    finishRemainingSwipeAnimationDuration?: number;
    /**
     * This funtion returns an inner function. The returned inner function can be invoked to complete the swipe programmatically.
     * @returns function
     */
    forceCompleteSwipe?: (forceComplete: () => void) => void;
    /**
     * This funtion returns an inner function. The returned inner function can be invoked to reset a successfully completed swipe.
     * @returns function
     */
    forceReset?: (forceReset: () => void) => void;
    /**
     * This is the height of thumb which we interact to swipe. 
     * The width of the thumb will be automatically set to the height by default. But the thumb can be costomized with `thumbIconComponent`.
     * Default value is 50
     */
    height?: number;
    onSwipeFail?: () => void;
    onSwipeStart?: () => void;
    /**
     * A successful swipe invokes this callback.
     * @param isForceComplete Indicates whether the swipe is completed by real gesture of programmatically using the forceCompleteSwipe
     */
    onSwipeSuccess?: (isForceComplete: boolean) => void;
    railBackgroundColor?: string;
    railBorderColor?: string;
    railFillBackgroundColor?: string;
    railFillBorderColor?: string;
    railStyles?: StyleProp<ViewStyle>;
    /**
     * The button can be reset to original state upon a succesful swipe by setting `shouldResetAfterSuccess` to true. This prop is to set the delay.
     */
    resetAfterSuccessAnimDelay?: number;
    shouldResetAfterSuccess?: boolean;
    /**
     * If you set it to 50, it means after swiping 50%, the remaining will be auto completed.
     * 
     * Default value is 70.
     */
    swipeSuccessThreshold?: number;
    thumbIconBackgroundColor?: string;
    thumbIconBorderColor?: string;
    thumbIconComponent?: () => ReactElement;
    thumbIconImageSource?: ImageSourcePropType;
    thumbIconStyles?: StyleProp<ViewStyle>;
    thumbIconHeight?: number;
    thumbIconWidth?: number;
    title?: string;
    titleColor?: string;
    /**
     * Default value is 20
     */
    titleFontSize?: number;
    /**
     * Allows scaling the title font size when the button width increases.  A value of 1.5 means the font size will scale up to 150% of the base `titleFontSize`.
     */
    titleMaxFontScale?: number;
    /**
     * Default value is 1
     */
    titleMaxLines?: number;
    titleStyles?: StyleProp<TextStyle>;
    /**
     * Width of the entire SwipeButton not just the draggable thumb icon.
     */
    width?: number;
}

interface State {
    layoutWidth: number;
    screenReaderEnabled: boolean;
}

export default class RNSwipeButton extends Component<Props, State> {}

export { Props };

