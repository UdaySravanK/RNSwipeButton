import {StyleSheet} from 'react-native';
import {
  THUMB_ICON_BACKGROUND_COLOR,
  THUMB_ICON_BORDER_COLOR,
  DISABLED_THUMB_ICON_BORDER_COLOR,
  DISABLED_THUMB_ICON_BACKGROUND_COLOR,
} from '../../constants';

const iconSize = 50;
const borderWidth = 3;
const margin = 1;
const maxContainerHeight = 100;
const Styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    borderRadius: maxContainerHeight / 2,
    borderRightWidth: 0,
    borderWidth,
    margin,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: THUMB_ICON_BACKGROUND_COLOR,
    borderColor: THUMB_ICON_BORDER_COLOR,
    borderRadius: maxContainerHeight / 2,
    borderWidth: 2,
    height: iconSize,
    justifyContent: 'center',
    marginVertical: -borderWidth,
    width: iconSize,
  },
  iconDisabled: {
    backgroundColor: DISABLED_THUMB_ICON_BACKGROUND_COLOR,
    borderColor: DISABLED_THUMB_ICON_BORDER_COLOR,
  },
  chevronImage: {
    height: iconSize / 3,
  },
});

export default Styles;
export {iconSize, borderWidth, margin};
