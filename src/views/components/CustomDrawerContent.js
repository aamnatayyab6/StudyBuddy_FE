import {
  View,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { Caption, Drawer, Paragraph, Title } from "react-native-paper";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import placeholder_image_uri from "../../const/placeholder_image_uri";
import Loader from "./Loader";
import { styles } from "../../const/styles";
import COLORS from "../../const/colors";
import { UserContext } from "../../api/UserContext";
import { useNavigation } from "@react-navigation/native";

const CustomDrawerContent = (props) => {
  const { signOut } = useContext(UserContext);
  const { buddies, user } = props;
  const navigation = useNavigation();

  const renderLogOutButton = async () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
          onPress: () => signOut(navigation, false),
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-alabaster">
      {!user || !buddies ? (
        <Loader visible={true} />
      ) : (
        <View className="flex-1">
          {/* Top View - pfp + buddies */}
          <View className="pl-5">
            <View className="flex-row mt-10">
              <Image
                source={{
                  uri: user?.photoUrl
                    ? user?.photoUrl[0]
                    : placeholder_image_uri,
                }}
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 100,
                  borderColor: COLORS["dim-gray"],
                  borderWidth: 0.4,
                  backgroundColor: COLORS["bone"],
                }}
                cachePolicy={'none'}
              />
              {/* Name + buddies */}
              <View className="ml-5 mr-5 flex-col">
                <Title className="text-outer-space mr-12 text-lg mt-3 font-medium">
                  {user?.name}
                </Title>
                <View className="flex-row">
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    {buddies?.length}
                  </Paragraph>
                  {buddies?.length === 1 ? (
                    <Caption style={styles.caption}>Buddy</Caption>
                  ) : (
                    <Caption style={styles.caption}>Buddies</Caption>
                  )}
                </View>
              </View>
            </View>
          </View>

          {/* items */}
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <Drawer.Section style={styles.bottomDrawerSection}>
              <TouchableOpacity style={styles.customItemStyle}>
                <MaterialCommunityIcons
                  name="exit-to-app"
                  size={22}
                  color={COLORS["battleship-gray"]}
                />
                <Text
                  style={styles.customItemTextStyle}
                  onPress={renderLogOutButton}
                >
                  Log Out
                </Text>
              </TouchableOpacity>
            </Drawer.Section>
          </DrawerContentScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CustomDrawerContent;
