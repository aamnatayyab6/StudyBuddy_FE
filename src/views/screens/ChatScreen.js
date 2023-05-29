import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { UserContext } from "../../api/UserContext";
import Header from "../components/Header";
import COLORS from "../../const/colors";
import { styles } from "../../const/styles";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import axios from "axios";
import Loader from "../components/Loader";

const ChatScreen = ({ route }) => {
  const { currentBuddy } = route.params;
  const { setLoading, loading, refreshUser, user, token } =
    useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const email =
    currentBuddy && currentBuddy.email
      ? currentBuddy.email
      : route.params.email;
  const name =
    currentBuddy && currentBuddy.name ? currentBuddy.name : route.params.name;
  const photoUrl =
    currentBuddy && currentBuddy.photoUrl[0]
      ? { uri: currentBuddy.photoUrl[0] }
      : route.params.photoUrl;
  const messageDetails =
    currentBuddy && currentBuddy.messages[user.email]
      ? currentBuddy.messages[user.email]
      : route.params.messageDetails;

  const sendMessage = async () => {
    // Trim the input and check if it's empty
    const trimmedInput = input.trim();
    if (trimmedInput === "") {
      // Input is empty, don't send the message
      return;
    }

    const url = "https://studybuddy-backend.onrender.com/sendMessage";
    try {
      setLoading(true);
      getMessages();
      const postData = {
        token: token,
        buddy_email: email,
        message: input,
      };
      const response = await axios.post(url, postData);
      if (response.status === 200) {
        setInput(""); // Clear the input field after sending the message
        getMessages(); // Fetch the updated messages
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert("Error", "Something went wrong!");
      }
    } catch (e) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  const getMessages = async () => {
    const url = "https://studybuddy-backend.onrender.com/getMessages2";
    try {
      // setLoading(true);
      const postData = {
        chatId: messageDetails,
      };
      const response = await axios.post(url, postData);
      if (response.status === 200) {
        // Sort the messages based on the 'time' field
        const sortedMessages = response.data.sort((a, b) => {
          return new Date(b.time) - new Date(a.time);
        });
        setMessages(sortedMessages);
        await refreshUser();
        // setLoading(false);
      } else {
        // setLoading(false);
        Alert.alert("Error", "Something went wrong!");
      }
    } catch (e) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  useEffect(() => {
    if (messageDetails) {
      getMessages();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={name ? name : "Chat"} />

      {loading ? (
        <Loader visible={true} />
      ) : (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            className="pl-4"
            inverted={true}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: message }) =>
              message?.sender === user?.email ? (
                <SenderMessage key={message.sender} message={message} />
              ) : (
                <ReceiverMessage
                  key={message.sender}
                  photoUrl={photoUrl}
                  message={message}
                />
              )
            }
          />

          {name !== "Unknown User" ? (
            <View className="bg-isabelline flex-row justify-between items-center border-t border-gray-200 px-5 py-2 pr-8">
              <TextInput
                className="h-10 bg-isabelline text-lg mr-4"
                placeholder="Type a message..."
                onChangeText={setInput}
                onSubmitEditing={sendMessage}
                value={input}
                editable={name !== "Unknown User"}
                multiline={false}
                maxLength={1000}
              />

              <TouchableOpacity
                testID="send"
                disabled={name === "Unknown User"}
                onPress={sendMessage}
              >
                <FontAwesome
                  name="send"
                  size={24}
                  color={COLORS["cadet-gray"]}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="bg-isabelline flex-row justify-center items-center border-t border-gray-200 px-5 py-2">
              <Text className="h-10 bg-isabelline items-center justify-center text-sm text-battleship-gray">
                You cannot reply to this conversation
              </Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;
