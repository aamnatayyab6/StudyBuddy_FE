import { EvilIcons, Feather, FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import COLORS from "../../../const/colors";
import { styles } from "../../../const/styles";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import Language from "../../../const/data/Language";
import University from "../../../const/data/University";
import areas_of_study from "../../../const/data/areas_of_study";
import Location from "../../../const/data/Location";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ButtonComponent from "../../components/ButtonComponent";
import { UserContext } from "../../../api/UserContext";
import { useFocusEffect } from "@react-navigation/native";
import placeholder_image_uri from "../../../const/placeholder_image_uri";
import axios from "axios";
import Loader from "../../components/Loader";

const MyProfile = ({ navigation }) => {
  const { user, token, refreshUser, signOut, setLoading, loading } =
    useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      refreshUser();
    }, [])
  );

  // for age
  const [age, setAge] = useState(user?.age ? user?.age?.toString() : "");
  // for date time picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const calculate_age = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);

    return Math.abs(age.getUTCFullYear() - 1970);
  };
  // Actual date of birth to be sent
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setAge(calculate_age(date));
  };

  // for dropdown picker
  // Language
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(
    user?.Language ? user?.Language : []
  );
  const languages = Language.map((language) => ({
    label: language,
    value: language,
  }));

  const [isUniOpen, setIsUniOpen] = useState(false);
  const [isMajorOpen, setIsMajorOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const [selectedUniversity, setSelectedUniversity] = useState(
    user?.University ? user?.University : ""
  );
  const [selectedMajor, setSelectedMajor] = useState(
    user?.Major ? user?.Major : ""
  );
  const [selectedCourses, setSelectedCourses] = useState(
    user?.InterestedSubjects ? user?.InterestedSubjects : []
  );
  const [selectedLocation, setSelectedLocation] = useState(
    user?.Location ? user?.Location : ""
  );

  const university = University.map((uni) => ({ label: uni, value: uni }));
  const coursesArr = [];
  areas_of_study.forEach((area) => {
    if (area.courses) {
      area.courses.forEach((course) => {
        if (!coursesArr.includes(course)) {
          coursesArr.push(course);
        }
      });
    }
  });
  const courses = coursesArr.map((course) => ({
    label: course,
    value: course,
  }));
  const location = Location.map((loc) => ({ label: loc, value: loc }));

  // handle multiple dropdown open operations
  const onLanguageDropDownOpen = useCallback(() => {
    setIsMajorOpen(false);
    setIsCoursesOpen(false);
    setIsLocationOpen(false);
    setIsUniOpen(false);
  });

  const onUniversityDropdownOpen = useCallback(() => {
    setIsMajorOpen(false);
    setIsCoursesOpen(false);
    setIsLocationOpen(false);
    setIsOpen(false);
  }, []);

  const onMajorDropdownOpen = useCallback(() => {
    setIsUniOpen(false);
    setIsCoursesOpen(false);
    setIsLocationOpen(false);
    setIsOpen(false);
  }, []);

  const onCoursesDropdownOpen = useCallback(() => {
    setIsUniOpen(false);
    setIsMajorOpen(false);
    setIsLocationOpen(false);
    setIsOpen(false);
  }, []);

  const onLocationDropdownOpen = useCallback(() => {
    setIsMajorOpen(false);
    setIsCoursesOpen(false);
    setIsUniOpen(false);
    setIsOpen(false);
  }, []);

  const [inputs, setInputs] = useState({
    account_name: user?.name ? user?.name : "",
    bio: user?.bio ? user?.bio : "",
  });

  // sets states to user input
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const profile_picture =
    user && user?.photoUrl[0]
      ? { uri: user?.photoUrl[0] }
      : { uri: placeholder_image_uri };

  const [image, setImage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isImageUpdated, setImageUpdated] = useState(false);

  const pickImage = async () => {
    setLoading(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setTimeout(() => {
        setImage(result.assets[0].uri);
        handleUpload(result.assets[0].uri);
        setImageUpdated(true);
        setLoading(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleUpload = async (image) => {
    const data = new FormData();
    let uriParts = image.split(".");
    let fileType = uriParts[uriParts.length - 1];
    data.append("file", {
      uri: image,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    data.append("upload_preset", "study_buddy");

    const url = "https://api.cloudinary.com/v1_1/dg8969jxs/image/upload";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      setLoading(true);
      const response = await axios.post(url, data, config);
      setUploadedImageUrl(response.data.secure_url);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in Node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert(
          "Error",
          "Something happened in setting up the request that triggered an Error"
        );
      }
      console.log(error.config);
      Alert.alert(
        "Error",
        "Something happened in setting up the request that triggered an Error"
      );
    }
  };

  const removeImage = async () => {
    setLoading(true);
    setImage(placeholder_image_uri);
    setUploadedImageUrl("");
    setImageUpdated(true);
    setLoading(false);
  };

  // to handle changed data - unnecessary API calls
  const [originalData, setOriginalData] = useState({
    name: user?.name,
    age: user?.age.toString(),
    Language: user?.Language,
    Major: user?.Major,
    InterestedSubjects: user?.InterestedSubjects,
    Location: user?.Location,
    University: user?.University,
    bio: user?.bio,
  });

  const [currentData, setCurrentData] = useState({
    name: inputs?.account_name,
    age: age,
    Language: selectedLanguages,
    Major: selectedMajor,
    InterestedSubjects: selectedCourses,
    Location: selectedLocation,
    University: selectedUniversity,
    bio: inputs?.bio,
  });

  // update currentData state every time a relevant field is updated
  useEffect(() => {
    setCurrentData({
      name: inputs?.account_name,
      age: age,
      Language: selectedLanguages,
      Major: selectedMajor,
      InterestedSubjects: selectedCourses,
      Location: selectedLocation,
      University: selectedUniversity,
      bio: inputs?.bio,
    });
  }, [
    inputs,
    age,
    selectedLanguages,
    selectedMajor,
    selectedCourses,
    selectedLocation,
    selectedUniversity,
  ]);

  const setUserData = async () => {
    if (
      JSON.stringify(originalData) !== JSON.stringify(currentData) ||
      isImageUpdated
    ) {
      const url = "https://studybuddy-backend.onrender.com/setUserData";
      try {
        setLoading(true);
        const postData = {
          token: token,
          name: inputs.account_name,
          age: age,
          Language: selectedLanguages,
          Major: selectedMajor,
          InterestedSubjects: selectedCourses,
          Location: selectedLocation,
          University: selectedUniversity,
          bio: inputs.bio,
          flag: true,
        };
        if (uploadedImageUrl || image) {
          postData.photoUrl = uploadedImageUrl || image;
        }
        const response = await axios.post(url, postData);
        if (response.status === 200) {
          await refreshUser();
          setUploadedImageUrl("");
          setImage("");
          setImageUpdated(false);
          setOriginalData({
            // update originalData with the new data
            name: postData.name,
            age: postData.age,
            Language: postData.Language,
            Major: postData.Major,
            InterestedSubjects: postData.InterestedSubjects,
            Location: postData.Location,
            University: postData.University,
            bio: postData.bio,
          });
          setLoading(false);
          Alert.alert("Success", "Profile Updated!");
        } else {
          setLoading(false);
          Alert.alert("Request Failed!", "Something went wrong!");
        }
      } catch (e) {
        setLoading(false);
        Alert.alert("Error", "Something went wrong!");
      }
    } else {
      Alert.alert("Notice", "No changes were made.");
    }
  };

  const deleteAccount = async () => {
    const url = "https://studybuddy-backend.onrender.com/deleteProfile";
    try {
      setLoading(true);
      const postData = {
        token: token,
      };
      const response = await axios.post(url, postData);
      if (response.status === 200) {
        setLoading(false);
        Alert.alert("Success", "Your account was deleted!");
        setTimeout(() => {
          signOut(navigation, false);
        }, 2000);
      } else {
        setLoading(false);
        Alert.alert("Request Failed", "Something went wrong, try again later!");
      }
    } catch (e) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <SafeAreaView className="bg-alabaster flex-1">
      {/* Header Section */}
      <View className="flex-row justify-between pt-8 pb-2 px-5 bg-dun">
        {/* navicon */}
        <TouchableOpacity
          className="pt-3"
          style={{ width: 40, height: 40 }}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <EvilIcons name="navicon" size={34} color="#363E45" />
        </TouchableOpacity>

        {/* logo */}
        <View className="justify-center items-center">
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

        {/* messages icon */}
        <TouchableOpacity
          className="py-2 mr-2"
          onPress={() => navigation.navigate("Messages")}
        >
          <FontAwesome5 name="envelope-open-text" size={26} color="#363E45" />
        </TouchableOpacity>
      </View>
      {/* End of Header Section */}

      {loading ? (
        <Loader visible={true} />
      ) : (
        <>
          {user && (
            // {/* Edit Profile Section */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="pt-3 ml-2 mr-2 pb-10 mb-10"
            >
              {/* Profile picture */}
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Pressable onPress={pickImage}>
                  {image === "" ? (
                    <Image
                      source={profile_picture}
                      cachePolicy={"none"}
                      style={{
                        width: 65,
                        height: 65,
                        borderRadius: 100,
                        borderColor: COLORS["dim-gray"],
                        borderWidth: 0.6,
                        backgroundColor: COLORS["bone"],
                      }}
                    />
                  ) : (
                    <Image
                      source={{ uri: image }}
                      style={{
                        width: 65,
                        height: 65,
                        borderRadius: 100,
                        borderColor: COLORS["dim-gray"],
                        borderWidth: 0.6,
                        backgroundColor: COLORS["bone"],
                      }}
                    />
                  )}
                </Pressable>
                <TouchableOpacity onPress={removeImage} className="flex-row">
                  <Feather name="edit-2" size={14} color={COLORS["dim-gray"]} />
                  <Text className="text-dim-gray">Remove Profile Photo</Text>
                </TouchableOpacity>
              </View>

              {/* Account Name */}
              <View
                style={{
                  padding: 10,
                }}
              >
                <View className="pl-2 pr-2">
                  <Text className="text-dim-gray">Account Name *</Text>
                  <TextInput
                    placeholder="Change Account Name shown to others"
                    placeholderTextColor={COLORS["battleship-gray"]}
                    value={inputs.account_name}
                    onChangeText={(text) =>
                      handleOnChange(text, "account_name")
                    }
                    autoCapitalize={"words"}
                    maxLength={40}
                    style={{
                      fontSize: 14,
                      borderBottomWidth: 1,
                      borderColor: "#CDCDCD",
                      color: COLORS["dark-gray"],
                    }}
                  />
                </View>
              </View>

              {/* Age */}
              <View
                style={{
                  padding: 10,
                }}
              >
                <View className="pl-2 pr-2">
                  <Text className="text-dim-gray">Age</Text>

                  <TouchableOpacity onPress={showDatePicker}>
                    <View style={styles.LeftIcon}>
                      <MaterialCommunityIcons
                        name="calendar-outline"
                        size={22}
                        color={COLORS["dim-gray"]}
                      />
                    </View>
                    <TextInput
                      style={styles.StyledTextInput}
                      placeholder="Select your date of birth"
                      editable={false}
                      value={age.toString()}
                      onChangeText={(age) => handleOnChange(age, "age")}
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      date={new Date("1999-06-04")}
                      maximumDate={new Date("2016-12-1")}
                      minimumDate={new Date("1980-12-1")}
                      mode="date"
                      display="spinner"
                      onChange={(date) => setAge(date)}
                      value={handleConfirm}
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Language */}
              <View
                style={{
                  padding: 10,
                }}
              >
                <View className="pl-2 pr-2">
                  <Text className="text-dim-gray">Language *</Text>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      keyboardShouldPersistTaps: "always",
                    }}
                    arrowIconStyle={{
                      width: 16,
                      height: 16,
                    }}
                    searchable={true}
                    searchPlaceholder="Search"
                    searchContainerStyle={{
                      padding: 0,
                      borderBottomWidth: 0,
                    }}
                    searchTextInputStyle={{
                      color: COLORS["gunmetal"],
                      borderColor: COLORS["pearl"],
                      borderBottomColor: "#CDCDCD",
                      borderBottomWidth: 0.8,
                      borderWidth: 0.5,
                      borderRadius: 0,
                      padding: 0,
                    }}
                    dropDownDirection="AUTO"
                    bottomOffset={100}
                    dropDownContainerStyle={{
                      position: "relative", // to fix scroll issue ... it is by default 'absolute'
                      top: 0, //to fix gap between label box and container
                      backgroundColor: COLORS["isabelline"],
                      maxHeight: 200,
                      borderWidth: 0.5,
                      borderColor: "#CDCDCD",
                      borderRadius: 0,
                    }}
                    items={languages}
                    onOpen={onLanguageDropDownOpen}
                    open={isOpen}
                    setOpen={() => setIsOpen(!isOpen)}
                    value={selectedLanguages}
                    setValue={(lang) => setSelectedLanguages(lang)}
                    autoScroll
                    placeholder="What languages do you speak? (Max 4)"
                    placeholderStyle={{
                      color: COLORS["battleship-gray"],
                    }}
                    multiple={true}
                    min={1}
                    max={4}
                    mode="BADGE"
                    badgeColors={COLORS["pearl"]}
                    badgeDotColors={COLORS["isabelline"]}
                    badgeTextStyle={{
                      color: COLORS["gunmetal"],
                      fontSize: 13,
                    }}
                    badgeStyle={{
                      padding: 3,
                      borderRadius: 10,
                    }}
                    badgeSeparatorStyle={{
                      width: 5,
                    }}
                    style={{
                      borderWidth: 0,
                      borderColor: COLORS["alabaster"],
                      borderRadius: 0,
                      backgroundColor: COLORS["alabaster"],
                      marginTop: 0,
                      borderBottomColor: "#CDCDCD",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View>

              {/* Add Bio */}
              <View
                style={{
                  padding: 10,
                }}
              >
                <View className="pl-2 pr-2">
                  <Text className="text-dim-gray">Bio</Text>
                  <TextInput
                    placeholder="What do you want others to know about you?"
                    placeholderTextColor={COLORS["battleship-gray"]}
                    numberOfLines={3}
                    maxLength={200}
                    multiline={true}
                    value={inputs.bio}
                    onChangeText={(text) => handleOnChange(text, "bio")}
                    style={{
                      fontSize: 14,
                      fontStyle: "italic",
                      borderBottomWidth: 1,
                      borderColor: "#CDCDCD",
                      color: COLORS["dark-gray"],
                      paddingLeft: 10,
                    }}
                  />
                </View>
              </View>

              {/* University Selection */}
              <View
                style={{
                  padding: 10,
                  marginTop: 20,
                }}
              >
                <View className="pl-2 pr-2">
                  <Text className="text-dim-gray">University *</Text>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      keyboardShouldPersistTaps: "always",
                    }}
                    arrowIconStyle={{
                      width: 16,
                      height: 16,
                    }}
                    searchable={true}
                    searchPlaceholder="Search"
                    searchContainerStyle={{
                      padding: 0,
                      borderBottomWidth: 0,
                    }}
                    searchTextInputStyle={{
                      color: COLORS["gunmetal"],
                      borderColor: COLORS["pearl"],
                      borderBottomColor: "#CDCDCD",
                      borderBottomWidth: 0.8,
                      borderWidth: 0.5,
                      borderRadius: 0,
                      padding: 0,
                    }}
                    dropDownDirection="AUTO"
                    bottomOffset={100}
                    dropDownContainerStyle={{
                      position: "relative", // to fix scroll issue ... it is by default 'absolute'
                      top: 0, //to fix gap between label box and container
                      backgroundColor: COLORS["isabelline"],
                      maxHeight: 200,
                      borderWidth: 0.5,
                      borderColor: "#CDCDCD",
                      borderRadius: 0,
                    }}
                    items={university}
                    onOpen={onUniversityDropdownOpen}
                    open={isUniOpen}
                    setOpen={() => setIsUniOpen(!isUniOpen)}
                    value={selectedUniversity}
                    setValue={(uni) => setSelectedUniversity(uni)}
                    autoScroll
                    placeholder="What university do you go to?"
                    placeholderStyle={{
                      color: COLORS["battleship-gray"],
                    }}
                    style={{
                      borderWidth: 0,
                      borderColor: COLORS["alabaster"],
                      borderRadius: 0,
                      backgroundColor: COLORS["alabaster"],
                      borderBottomColor: "#CDCDCD",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View>

              {/* Major*/}
              <View
                style={{
                  padding: 10,
                }}
              >
                <View className="pl-2 pr-2">
                  <Text className="text-dim-gray">Major *</Text>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      keyboardShouldPersistTaps: "always",
                    }}
                    arrowIconStyle={{
                      width: 16,
                      height: 16,
                    }}
                    searchable={true}
                    searchPlaceholder="Search"
                    searchContainerStyle={{
                      padding: 0,
                      borderBottomWidth: 0,
                    }}
                    searchTextInputStyle={{
                      color: COLORS["gunmetal"],
                      borderColor: COLORS["pearl"],
                      borderBottomColor: "#CDCDCD",
                      borderBottomWidth: 0.8,
                      borderWidth: 0.5,
                      borderRadius: 0,
                      padding: 0,
                    }}
                    dropDownDirection="AUTO"
                    bottomOffset={100}
                    dropDownContainerStyle={{
                      position: "relative", // to fix scroll issue ... it is by default 'absolute'
                      top: 0, //to fix gap between label box and container
                      backgroundColor: COLORS["isabelline"],
                      maxHeight: 200,
                      borderWidth: 0.5,
                      borderColor: "#CDCDCD",
                      borderRadius: 0,
                    }}
                    categorySelectable={false}
                    items={areas_of_study}
                    onOpen={onMajorDropdownOpen}
                    open={isMajorOpen}
                    setOpen={() => setIsMajorOpen(!isMajorOpen)}
                    value={selectedMajor}
                    setValue={(major) => setSelectedMajor(major)}
                    autoScroll
                    placeholder="What is your major?"
                    placeholderStyle={{
                      color: COLORS["battleship-gray"],
                    }}
                    style={{
                      borderWidth: 0,
                      borderColor: COLORS["alabaster"],
                      borderRadius: 0,
                      backgroundColor: COLORS["alabaster"],
                      borderBottomColor: "#CDCDCD",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View>

              {/* Preferred Subjects */}
              <View
                style={{
                  padding: 10,
                }}
              >
                <View className="pl-2 pr-2">
                  <Text className="text-dim-gray">Preferred Courses *</Text>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      keyboardShouldPersistTaps: "always",
                    }}
                    arrowIconStyle={{
                      width: 16,
                      height: 16,
                    }}
                    searchable={true}
                    searchPlaceholder="Search"
                    searchContainerStyle={{
                      padding: 0,
                      borderBottomWidth: 0,
                    }}
                    searchTextInputStyle={{
                      color: COLORS["gunmetal"],
                      borderColor: COLORS["pearl"],
                      borderBottomColor: "#CDCDCD",
                      borderBottomWidth: 0.8,
                      borderWidth: 0.5,
                      borderRadius: 0,
                      padding: 0,
                    }}
                    dropDownDirection="AUTO"
                    bottomOffset={100}
                    dropDownContainerStyle={{
                      position: "relative", // to fix scroll issue ... it is by default 'absolute'
                      top: 0, //to fix gap between label box and container
                      backgroundColor: COLORS["isabelline"],
                      maxHeight: 200,
                      borderWidth: 0.5,
                      borderColor: "#CDCDCD",
                      borderRadius: 0,
                    }}
                    items={courses}
                    open={isCoursesOpen}
                    onOpen={onCoursesDropdownOpen}
                    setOpen={() => setIsCoursesOpen(!isCoursesOpen)}
                    value={selectedCourses}
                    setValue={(course) => setSelectedCourses(course)}
                    autoScroll
                    placeholder="What do you want to study? (Max 4)"
                    placeholderStyle={{
                      color: COLORS["battleship-gray"],
                    }}
                    multiple={true}
                    min={1}
                    max={4}
                    mode="BADGE"
                    badgeColors={COLORS["pearl"]}
                    badgeDotColors={COLORS["isabelline"]}
                    badgeTextStyle={{
                      color: COLORS["gunmetal"],
                      fontSize: 13,
                    }}
                    badgeStyle={{
                      padding: 3,
                      borderRadius: 10,
                    }}
                    badgeSeparatorStyle={{
                      width: 5,
                    }}
                    style={{
                      borderWidth: 0,
                      borderColor: COLORS["alabaster"],
                      borderRadius: 0,
                      backgroundColor: COLORS["alabaster"],
                      marginTop: 10,
                      borderBottomColor: "#CDCDCD",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View>

              {/* Location */}
              <View
                style={{
                  padding: 10,
                }}
              >
                <View className="pl-2 pr-2">
                  <Text className="text-dim-gray">City *</Text>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      keyboardShouldPersistTaps: "always",
                    }}
                    arrowIconStyle={{
                      width: 16,
                      height: 16,
                    }}
                    searchable={true}
                    searchPlaceholder="Search"
                    searchContainerStyle={{
                      padding: 0,
                      borderBottomWidth: 0,
                    }}
                    searchTextInputStyle={{
                      color: COLORS["gunmetal"],
                      borderColor: COLORS["pearl"],
                      borderBottomColor: "#CDCDCD",
                      borderBottomWidth: 0.8,
                      borderWidth: 0.5,
                      borderRadius: 0,
                      padding: 0,
                    }}
                    dropDownDirection="AUTO"
                    bottomOffset={100}
                    dropDownContainerStyle={{
                      position: "relative", // to fix scroll issue ... it is by default 'absolute'
                      top: 0, //to fix gap between label box and container
                      backgroundColor: COLORS["isabelline"],
                      maxHeight: 200,
                      borderWidth: 0.5,
                      borderColor: "#CDCDCD",
                      borderRadius: 0,
                    }}
                    items={location}
                    onOpen={onLocationDropdownOpen}
                    open={isLocationOpen}
                    setOpen={() => setIsLocationOpen(!isLocationOpen)}
                    value={selectedLocation}
                    setValue={(city) => setSelectedLocation(city)}
                    autoScroll
                    placeholder="What city are you in?"
                    placeholderStyle={{
                      color: COLORS["battleship-gray"],
                    }}
                    style={{
                      borderWidth: 0,
                      borderColor: COLORS["alabaster"],
                      borderRadius: 0,
                      backgroundColor: COLORS["alabaster"],
                      borderBottomColor: "#CDCDCD",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View>

              {/* Update Profile Button */}

              <View className="justify-center items-center pl-20 pr-20 pt-5">
                <ButtonComponent
                  onPress={() => setUserData()}
                  title={"Update Profile"}
                  disabled={
                    selectedLanguages.length === 0 ||
                    selectedCourses.length === 0 ||
                    selectedMajor === "" ||
                    selectedUniversity === "" ||
                    selectedLocation === "" ||
                    inputs.account_name === ""
                  }
                />
              </View>

              {/* Delete account section */}
              <View className="items-center pl-20 pr-20 pt-5 pb-6">
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Warning",
                      "Are you sure you want to permanently delete your account?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => {
                            return null;
                          },
                        },
                        {
                          text: "Delete Account",
                          onPress: () => deleteAccount(),
                        },
                      ]
                    );
                  }}
                >
                  <View className="justify-between flex-row items-center">
                    <Ionicons
                      name="warning-outline"
                      size={17}
                      color="red"
                      className="mt-6"
                    />
                    <Text className="text-base text-red-600 ml-3">
                      Delete your account
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* End of Edit Profile Section */}
            </ScrollView>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default MyProfile;
