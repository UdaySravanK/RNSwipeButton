import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, AccessibilityInfo} from 'react-native';

// Components
import SwipeThumb from '../../components/SwipeThumb';

// Styles
import styles from './styles';

// Constants
import {
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
} from '../../constants';

class SwipeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutWidth: 0,
      screenReaderEnabled: false,
    };
    this.handleScreenReaderToggled = this.handleScreenReaderToggled.bind(this);
    this.onLayoutContainer = this.onLayoutContainer.bind(this);
    this.isUnmounting = false;
  }

  componentDidMount() {
    this.isUnmounting = false;
    AccessibilityInfo.addEventListener(
      'change',
      this.handleScreenReaderToggled,
    );
    AccessibilityInfo.fetch().then(isEnabled => {
      if (this.isUnmounting) {
        return;
      }
      this.setState({
        screenReaderEnabled: isEnabled,
      });
    });
  }

  componentWillUnmount() {
    this.isUnmounting = true;
    AccessibilityInfo.removeEventListener(
      'change',
      this.handleScreenReaderToggled,
    );
  }

  /**
   * Retrieve layoutWidth to set maximum swipeable area.
   * Correct layout width will be received only after first render but we need it before render.
   * So render SwipeThumb only if layoutWidth > 0
   */
  async onLayoutContainer(e) {
    if (this.isUnmounting || this.state.layoutWidth) {
      return;
    }
    await this.setState({
      layoutWidth: e.nativeEvent.layout.width,
    });
  }

  handleScreenReaderToggled(isEnabled) {
    if (this.isUnmounting || this.state.screenReaderEnabled === isEnabled) {
      return;
    }
    this.setState({
      screenReaderEnabled: isEnabled,
    });
  }

  render() {
    const {
      containerStyles,
      disabled,
      disabledRailBackgroundColor,
      disabledThumbIconBackgroundColor,
      disabledThumbIconBorderColor,
      enableRightToLeftSwipe,
      height,
      onSwipeFail,
      onSwipeStart,
      onSwipeSuccess,
      railBackgroundColor,
      railBorderColor,
      railFillBackgroundColor,
      railFillBorderColor,
      resetAfterSuccessAnimDuration,
      shouldResetAfterSuccess,
      swipeSuccessThreshold,
      thumbIconBackgroundColor,
      thumbIconBorderColor,
      thumbIconComponent,
      thumbIconImageSource,
      thumbIconStyles,
      title,
      titleColor,
      titleFontSize,
      titleStyles,
      width,
    } = this.props;
    const {screenReaderEnabled} = this.state;

    return (
      <View
        style={[
          styles.container,
          {
            ...containerStyles,
            backgroundColor: disabled
              ? disabledRailBackgroundColor
              : railBackgroundColor,
            borderColor: railBorderColor,
            ...(width ? {width} : {}),
          },
        ]}
        onLayout={this.onLayoutContainer}>
        <Text
          importantForAccessibility={
            screenReaderEnabled ? 'no-hide-descendants' : ''
          }
          style={[
            styles.title,
            {
              color: titleColor,
              fontSize: titleFontSize,
              ...titleStyles,
            },
          ]}>
          {title}
        </Text>
        {this.state.layoutWidth > 0 && (
          <SwipeThumb
            disabled={disabled}
            disabledThumbIconBackgroundColor={disabledThumbIconBackgroundColor}
            disabledThumbIconBorderColor={disabledThumbIconBorderColor}
            enableRightToLeftSwipe={enableRightToLeftSwipe}
            iconSize={height}
            layoutWidth={this.state.layoutWidth}
            onSwipeFail={onSwipeFail}
            onSwipeStart={onSwipeStart}
            onSwipeSuccess={onSwipeSuccess}
            railFillBackgroundColor={railFillBackgroundColor}
            railFillBorderColor={railFillBorderColor}
            resetAfterSuccessAnimDuration={resetAfterSuccessAnimDuration}
            screenReaderEnabled={screenReaderEnabled}
            shouldResetAfterSuccess={shouldResetAfterSuccess}
            swipeSuccessThreshold={swipeSuccessThreshold}
            thumbIconBackgroundColor={thumbIconBackgroundColor}
            thumbIconBorderColor={thumbIconBorderColor}
            thumbIconComponent={thumbIconComponent}
            thumbIconImageSource={thumbIconImageSource}
            thumbIconStyles={thumbIconStyles}
            title={title}
          />
        )}
      </View>
    );
  }
}

SwipeButton.defaultProps = {
  containerStyles: {},
  disabled: false,
  disabledRailBackgroundColor: DISABLED_RAIL_BACKGROUND_COLOR,
  disabledThumbIconBackgroundColor: DISABLED_THUMB_ICON_BACKGROUND_COLOR,
  disabledThumbIconBorderColor: DISABLED_THUMB_ICON_BORDER_COLOR,
  height: 50,
  railBackgroundColor: RAIL_BACKGROUND_COLOR,
  railBorderColor: RAIL_BORDER_COLOR,
  railFillBackgroundColor: RAIL_FILL_BACKGROUND_COLOR,
  railFillBorderColor: RAIL_FILL_BORDER_COLOR,
  swipeSuccessThreshold: SWIPE_SUCCESS_THRESHOLD,
  thumbIconBackgroundColor: THUMB_ICON_BACKGROUND_COLOR,
  thumbIconBorderColor: THUMB_ICON_BORDER_COLOR,
  thumbIconStyles: {},
  title: 'Swipe to submit',
  titleColor: TITLE_COLOR,
  titleFontSize: 20,
  titleStyles: {},
};

SwipeButton.propTypes = {
  containerStyles: PropTypes.object,
  disable: PropTypes.bool,
  disabledRailBackgroundColor: PropTypes.string,
  disabledThumbIconBackgroundColor: PropTypes.string,
  disabledThumbIconBorderColor: PropTypes.string,
  enableRightToLeftSwipe: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSwipeFail: PropTypes.func,
  onSwipeStart: PropTypes.func,
  onSwipeSuccess: PropTypes.func,
  railBackgroundColor: PropTypes.string,
  railBorderColor: PropTypes.string,
  railFillBackgroundColor: PropTypes.string,
  railFillBorderColor: PropTypes.string,
  resetAfterSuccessAnimDuration: PropTypes.number,
  shouldResetAfterSuccess: PropTypes.bool,
  swipeSuccessThreshold: PropTypes.number, // Ex: 70. Swipping 70% will be considered as successful swipe
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
  titleColor: PropTypes.string,
  titleFontSize: PropTypes.number,
  titleStyles: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default SwipeButton;
