import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({}); // logged in user
  const [buddies, setBuddies] = useState([]); // buddies fetched for logged in user
  const [user_data, setAllOtherUsers] = useState([]); // other users fetched for logged in user (swipeable)
  const [swipedData, setSwipedData] = useState({}); // swiped data for logged in user
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // logged in user flag for screen stack visibility
  const [token, setToken] = useState(null); // logged in user token
  const sessionTimer = useRef(null); // for logging out user after 50min
  const tokenRef = useRef("");
  //   using tokenRef for getting user information in the first render
  //   The useRef hook allows you to have a mutable variable that does not
  //   cause re-renders when it is changed. You can update this variable and use it immediately.

  //   sign out
  //   -- removes user from local storage
  //   -- sets logged in flag to false
  //   -- clears all user data from state variables
  const signOut = async (navigation, autoSignOut = false) => {
    if (sessionTimer.current) {
      clearTimeout(sessionTimer.current); // in case user logs out themselves, clear timer
      sessionTimer.current = null;
    }
    await AsyncStorage.removeItem("user");
    // Delay state updates when autoSignOut is true
    if (autoSignOut) {
      setIsLoggedIn(false);
      Alert.alert(
        "Session Ended",
        "You have been logged out, please login again to continue."
      );
      setTimeout(() => {
        setSwipedData({});
        setToken(null);
        tokenRef.current = null; // need to take care of token expiration case
        setBuddies([]);
        setAllOtherUsers([]);
      }, 2000);
      setTimeout(() => {
        navigation.replace("Login");
        setUser({});
      }, 3000);
    } else {
      setIsLoggedIn(false);
      setSwipedData({});
      setToken(null);
      tokenRef.current = null; // need to take care of token expiration case
      setBuddies([]);
      setAllOtherUsers([]);
      navigation.replace("Login");
      // user gets undefined on myprofile
      setTimeout(() => {
        setUser({});
      }, 3000);
    }
  };

  /* The `loginFunction` is an asynchronous function that takes in three parameters: `email`,
  `password`, and `navigation`. It sends a POST request to the backend server with the provided
  `email` and `password` to authenticate the user. If the authentication is successful, it sets
  the received token in the state using `setToken`, sets up a timer to automatically sign out the
  user after 50 minutes, and navigates the user to the appropriate screen based on whether the
  user has completed their profile or not. If the authentication fails, it displays an error
  message using `Alert.alert`. If there is an error in the request or no response from the server,
  it also displays an error message. The function also sets the loading state to true while the
  request is being made and false when it is completed. */
  const loginFunction = async (email, password, navigation) => {
    const url = "https://studybuddy-backend.onrender.com/signIn";
    setLoading(true);
    try {
      const response = await axios.post(url, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        setLoading(false);
        const receivedToken = response?.data?.token;
        if (receivedToken) {
          setToken(receivedToken);
          const flag = response?.data?.flag;
          let userData = {
            token: receivedToken,
            email: email,
            flag: flag,
          };

          // set up auto sign out after 50min
          sessionTimer.current = setTimeout(() => {
            signOut(navigation, true);
          }, 50 * 60 * 1000); // 50 minutes * 60 seconds/minute * 1000 ms/second
          if (flag) {
            AsyncStorage.setItem(
              "user",
              JSON.stringify({ ...userData, loggedIn: true })
            );
            setIsLoggedIn(true);
            navigation.navigate("Drawer");
          } else {
            AsyncStorage.setItem(
              "user",
              JSON.stringify({ ...userData, loggedIn: false })
            );
            navigation.navigate("CompleteProfile");
          }
        } else {
          Alert.alert("Error", "Invalid Login!");
        }
      } else {
        setLoading(false);
        Alert.alert("Request failed", "Something went wrong!");
      }
    } catch (e) {
      setLoading(false);
      if (e.response) {
        // authentication failed on BE
        if (e.response.status === 401) {
          Alert.alert("Error", "Invalid email or password");
        } else {
          // other responses
          Alert.alert("Error", "Something went wrong!");
        }
        return;
      }
      // no response from the server
      Alert.alert("Error", "Something went wrong!");
    }
  };

  //   get logged in user's data using token from /signIn
  const fetchUser = async (userData) => {
    if (!userData || !userData.token) {
      return;
    }

    try {
      const parsedToken = userData.token;
      const response = await axios.post(
        "https://studybuddy-backend.onrender.com/getUserData",
        {
          token: parsedToken,
        }
      );

      if (response.status === 200) {
        setUser(response.data);
      } else {
        Alert.alert("Error", "Something went wrong!");
      }
    } catch (err) {
      Alert.alert("Error", "Something, went wrong. Try again later!");
    }
  };

  // fetch buddies for logged in user using tokenRef stored after /signIn
  const fetchBuddies = async (token) => {
    if (!user || !token) {
      return;
    }

    try {
      const response = await axios.post(
        "https://studybuddy-backend.onrender.com/getBuddies",
        {
          token: token,
        }
      );

      if (response.status === 200) {
        const buddyData = await Promise.all(
          response.data.map(async (buddyId) => {
            const buddyResponse = await axios.get(
              `https://studybuddy-backend.onrender.com/getUserData/${buddyId}`
            );
            return buddyResponse.data;
          })
        );
        setBuddies(buddyData);
      } else {
        Alert.alert("Error", "An error occurred, please try again later.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred, please try again later.");
    }
  };

 /**
  * This function fetches all other users from a backend API using an authorization token.
  * @param token - The token parameter is a string that represents the authentication token needed to
  * access the API endpoint.
  * @returns The function `fetchAllOtherUsers` is returning nothing (i.e., `undefined`). It is a void
  * function that sets state variables and updates the loading state.
  */
  const fetchAllOtherUsers = async (token) => {
    if (!user || !token) return;
    setLoading(true);
    try {
      const url = "https://studybuddy-backend.onrender.com/getAllOtherUsers";
      axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          if (res.data) {
            setAllOtherUsers(res.data);
            setSwipedData(res.data[0]);
            setLoading(false);
          } else {
            Alert.alert("Error", "An error occurred, please try again later.");
            setLoading(false);
          }
        });
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "An error occurred, please try again later.");
    }
  };

  //   initializing token + user after /signIn
  //   only get logged in user data if there is a token after /signIn
  useEffect(() => {
    const initializeUser = async () => {
      const userData = await AsyncStorage.getItem("user"); // token + email from /signIn
      if (userData && JSON.parse(userData).token) {
        tokenRef.current = JSON.parse(userData).token;
        await fetchUser({ token: tokenRef.current });
        await fetchAllOtherUsers(tokenRef.current);
        await fetchBuddies(tokenRef.current);
      }
    };
    initializeUser();
  }, [token]);

  // new refreshBuddies function to occur on mounting matches screen
  const refreshBuddies = async () => {
    if (tokenRef.current) {
      await fetchBuddies(tokenRef.current);
    }
  };

  // when user updates information about themselves
  const refreshUser = async () => {
    if (tokenRef.current) {
      await fetchUser({ token: tokenRef.current });
    }
  };

  //   swipe function for homescreen
  const swipe = async (direction, navigation) => {
    const url = "https://studybuddy-backend.onrender.com/swipe";
    setLoading(true);
    try {
      const response = await axios.post(url, {
        email: user.email,
        buddy_email: swipedData?.email,
        swipe: direction,
      });
      if (response.status === 200) {
        setLoading(false);
        refreshBuddies(); // refresh buddies if swipe happens
        if (response.data.isMatch && direction === true) {
          navigation.navigate("MatchModal", {
            newBuddy: swipedData,
            loggedInUser: user,
          });
        }
      }
    } catch (e) {
      setLoading(false);
      Alert.alert("Error " + e.message);
    }
  };

  //   useMemo is used to ensure that the context value is not recreated on every render.
  //   Instead, it will only be recreated if one of the dependencies (user, buddies, user_data, etc.) changes.
  const memoizedValue = useMemo(
    () => ({
      user,
      buddies,
      user_data,
      swipe,
      swipedData,
      setSwipedData,
      setLoading,
      loading,
      loginFunction,
      signOut,
      isLoggedIn,
      setIsLoggedIn,
      token,
      refreshBuddies,
      refreshUser,
    }),
    [user, buddies, user_data, swipe, swipedData, token, isLoggedIn]
  );

  return (
    <UserContext.Provider value={memoizedValue}>
      {children}
    </UserContext.Provider>
  );
};

export const NavigationContext = createContext(); // for navigation inside swipe
export { UserContext, UserProvider };
