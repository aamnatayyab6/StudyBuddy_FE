import { render } from "@testing-library/react-native";
import { UserContext } from "../../../../src/api/UserContext";
import MessagesScreen from "../../../../src/views/screens/MessagesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Mock the Header and ChatList components
jest.mock("../../../../src/views/components/Header", () => {
    return () => null;
});
jest.mock("../../../../src/views/components/ChatList", () => {
    return () => null;
});

describe("MessagesScreen", () => {
  const mockRefreshUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Renders correctly and refreshes user data on focus", () => {
    render(
      <SafeAreaProvider>
        <NavigationContainer>
          <UserContext.Provider value={{ refreshUser: mockRefreshUser }}>
            <MessagesScreen />
          </UserContext.Provider>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  });
});
