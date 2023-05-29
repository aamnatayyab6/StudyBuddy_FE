/**
 * The code provides functions to store and retrieve data from AsyncStorage in React Native.
 * @param key - A string that serves as a unique identifier for the data being stored in AsyncStorage.
 * It is used to retrieve the data later on.
 * @param value - The data that needs to be stored in AsyncStorage. It can be of any data type, such as
 * a string, number, boolean, or object.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * The function stores data in AsyncStorage using a key-value pair.
 * @param key - The key is a string that serves as a unique identifier for the data being stored in
 * AsyncStorage. It is used to retrieve the data later on.
 * @param value - The value parameter is the data that needs to be stored in the AsyncStorage. It can
 * be of any data type, such as a string, number, boolean, or object.
 */
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

/**
 * This is an asynchronous function that retrieves data from AsyncStorage using a provided key.
 * @param key - The key parameter is a string that represents the key of the data that needs to be
 * retrieved from AsyncStorage.
 * @returns The function `getData` returns the value stored in AsyncStorage for the given key, if it
 * exists. If the value does not exist or there is an error, the function does not return anything.
 */
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};
