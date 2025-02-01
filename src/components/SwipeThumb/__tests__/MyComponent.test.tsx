import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import MyComponent from "../MyComponent";

it("triggers onStart and onMove", () => {
  const onStartFn = jest.fn();
  const onMoveFn = jest.fn();

  const { getByTestId } = render(
    <MyComponent onStart={onStartFn} onMove={onMoveFn} />,
  );

  // Get the AnimateView element
  const animView = getByTestId("TestAnimView");

  // Simulate the start of the gesture
  fireEvent(animView, "responderGrant", {
    nativeEvent: {
      touches: [{ pageX: 0, pageY: 0 }], // Initial touch position
      changedTouches: [],
      target: animView,
      identifier: 1,
    },
    touchHistory: { mostRecentTimeStamp: "2", touchBank: [] },
  });

  // Simulate the movement during the gesture
  fireEvent(animView, "responderMove", {
    touchHistory: {
      mostRecentTimeStamp: "1",
      touchBank: [
        {
          touchActive: true,
          currentTimeStamp: 1,
          currentPageX: 10, // This will be gestureState.dx
          previousPageX: 0,
        },
      ],
      numberActiveTouches: 1,
      indexOfSingleActiveTouch: 0, // for touchBank[0]
    },
  });

  expect(onStartFn).toHaveBeenCalled();
  expect(onMoveFn).toHaveBeenCalled();
});

xit("should trigger onMove", () => {
  const onMoveFn = jest.fn();

  const { getByTestId } = render(<MyComponent onMove={onMoveFn} />);

  // Get the AnimateView element
  const animView = getByTestId("TestAnimView");

  // Simulate the start of the gesture
  fireEvent(animView, "responderGrant", {
    nativeEvent: { touches: [{ clientX: 0 }] },
  });

  // Simulate the movement during the gesture
  fireEvent(animView, "responderMove", {
    nativeEvent: { touches: [{ clientX: 100 }] },
    gestureState: { dx: 100, dy: 0, vx: 0, vy: 0, numberActiveTouches: 1 },
  });

  expect(onMoveFn).toHaveBeenCalled();
});
