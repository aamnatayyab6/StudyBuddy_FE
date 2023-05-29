import RegisterScreen from "../../../../src/views/screens/RegisterScreen";
import axios from "axios";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import React from "react";
import { mockUser } from "../../../../__mocks__/api/UserContext";
import AsyncStorageMock from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("axios");

describe("RegisterScreen", () => {
  const mockNavigate = jest.fn();
  const mockProps = {
    navigation: { navigate: mockNavigate },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should register successfully", async () => {
    const user = {
      name: mockUser.name,
      email: mockUser.email,
      password: "test1234",
      flag: false,
    };
    try {
      axios.post.mockResolvedValue({ status: 200, data: user });
      const { getByText, getByPlaceholderText } = render(
        <RegisterScreen {...mockProps} />
      );
      fireEvent.changeText(
        getByPlaceholderText("Enter your email address"),
        user.email
      );
      fireEvent.changeText(
        getByPlaceholderText("Enter your full name"),
        user.name
      );
      fireEvent.changeText(
        getByPlaceholderText("Enter your password"),
        user.password
      );
      await act(async () => {
        fireEvent.press(getByText("Register"));
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("Login");
        expect(AsyncStorageMock.setItem).toHaveBeenCalledWith(
          "user",
          JSON.stringify(user)
        );
      });
    } catch (error) {
      console.log(error);
    }
  });

  it("should navigate to Login Screen by tapping on text", async () => {
    const { queryByText } = render(<RegisterScreen {...mockProps} />);
    const loginText = await waitFor(
      () => queryByText("Already have an account? Login"),
      {
        timeout: 3000,
      }
    );

    // Simulate a press on the Login Text
    fireEvent.press(loginText);

    // Expect the navigation function to have been called with the correct screen name
    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });
});
