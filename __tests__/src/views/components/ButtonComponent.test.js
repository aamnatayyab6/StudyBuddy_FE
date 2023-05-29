import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ButtonComponent from "../../../../src/views/components/ButtonComponent";

describe("Button Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("1. Render Button", () => {
    const { getByTestId } = render(<ButtonComponent title="Test Title" />);
    expect(getByTestId("button")).toBeTruthy();
  });

  test("2. Title and disabled props", () => {
    const { getByText, getByTestId } = render(<ButtonComponent title="Test Title" disabled={true} />);
    expect(getByText("Test Title")).toBeTruthy();
    expect(getByTestId('pressButton').props.style.opacity).toBe(0.3);
  });

  test("3. Button onPress function", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(<ButtonComponent title="Test Title" onPress={mockOnPress} />);
    
    fireEvent.press(getByTestId('pressButton'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
