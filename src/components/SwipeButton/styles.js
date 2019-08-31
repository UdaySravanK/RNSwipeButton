import {StyleSheet} from 'react-native';
import {
  RAIL_BACKGROUND_COLOR,
  RAIL_BORDER_COLOR,
  TITLE_COLOR,
} from '../../constants';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: RAIL_BACKGROUND_COLOR,
    borderColor: RAIL_BORDER_COLOR,
    borderRadius: 100 / 2,
    borderWidth: 1,
    justifyContent: 'center',
    margin: 5,
  },
  title: {
    alignSelf: 'center',
    color: TITLE_COLOR,
    fontSize: 20,
    position: 'absolute',
  },
});

export default Styles;
