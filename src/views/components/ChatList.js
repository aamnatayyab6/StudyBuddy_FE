import { View, Text, FlatList } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../api/UserContext";
import ChatRow from "./ChatRow";
import placeholder_image_uri from "../../const/placeholder_image_uri";

const ChatList = () => {
  const { user, buddies } = useContext(UserContext);
  
  const data = user?.messages
    ? Object.entries(user.messages).map(([email, messageId]) => ({
        email,
        messageId,
      }))
    : [];
  // Create a lookup object from the buddies array
  const buddyLookup = (buddies || []).reduce((lookup, buddy) => {
    lookup[buddy.email] = buddy.name;
    return lookup;
  }, {});

  return Object.keys(user?.messages || {}).length > 0 ? (
    <FlatList
      className="h-full"
      data={data}
      keyExtractor={(item) => item.email}
      renderItem={({ item }) => {
        // Find the buddy whose email matches the item's email
        const buddy = buddies.find((buddy) => buddy?.email === item.email);

        // If buddy is found, use their photoUrl, otherwise use the placeholder image
        const photoUrl =
          buddy && buddy?.photoUrl[0]
            ? { uri: buddy?.photoUrl[0] }
            : { uri: placeholder_image_uri }

        const buddyName = buddyLookup[item.email] || "Unknown User";
        return (
          <ChatRow
            email={item.email}
            name={buddyName}
            messageDetails={item.messageId}
            photoUrl={photoUrl}
          />
        );
      }}
    />
  ) : (
    <View className="bg-alabaster justify-center items-center p-10">
      <Text className="text-outer-space font-normal text-lg">
        No Messages to show
      </Text>
    </View>
  );
};

export default ChatList;
