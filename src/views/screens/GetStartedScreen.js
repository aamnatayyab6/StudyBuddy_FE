import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const GetStartedScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 relative">
      {/* Screen Container */}
      <View className="flex-1 items-center justify-center bg-dun">
        {/* logo */}

        {/* text - StudyBuddy. */}
        <View className="pt-8 justify-center items-center">
          <Text className="text-5xl text-cadet-gray p-2 font-medium">
            Study
            <Text className="text-5xl text-outer-space  p-2 font-light">
              Buddy
              <Text className="text-5xl text-outer-space p-2 font-normal">
                .
              </Text>
            </Text>
          </Text>

          <Text className="text-2xl pb-3 text-outer-space">
            Create Your Academic Tribe
          </Text>

          {/* image */}
          <Image
            source={require("../../assets/images/app_logo.png")}
            className="h-24 w-24"
          />
        </View>

        {/* Button - Get Started */}
        <View className="pt-5">
          <TouchableOpacity
            className="bg-cadet-gray"
            onPress={() => navigation.navigate("OnboardingSlider")}
            style={{
              borderRadius: 10,
              elevation: 4,
              paddingVertical: 10,
              paddingHorizontal: 22,
            }}
          >
            <Text
              className="text-xl text-[#363e45] font-normal"
              style={{
                alignSelf: "center",
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
        {/* logo end */}
      </View>
    </SafeAreaView>
  );
};

export default GetStartedScreen;
