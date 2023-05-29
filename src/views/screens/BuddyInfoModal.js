import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { goBack } from "react-navigation-helpers";
import { ScrollView } from "react-native";

const BuddyInfoModal = ({ route }) => {
  const { currentBuddy } = route.params;

  return (
    <SafeAreaView className="bg-alabaster flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Rule icon */}
        <TouchableOpacity
          className="items-center justify-center"
          onPress={goBack}
        >
          <MaterialIcons name="horizontal-rule" size={20} color="#A59E8C" />
        </TouchableOpacity>
        {/* Rule icon End */}

        {/* logo */}
        <View className="justify-center items-center">
          <Text className="text-3xl text-cadet-gray p-2 font-medium">
            Study
            <Text className="text-3xl text-outer-space  p-2 font-light">
              Buddy
              <Text className="text-3xl text-outer-space p-2 font-normal">
                .
              </Text>
            </Text>
          </Text>
        </View>
        {/* logo end */}

        {/* Details */}
        <View className="flex-col pt-8 px-5">
          <View className="flex-row">
            <Ionicons name="location" size={28} color="black" />
            <Text className="px-3 py-1 pl-4 text-outer-space">
              {currentBuddy?.hasOwnProperty("Location") &&
              currentBuddy?.Location !== ""
                ? currentBuddy?.Location
                : "N/A"}
            </Text>
          </View>

          <View className="mt-3 flex-row">
            <FontAwesome name="graduation-cap" size={24} color="black" />
            <Text className="px-2 py-1 pl-3 text-outer-space">
              {currentBuddy?.University === ""
                ? "N/A"
                : currentBuddy?.University}
            </Text>
          </View>

          <View className="mt-3 flex-row">
            <MaterialCommunityIcons name="bookshelf" size={27} color="black" />
            <Text className="px-3 pl-4 py-2 text-outer-space">
              {currentBuddy?.InterestedSubjects?.length === 0
                ? "N/A"
                : currentBuddy?.InterestedSubjects?.map((subject, index) => {
                    return (
                      <Text key={index}>
                        {subject}
                        {index !== currentBuddy?.InterestedSubjects?.length - 1
                          ? ", "
                          : ""}
                      </Text>
                    );
                  })}
            </Text>
          </View>

          <View className="mt-3 flex-row">
            <Ionicons name="md-globe-sharp" size={25} color="black" />
            <Text className="px-3 py-2 pl-4 text-outer-space">
              {currentBuddy?.Language?.length === 0
                ? "N/A"
                : currentBuddy?.Language?.map((language, index) => {
                    return (
                      <Text key={index}>
                        {language}
                        {index !== currentBuddy?.Language?.length - 1
                          ? ", "
                          : ""}
                      </Text>
                    );
                  })}
            </Text>
          </View>

          <View className="mt-3 flex-row">
            <Ionicons name="ios-information-circle" size={28} color="black" />
            <Text className="px-4 py-2 text-outer-space italic">
              {currentBuddy?.hasOwnProperty("bio") && currentBuddy?.bio !== ""
                ? currentBuddy?.bio
                : "N/A"}
            </Text>
          </View>
        </View>
        {/* Details End */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BuddyInfoModal;
