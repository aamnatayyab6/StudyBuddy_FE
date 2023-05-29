import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import TextInputComponent from "../../../../src/views/components/TextInputComponent";

describe("TextInputComponent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //   Adding placeholder to test inputs only

  test("1. Render TextInputComponent", () => {
    const { getByPlaceholderText } = render(
      <TextInputComponent label="Test Label" placeholder="Test Placeholder" />
    );
    expect(getByPlaceholderText("Test Placeholder")).toBeTruthy();
  });

  test("2. onFocus and onBlur props", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { getByPlaceholderText } = render(
      <TextInputComponent
        label="Test Label"
        placeholder="Test Placeholder"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const input = getByPlaceholderText("Test Placeholder");
    fireEvent(input, "focus");
    expect(onFocus).toHaveBeenCalledTimes(1);
    fireEvent(input, "blur");
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test("3. Password visibility toggle", () => {
    const { getByTestId } = render(
      <TextInputComponent
        label="Test Label"
        placeholder="Test Placeholder"
        password
      />
    );

    const visibilityToggle = getByTestId("visibilityToggle");
    fireEvent.press(visibilityToggle);
  });

  test("4. Error message display", () => {
    const { getByText } = render(
      <TextInputComponent
        label="Test Label"
        placeholder="Test Placeholder"
        error="Test error message"
      />
    );
    expect(getByText("Test error message")).toBeTruthy();
  });
});
