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

// Assets
import thumbIcon from '../../assets/images/arrow-right.png';

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
      if (this.isUnmounting) return;
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
    if (this.isUnmounting || this.state.layoutWidth) return;
    await this.setState({
      layoutWidth: e.nativeEvent.layout.width,
    });
  }

  handleScreenReaderToggled(isEnabled) {
    if (this.isUnmounting || this.state.screenReaderEnabled === isEnabled)
      return;
    this.setState({
      screenReaderEnabled: isEnabled,
    });
  }

  render() {
    const {
      disabled,
      disabledRailBackgroundColor,
      disabledThumbIconBackgroundColor,
      disabledThumbIconBorderColor,
      height,
      onSwipeSuccess,
      railBackgroundColor,
      railBorderColor,
      railFillBackgroundColor,
      railFillBorderColor,
      swipeSuccessThreshold,
      thumbIconBackgroundColor,
      thumbIconBorderColor,
      thumbIconImageSource,
      title,
      titleColor,
      titleFontSize,
      width,
    } = this.props;
    const {screenReaderEnabled} = this.state;

    return (
      <View
        style={[
          styles.container,
          {
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
            },
          ]}>
          {title}
        </Text>
        {this.state.layoutWidth > 0 && (
          <SwipeThumb
            disabled={disabled}
            disabledThumbIconBackgroundColor={disabledThumbIconBackgroundColor}
            disabledThumbIconBorderColor={disabledThumbIconBorderColor}
            iconSize={height}
            layoutWidth={this.state.layoutWidth}
            onSwipeSuccess={onSwipeSuccess}
            railFillBackgroundColor={railFillBackgroundColor}
            railFillBorderColor={railFillBorderColor}
            screenReaderEnabled={screenReaderEnabled}
            swipeSuccessThreshold={swipeSuccessThreshold}
            thumbIconBackgroundColor={thumbIconBackgroundColor}
            thumbIconBorderColor={thumbIconBorderColor}
            thumbIconImageSource={thumbIconImageSource}
            title={title}
          />
        )}
      </View>
    );
  }
}

SwipeButton.defaultProps = {
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
  thumbIconImageSource: thumbIcon,
  title: 'Swipe to submit',
  titleColor: TITLE_COLOR,
  titleFontSize: 20,
};

SwipeButton.propTypes = {
  disable: PropTypes.bool,
  disabledRailBackgroundColor: PropTypes.string,
  disabledThumbIconBackgroundColor: PropTypes.string,
  disabledThumbIconBorderColor: PropTypes.string,
  height: PropTypes.number,
  onSwipeSuccess: PropTypes.func,
  railBackgroundColor: PropTypes.string,
  railBorderColor: PropTypes.string,
  railFillBackgroundColor: PropTypes.string,
  railFillBorderColor: PropTypes.string,
  swipeSuccessThreshold: PropTypes.number, // Ex: 70. Swipping 70% will be considered as successful swipe
  thumbIconBackgroundColor: PropTypes.string,
  thumbIconBorderColor: PropTypes.string,
  thumbIconImageSource: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  title: PropTypes.string,
  titleColor: PropTypes.string,
  titleFontSize: PropTypes.number,
  width: PropTypes.number,
};

export default SwipeButton;
