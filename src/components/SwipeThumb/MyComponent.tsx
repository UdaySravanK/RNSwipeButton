import React, { useCallback } from "react";
import {
  Animated,
  PanResponder,
  PanResponderGestureState,
  Text,
  View,
} from "react-native";

interface Props {
  onStart?: () => void;
  onMove?: () => void;
}

const MyComponent: React.FC<Props> = (props) => {
  const { onStart, onMove } = props;

  function onPanResponderStart() {
    onStart && onStart();
  }

  const onPanMove = useCallback(
    async (_: any, _g: PanResponderGestureState) => {
      _g.dx > 0 && onMove && onMove();
    },
    [],
  );

  const panResponder = useCallback(
    PanResponder.create({
      onStartShouldSetPanResponder: (e: any, s: any) => true,
      onStartShouldSetPanResponderCapture: (e: any, s: any) => true,
      onMoveShouldSetPanResponder: (e: any, s: any) => true,
      onMoveShouldSetPanResponderCapture: (e: any, s: any) => true,
      onShouldBlockNativeResponder: (e: any, s: any) => true,
      onPanResponderGrant: onPanResponderStart,
      onPanResponderMove: onPanMove,
      onPanResponderRelease: (e: any, s: any) => true,
    }) as any,
    [props],
  );

  return (
    <Animated.View {...panResponder.panHandlers} testID="TestAnimView">
      <View>
        <Text>USK</Text>
      </View>
    </Animated.View>
  );
};

export default MyComponent;
