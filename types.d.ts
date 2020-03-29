import { ReactElement } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

declare module 'rn-swipe-button' {
    class RNSwipeButton {
        containerStyle?: StyleProp<ViewStyle>;
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
        resetAfterSuccessAnimDuration?: number;
        screenReaderEnabled?: boolean;
        shouldResetAfterSuccess?: boolean;
        swipeSuccessThreshold?: number; // Ex: 70. Swipping 70% will be considered as successful swipe
        thumbIconBackgroundColor?: string;
        thumbIconBorderColor?: string;
        thumbIconComponent?: ReactElement;
        thumbIconImageSource?: string | number;
        thumbIconStyles?: StyleProp<ViewStyle>;
        title?: string;
        titleColor?: string;
        titleFontSize?: number;
        titleStyles?: StyleProp<TextStyle>;
        width?: string | number;
    }
}