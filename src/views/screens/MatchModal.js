import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import COLORS from "../../const/colors";

const MatchModal = ({ navigation, route }) => {
  const { newBuddy, loggedInUser } = route.params;
  return (
    <SafeAreaView
      className="h-full bg-cadet-gray pt-20"
      style={{
        opacity: 0.89,
      }}
    >
      <View className="flex-1 justify-center items-center">
        {loggedInUser && newBuddy && (
          <View className="justify-between flex-row p-2">
            <Image
              source={{ uri: loggedInUser.photoUrl[0] }}
              className="h-20 w-20 rounded-full"
              style={{
                borderWidth: 0.4,
                borderColor: COLORS["dim-gray"],
                backgroundColor: COLORS["bone"],
              }}
            />
            <Text className="text-5xl text-gunmetal">......</Text>
            <Image
              source={{ uri: newBuddy.photoUrl[0] }}
              className="h-20 w-20 rounded-full"
              style={{
                borderWidth: 0.4,
                borderColor: COLORS["dim-gray"],
                backgroundColor: COLORS["bone"],
              }}
            />
          </View>
        )}
        <Text className="text-gunmetal justify-center items-center font-semibold text-5xl">
          You now have a
        </Text>
        <View className="justify-center items-center">
          <Text className="text-4xl text-gunmetal p-2 font-medium">
            Study
            <Text className="text-4xl text-midnight  p-2 font-light">
              Buddy
              <Text className="text-4xl text-midnight p-2 font-normal">.</Text>
            </Text>
          </Text>
        </View>
        <Text className="text-gunmetal justify-center items-center font-normal text-3xl">
          Say Hi!
        </Text>
        {/* message button */}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            navigation.navigate("Messages");
          }}
          className="absolute bottom-28 w-24 h-24 border-l-2 border-r-2 border-t-4 border-outer-space rounded-full items-center justify-center"
        >
          <Animatable.View
            animation={"pulse"}
            easing="ease-in-out"
            iterationCount={"infinite"}
            className="w-20 h-20 items-center justify-center rounded-full bg-outer-space"
          >
            <AntDesign name="message1" size={36} color={COLORS["bone"]} />
          </Animatable.View>
        </TouchableOpacity>
        {/* message button end */}
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default MatchModal;
