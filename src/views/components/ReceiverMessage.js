import { View, Text } from "react-native";
import { Image } from "expo-image";
import COLORS from "../../const/colors";
import React from "react";

const ReceiverMessage = ({ message, photoUrl }) => {
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
      className="bg-[#b9a779] rounded-lg rounded-tl-none px-5 py-3 mx-3 my-2 ml-14"
      style={{
        alignSelf: "flex-start",
      }}
    >
      <Image
        cachePolicy={"none"}
        source={photoUrl}
        className="h-12 w-12 rounded-full absolute top-0 -left-14"
        style={{
          borderWidth: 0.3,
          borderColor: COLORS["dim-gray"],
          backgroundColor: COLORS["bone"],
        }}
      />
      <Text className="text-white text-base">{message.message}</Text>
      <View>
        <Text className="text-dim-gray text-xs">
          {formatTime(message.time)}
        </Text>
      </View>
    </View>
  );
};

export default ReceiverMessage;
