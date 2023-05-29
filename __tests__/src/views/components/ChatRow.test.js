import { render, fireEvent } from "@testing-library/react-native";
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ChatRow from "../../../../src/views/components/ChatRow";
import { mockBuddies } from "../../../../__mocks__/api/UserContext";

jest.mock('@react-navigation/native');

describe("ChatRow Component", () => {
  // Take first buddy from mockBuddies for testing
  const testBuddy = mockBuddies[0];
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { getByText } = render(
      <ChatRow 
        email={testBuddy.email}
        name={testBuddy.name}
        messageDetails={testBuddy.messages}
        photoUrl={testBuddy.photoUrl[0]}
      />
    );

    // Check if the name is rendered
    expect(getByText(testBuddy.name)).toBeTruthy();

    // Check if the "Say Hi!" text is rendered
    expect(getByText('Say Hi!')).toBeTruthy();
  });

  it("should navigate to the Chat screen when pressed", () => {
    const { getByText } = render(
      <ChatRow 
        email={testBuddy.email}
        name={testBuddy.name}
        messageDetails={testBuddy.messages}
        photoUrl={testBuddy.photoUrl[0]}
      />
    );

    fireEvent.press(getByText(testBuddy.name));

    expect(mockNavigate).toHaveBeenCalledWith('Chat', {
      messageDetails: testBuddy.messages,
      email: testBuddy.email,
      name: testBuddy.name,
      photoUrl: testBuddy.photoUrl[0],
    });
  });
});
