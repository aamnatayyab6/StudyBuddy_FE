import { render, fireEvent, waitFor } from "@testing-library/react-native";
import React from "react";
import { UserContext } from "../../../../src/api/UserContext";
import ChatScreen from "../../../../src/views/screens/ChatScreen";
import axios from "axios";
import {
  mockBuddies,
  mockUser,
  mockToken,
} from "../../../../__mocks__/api/UserContext";

jest.mock("axios");
jest.mock('@react-navigation/native', () => {
    return {
      ...jest.requireActual('@react-navigation/native'),
      useNavigation: () => ({
        navigate: jest.fn(),
        goBack: jest.fn(),
      }),
    };
  });

describe("ChatScreen", () => {
  const mockBuddy = mockBuddies[0];
  const mockRefreshUser = jest.fn();
  const mockSetLoading = jest.fn();
  const mockLoading = false;

  const { route } = {
    params: mockBuddies[0],
  };

  axios.post.mockImplementation((url) => {
    switch (url) {
      case "https://studybuddy-backend.onrender.com/sendMessage":
        return Promise.resolve({ status: 200 });
      case "https://studybuddy-backend.onrender.com/getMessages2":
        return Promise.resolve({
          status: 200,
          data: [],
        });
      default:
        return Promise.resolve({ status: 500 });
    }
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <UserContext.Provider
        value={{
          user: mockUser,
          token: mockToken,
          setLoading: mockSetLoading,
          loading: mockLoading,
          refreshUser: mockRefreshUser,
        }}
      >
        <ChatScreen route={{ params: { currentBuddy: mockBuddy } }} />
      </UserContext.Provider>
    );

    // Check for correct render of elements
    expect(getByText(mockBuddy.name)).toBeTruthy();
    expect(getByPlaceholderText("Type a message...")).toBeTruthy();
  });

  it("sends a message when the send button is pressed", async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <UserContext.Provider
        value={{
          user: mockUser,
          token: mockToken,
          setLoading: mockSetLoading,
          loading: mockLoading,
          refreshUser: mockRefreshUser,
        }}
      >
        <ChatScreen route={{ params: { currentBuddy: mockBuddy } }} />
      </UserContext.Provider>
    );

    const input = getByPlaceholderText("Type a message...");
    fireEvent.changeText(input, "Hello");

    const sendButton = getByTestId("send");
    fireEvent.press(sendButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(3));
  });
});
