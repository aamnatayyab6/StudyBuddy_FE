import GetStartedScreen from "../../../../src/views/screens/GetStartedScreen";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

jest.mock("@react-navigation/native");

describe("GetStartedScreen", () => {
  it("renders correctly", async () => {
    const { queryByText } = render(<GetStartedScreen />);

    // Verify that the title is rendered
    expect(queryByText("StudyBuddy.")).toBeTruthy();
    expect(queryByText("Create Your Academic Tribe")).toBeTruthy();
    expect(queryByText("Get Started")).toBeTruthy();
  });

  it("navigates to the OnboardingSlider screen when the Get Started button is pressed", async () => {
    const mockNavigate = jest.fn();
    const mockProps = {
      navigation: { navigate: mockNavigate },
    };
    const { queryByText } = render(<GetStartedScreen {...mockProps} />);

    // Simulate a press on the Get Started button
    fireEvent.press(queryByText("Get Started"));

    // Expect the navigate function to have been called with the correct screen name
    expect(mockNavigate).toHaveBeenCalledWith("OnboardingSlider");
  });
});
