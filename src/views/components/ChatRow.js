import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { UserContext } from "../../api/UserContext";
import COLORS from "../../const/colors";
import { styles } from "../../const/styles";

const ChatRow = ({ email, name, messageDetails, photoUrl }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Chat", {
          messageDetails,
          email,
          name,
          photoUrl,
        })
      }
      className="flex-row items-center py-3 px-3 bg-isabelline mx-3 my-1 rounded-lg"
      style={styles.messageCardShadow}
    >
      <Image
        className="rounded-full h-14 w-14 mr-4"
        style={{
          borderWidth: 0.3,
          borderColor: COLORS["dim-gray"],
          backgroundColor: COLORS["bone"],
        }}
        source={photoUrl}
      />

      {name !== "Unknown User" ? (
        <View>
          <Text className="text-lg font-semibold text-gunmetal">
            {name ? name : "Unknown User"}
          </Text>
          <Text className="font-normal text-dark">Say Hi!</Text>
        </View>
      ) : (
        <View>
          <Text className="text-lg font-normal text-battleship-gray">
            {name ? name : "Unknown User"}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ChatRow;
