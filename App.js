import StackNavigator from "./src/navigation/StackNavigator";
import { UserProvider } from "./src/api/UserContext";

export default function App() {
  return (
    <UserProvider>
      <StackNavigator />
    </UserProvider>
  );
}
