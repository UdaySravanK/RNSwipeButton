import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react-native";

import SwipeButton from "../";
import { expect } from "@jest/globals";
import React from "react";
import { AccessibilityInfo } from "react-native";

describe("Component: SwipeButton Functionality", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("moves the thumb icon when swiped", async () => {
    const { getByTestId } = render(<SwipeButton />);

    let button;
    await waitFor(() => {
      button = getByTestId("SwipeButton");
    });
    await act(async () => {
      fireEvent(button, "onLayout", {
        nativeEvent: { layout: { width: 100 } },
      });
    });

    let thumb;
    await waitFor(() => {
      thumb = getByTestId("SwipeThumb");
    });
    await act(async () => {
      fireEvent(thumb, "onPanResponderMove", {
        nativeEvent: { touches: [{ clientX: 50 }] },
      });
    });
    await waitFor(async () => {
      expect(thumb).toHaveStyle({ width: 50 });
    });
  });

  it("should call onSwipeSuccess when swipe completed with forceCompleteSwipe", async () => {
    // Setup
    const onSwipeSuccess = jest.fn();

    let forceComplete;
    const { getByTestId } = render(
      <SwipeButton
        title="Swipe"
        onSwipeSuccess={onSwipeSuccess}
        forceCompleteSwipe={(complete) => (forceComplete = complete)}
      />,
    );

    let button;
    await waitFor(() => {
      button = getByTestId("SwipeButton");
    });
    act(() => {
      fireEvent(button, "onLayout", {
        nativeEvent: { layout: { width: 100 } },
      });
    });

    await act(async () => {
      // Execute
      forceComplete();

      // Assert
      expect(onSwipeSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it("should return forceReset callback", async () => {
    // Setup
    let forceReset;
    const { getByTestId } = render(
      <SwipeButton
        title="Swipe"
        forceReset={(reset) => (forceReset = reset)}
      />,
    );

    // Execute
    let button;
    await waitFor(() => {
      button = getByTestId("SwipeButton");
    });
    act(() => {
      fireEvent(button, "onLayout", {
        nativeEvent: { layout: { width: 100 } },
      });
    });

    // Assert
    expect(forceReset).not.toBeNull();
  });

  it("triggers onSwipeSuccess when swipe threshold is met", async () => {
    const onSwipeStart = jest.fn();
    const onSwipeSuccess = jest.fn();
    const onSwipeFail = jest.fn();
    let getByTestId;
    await waitFor(async () => {
      getByTestId = render(
        <SwipeButton
          onSwipeStart={onSwipeStart}
          onSwipeSuccess={onSwipeSuccess}
          onSwipeFail={onSwipeFail}
        />,
      ).getByTestId;
    });

    // Simulate the onLayout event to set the layoutWidth
    let button;
    await waitFor(() => {
      button = getByTestId("SwipeButton");
    });

    await act(async () => {
      fireEvent(button, "layout", {
        nativeEvent: {
          layout: {
            width: 300, // Set a realistic width for the button
            height: 50,
          },
        },
      });
    });

    // Get the thumb element
    let thumb;
    await waitFor(() => {
      thumb = getByTestId("SwipeThumb");
    });

    act(() => {
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
    });

    await waitFor(() => {
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
    });

    await waitFor(() => {
      // Simulate the end of the gesture
      fireEvent(thumb, "responderRelease", {
        touchHistory: { mostRecentTimeStamp: "1", touchBank: [] },
      });
      expect(onSwipeStart).toHaveBeenCalled();
      expect(onSwipeSuccess).toHaveBeenCalled();
      expect(onSwipeFail).not.toHaveBeenCalled();
    });
  });

  it("should trigger onSwipeFail when swipe threshold is not met", async () => {
    const onSwipeStart = jest.fn();
    const onSwipeFail = jest.fn();
    const onSwipeSuccess = jest.fn();
    let getByTestId;
    await waitFor(async () => {
      getByTestId = render(
        <SwipeButton
          onSwipeStart={onSwipeStart}
          onSwipeFail={onSwipeFail}
          onSwipeSuccess={onSwipeSuccess}
        />,
      ).getByTestId;
    });

    // Simulate the onLayout event to set the layoutWidth
    let button;
    await waitFor(() => {
      button = getByTestId("SwipeButton");
    });
    await act(async () => {
      fireEvent(button, "layout", {
        nativeEvent: {
          layout: {
            width: 300, // Set a realistic width for the button
            height: 50,
          },
        },
      });
    });

    // Get the thumb element
    let thumb;
    await waitFor(() => {
      thumb = getByTestId("SwipeThumb");
    });

    act(() => {
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
    });

    await waitFor(() => {
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
    });

    await waitFor(() => {
      // Simulate the end of the gesture
      fireEvent(thumb, "responderRelease", {
        touchHistory: { mostRecentTimeStamp: "1", touchBank: [] },
      });

      expect(onSwipeStart).toHaveBeenCalled();
      expect(onSwipeFail).toHaveBeenCalled();
      expect(onSwipeSuccess).not.toHaveBeenCalled();
    });
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
    let button;
    await waitFor(() => {
      button = screen.getByTestId("SwipeButton");
    });
    await act(async () => {
      fireEvent(button, "layout", {
        nativeEvent: {
          layout: {
            width: 300, // Set a realistic width for the button
            height: 50,
          },
        },
      });
    });

    // Get the thumb element
    let thumb;
    await waitFor(() => {
      thumb = getByTestId("SwipeThumb");
    });

    act(() => {
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
  });

  it("does not move the thumb icon when disabled", async () => {
    const { getByTestId } = render(<SwipeButton disabled={true} />);
    let button;
    await waitFor(async () => {
      button = screen.getByTestId("SwipeButton");
    });
    await act(async () => {
      fireEvent(button, "layout", {
        nativeEvent: {
          layout: {
            width: 300, // Set a realistic width for the button
            height: 50,
          },
        },
      });
    });
    let thumb;
    await waitFor(() => {
      thumb = getByTestId("SwipeThumb");
    });
    act(() => {
      fireEvent(thumb, "onPanResponderMove", {
        nativeEvent: { touches: [{ clientX: 50 }] },
      });
      expect(thumb).toHaveStyle({ width: 50 }); // Should not change
    });
  });

  it("is accessible to screen readers", async () => {
    const { getByLabelText } = render(<SwipeButton title="Swipe to submit" />);
    await waitFor(async () => {
      expect(getByLabelText("Swipe to submit")).toBeTruthy();
    });
  });

  it("moves thumb icon in reverse direction when enableReverseSwipe is true", async () => {
    const { getByTestId } = render(<SwipeButton enableReverseSwipe={true} />);
    // Simulate the onLayout event to set the layoutWidth
    let button;
    await waitFor(async () => {
      button = screen.getByTestId("SwipeButton");
    });
    await act(async () => {
      fireEvent(button, "layout", {
        nativeEvent: {
          layout: {
            width: 300, // Set a realistic width for the button
            height: 50,
          },
        },
      });
    });
    let thumb;
    await waitFor(async () => {
      // Get the thumb element
      thumb = getByTestId("SwipeThumb");
    });
    act(() => {
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

      expect(thumb).toHaveStyle({ width: 50 });
    });
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

    let button;
    await waitFor(async () => {
      button = screen.getByTestId("SwipeButton");
    });
    await act(async () => {
      fireEvent(button, "onLayout", {
        nativeEvent: { layout: { width: 100 } },
      });

      // Execute
      fireEvent(button, "onPress");

      // Assert
      expect(onSwipeSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it("should call screen reader toggle on focus change", async () => {
    // Setup
    const onSwipeSuccess = jest.fn();
    AccessibilityInfo.addEventListener = jest.fn(); // Mock the event listener

    render(<SwipeButton onSwipeSuccess={onSwipeSuccess} />);
    let button;
    await waitFor(async () => {
      button = screen.getByTestId("SwipeButton");
    });
    await act(async () => {
      fireEvent(button, "onLayout", {
        nativeEvent: { layout: { width: 100 } },
      });
      fireEvent(button, "onPress");
      expect(onSwipeSuccess).not.toHaveBeenCalledTimes(1);

      // Execute
      AccessibilityInfo.isScreenReaderEnabled = jest
        .fn()
        .mockResolvedValue(true);
      await waitFor(() => {
        fireEvent(button, "onFocus");
      });
      // await new Promise((resolve) => setTimeout(resolve, 0)); // Allow the effect to run
      fireEvent(button, "onPress");

      // Assert
      expect(onSwipeSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it("press should invoke on success callback when the screen reader enabled internally", async () => {
    // Setup
    const onSwipeSuccess = jest.fn();
    AccessibilityInfo.isScreenReaderEnabled = jest.fn().mockResolvedValue(true);
    AccessibilityInfo.addEventListener = jest.fn(); // Mock the event listener
    render(<SwipeButton onSwipeSuccess={onSwipeSuccess} />);
    await waitFor(() => {
      const button = screen.getByTestId("SwipeButton");
      fireEvent(button, "onLayout", {
        nativeEvent: { layout: { width: 100 } },
      });

      // await new Promise((resolve) => setTimeout(resolve, 0)); // Allow the effect to run
      act(() => {
        fireEvent(button, "onPress");
      });
      expect(onSwipeSuccess).toHaveBeenCalledTimes(1);
    });
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
    await waitFor(() => {
      const button = screen.getByTestId("SwipeButton");
      fireEvent(button, "onLayout", {
        nativeEvent: { layout: { width: 100 } },
      });

      // await new Promise((resolve) => setTimeout(resolve, 0)); // Allow the effect to run

      fireEvent(button, "onPress");
      expect(onSwipeSuccess).not.toHaveBeenCalledTimes(1);
    });
  });

  it("press should not invoke on success callback when the screen reader enabled internally and button disabled", async () => {
    // Setup
    const onSwipeSuccess = jest.fn();
    AccessibilityInfo.isScreenReaderEnabled = jest.fn().mockResolvedValue(true);
    AccessibilityInfo.addEventListener = jest.fn(); // Mock the event listener
    render(<SwipeButton onSwipeSuccess={onSwipeSuccess} disabled />);
    await waitFor(() => {
      const button = screen.getByTestId("SwipeButton");
      fireEvent(button, "onLayout", {
        nativeEvent: { layout: { width: 100 } },
      });

      // await new Promise((resolve) => setTimeout(resolve, 0)); // Allow the effect to run

      fireEvent(button, "onPress");
      expect(onSwipeSuccess).not.toHaveBeenCalledTimes(1);
    });
  });
});
