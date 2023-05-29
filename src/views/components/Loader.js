import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { styles } from "../../const/styles";
import COLORS from "../../const/colors";

const Loader = ({ visible = false }) => {
  const { height, width } = useWindowDimensions();
  return (
    visible && (
      <View
        testID="loader"
        className="bg-alabaster"
        style={[styles.loader_container, { height, width }]}
      >
        <View style={styles.loader}>
          <ActivityIndicator size={"large"} color={COLORS["dim-gray"]} />
          <Text
            className="text-outer-space"
            style={{
              marginRight: 10,
              fontSize: 16,
            }}
          >
            Loading...
          </Text>
        </View>
      </View>
    )
  );
};

export default Loader;
