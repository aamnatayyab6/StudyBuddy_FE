import { View, Text, SafeAreaView, ScrollView, Keyboard } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../api/UserContext";
import TextInputComponent from "../components/TextInputComponent";
import ButtonComponent from "../components/ButtonComponent";
import Loader from "../components/Loader";

const LoginScreen = ({ navigation }) => {
  const { loginFunction, loading } = useContext(UserContext);

  // text input states
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // error states
  const [errors, setErrors] = useState({});

  // validating input fields
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      // empty email
      handleError("Please enter email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please enter valid email", "email");
      isValid = false;
    }
    // password
    if (!inputs.password) {
      handleError("Please enter password", "password");
      isValid = false;
    }

    if (isValid) {
      loginFunction(inputs.email, inputs.password, navigation);
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
            Enter Your Details to Login
          </Text>
        </View>
        {/* logo end*/}

        {/* Text Input */}
        <View
          style={{
            marginVertical: 20,
          }}
        >
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
          <ButtonComponent onPress={validate} title={"Login"} />

          {/* text */}
          <Text
            className="text-outer-space font-normal"
            onPress={() => navigation.navigate("Register")}
            style={{
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Dont have an account? Register
          </Text>
        </View>
        {/* Text Input Ends */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
