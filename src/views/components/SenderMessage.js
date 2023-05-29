import { View, Text } from "react-native";
import React from "react";

const SenderMessage = ({ message }) => {
  function formatTime(dateString) {
    const date = new Date(dateString);

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  }
  return (
    <View
      className="bg-cadet-gray rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2"
      style={{
        alignSelf: "flex-start",
        marginLeft: "auto",
      }}
    >
      <Text className="text-white text-base">{message.message}</Text>
      <View>
        <Text className="text-dim-gray text-xs">
          {formatTime(message.time)}
        </Text>
      </View>
    </View>
  );
};

export default SenderMessage;
