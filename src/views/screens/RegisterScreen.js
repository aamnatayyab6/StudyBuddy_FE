import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import TextInputComponent from "../components/TextInputComponent";
import ButtonComponent from "../components/ButtonComponent";
import Loader from "../components/Loader";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    flag: false,
  });

  // error states
  const [errors, setErrors] = useState({});
  // register - loading
  const [loading, setLoading] = useState(false);

  const signUpFunction = async () => {
    const url = "https://studybuddy-backend.onrender.com/createUser";
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        const response = await axios.post(url, inputs);
        if (response.status === 200) {
          try {
            await AsyncStorage.setItem("user", JSON.stringify(inputs));
            navigation.navigate("Login");
          } catch (error) {
            Alert.alert("Error", "Something went wrong with app's storage.");
          }
        } else {
          Alert.alert("Error", "Something went wrong");
        }
      } catch (e) {
        Alert.alert("Error", "Email already exists, choose a different email.");
      }
    }, 3000);
  };

  // validating input fields
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      // empty email
      handleError("Please enter email", "email");
      isValid = false;
    }
    // valid email
    else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please enter valid email", "email");
      isValid = false;
    }

    // full name
    if (!inputs.name) {
      handleError("Please enter full name", "name");
      isValid = false;
    }

    // password
    if (!inputs.password) {
      handleError("Please enter password", "password");
      isValid = false;
    } else if (inputs.password.length < 8) {
      handleError("Please enter minimum length of 8 characeters", "password");
      isValid = false;
    }

    if (isValid) {
      signUpFunction();
    }
  };

  // sets states to user input
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  // error handling
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <SafeAreaView className="flex-1 bg-dun">
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 10,
          paddingHorizontal: 20,
        }}
      >
        {/* logo */}
        {/* text - StudyBuddy. */}
        <View className="pt-6 justify-center items-center">
          <Text className="text-3xl text-cadet-gray p-2 font-medium">
            Study
            <Text className="text-3xl text-outer-space  p-2 font-light">
              Buddy
              <Text className="text-3xl text-outer-space p-2 font-normal">
                .
              </Text>
            </Text>
          </Text>

          <Text className="text-lg text-outer-space font-medium">
            Enter Your Details to Register
          </Text>
        </View>
        {/* logo end*/}

        {/* Text Input */}
        <View
          style={{
            marginVertical: 20,
          }}
        >
          {/* Name */}
          <TextInputComponent
            label="Full Name"
            iconName={"account-outline"}
            placeholder="Enter your full name"
            onChangeText={(text) => handleOnChange(text, "name")}
            error={errors.name}
            onFocus={() => {
              handleError(null, "name");
            }}
          />

          {/* Email */}
          <TextInputComponent
            label="Email"
            iconName={"email-outline"}
            placeholder="Enter your email address"
            keyboardType="email-address"
            onChangeText={(text) => handleOnChange(text, "email")}
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
          />

          {/* Password */}
          <TextInputComponent
            label="Password"
            iconName={"lock-outline"}
            placeholder="Enter your password"
            password
            onChangeText={(text) => handleOnChange(text, "password")}
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
          />

          {/* button */}
          <ButtonComponent
            // onPress={()=> {signUpFunction()}}
            onPress={validate}
            title={"Register"}
          />

          {/* text */}
          <Text
            className="text-outer-space font-normal"
            onPress={() => navigation.navigate("Login")}
            style={{
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Already have an account? Login
          </Text>
        </View>
      </ScrollView>
      <View className='mb-5'>
        <Text
          className="text-outer-space font-normal"
          onPress={() => navigation.navigate("PrivacyPolicy")}
          style={{
            textAlign: "center",
            fontSize: 14,
          }}
        >
          Terms and Conditions
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
