import AsyncStorageMock from "@react-native-async-storage/async-storage/jest/async-storage-mock";

const storageCache = {};

AsyncStorageMock.multiGet = jest.fn(([keys], callback) => {
  // do something here to retrieve data
  callback([]);
});

AsyncStorageMock.setItem = jest.fn((key, value) => {
  return new Promise((resolve, reject) => {
    storageCache[key] = value;
    resolve(null);
  });
});

AsyncStorageMock.getItem = jest.fn((key) => {
  return new Promise((resolve) => {
    resolve(storageCache[key] || null);
  });
});

export default AsyncStorageMock;
