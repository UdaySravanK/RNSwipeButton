import { render } from "@testing-library/react-native";

import SwipeButton from "../index";
import { expect } from "@jest/globals";

describe("Component: SwipeButton", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly with default props", async () => {
    const { toJSON } = render(<SwipeButton />);
    expect(toJSON()).toMatchSnapshot();
  });
});
