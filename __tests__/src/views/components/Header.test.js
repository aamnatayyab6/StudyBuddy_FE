import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Header from "../../../../src/views/components/Header";

// Mock the navigation
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
}));

describe("Header Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("1. Render Header", () => {
    const { getByTestId } = render(<Header title="Test Title" />);
    expect(getByTestId("header")).toBeTruthy();
  });

  test("2. Title prop", () => {
    const { getByText } = render(<Header title="Test Title" />);
    expect(getByText("Test Title")).toBeTruthy();
  });

  test("3. Navigation", () => {
    const { getByTestId } = render(<Header title="Test Title" />);

    fireEvent.press(getByTestId("goBackButton"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);

    fireEvent.press(getByTestId("navigateButton"));
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("Matches");
  });
});
