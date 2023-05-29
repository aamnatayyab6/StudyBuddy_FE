import { render, fireEvent, waitFor } from "@testing-library/react-native";
import React from "react";
import OnboardingSlider from "../../../../src/views/screens/OnboardingSlider";
import slides from "../../../../src/const/slides";

// Mock navigation
const mockNavigation = {
  replace: jest.fn(),
};

// Mock slides
jest.mock("../../../../src/const/slides", () => [
  {
    id: "1",
    image: require("../../../../src/assets/images/paint-brush-icon.png"),
    title: "Title 1",
    subtitle: "Subtitle 1",
  },
  {
    id: "2",
    image: require("../../../../src/assets/images/paint-brush-icon.png"),
    title: "Title 2",
    subtitle: "Subtitle 2",
  },
  {
    id: "3",
    image: require("../../../../src/assets/images/paint-brush-icon.png"),
    title: "Title 3",
    subtitle: "Subtitle 3",
  },
]);

describe("OnboardingSlider", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders correctly", () => {
    const { queryByText } = render(
      <OnboardingSlider navigation={mockNavigation} />
    );

    // Test that the SKIP button is rendered
    const skipButton = queryByText("SKIP");
    expect(skipButton).toBeTruthy();

    // Test that the NEXT button is rendered
    const nextButton = queryByText("NEXT");
    expect(nextButton).toBeTruthy();

    // Verify that the slide titles and subtitles are rendered
    expect(queryByText("Title 1")).toBeTruthy();
    expect(queryByText("Subtitle 1")).toBeTruthy();
    expect(queryByText("Title 2")).toBeTruthy();
    expect(queryByText("Subtitle 2")).toBeTruthy();
    expect(queryByText("Title 3")).toBeTruthy();
    expect(queryByText("Subtitle 3")).toBeTruthy();
  });

  it("navigates to the Register screen when the REGISTER button is pressed", async () => {
    // Mock useRef
    const useRefSpy = jest.spyOn(React, "useRef");
    useRefSpy.mockImplementation(() => ({
      current: { scrollToOffset: jest.fn() },
    }));

    const { queryByText } = render(
      <OnboardingSlider navigation={mockNavigation} />
    );

    // Simulate swiping to the last slide by pressing the NEXT button
    for (let i = 0; i < slides.length - 1; i++) {
      fireEvent.press(queryByText("NEXT"));
    }

    // Now the REGISTER button should be visible
    const registerButton = await waitFor(() => queryByText("REGISTER"), {
      timeout: 3000,
    });

    // Simulate a press on the Register button
    fireEvent.press(registerButton);

    // Expect the navigation function to have been called with the correct screen name
    expect(mockNavigation.replace).toHaveBeenCalledWith("Register");
  });
});
