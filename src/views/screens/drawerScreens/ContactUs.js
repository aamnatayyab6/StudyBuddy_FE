import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome5, EvilIcons } from "@expo/vector-icons";
import React from "react";

const ContactUs = ({ navigation }) => {
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

      {/* data */}
      <View className="flex-1 justify-center pt-3 ml-2 mr-2 pb-10 mb-10">
        <View className="flex-row">
          <Image
            source={require("../../../assets/images/aamna.jpg")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
              marginLeft: 20,
            }}
          />

          {/* info box */}
          <View className="bg-bone pr-20 ml-3 rounded-full">
            <Text className="leading-3 justify-center items-center text-lg text-gunmetal pt-2 pl-5">
              Aamna Tayyab
            </Text>
            <Text className="leading-4 font-normal text-gunmetal pl-5">
              Frontend Developer
            </Text>
            <Text className="leading-4 font-light text-gunmetal pl-5">
              aamnatayyab6@gmailcom
            </Text>
          </View>
          {/* info box end */}
        </View>
        <View className="pt-10 flex-row">
          <Image
            source={require("../../../assets/images/timi.jpg")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
              marginLeft: 20,
            }}
          />
          {/* info box */}
          <View className="bg-bone pr-16 ml-3 rounded-full">
            <Text className="leading-3 justify-center items-center text-lg text-gunmetal pt-2 pl-5">
              Timilehin Bisola-Ojo
            </Text>
            <Text className="leading-4 font-normal text-gunmetal pl-5">
              Backend Developer
            </Text>
            <Text className="leading-4 font-light text-gunmetal pl-5">
              timilehinbisolaojo@gmail.com
            </Text>
          </View>
          {/* info box end */}
        </View>
      </View>

      {/* <View className='bg-bone justify-center items-center mb-8'>
          <Text className='text-sm font-light text-outer-space'>
            Contact us in case of any queries
          </Text>
        </View> */}
    </SafeAreaView>
  );
};

export default ContactUs;
