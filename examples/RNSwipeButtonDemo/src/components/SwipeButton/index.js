import React from 'react';
import PropTypes from 'prop-types';
import {Animated, Text, View, AccessibilityInfo} from 'react-native';

// Components
import SwipeThumb from '../../components/SwipeThumb';

// Styles
import styles from './styles';
// Styles
import {borderWidth, margin} from '../SwipeThumb/styles';

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
  TRANSPARENT_COLOR,
} from '../../constants';

// Assets
import thumbIcon from '../../assets/images/arrow-right.png';

class SwipeButton extends React.Component {
  constructor(props) {
    super(props);
    const paddingAndMarginsOffset = borderWidth + 2 * margin;
    this.defaultContainerWidth = props.iconSize;
    this.maxWidth = props.layoutWidth - paddingAndMarginsOffset;
    this.state = {
      layoutWidth: 0,
      animatedWidth: new Animated.Value(0),
      backgroundColor: TRANSPARENT_COLOR,
      borderColor: TRANSPARENT_COLOR,
      screenReaderEnabled: false,
      pan: new Animated.ValueXY(),
    };

    this.handleScreenReaderToggled = this.handleScreenReaderToggled.bind(this);
    this.onLayoutContainer = this.onLayoutContainer.bind(this);
    this.setAnimatedWidth = this.setAnimatedWidth.bind(this);
    this.finishRemainingSwipe = this.finishRemainingSwipe.bind(this);
    this.setBackgroundColors = this.setBackgroundColors.bind(this);
    this.reset = this.reset.bind(this);
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

  setAnimatedWidth(width) {
    this.state.animatedWidth.setValue(width);
  }

  render() {
    const {
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
      swipeSuccessThreshold,
      thumbIconBackgroundColor,
      thumbIconBorderColor,
      thumbIconComponent,
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
        {/* {this.state.layoutWidth > 0 && (
          <Animated.View
            style={[
              {
                borderRadius: 100 / 2,
                borderWidth: 1,
                width: this.state.animatedWidth,
                backgroundColor: '#222200',
                height,
                position: 'absolute',
              },
            ]}
          />
        )} */}
        {/* <Text
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
        </Text> */}
        {this.state.layoutWidth > 0 && (
          <SwipeThumb
            disabled={disabled}
            disabledThumbIconBackgroundColor={disabledThumbIconBackgroundColor}
            disabledThumbIconBorderColor={disabledThumbIconBorderColor}
            enableRightToLeftSwipe={enableRightToLeftSwipe}
            finishRemainingSwipe={this.finishRemainingSwipe}
            iconSize={height}
            layoutWidth={this.state.layoutWidth}
            onSwipe={this.handleOnSwipe}
            onSwipeFail={onSwipeFail}
            onSwipeStart={onSwipeStart}
            onSwipeSuccess={onSwipeSuccess}
            onSwipeNotMetSuccessThreshold={this.onSwipeNotMetSuccessThreshold}
            onSwipeMetSuccessThreshold={this.onSwipeMetSuccessThreshold}
            reset={this.reset}
            railFillBackgroundColor={railFillBackgroundColor}
            railFillBorderColor={railFillBorderColor}
            screenReaderEnabled={screenReaderEnabled}
            swipeSuccessThreshold={swipeSuccessThreshold}
            thumbIconBackgroundColor={thumbIconBackgroundColor}
            thumbIconBorderColor={thumbIconBorderColor}
            thumbIconComponent={thumbIconComponent}
            thumbIconImageSource={thumbIconImageSource}
            title={title}
            setAnimatedWidth={this.setAnimatedWidth}
            setBackgroundColors={this.setBackgroundColors}
            animatedWidth={this.state.animatedWidth}
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
  enableRightToLeftSwipe: PropTypes.bool,
  height: PropTypes.number,
  onSwipeFail: PropTypes.func,
  onSwipeStart: PropTypes.func,
  onSwipeSuccess: PropTypes.func,
  railBackgroundColor: PropTypes.string,
  railBorderColor: PropTypes.string,
  railFillBackgroundColor: PropTypes.string,
  railFillBorderColor: PropTypes.string,
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
  title: PropTypes.string,
  titleColor: PropTypes.string,
  titleFontSize: PropTypes.number,
  width: PropTypes.number,
};

export default SwipeButton;
