import { View, TextInput, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "../../const/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../const/colors";

const TextInputComponent = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS["red-custom"]
              : isFocused
              ? COLORS["black"]
              : COLORS["bone"],
          },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={22}
          color={COLORS["dim-gray"]}
          style={{
            marginRight: 10,
          }}
        />

        <TextInput
          testID="passwordInput"
          // Password
          secureTextEntry={hidePassword}
          // Email
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{
            color: COLORS["dim-gray"],
            flex: 1,
          }}
          {...props}
        />
        {password && (
          <MaterialCommunityIcons
            testID="visibilityToggle"
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color={COLORS["dim-gray"]}
          />
        )}
      </View>
      {error && (
        <Text
          style={{
            color: COLORS["red-custom"],
            fontSize: 12,
            marginTop: 7,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default TextInputComponent;
