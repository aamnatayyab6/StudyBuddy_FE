import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import {
  FontAwesome5,
  EvilIcons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useContext, useState, useCallback } from "react";
import COLORS from "../../../const/colors";
import Loader from "../../components/Loader";
import placeholder_image_uri from "../../../const/placeholder_image_uri";
import { UserContext } from "../../../api/UserContext";
import { useFocusEffect } from "@react-navigation/native";
import ButtonComponent from "../../components/ButtonComponent";
import axios from "axios";

const Matches = ({ navigation }) => {
  const { setLoading, loading, buddies, refreshBuddies, token } =
    useContext(UserContext);
  const [currentBuddy, setCurrentBuddy] = useState({});
  useFocusEffect(
    useCallback(() => {
      refreshBuddies();
    }, [])
  );

  const promptRemoveBuddy = (token, buddy_email) => {
    Alert.alert("Remove Buddy", "Are you sure you want to remove this buddy?", [
      {
        text: "Cancel",
        onPress: () => {
          return null;
        },
      },
      {
        text: "Confirm",
        onPress: async () => {
          await removeBuddy(token, buddy_email);
        },
      },
    ]);
  };

  const removeBuddy = async (token, buddy_email) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://studybuddy-backend.onrender.com/removeBuddy",
        {
          token: token,
          buddy_email: buddy_email,
        }
      );

      if (response.status === 200) {
        refreshBuddies();
        setLoading(false);
      } else {
        console.log("response.status", response.status);
        Alert.alert("Error", "Something went wrong");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-alabaster flex-1">
      {/* Header Section */}
      <View className="flex-row justify-between pt-8 pb-2 px-5 bg-dun">
        {/* navicon */}
        <TouchableOpacity
          className="pt-3"
          style={{ width: 40, height: 40 }}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <EvilIcons name="navicon" size={34} color="#363E45" />
        </TouchableOpacity>

        {/* logo */}
        <View className="justify-center items-center">
          <Text className="text-2xl text-cadet-gray p-2 font-medium">
            Study
            <Text className="text-2xl text-outer-space  p-2 font-light">
              Buddy
              <Text className="text-2xl text-outer-space p-2 font-normal">
                .
              </Text>
            </Text>
          </Text>
        </View>
        {/* logo end */}

        {/* messages icon */}
        <TouchableOpacity
          className="py-2 mr-2"
          onPress={() => navigation.navigate("Messages")}
        >
          <FontAwesome5 name="envelope-open-text" size={26} color="#363E45" />
        </TouchableOpacity>
      </View>
      {/* End of Header Section */}

      {loading ? (
        <Loader visible={true} />
      ) : (
        <ScrollView
          className="pt-3 ml-2 mr-2 pb-10 mb-10"
          showsVerticalScrollIndicator={false}
        >
          {buddies.length === 0 ? (
            <View className="flex-1 justify-center items-center pt-10">
              <Text className="justify-center items-center font-normal text-xl text-outer-space">
                Swipe to get started!
              </Text>
              <ButtonComponent
                title={"Go To Home Screen"}
                onPress={() => navigation.navigate("Home")}
              />
            </View>
          ) : (
            // start of displaying list
            buddies.map((buddy) => (
              <View
                key={buddy?.uid}
                style={{
                  paddingVertical: 10,
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                {/* displaying pfp + text */}
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentBuddy(buddy);
                      navigation.navigate("BuddyInfoModal", {
                        currentBuddy: buddy,
                      });
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      maxWidth: "64%",
                    }}
                  >
                    <View className="pl-4">
                      <Image
                        source={{
                          uri: buddy?.photoUrl[0]
                            ? buddy?.photoUrl[0]
                            : placeholder_image_uri,
                        }}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 100,
                          borderWidth: 1,
                          borderColor: COLORS.dun,
                          backgroundColor: COLORS.bone,
                          marginRight: 10,
                        }}
                        cachePolicy={"none"}
                      />
                    </View>
                    <View
                      className="pl-5"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Text
                        className="font-normal text-gunmetal"
                        style={{
                          fontSize: 15,
                        }}
                      >
                        {buddy?.name}
                      </Text>
                      <Text
                        className="font-normal text-gunmetal"
                        style={{
                          fontSize: 13,
                          opacity: 0.6,
                        }}
                      >
                        {buddy?.University}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {/* end of displaying pfp + text */}

                {/* start of message/remove Buttons*/}
                <View className="flex-row items-center">
                  <View className="pr-5">
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentBuddy(buddy);
                        navigation.navigate("Chat", {
                          currentBuddy: buddy,
                        });
                      }}
                      className="items-center justify-center rounded-full w-12 h-12 bg-green-200"
                    >
                      <MaterialCommunityIcons
                        name="message-text"
                        size={24}
                        color={COLORS["gunmetal"]}
                      />
                    </TouchableOpacity>
                  </View>
                  <View className="pr-5">
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentBuddy(buddy);
                        promptRemoveBuddy(token, buddy.email);
                      }}
                      className="items-center justify-center rounded-full w-12 h-12 bg-[#fecaca]"
                    >
                      <MaterialCommunityIcons
                        name="account-remove"
                        size={24}
                        color={COLORS["gunmetal"]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              // {/* end of message/remove Buttons*/}
            ))
          )}

          {/* end of displaying list */}
        </ScrollView>
      )}

      {/* bottom modal button section */}
      <View className="flex flex-row justify-evenly py-2">
        <TouchableOpacity
          className="items-center justify-center rounded-full w-16 h-16"
          disabled={buddies?.length === 0}
        >
          <MaterialIcons name="horizontal-rule" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      {/* end bottom modal button section */}
    </SafeAreaView>
  );
};

export default Matches;
