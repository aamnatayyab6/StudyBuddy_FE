import { Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View
      testID="header"
      className="flex-row justify-between pt-8 pb-2 px-5 bg-dun"
    >
      {/* profile picture */}
      <TouchableOpacity
        testID="goBackButton"
        className="pt-3"
        onPress={() => {
          navigation.goBack();
        }}
        style={{ width: 40, height: 40 }}
      >
        <Ionicons name="chevron-back" size={26} color="#363E45" />
      </TouchableOpacity>

      {/* logo */}
      <View className="justify-center items-center">
        <Text className="text-xl text-outer-space font-normal">{title}</Text>
      </View>
      {/* logo end */}

      {/* messages icon */}
      <TouchableOpacity
        testID="navigateButton"
        className="py-2"
        onPress={() => {
          navigation.navigate("Matches");
        }}
      >
        <FontAwesome5 name="edit" size={25} color="#363E45" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
