import React, { useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import COLORS from "../../const/colors";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { styles } from "../../const/styles";
import University from "../../const/data/University";
import Location from "../../const/data/Location";
import Language from "../../const/data/Language";
import areas_of_study from "../../const/data/areas_of_study";
import { UserContext } from "../../api/UserContext";
import axios from "axios";
import placeholder_image_uri from "../../const/placeholder_image_uri";
import Loader from "../components/Loader";

const progressStepsStyle = {
  activeStepIconBorderColor: COLORS["dun"],
  activeLabelColor: COLORS["gunmetal"],
  activeStepNumColor: COLORS["gunmetal"],
  activeStepIconColor: COLORS["pearl"],
  completedStepIconColor: COLORS["khaki"],
  completedProgressBarColor: COLORS["khaki"],
  completedLabelColor: COLORS["outer-space"],
  completedCheckColor: "green",
  disabledStepNumColor: COLORS["outer-space"],
  disabledStepIconColor: COLORS["alabaster"],
  labelColor: COLORS["dark"],
};

const CompleteProfile = ({ navigation }) => {
  const {
    user,
    token,
    refreshUser,
    setLoading,
    loading,
    setIsLoggedIn,
    signOut,
  } = useContext(UserContext);

  // for age
  const [age, setAge] = useState("");
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
  // first progress step = language
  const [isOpen, setIsOpen] = useState(false);
  // second progress step
  const [isUniOpen, setIsUniOpen] = useState(false);
  const [isMajorOpen, setIsMajorOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const languages = Language.map((language) => ({
    label: language,
    value: language,
  }));
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
  const onUniversityDropdownOpen = useCallback(() => {
    setIsMajorOpen(false);
    setIsCoursesOpen(false);
    setIsLocationOpen(false);
  }, []);

  const onMajorDropdownOpen = useCallback(() => {
    setIsUniOpen(false);
    setIsCoursesOpen(false);
    setIsLocationOpen(false);
  }, []);

  const onCoursesDropdownOpen = useCallback(() => {
    setIsUniOpen(false);
    setIsMajorOpen(false);
    setIsLocationOpen(false);
  }, []);

  const onLocationDropdownOpen = useCallback(() => {
    setIsMajorOpen(false);
    setIsCoursesOpen(false);
    setIsUniOpen(false);
  }, []);

  // console.log("USERNAME", user.name);
  const [inputs, setInputs] = useState({
    account_name: user ? user.name : "",
    bio: "",
  });

  // sets states to user input
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  // image
  const [image, setImage] = useState(placeholder_image_uri);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
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

  const setUserData = async () => {
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
        photoUrl: uploadedImageUrl || image,
        flag: true,
      };
      const response = await axios.post(url, postData);
      if (response.status === 200) {
        setIsLoggedIn(true);
        await refreshUser();
        setUploadedImageUrl("");
        setImage("");
        setLoading(false);
        setTimeout(() => {
          navigation.navigate("Drawer");
        }, 3000);
      } else {
        setLoading(false);
        Alert.alert("Request Failed!", "Something went wrong!");
      }
    } catch (e) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: "always",
    nestedScrollEnabled: true,
    decelerationRate: "fast",
  };

  // onNextStep = () => {
  //   console.log("called next step");
  // };

  // onPrevStep = () => {
  //   console.log("called previous step");
  // };

  // onSubmitSteps = () => {
  //   AddUserInfo();
  // };

  const buttonTextStyle = {
    color: COLORS["outer-space"],
    fontWeight: "bold",
  };

  // validation
  const incompleteDetailsFirstStep =
    !inputs.account_name || selectedLanguages.length === 0;
  const incompleteDetails =
    !selectedUniversity ||
    !selectedMajor ||
    selectedLanguages.length === 0 ||
    selectedCourses.length === 0 ||
    !selectedLocation;

  return (
    <SafeAreaView className="bg-bone flex-1 pt-3 pl-3 pr-3">
      {loading ? (
        <Loader visible={true} />
      ) : (
        <>
          <View className="justify-center p-4 items-center">
            <Text className="pt-2 text-lg text-outer-space font-light">
              Welcome {user?.name}
            </Text>
            <Text
              style={{
                fontSize: 17,
              }}
              className="text-outer-space font-light"
            >
              Complete your Profile
            </Text>
          </View>

          <ProgressSteps {...progressStepsStyle}>
            <ProgressStep
              label="Edit Profile"
              onNext={this.onNextStep}
              nextBtnDisabled={incompleteDetailsFirstStep}
              onPrevious={this.onPrevStep}
              scrollViewProps={this.defaultScrollViewProps}
              scrollable={true}
              nextBtnTextStyle={buttonTextStyle}
              previousBtnTextStyle={buttonTextStyle}
            >
              {/* Profile picture */}
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Pressable onPress={pickImage}>
                  {image !== "" ? (
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
                  ) : (
                    <Image
                      source={require("../../assets/images/profile_picture_placeholder.jpg")}
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
                <TouchableOpacity onPress={pickImage} className="flex-row">
                  <Ionicons
                    name="ios-add-circle-outline"
                    size={18}
                    color={COLORS["dim-gray"]}
                  />
                  <Text className="text-dim-gray">Add Profile Photo</Text>
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
                    placeholder="This is the name shown to other users"
                    placeholderTextColor={COLORS["battleship-gray"]}
                    value={inputs.account_name}
                    onChangeText={(text) =>
                      handleOnChange(text, "account_name")
                    }
                    autoCapitalize="words"
                    maxLength={40}
                    style={{
                      fontSize: 14,
                      borderBottomWidth: 1,
                      borderColor: "#CDCDCD",
                      color: COLORS["gunmetal"],
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
                      borderWidth: 0.5,
                      borderColor: COLORS["bone"],
                      borderRadius: 0,
                      backgroundColor: COLORS["bone"],
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
                    value={inputs.bio}
                    numberOfLines={3}
                    maxLength={200}
                    multiline={true}
                    onChangeText={(text) => handleOnChange(text, "bio")}
                    style={{
                      fontSize: 14,
                      fontStyle: "italic",
                      borderBottomWidth: 1,
                      borderColor: "#CDCDCD",
                      color: COLORS["gunmetal"],
                      paddingLeft: 10,
                    }}
                  />
                </View>
              </View>
            </ProgressStep>
            <ProgressStep
              label="Add Preferences"
              onNext={this.onNextStep}
              onPrevious={this.onPrevStep}
              nextBtnDisabled={incompleteDetails}
              scrollViewProps={this.defaultScrollViewProps}
              scrollable={true}
              nextBtnTextStyle={buttonTextStyle}
              previousBtnTextStyle={buttonTextStyle}
            >
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
                      borderWidth: 0.5,
                      borderColor: COLORS["bone"],
                      borderRadius: 0,
                      backgroundColor: COLORS["bone"],
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
                      borderWidth: 0.5,
                      borderColor: COLORS["bone"],
                      borderRadius: 0,
                      backgroundColor: COLORS["bone"],
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
                      borderWidth: 0.5,
                      borderColor: COLORS["bone"],
                      borderRadius: 0,
                      backgroundColor: COLORS["bone"],
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
                      borderWidth: 0.5,
                      borderColor: COLORS["bone"],
                      borderRadius: 0,
                      backgroundColor: COLORS["bone"],
                      borderBottomColor: "#CDCDCD",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View>
            </ProgressStep>

            <ProgressStep
              label="Save Profile"
              onPrevious={this.onPrevStep}
              onSubmit={() => {
                setUserData();
              }}
              scrollable={true}
              scrollViewProps={{
                showsVerticalScrollIndicator: false,
              }}
              nextBtnTextStyle={buttonTextStyle}
              previousBtnTextStyle={buttonTextStyle}
            >
              <View
                className="pt-8 pr-5 items-center justify-center"
                style={{
                  marginBottom: 240,
                }}
              >
                <Text className="text-dim-gray text-xl">You're all set!</Text>
                <Text className="text-dim-gray text-lg">
                  Your Details have been saved.
                </Text>
                <Text className="text-dim-gray text-lg">
                  Click Submit to start using the App!
                </Text>
              </View>
            </ProgressStep>
          </ProgressSteps>

          {/* Logout */}
          <View className="items-center pb-3">
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Notice",
                  "All data will be lost, do you want to log out?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => {
                        return null;
                      },
                    },
                    {
                      text: "Confrim",
                      onPress: () => {
                        signOut(navigation, false);
                      },
                    },
                  ]
                );
              }}
            >
              <View className="justify-between flex-row items-center">
                <MaterialCommunityIcons
                  name="exit-to-app"
                  size={20}
                  color={COLORS["battleship-gray"]}
                />
                <Text className="text-base text-battleship-gray ml-3">
                  Finish Later
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* End of logout */}
        </>
      )}
    </SafeAreaView>
  );
};

export default CompleteProfile;
