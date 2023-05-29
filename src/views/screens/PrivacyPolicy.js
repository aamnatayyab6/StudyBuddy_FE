import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { Ionicons } from "@expo/vector-icons";
import terms_and_conditions from "../../const/terms_and_conditions.js";

const PrivacyPolicy = ({ navigation }) => {
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView className="flex-1 bg-alabaster">
      {/* Header section */}
      <View className="flex-row flex items-center space-x-20 pt-8 pb-2 px-5 bg-dun">
        <View className="justify-center">
          <TouchableOpacity
            className="pt-3"
            onPress={() => {
              navigation.goBack();
            }}
            style={{ width: 40, height: 40 }}
          >
            <Ionicons name="chevron-back" size={26} color="#363E45" />
          </TouchableOpacity>
        </View>

        {/* logo */}

        <View className="justify-center">
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
      </View>
      {/* Header section end*/}

      <ScrollView className='m-2'>
        <RenderHtml
          contentWidth={width}
          source={{ html: terms_and_conditions }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
