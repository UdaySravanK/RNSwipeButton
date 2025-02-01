import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  Animated,
  PanResponder,
  PanResponderGestureState,
  Text,
  View,
} from "react-native";

interface SwipeThumbProps {
  disabled?: boolean;
  onStart?: () => void;
  onMove?: () => void;
}

const SwipeThumb: React.FC<SwipeThumbProps> = React.memo((props) => {
  const { disabled = false, onStart, onMove } = props;

  var defaultContainerWidth = 50;

  const animatedWidth = useRef(
    new Animated.Value(defaultContainerWidth),
  ).current;
  const [defaultWidth, setDefaultWidth] = useState(defaultContainerWidth);

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: defaultWidth,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [defaultWidth]);

  function onPanResponderStart() {
    if (disabled) return;
    onStart && onStart();
  }

  const onPanResponderMove = useCallback(
    async (_: any, gestureState: PanResponderGestureState) => {
      console.log(gestureState.dx);
      if (disabled) return;
      setDefaultWidth(gestureState.dx);
      onMove && onMove();
    },
    [],
  );

  function onPanResponderRelease(
    _: any,
    gestureState: PanResponderGestureState,
  ) {
    console.log(gestureState.dx);
  }

  const panResponder = useCallback(
    PanResponder.create({
      onStartShouldSetPanResponder: (e: any, s: any) => true,
      onStartShouldSetPanResponderCapture: (e: any, s: any) => true,
      onMoveShouldSetPanResponder: (e: any, s: any) => true,
      onMoveShouldSetPanResponderCapture: (e: any, s: any) => true,
      onShouldBlockNativeResponder: (e: any, s: any) => true,
      onPanResponderGrant: onPanResponderStart,
      onPanResponderMove: onPanResponderMove,
      onPanResponderRelease: onPanResponderRelease,
    }) as any,
    [props],
  );

  return (
    <Animated.View
      style={[{ width: animatedWidth }]}
      {...panResponder.panHandlers}
      testID="TestAnimatableView"
    >
      <View>
        <Text>USK</Text>
      </View>
    </Animated.View>
  );
});

export default SwipeThumb;
