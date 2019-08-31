import {StyleSheet} from 'react-native';

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
    borderRadius: maxContainerHeight / 2,
    borderWidth: 2,
    justifyContent: 'center',
    marginVertical: -borderWidth,
  },
});

export default Styles;
export {borderWidth, margin};
