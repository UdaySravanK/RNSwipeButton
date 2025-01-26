import {
  render,
  screen,
  userEvent,
  fireEvent,
} from "@testing-library/react-native";

import SwipeButton from "../index";
import { expect } from "@jest/globals";
import { AccessibilityInfo } from "react-native";
import { borderWidth } from "../../SwipeThumb/styles";

describe("Component: SwipeButton Functionality", () => {
  afterEach(() => {
    jest.clearAllMocks();
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
    const button = screen.getAllByTestId("SwipeButton")[0];
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
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(forceReset).not.toBeNull();
  });

  // it("should call onSwipeStart when swiping starts", async () => {
  // Setup
  // const onSwipeStart = jest.fn();
  // const user = userEvent.setup();
  // render(<SwipeButton onSwipeStart={onSwipeStart} />);
  // const button = screen.getAllByTestId("SwipeButton")[0];
  // fireEvent(button, 'onLayout', { nativeEvent: { layout: { width: 100 } } })
  // const thumb = screen.getByTestId("DefaultThumbIcon"); // Get the thumb component

  // Execute
  // await user.press(thumb);

  // Assert
  // expect(onSwipeStart).toHaveBeenCalledTimes(1);
  // });

  // it("should call onSwipeSuccess when swiped successfully", async () => {
  //   const onSwipeSuccess = jest.fn();
  //   const { getAllByTestId } = render(
  //     <SwipeButton title="Swipe" onSwipeSuccess={onSwipeSuccess} />
  //   );

  //   // Find the thumb element (replace 'SwipeThumb' if a different testID is used)
  //   const thumb = getAllByTestId("SwipeThumb")[0];

  //   // Simulate a swipe gesture (adapt to the specific implementation of SwipeThumb)
  //   fireEvent(thumb, 'invokeOnSwipeSuccess'); //  Replace with actual event the SwipeThumb component uses.

  //   expect(onSwipeSuccess).toHaveBeenCalledTimes(1);
  // });

  // it("should call onSwipeFail when swiped unsuccessfully", async () => {
  //   const onSwipeFail = jest.fn();
  //   const { getAllByTestId } = render(
  //       <SwipeButton title="Swipe" onSwipeFail={onSwipeFail} />
  //   );

  //   const thumb = getAllByTestId("SwipeThumb")[0];
  //   fireEvent(thumb, 'onSwipeFail'); // Replace with actual event name

  //   expect(onSwipeFail).toHaveBeenCalledTimes(1);
  // });

  //   it("should call onSwipeSuccess when swiped successfully", async () => {
  //     const onSwipeSuccess = jest.fn();
  //     const { getByText, getAllByTestId } = render(
  //       <SwipeButton title="Swipe" onSwipeSuccess={onSwipeSuccess} />
  //     );

  //     // Simulate successful swipe (implementation detail, might need adjustments)
  //     const thumb = getAllByTestId("SwipeThumb")[0];
  //     fireEvent(thumb, 'onSwipeSuccess');

  //     expect(onSwipeSuccess).toHaveBeenCalledTimes(1);
  //   });

  //   it("should call onSwipeFail when swiped unsuccessfully", async () => {
  //     const onSwipeFail = jest.fn();
  //     const { getByText, getAllByTestId } = render(
  //         <SwipeButton title="Swipe" onSwipeFail={onSwipeFail} />
  //     );

  //     // Simulate unsuccessful swipe (implementation detail, might need adjustments)
  //     const thumb = getAllByTestId("SwipeThumb")[0];
  //     fireEvent(thumb, 'onSwipeFail');

  //     expect(onSwipeFail).toHaveBeenCalledTimes(1);
  //   });

  //   it("should render correctly with disabled prop", async () => {
  //     const { toJSON } = render(<SwipeButton disabled />);
  //     expect(toJSON()).toMatchSnapshot();
  //   });

  //   it("should not call onSwipeStart when disabled", async () => {
  //     const onSwipeStart = jest.fn();
  //     const { getByText } = render(<SwipeButton title="Swipe" onSwipeStart={onSwipeStart} disabled />);
  //     await fireEvent.press(getByText("Swipe"));
  //     expect(onSwipeStart).not.toHaveBeenCalled();
  //   });

  //   it('should update screenReaderEnabled state when AccessibilityInfo changes', async () => {
  //     const { rerender } = render(<SwipeButton />);

  //     AccessibilityInfo.isScreenReaderEnabled = jest.fn().mockResolvedValue(true);
  //     AccessibilityInfo.addEventListener = jest.fn();  // Mock the event listener
  //     AccessibilityInfo.removeEventListener = jest.fn(); // Mock removing the listener

  //     rerender(<SwipeButton />); // Re-render to trigger the effect
  //     await new Promise((resolve) => setTimeout(resolve, 0)); // Allow the effect to run

  //     // Check if screenReaderEnabled is true after re-render
  //     // This will need to be checked indirectly, likely through component behavior or a wrapper component
  //     // Example using wrapper component in a real test:
  //     // expect(wrapper.state('screenReaderEnabled')).toBe(true);
  //   });

  //   it('should handle unmounting correctly', async () => {
  //     const { unmount } = render(<SwipeButton />);

  //     AccessibilityInfo.isScreenReaderEnabled = jest.fn().mockResolvedValue(true);
  //     AccessibilityInfo.addEventListener = jest.fn();
  //     AccessibilityInfo.removeEventListener = jest.fn();

  //     unmount();  // Unmount the component

  //     // Check if event listener is removed using the mock
  //     expect(AccessibilityInfo.removeEventListener).toHaveBeenCalled();
  // });

  //   it('should reset after successful swipe', async () => {
  //     const onSwipeSuccess = jest.fn();
  //     const { rerender, getAllByTestId } = render(
  //       <SwipeButton title="Swipe" onSwipeSuccess={onSwipeSuccess} shouldResetAfterSuccess />
  //     );

  //      // Simulate successful swipe
  //      const thumb = getAllByTestId("SwipeThumb")[0];
  //      fireEvent(thumb, 'onSwipeSuccess');

  //     // Assertion to check if the component has reset (implementation specific)
  //     // e.g., check thumb position, rail fill, etc.
  //   });

  //   it('should reset after successful swipe after a delay', async () => {
  //     const onSwipeSuccess = jest.fn();
  //     const { rerender, getAllByTestId } = render(
  //       <SwipeButton title="Swipe" onSwipeSuccess={onSwipeSuccess} shouldResetAfterSuccess  resetAfterSuccessAnimDelay={1000} />
  //     );

  //      // Simulate successful swipe
  //      const thumb = getAllByTestId("SwipeThumb")[0];
  //      fireEvent(thumb, 'onSwipeSuccess');

  //     // Add necessary delay and then perform the assertions for the reset
  //     await new Promise(resolve => setTimeout(resolve, 1100)); // Wait a bit longer than the delay
  //     // Perform the assertions now that the delay is over

  //   });

  //   it('should not reset after successful swipe if shouldResetAfterSuccess is false', async () => {
  //     const onSwipeSuccess = jest.fn();
  //     const { rerender, getAllByTestId } = render(
  //       <SwipeButton title="Swipe" onSwipeSuccess={onSwipeSuccess} shouldResetAfterSuccess={false} />
  //     );

  //      // Simulate successful swipe
  //      const thumb = getAllByTestId("SwipeThumb")[0];
  //      fireEvent(thumb, 'onSwipeSuccess');

  //     // Assertion to verify that the component has *not* reset
  //   });

  //   it('should handle forceReset', () => {
  //     const forceReset = jest.fn();
  //     const { rerender } = render(<SwipeButton forceReset={forceReset} />);

  //     rerender(<SwipeButton forceReset={() => {}} />); // Call forceReset indirectly

  //     // Assert that forceReset was called.  This might require a different approach
  //     // depending on how forceReset is implemented.
  //     // expect(forceReset).toHaveBeenCalled(); // or an alternative check
  //   });
});
