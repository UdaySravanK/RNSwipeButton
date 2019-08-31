import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, AccessibilityInfo} from 'react-native';
import SwipeThumb from '../../components/SwipeThumb';
import styles from './styles';

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
    const {disabled, onSwipeSuccess, title} = this.props;
    const {screenReaderEnabled} = this.state;

    return (
      <View style={styles.container} onLayout={this.onLayoutContainer}>
        <Text
          importantForAccessibility={
            screenReaderEnabled ? 'no-hide-descendants' : ''
          }
          style={styles.title}>
          Swipe to submit
        </Text>
        {this.state.layoutWidth > 0 && (
          <SwipeThumb
            disabled={disabled}
            layoutWidth={this.state.layoutWidth}
            onSwipeSuccess={onSwipeSuccess}
            screenReaderEnabled={screenReaderEnabled}
            title={title}
          />
        )}
      </View>
    );
  }
}

SwipeButton.defaultProps = {
  disabled: false,
  navigationListener: () => {},
  title: '',
};

SwipeButton.propTypes = {
  onSwipeSuccess: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

export default SwipeButton;
