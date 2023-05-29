import { createDrawerNavigator } from '@react-navigation/drawer';
import Matches from "../views/screens/drawerScreens/Matches";
import MyProfile from "../views/screens/drawerScreens/MyProfile";
import ContactUs from "../views/screens/drawerScreens/ContactUs";
import HomeScreen from '../views/screens/drawerScreens/HomeScreen';
import CustomDrawerContent from "../views/components/CustomDrawerContent";
import { UserContext } from '../api/UserContext';
import { MaterialCommunityIcons, } from '@expo/vector-icons'
import COLORS from "../const/colors";
import React, {useContext} from 'react';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { buddies, user  } = useContext(UserContext);

  return (
    <Drawer.Navigator
      initialRouteName='Home'
      backBehavior='history'
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false,
        gestureEnabled: true,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} buddies={buddies} user={user}/>}

    >
      {/* Home */}
      <Drawer.Screen
        options={{
          title: 'Home',
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons name="home" size={24} color={focused ? COLORS["dim-gray"] : COLORS["battleship-gray"]} />
          )
        }}
        name="Home"
        component={HomeScreen}
      />

      {/* MyProfile */}
      <Drawer.Screen
        options={{
          title: 'Edit Profile',
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons name="account-edit" size={24} color={focused ? COLORS["dim-gray"] : COLORS["battleship-gray"]} />
          )
        }}
        name="MyProfile"
        component={MyProfile}
      />

      {/* Matches */}
      <Drawer.Screen
        options={{
          title: 'Matches',
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons name="account-group" size={24} color={focused ? COLORS["dim-gray"] : COLORS["battleship-gray"]} />
          )
        }}
        name="Matches"
        component={Matches}
      />

      {/* ContactUs */}
      <Drawer.Screen
        options={{
          title: 'Contact Us',
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons name="chat-question" size={24} color={focused ? COLORS["dim-gray"] : COLORS["battleship-gray"]} />
          )
        }}
        name="ContactUs"
        component={ContactUs}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator