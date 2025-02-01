import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";

import SwipeButton from "../index";
import { expect } from "@jest/globals";
import { Text } from "react-native";

describe("Component: SwipeButton UI Rendering Tree & Props", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly with default props", async () => {
    // Setup
    render(<SwipeButton />);
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with containerStyles prop", async () => {
    // Setup
    render(<SwipeButton containerStyles={{ margin: 24 }} />);
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render with correct styles when disable", async () => {
    // Setup
    render(<SwipeButton disabled />);
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with custom height", async () => {
    // Setup
    render(<SwipeButton height={126} />);
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with custom width", async () => {
    // Setup
    render(<SwipeButton width={360} />);
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with custom rail background color and border color", async () => {
    // Setup
    render(
      <SwipeButton
        railBackgroundColor="#FFFFFF"
        railBorderColor="#FF0000"
        railFillBackgroundColor="#00FF00"
        railFillBorderColor="#0000FF"
      />,
    );
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with custom rail styles", async () => {
    // Setup
    render(<SwipeButton railStyles={{ borderWidth: 20 }} />);
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with custom thumb icon border and backgroun color", async () => {
    // Setup
    render(
      <SwipeButton
        thumbIconBackgroundColor="#0FF000"
        thumbIconBorderColor="000FFF"
      />,
    );
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("Thumb icon customm styles should not override important styles", async () => {
    // Setup
    render(
      <SwipeButton
        thumbIconStyles={{
          borderWidth: 56,
          backgroundColor: "#000123",
          borderColor: "#000456",
          height: 120,
          width: 210,
          overflow: undefined,
        }}
      />,
    );
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should apply thumbIconWidth", async () => {
    // Setup
    render(<SwipeButton thumbIconWidth={28} />);
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should be able to change title styling", async () => {
    // Setup
    render(
      <SwipeButton
        titleColor={"#123456"}
        titleFontSize={48}
        titleMaxFontScale={4}
        titleMaxLines={4}
        titleStyles={{ fontWeight: "bold" }}
      />,
    );
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render with custom thumb component", async () => {
    // Setup
    const CustomComp = () => {
      return <Text>USK</Text>;
    };
    render(<SwipeButton thumbIconComponent={CustomComp} />);
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with screen reader enabled", async () => {
    // Setup
    render(<SwipeButton screenReaderEnabled />);
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with screen reader disabled", async () => {
    // Setup
    render(<SwipeButton screenReaderEnabled={false} />);
    const button = screen.getAllByTestId("SwipeButton")[0];
    fireEvent(button, "onLayout", { nativeEvent: { layout: { width: 100 } } });

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
