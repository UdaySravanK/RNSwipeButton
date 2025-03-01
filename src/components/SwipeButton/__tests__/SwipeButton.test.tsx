import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react-native";

import SwipeButton from "../index";
import { expect } from "@jest/globals";
import { Text } from "react-native";

describe("Component: SwipeButton UI Rendering Tree & Props", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly with default props", async () => {
    // Setup
    const { getByTestId } = render(<SwipeButton />);
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
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with containerStyles prop", async () => {
    // Setup
    const { getByTestId } = render(
      <SwipeButton containerStyles={{ margin: 24 }} />,
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

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render with correct styles when disable", async () => {
    // Setup
    const { getByTestId } = render(<SwipeButton disabled />);
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
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with custom height", async () => {
    // Setup
    const { getByTestId } = render(<SwipeButton height={126} />);
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
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with custom width", async () => {
    // Setup
    const { getByTestId } = render(<SwipeButton width={360} />);
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
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with custom rail background color and border color", async () => {
    // Setup
    const { getByTestId } = render(
      <SwipeButton
        railBackgroundColor="#FFFFFF"
        railBorderColor="#FF0000"
        railFillBackgroundColor="#00FF00"
        railFillBorderColor="#0000FF"
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

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with custom rail styles", async () => {
    // Setup
    const { getByTestId } = render(
      <SwipeButton railStyles={{ borderWidth: 20 }} />,
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
    const { getByTestId } = render(
      <SwipeButton railStyles={{ borderWidth: 20 }} />,
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

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("Thumb icon customm styles should not override important styles", async () => {
    // Setup
    const { getByTestId } = render(
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
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should apply thumbIconWidth", async () => {
    // Setup
    const { getByTestId } = render(<SwipeButton thumbIconWidth={28} />);
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
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should be able to change title styling", async () => {
    // Setup
    const { getByTestId } = render(
      <SwipeButton
        titleColor={"#123456"}
        titleFontSize={48}
        titleMaxFontScale={4}
        titleMaxLines={4}
        titleStyles={{ fontWeight: "bold" }}
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

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render with custom thumb component", async () => {
    // Setup
    const CustomComp = () => {
      return <Text>USK</Text>;
    };
    const { getByTestId } = render(
      <SwipeButton thumbIconComponent={CustomComp} />,
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

    // Assert
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with screen reader enabled", async () => {
    // Setup
    const { getByTestId } = render(<SwipeButton screenReaderEnabled />);
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
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correctly with screen reader disabled", async () => {
    // Setup
    const { getByTestId } = render(<SwipeButton screenReaderEnabled={false} />);
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
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render with custom title component", async () => {
    // Setup
    const CustomComp = () => {
      return <Text>USK</Text>;
    };
    const { getByTestId } = render(<SwipeButton titleComponent={CustomComp} />);
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
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
