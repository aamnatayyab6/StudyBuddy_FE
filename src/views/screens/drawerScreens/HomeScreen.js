import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { useEffect, useRef, useState, useContext } from "react";
import {
  FontAwesome5,
  FontAwesome,
  EvilIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { styles } from "../../../const/styles";
import { UserContext, NavigationContext } from "../../../api/UserContext";
import ImageComponent from "../../components/ImageComponent";
import Loader from "../../components/Loader";
import COLORS from "../../../const/colors";

const HomeScreen = ({ navigation }) => {
  const { user, user_data, swipe, swipedData, setSwipedData } =
    useContext(UserContext);
  const [user_index, setUserIndex] = useState(0);
  const swipePointer = useRef(null); // for buttons

  return (
    <SafeAreaView className="flex-1 bg-alabaster">
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

      {/* Screen Container */}
      <View className="flex-1 -mt-6">
        {!user_data ? (
          <Loader visible={true} />
        ) : (
          <NavigationContext.Provider value={navigation}>
            <Swiper
              ref={swipePointer}
              containerStyle={{ backgroundColor: "transparent" }}
              cards={user_data}
              onSwiped={(cardIndex) => {
                setSwipedData(user_data[cardIndex + 1]);
                setUserIndex(cardIndex + 1);
              }}
              stackSize={3}
              cardIndex={0}
              horizontalSwipe={user_data.length !== 0} // if there are no users -> make cards unswipable
              animateCardOpacity
              verticalSwipe={false}
              onSwipedLeft={() => {
                // console.log("IGNORE swipe");
                swipe(false, navigation);
              }}
              onSwipedRight={() => {
                // console.log("MATCH swipe");
                swipe(true, navigation);
              }}
              overlayLabels={{
                left: {
                  element: (
                    <FontAwesome
                      name="thumbs-o-down"
                      size={26}
                      color={COLORS["gunmetal"]}
                      style={{
                        backgroundColor: "#fecaca",
                        padding: 8,
                        borderRadius: 100,
                      }}
                    />
                  ),
                  style: {
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                      marginTop: 30,
                      marginLeft: -30,
                    },
                  },
                },
                right: {
                  element: (
                    <FontAwesome
                      name="thumbs-o-up"
                      size={26}
                      color={COLORS["gunmetal"]}
                      style={{
                        backgroundColor: COLORS["pearl"],
                        padding: 8,
                        borderRadius: 100,
                      }}
                    />
                  ),
                  style: {
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      marginTop: 30,
                      marginLeft: 30,
                    },
                  },
                },
              }}
              renderCard={(card) =>
                user_data.length !== 0 /*user_data?.length !== user_index */ ? (
                  <View
                    className="bg-white relative h-3/4 rounded-xl"
                    key={card?.uid}
                  >
                    {/* Adding Custom Component to fix render issues in case of wrong uri */}
                    <ImageComponent card={card} />

                    <View
                      className="bg-white w-full h-22 absolute bottom-0
                                items-center px-4 py-2 rounded-b-xl shadow-inner flex-shrink-1"
                      style={styles.cardShadow}
                    >
                      <Text className="text-xl font-bold">{card?.name}</Text>
                      <Text className="text-xl font-semibold">
                        {card?.University}
                      </Text>
                      <Text>{card?.Major}</Text>
                    </View>
                  </View>
                ) : (
                  <View
                    className="bg-white relative h-3/4 rounded-xl justify-center items-center"
                    style={styles.cardShadow}
                  >
                    <MaterialCommunityIcons
                      name="robot-happy"
                      size={40}
                      color={COLORS["battleship-gray"]}
                    />
                    <Text className="text-xl font-bold text-battleship-gray">
                      No cards to show!
                    </Text>
                  </View>
                )
              }
            />
          </NavigationContext.Provider>
        )}
      </View>

      {/* Bottom button Section */}
      {/* thumbs up button */}
      {user_data?.length !== user_index ? (
        <View className="flex flex-row justify-evenly py-6">
          <TouchableOpacity
            className="items-center justify-center rounded-full w-16 h-16 bg-[#fecaca]"
            onPress={() => {
              swipePointer.current.swipeLeft();
              swipe(false, navigation);
            }}
          >
            <FontAwesome name="thumbs-o-down" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center justify-center rounded-full w-16 h-16"
            disabled={user_data?.length === user_index}
            onPress={
              () =>
                navigation.navigate("UserInfoModal", {
                  currentUserData: swipedData,
                  loggedInUserDataUid: user?.uid
                })
              // navigation.navigate("MatchModal")
            }
          >
            <FontAwesome5 name="chevron-up" size={24} color="gray" />
          </TouchableOpacity>

          {/* read more button, directs to more about this.user */}
          <TouchableOpacity
            className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
            onPress={() => {
              swipePointer.current.swipeRight();
              swipe(true, navigation);
            }}
          >
            <FontAwesome name="thumbs-o-up" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="bg-alabaster justify-center items-center">
          <Text className="text-xl font-bold text-battleship-gray">
            You're all caught up!
          </Text>
          <Text className="text-xl font-bold text-battleship-gray">....</Text>
        </View>
      )}

      {/* End of Screen */}
    </SafeAreaView>
  );
};

export default HomeScreen;
