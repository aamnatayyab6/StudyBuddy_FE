import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import Loader from "../components/Loader";
import React, { useState, useEffect } from "react";

const Webpage = ({ route }) => {
  const url = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    // This function is called when the component unmounts, clearing the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-alabaster">
      {loading ? (
        <Loader visible={true}/>
      ) : (
        <WebView style={{ flex: 1 }} source={{ uri: url.url }} />
      )}
    </SafeAreaView>
  );
};

export default Webpage;
