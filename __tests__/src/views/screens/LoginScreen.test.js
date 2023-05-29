import axios from "axios";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import React from "react";
import { mockUser } from "../../../../__mocks__/api/UserContext";
import LoginScreen from "../../../../src/views/screens/LoginScreen";
import { UserContext } from "../../../../src/api/UserContext";

jest.mock("axios");

describe("LoginScreen", () => {
  const mockNavigate = jest.fn();
  const mockProps = {
    navigation: { navigate: mockNavigate },
  };
  mockLoginFunction = jest.fn();
  mockLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should login successfully", async () => {
    const user = {
      email: mockUser.email,
      password: "test1234",
    };
    try {
      axios.post.mockResolvedValue({ status: 200, data: user });
      const { getByText, getByPlaceholderText } = render(
        <UserContext.Provider
          value={{
            loginFunction: mockLoginFunction,
            loading: mockLoading,
          }}
        >
          <LoginScreen {...mockProps} />
        </UserContext.Provider>
      );
      fireEvent.changeText(
        getByPlaceholderText("Enter your email address"),
        user.email
      );
      fireEvent.changeText(
        getByPlaceholderText("Enter your password"),
        user.password
      );
      await act(async () => {
        fireEvent.press(getByText("Login"));
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(mockLoginFunction).toHaveBeenCalledWith(
          user.email,
          user.password,
          mockProps.navigation
        );
      });
    } catch (error) {
      console.log(error);
    }
  });

  it("should navigate to Register Screen by tapping on text", async () => {
    const { queryByText } = render(
      <UserContext.Provider
        value={{
          loginFunction: mockLoginFunction,
          loading: mockLoading,
        }}
      >
        <LoginScreen {...mockProps} />
      </UserContext.Provider>
    );
    const RegisterText = await waitFor(
      () => queryByText("Dont have an account? Register"),
      {
        timeout: 3000,
      }
    );

    // Simulate a press on the Login Text
    fireEvent.press(RegisterText);

    // Expect the navigation function to have been called with the correct screen name
    expect(mockNavigate).toHaveBeenCalledWith("Register");
  });
});
