import { render } from "@testing-library/react-native";
import React from "react";
import ChatList from "../../../../src/views/components/ChatList";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../../src/api/UserContext";
import { mockUser, mockBuddies } from "../../../../__mocks__/api/UserContext";

jest.mock("../../../../src/api/UserContext");
jest.mock("@react-navigation/native");

describe("ChatList Component", () => {
  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: jest.fn() });
  });

  it("renders the chat list when there are messages", () => {
    const { getAllByText } = render(
      <UserContext.Provider value={{ user: mockUser, buddies: mockBuddies }}>
        <ChatList />
      </UserContext.Provider>
    );
    mockBuddies.forEach((buddy) => {
      getAllByText(buddy.name);
    });
  });

  it('shows "No Messages to show" when there are no messages', () => {
    const userWithNoMessages = { ...mockUser, messages: {} };

    const { getByText } = render(
      <UserContext.Provider
        value={{ user: userWithNoMessages, buddies: mockBuddies }}
      >
        <ChatList />
      </UserContext.Provider>
    );
    getByText("No Messages to show");
  });
});
