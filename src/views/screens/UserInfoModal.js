import { View, Text, SafeAreaView, Linking } from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../const/colors";

const UserInfoModal = ({ route }) => {
  const { currentUserData, loggedInUserDataUid } = route.params;
  const navigation = useNavigation();

  const redirect = () => {
    navigation.navigate("Webpage", {
      url: `https://admin-web-6a8l.onrender.com/showRecommendationPage?user_uid=${loggedInUserDataUid}&buddy_uid=${currentUserData.uid}`,
    });
  };

  return (
    <SafeAreaView className="bg-alabaster flex-1">
      <ScrollView>
        {/* Rule icon */}
        <TouchableOpacity
          className="items-center justify-center"
          onPress={goBack}
        >
          {/* <FontAwesome5 name="chevron-down" size={20} color="#A59E8C" /> */}
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
              {currentUserData?.hasOwnProperty("Location") &&
              currentUserData?.Location !== ""
                ? currentUserData?.Location
                : "N/A"}
            </Text>
          </View>

          <View className="mt-3 flex-row">
            <FontAwesome name="graduation-cap" size={24} color="black" />
            <Text className="px-2 py-1 pl-3 text-outer-space">
              {currentUserData?.University === ""
                ? "N/A"
                : currentUserData?.University}
            </Text>
          </View>

          <View className="mt-3 flex-row">
            <MaterialCommunityIcons name="bookshelf" size={27} color="black" />
            <Text className="px-3 pl-4 py-2 text-outer-space">
              {currentUserData?.InterestedSubjects?.length === 0
                ? "N/A"
                : currentUserData?.InterestedSubjects?.map((subject, index) => {
                    return (
                      <Text key={index}>
                        {subject}
                        {index !==
                        currentUserData?.InterestedSubjects?.length - 1
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
              {currentUserData?.Language?.length === 0
                ? "N/A"
                : currentUserData?.Language?.map((language, index) => {
                    return (
                      <Text key={index}>
                        {language}
                        {index !== currentUserData?.Language?.length - 1
                          ? ", "
                          : ""}
                      </Text>
                    );
                  })}
            </Text>
          </View>

          <View className="mt-3  flex-row">
            <Ionicons name="ios-information-circle" size={28} color="black" />
            <Text className="px-4 py-2 text-outer-space italic">
              {currentUserData?.hasOwnProperty("bio") &&
              currentUserData?.bio !== ""
                ? currentUserData?.bio
                : "N/A"}
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* Details End */}

      {/* show link section */}
      <View className="mb-6 m-4 justify-center items-center">
        <View className="flex-col">
          <TouchableOpacity onPress={redirect}>
            <View className="flex-row">
              <Ionicons name="link" size={28} color={COLORS["cadet-gray"]} />
              <View className="mt-1 ml-2">
                <Text className="text-cadet-gray font-medium">
                  Check Recommendations
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View className="bg-bone m-2">
          <Text className="px-4 py-1 text-battleship-gray text-base ">
            Click on the link to discover AI-driven study
            recommendations for this potential match on our web app.
          </Text>
        </View>
      </View>
      {/* show link section end */}
    </SafeAreaView>
  );
};

export default UserInfoModal;
