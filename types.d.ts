import { Component, ReactElement } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

interface Props {
    containerStyles?: StyleProp<ViewStyle>;
    disabled?: boolean;
    disabledRailBackgroundColor?: string;
    disabledThumbIconBackgroundColor?: string;
    disabledThumbIconBorderColor?: string;
    enableRightToLeftSwipe?: boolean;
    height?: number | string;
    onSwipeFail?: () => void;
    onSwipeStart?: () => void;
    onSwipeSuccess?: () => void;
    railBackgroundColor?: string;
    railBorderColor?: string;
    railFillBackgroundColor?: string;
    railFillBorderColor?: string;
    railStyles?: StyleProp<ViewStyle>;
    resetAfterSuccessAnimDuration?: number;
    screenReaderEnabled?: boolean;
    shouldResetAfterSuccess?: boolean;
    swipeSuccessThreshold?: number; // Ex: 70. Swipping 70% will be considered as successful swipe
    thumbIconBackgroundColor?: string;
    thumbIconBorderColor?: string;
    thumbIconComponent?: ReactElement;
    thumbIconImageSource?: string | number;
    thumbIconStyles?: StyleProp<ViewStyle>;
    thumbIconWidth?: number;
    title?: string;
    titleColor?: string;
    titleFontSize?: number;
    titleMaxFontScale?: number;
    titleStyles?: StyleProp<TextStyle>;
    width?: string | number;
}

interface State {
    layoutWidth: number;
    screenReaderEnabled: boolean;
}

export default class RNSwipeButton extends Component<Props, State> {
    static defaultProps = RNSwipeButton.defaultProps;
}

export {
    Props
};
