import {
  SafeAreaView,
} from "react-native";
import Header from "../components/Header";
import ChatList from "../components/ChatList";
import { UserContext } from "../../api/UserContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext } from "react";

const MessagesScreen = () => {
  const { refreshUser } = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      refreshUser();
    }, [])
  );
  return (
    <SafeAreaView className="flex-1 bg-alabaster">
      {/* Header Section */}
      <Header title={"Messages"} />
      {/* End of Header Section */}

      {/* Chat List */}
      <ChatList />
      {/* End of Chat List */}
    </SafeAreaView>
  );
};

export default MessagesScreen;
