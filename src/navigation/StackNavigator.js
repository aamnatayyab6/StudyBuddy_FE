import { UserContext } from "../api/UserContext";
import { storeData, getData } from "../api/Storage";
import LoginScreen from "../views/screens/LoginScreen";
import MessagesScreen from "../views/screens/MessagesScreen";
import ChatScreen from "../views/screens/ChatScreen";
import UserInfoModal from "../views/screens/UserInfoModal";
import Webpage from "../views/screens/Webpage";
import GetStartedScreen from "../views/screens/GetStartedScreen";
import OnboardingSlider from "../views/screens/OnboardingSlider";
import RegisterScreen from "../views/screens/RegisterScreen";
import PrivacyPolicy from "../views/screens/PrivacyPolicy";
import CompleteProfile from "../views/screens/CompleteProfile";
import MatchModal from "../views/screens/MatchModal";
import BuddyInfoModal from "../views/screens/BuddyInfoModal";
import DrawerNavigator from "./DrawerNavigator";
import Loader from "../views/components/Loader";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { isAndroid } from "@freakycoder/react-native-helpers";
import React, { useEffect, useContext, useState } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";

const HAS_LAUNCHED = "HAS_LAUNCHED";
const Stack = createStackNavigator();

const StackNavigator = () => {
  const { isLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [appLaunched, setAppLaunched] = useState(false);

  // checking asyncstorage
  useEffect(() => {
    const getDataFromStorage = async () => {
      if (!isLoggedIn) {
        const check = await getData(HAS_LAUNCHED);
        if (check === "true") {
          setAppLaunched(true);
        } else {
          await storeData(HAS_LAUNCHED, "true");
        }
      }
      setIsLoading(false);
    };

    getDataFromStorage().catch((error) => {
      console.log(error);
    });
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return (
      <>
        <SafeAreaView className="bg-alabaster flex-1">
          <Loader visible={true} />
        </SafeAreaView>
      </>
    );
  }
  // console.log(appLaunched, "ttttt");

  return (
    <TailwindProvider>
      {isLoading ? (
        <Loader visible={true} />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={
              isLoggedIn ? "Drawer" : appLaunched ? "Login" : "GetStarted"
            }
          >
            {isLoggedIn ? (
              <>
                <Stack.Screen name="Drawer" component={DrawerNavigator} />
                <Stack.Screen name="Messages" component={MessagesScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Group
                  screenOptions={{
                    presentation: "modal",
                    gestureEnabled: true,
                    ...(isAndroid && TransitionPresets.ModalPresentationIOS),
                  }}
                >
                  <Stack.Screen
                    name="UserInfoModal"
                    component={UserInfoModal}
                  />
                  <Stack.Screen name="Webpage" component={Webpage} />
                  <Stack.Screen
                    name="BuddyInfoModal"
                    component={BuddyInfoModal}
                  />
                </Stack.Group>

                <Stack.Group
                  screenOptions={{
                    presentation: "transparentModal",
                    gestureEnabled: true,
                    ...(isAndroid && TransitionPresets.ModalPresentationIOS),
                  }}
                >
                  <Stack.Screen name="MatchModal" component={MatchModal} />
                </Stack.Group>
              </>
            ) : (
              <>
                <Stack.Screen name="GetStarted" component={GetStartedScreen} />
                <Stack.Screen
                  name="OnboardingSlider"
                  component={OnboardingSlider}
                />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen
                  name="CompleteProfile"
                  component={CompleteProfile}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </TailwindProvider>
  );
};

export default StackNavigator;
