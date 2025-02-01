import { render, screen, fireEvent } from "@testing-library/react-native";

import SwipeButton from "../";
import { expect } from "@jest/globals";
import React from "react";
import { AccessibilityInfo } from "react-native";

describe("Component: SwipeButton Functionality", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("moves the thumb icon when swiped", () => {
    const { getByTestId } = render(<SwipeButton />);

    const button = screen.getByTestId("SwipeButton");
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    const thumb = getByTestId("SwipeThumb");

    fireEvent(thumb, "onPanResponderMove", {
      nativeEvent: { touches: [{ clientX: 50 }] },
    });
    expect(thumb).toHaveStyle({ width: 50 });
  });

  it("should call onSwipeSuccess when swipe completed with forceCompleteSwipe", async () => {
    // Setup
    const onSwipeSuccess = jest.fn();

    let forceComplete;
    render(
      <SwipeButton
        title="Swipe"
        onSwipeSuccess={onSwipeSuccess}
        forceCompleteSwipe={(complete) => (forceComplete = complete)}
      />,
    );
    const button = screen.getByTestId("SwipeButton");
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Execute
    forceComplete();

    // Assert
    expect(onSwipeSuccess).toHaveBeenCalledTimes(1);
  });

  it("should return forceReset callback", async () => {
    // Setup
    let forceReset;
    render(
      <SwipeButton
        title="Swipe"
        forceReset={(reset) => (forceReset = reset)}
      />,
    );

    // Execute
    const button = screen.getByTestId("SwipeButton");
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(forceReset).not.toBeNull();
  });

  it("triggers onSwipeSuccess when swipe threshold is met", () => {
    const onSwipeStart = jest.fn();
    const onSwipeSuccess = jest.fn();
    const onSwipeFail = jest.fn();
    const { getByTestId } = render(
      <SwipeButton
        onSwipeStart={onSwipeStart}
        onSwipeSuccess={onSwipeSuccess}
        onSwipeFail={onSwipeFail}
      />,
    );

    // Simulate the onLayout event to set the layoutWidth
    const button = screen.getByTestId("SwipeButton");
    fireEvent(button, "layout", {
      nativeEvent: {
        layout: {
          width: 300, // Set a realistic width for the button
          height: 50,
        },
      },
    });

    // Get the thumb element
    const thumb = getByTestId("SwipeThumb");

    // Simulate the start of the gesture
    fireEvent(thumb, "responderGrant", {
      nativeEvent: {
        touches: [{ pageX: 0, pageY: 0 }], // Initial touch position
        changedTouches: [],
        target: thumb,
        identifier: 1,
      },
      touchHistory: { mostRecentTimeStamp: "2", touchBank: [] },
    });

    // Simulate the movement during the gesture
    fireEvent(thumb, "responderMove", {
      touchHistory: {
        mostRecentTimeStamp: "1",
        touchBank: [
          {
            touchActive: true,
            currentTimeStamp: 1,
            currentPageX: 200,
            previousPageX: 0,
          },
        ],
        numberActiveTouches: 1,
        indexOfSingleActiveTouch: 0,
      },
    });

    // Simulate the end of the gesture
    fireEvent(thumb, "responderRelease", {
      touchHistory: { mostRecentTimeStamp: "1", touchBank: [] },
    });
    expect(onSwipeStart).toHaveBeenCalled();
    expect(onSwipeSuccess).toHaveBeenCalled();
    expect(onSwipeFail).not.toHaveBeenCalled();
  });

  it("should trigger onSwipeFail when swipe threshold is not met", () => {
    const onSwipeStart = jest.fn();
    const onSwipeFail = jest.fn();
    const onSwipeSuccess = jest.fn();
    const { getByTestId } = render(
      <SwipeButton
        onSwipeStart={onSwipeStart}
        onSwipeFail={onSwipeFail}
        onSwipeSuccess={onSwipeSuccess}
      />,
    );

    // Simulate the onLayout event to set the layoutWidth
    const button = screen.getByTestId("SwipeButton");
    fireEvent(button, "layout", {
      nativeEvent: {
        layout: {
          width: 300, // Set a realistic width for the button
          height: 50,
        },
      },
    });

    // Get the thumb element
    const thumb = getByTestId("SwipeThumb");

    // Simulate the start of the gesture
    fireEvent(thumb, "responderGrant", {
      nativeEvent: {
        touches: [{ pageX: 0, pageY: 0 }], // Initial touch position
        changedTouches: [],
        target: thumb,
        identifier: 1,
      },
      touchHistory: { mostRecentTimeStamp: "2", touchBank: [] },
    });

    // Simulate the movement during the gesture
    fireEvent(thumb, "responderMove", {
      touchHistory: {
        mostRecentTimeStamp: "1",
        touchBank: [
          {
            touchActive: true,
            currentTimeStamp: 1,
            currentPageX: 100,
            previousPageX: 0,
          },
        ],
        numberActiveTouches: 1,
        indexOfSingleActiveTouch: 0,
      },
    });

    // Simulate the end of the gesture
    fireEvent(thumb, "responderRelease", {
      touchHistory: { mostRecentTimeStamp: "1", touchBank: [] },
    });

    expect(onSwipeStart).toHaveBeenCalled();
    expect(onSwipeFail).toHaveBeenCalled();
    expect(onSwipeSuccess).not.toHaveBeenCalled();
  });

  it("should not call onSwipeStart when disabled", async () => {
    const onSwipeStart = jest.fn();
    const onSwipeFail = jest.fn();
    const onSwipeSuccess = jest.fn();
    const { getByTestId } = render(
      <SwipeButton
        disabled={true}
        onSwipeStart={onSwipeStart}
        onSwipeFail={onSwipeFail}
        onSwipeSuccess={onSwipeSuccess}
      />,
    );

    // Simulate the onLayout event to set the layoutWidth
    const button = screen.getByTestId("SwipeButton");
    fireEvent(button, "layout", {
      nativeEvent: {
        layout: {
          width: 300, // Set a realistic width for the button
          height: 50,
        },
      },
    });

    // Get the thumb element
    const thumb = getByTestId("SwipeThumb");

    // Simulate the start of the gesture
    fireEvent(thumb, "responderGrant", {
      nativeEvent: {
        touches: [{ pageX: 0, pageY: 0 }], // Initial touch position
        changedTouches: [],
        target: thumb,
        identifier: 1,
      },
      touchHistory: { mostRecentTimeStamp: "2", touchBank: [] },
    });

    // Simulate the movement during the gesture
    fireEvent(thumb, "responderMove", {
      touchHistory: {
        mostRecentTimeStamp: "1",
        touchBank: [
          {
            touchActive: true,
            currentTimeStamp: 1,
            currentPageX: 100,
            previousPageX: 0,
          },
        ],
        numberActiveTouches: 1,
        indexOfSingleActiveTouch: 0,
      },
    });

    // Simulate the end of the gesture
    fireEvent(thumb, "responderRelease", {
      touchHistory: { mostRecentTimeStamp: "1", touchBank: [] },
    });

    expect(onSwipeStart).not.toHaveBeenCalled();
    expect(onSwipeFail).not.toHaveBeenCalled();
    expect(onSwipeSuccess).not.toHaveBeenCalled();
  });

  it("does not move the thumb icon when disabled", () => {
    const { getByTestId } = render(<SwipeButton disabled={true} />);
    const button = screen.getByTestId("SwipeButton");
    fireEvent(button, "layout", {
      nativeEvent: {
        layout: {
          width: 300, // Set a realistic width for the button
          height: 50,
        },
      },
    });

    const thumb = getByTestId("SwipeThumb");

    fireEvent(thumb, "onPanResponderMove", {
      nativeEvent: { touches: [{ clientX: 50 }] },
    });
    expect(thumb).toHaveStyle({ width: 50 }); // Should not change
  });

  it("is accessible to screen readers", () => {
    const { getByLabelText } = render(<SwipeButton title="Swipe to submit" />);
    expect(getByLabelText("Swipe to submit")).toBeTruthy();
  });

  it("moves thumb icon in reverse direction when enableReverseSwipe is true", () => {
    const { getByTestId } = render(<SwipeButton enableReverseSwipe={true} />);
    // Simulate the onLayout event to set the layoutWidth
    const button = screen.getByTestId("SwipeButton");
    fireEvent(button, "layout", {
      nativeEvent: {
        layout: {
          width: 300, // Set a realistic width for the button
          height: 50,
        },
      },
    });

    // Get the thumb element
    const thumb = getByTestId("SwipeThumb");

    // Simulate the movement during the gesture
    fireEvent(thumb, "responderMove", {
      touchHistory: {
        mostRecentTimeStamp: "1",
        touchBank: [
          {
            touchActive: true,
            currentTimeStamp: 1,
            currentPageX: -100,
            previousPageX: 0,
          },
        ],
        numberActiveTouches: 1,
        indexOfSingleActiveTouch: 0,
      },
    });

    expect(thumb).toHaveStyle({ width: 150 });
  });

  it("should call onSwipeSuccess upon a tap when screen reader enabled", async () => {
    // Setup
    const onSwipeSuccess = jest.fn();

    render(
      <SwipeButton
        title="Swipe"
        onSwipeSuccess={onSwipeSuccess}
        screenReaderEnabled
      />,
    );
    const button = screen.getByTestId("SwipeButton");
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Execute
    fireEvent(button, "onPress");

    // Assert
    expect(onSwipeSuccess).toHaveBeenCalledTimes(1);
  });

  it("should call screen reader toggle on focus change", async () => {
    // Setup
    const onSwipeSuccess = jest.fn();
    AccessibilityInfo.addEventListener = jest.fn(); // Mock the event listener

    render(<SwipeButton onSwipeSuccess={onSwipeSuccess} />);
    const button = screen.getByTestId("SwipeButton");
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });
    fireEvent(button, "onPress");
    expect(onSwipeSuccess).not.toHaveBeenCalledTimes(1);

    // Execute
    AccessibilityInfo.isScreenReaderEnabled = jest.fn().mockResolvedValue(true);
    fireEvent(button, "onFocus");

    await new Promise((resolve) => setTimeout(resolve, 0)); // Allow the effect to run
    fireEvent(button, "onPress");

    // Assert
    expect(onSwipeSuccess).toHaveBeenCalledTimes(1);
  });

  it("press should invoke on success callback when the screen reader enabled internally", async () => {
    // Setup
    const onSwipeSuccess = jest.fn();
    AccessibilityInfo.isScreenReaderEnabled = jest.fn().mockResolvedValue(true);
    AccessibilityInfo.addEventListener = jest.fn(); // Mock the event listener
    render(<SwipeButton onSwipeSuccess={onSwipeSuccess} />);
    const button = screen.getByTestId("SwipeButton");
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    await new Promise((resolve) => setTimeout(resolve, 0)); // Allow the effect to run

    fireEvent(button, "onPress");
    expect(onSwipeSuccess).toHaveBeenCalledTimes(1);
  });

  it("screen reader internally should not override the prop value", async () => {
    // Setup
    const onSwipeSuccess = jest.fn();
    AccessibilityInfo.isScreenReaderEnabled = jest.fn().mockResolvedValue(true);
    AccessibilityInfo.addEventListener = jest.fn(); // Mock the event listener
    render(
      <SwipeButton
        onSwipeSuccess={onSwipeSuccess}
        screenReaderEnabled={false}
      />,
    );
    const button = screen.getByTestId("SwipeButton");
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    await new Promise((resolve) => setTimeout(resolve, 0)); // Allow the effect to run

    fireEvent(button, "onPress");
    expect(onSwipeSuccess).not.toHaveBeenCalledTimes(1);
  });

  it("press should not invoke on success callback when the screen reader enabled internally and button disabled", async () => {
    // Setup
    const onSwipeSuccess = jest.fn();
    AccessibilityInfo.isScreenReaderEnabled = jest.fn().mockResolvedValue(true);
    AccessibilityInfo.addEventListener = jest.fn(); // Mock the event listener
    render(<SwipeButton onSwipeSuccess={onSwipeSuccess} disabled />);
    const button = screen.getByTestId("SwipeButton");
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    await new Promise((resolve) => setTimeout(resolve, 0)); // Allow the effect to run

    fireEvent(button, "onPress");
    expect(onSwipeSuccess).not.toHaveBeenCalledTimes(1);
  });
});
