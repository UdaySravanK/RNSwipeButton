import React from "react";
import { render, screen } from "@testing-library/react-native";
import SwipeThumb from "../index";
import {
  RAIL_FILL_BACKGROUND_COLOR,
  RAIL_FILL_BORDER_COLOR,
  SWIPE_SUCCESS_THRESHOLD,
  THUMB_ICON_BACKGROUND_COLOR,
  THUMB_ICON_BORDER_COLOR,
} from "../../../constants";
import { expect } from "@jest/globals";

describe("SwipeThumb Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should render correctly with default props", async () => {
    const onSwipeStart = jest.fn();

    render(
      <SwipeThumb
        enableReverseSwipe={false}
        layoutWidth={200}
        railFillBackgroundColor={RAIL_FILL_BACKGROUND_COLOR}
        railFillBorderColor={RAIL_FILL_BORDER_COLOR}
        swipeSuccessThreshold={SWIPE_SUCCESS_THRESHOLD}
        thumbIconBackgroundColor={THUMB_ICON_BACKGROUND_COLOR}
        thumbIconBorderColor={THUMB_ICON_BORDER_COLOR}
        thumbIconHeight={50}
        title={"Test Thumb"}
        onSwipeStart={onSwipeStart}
      />,
    );

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
