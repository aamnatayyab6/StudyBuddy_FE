// __mocks__/api/UserContext.js
import React from "react";

// Define some mock data
const mockUser = {
  uid: "logged_in_user_id",
  name: "LoggedIn User",
  age: "23",
  email: "loggedinuser@gmail.com",
  bio: "Test Bio",
  InterestedSubjects: ["Test Subject1", "Test Subject2"],
  Language: ["Arabic"],
  Location: "Ajka",
  Major: "Finance and Accounting",
  University: "Academy of Drama and Film - SZFE",
  buddies: ["buddy_1_uid", "buddy_2_uid"],
  photoUrl: ["https://storage.googleapis.com/study-buddy-backend-de08a.appspot.com/profilePics/TC4f9YkYwFhB39chupBR5DAO0g33?GoogleAccessId=firebase-adminsdk-gjxpe%40study-buddy-backend-de08a.iam.gserviceaccount.com&Expires=16447017600&Signature=JKX%2B0dW6xU0qIsq%2FnxjHQChSYj9lZyyNM81Za698ZosGg2VWgU7vl8ZUYFtoXQAzh5KvMaERN0f%2F1IwoCzC4EflTnUa8Zwf1NRYGKg1dBBKGhu%2FHqhAv%2Bi4DRxQO6tdCCLdhwuLmohOp%2BHXKzgfdHuaD6NbmEdrgiWwH9J42IzgnOlWvR%2FN52SIaMGT1J%2FObxnk24ycbcaCRUEnNVwzS1BZy72ax4nHS%2BhdoZiMnsJoEHiwPs9c330D7wekKtgyeL4uOTFOWTOIiXY3w84%2BpwlW%2BLRH57xmzHjFXob0HBPb47340ylCJp%2BUkkQleIDiGkNUrnArIeMbrZlG%2Fk9aTGQ%3D%3D"],
  swipedThem: ["uid1", "uid2", "uid3", "uid4"],
  swipedMe: ["uid1", "uid2", "uid3", "uid4", "uid5", "uid6", "uid7"],
  messages: {
    "buddy_1_uid@gmail.com": "message_id_1",
    "buddy_2_uid@gmail.com": "message_id_2",
  },
  flag: true,
};

const mockBuddies = [
  {
    uid: "buddy_1_uid",
    name: "Buddy 1",
    age: "23",
    email: "buddy_1_uid@gmail.com",
    bio: "Test Bio",
    InterestedSubjects: ["Test Subject1", "Test Subject2"],
    Language: ["Arabic"],
    Location: "Ajka",
    Major: "Finance and Accounting",
    University: "Academy of Drama and Film - SZFE",
    buddies: ["buddy_1_uid", "buddy_2_uid"],
    photoUrl: ["<URL here>"],
    swipedThem: ["uid1", "uid2", "uid3", "uid4"],
    swipedMe: ["uid1", "uid2", "uid3", "uid4", "uid5", "uid6", "uid7"],
    messages: {
      "user1@example.com": "message_id_1",
      "user2@example.com": "message_id_2",
    },
    flag: true,
  },
  {
    uid: "buddy_2_uid",
    name: "Buddy 2",
    age: "23",
    email: "buddy_2_uid@gmail.com",
    bio: "Test Bio",
    InterestedSubjects: ["Test Subject1", "Test Subject2"],
    Language: ["Arabic"],
    Location: "Ajka",
    Major: "Finance and Accounting",
    University: "Academy of Drama and Film - SZFE",
    buddies: ["buddy_1_uid", "buddy_2_uid"],
    photoUrl: [
      "https://storage.googleapis.com/study-buddy-backend-de08a.appspot.com/profilePics/TC4f9YkYwFhB39chupBR5DAO0g33?GoogleAccessId=firebase-adminsdk-gjxpe%40study-buddy-backend-de08a.iam.gserviceaccount.com&Expires=16447017600&Signature=JKX%2B0dW6xU0qIsq%2FnxjHQChSYj9lZyyNM81Za698ZosGg2VWgU7vl8ZUYFtoXQAzh5KvMaERN0f%2F1IwoCzC4EflTnUa8Zwf1NRYGKg1dBBKGhu%2FHqhAv%2Bi4DRxQO6tdCCLdhwuLmohOp%2BHXKzgfdHuaD6NbmEdrgiWwH9J42IzgnOlWvR%2FN52SIaMGT1J%2FObxnk24ycbcaCRUEnNVwzS1BZy72ax4nHS%2BhdoZiMnsJoEHiwPs9c330D7wekKtgyeL4uOTFOWTOIiXY3w84%2BpwlW%2BLRH57xmzHjFXob0HBPb47340ylCJp%2BUkkQleIDiGkNUrnArIeMbrZlG%2Fk9aTGQ%3D%3D",
    ],
    swipedThem: ["uid1", "uid2", "uid3", "uid4"],
    swipedMe: ["uid1", "uid2", "uid3", "uid4", "uid5", "uid6", "uid7"],
    messages: {
      "user1@example.com": "message_id_1",
      "user2@example.com": "message_id_2",
    },
    flag: true,
  },
];

const mockUserData = [
  {
    uid: "1_user_id",
    name: "1 User",
    age: "23",
    email: "user_1@gmail.com",
    bio: "Test Bio",
    InterestedSubjects: ["Test Subject1", "Test Subject2"],
    Language: ["Arabic"],
    Location: "Ajka",
    Major: "Finance and Accounting",
    University: "Academy of Drama and Film - SZFE",
    buddies: ["buddy_1_uid", "buddy_2_uid"],
    photoUrl: [
      "https://storage.googleapis.com/study-buddy-backend-de08a.appspot.com/profilePics/TC4f9YkYwFhB39chupBR5DAO0g33?GoogleAccessId=firebase-adminsdk-gjxpe%40study-buddy-backend-de08a.iam.gserviceaccount.com&Expires=16447017600&Signature=JKX%2B0dW6xU0qIsq%2FnxjHQChSYj9lZyyNM81Za698ZosGg2VWgU7vl8ZUYFtoXQAzh5KvMaERN0f%2F1IwoCzC4EflTnUa8Zwf1NRYGKg1dBBKGhu%2FHqhAv%2Bi4DRxQO6tdCCLdhwuLmohOp%2BHXKzgfdHuaD6NbmEdrgiWwH9J42IzgnOlWvR%2FN52SIaMGT1J%2FObxnk24ycbcaCRUEnNVwzS1BZy72ax4nHS%2BhdoZiMnsJoEHiwPs9c330D7wekKtgyeL4uOTFOWTOIiXY3w84%2BpwlW%2BLRH57xmzHjFXob0HBPb47340ylCJp%2BUkkQleIDiGkNUrnArIeMbrZlG%2Fk9aTGQ%3D%3D",
    ],
    swipedThem: ["uid1", "uid2", "uid3", "uid4"],
    swipedMe: ["uid1", "uid2", "uid3", "uid4", "uid5", "uid6", "uid7"],
    messages: {
      "user1@example.com": "message_id_1",
      "user2@example.com": "message_id_2",
    },
    flag: true,
  },
  {
    uid: "2_user_id",
    name: "2 User",
    age: "23",
    email: "user_2@gmail.com",
    bio: "Test Bio",
    InterestedSubjects: ["Test Subject1"],
    Language: ["Arabic"],
    Location: "Ajka",
    Major: "Finance and Accounting",
    University: "Test University",
    buddies: ["buddy_1_uid", "buddy_2_uid", "buddy_3_uid"],
    photoUrl: [
      "https://storage.googleapis.com/study-buddy-backend-de08a.appspot.com/profilePics/TC4f9YkYwFhB39chupBR5DAO0g33?GoogleAccessId=firebase-adminsdk-gjxpe%40study-buddy-backend-de08a.iam.gserviceaccount.com&Expires=16447017600&Signature=JKX%2B0dW6xU0qIsq%2FnxjHQChSYj9lZyyNM81Za698ZosGg2VWgU7vl8ZUYFtoXQAzh5KvMaERN0f%2F1IwoCzC4EflTnUa8Zwf1NRYGKg1dBBKGhu%2FHqhAv%2Bi4DRxQO6tdCCLdhwuLmohOp%2BHXKzgfdHuaD6NbmEdrgiWwH9J42IzgnOlWvR%2FN52SIaMGT1J%2FObxnk24ycbcaCRUEnNVwzS1BZy72ax4nHS%2BhdoZiMnsJoEHiwPs9c330D7wekKtgyeL4uOTFOWTOIiXY3w84%2BpwlW%2BLRH57xmzHjFXob0HBPb47340ylCJp%2BUkkQleIDiGkNUrnArIeMbrZlG%2Fk9aTGQ%3D%3D",
    ],
    swipedThem: ["uid1", "uid2", "uid3", "uid4"],
    swipedMe: ["uid1", "uid2", "uid3", "uid4", "uid5", "uid6", "uid7", "uid8"],
    messages: {
      "user1@example.com": "message_id_1",
      "user2@example.com": "message_id_2",
    },
    flag: true,
  },
];

const mockSwipedData = ["uid1", "uid2", "uid3", "uid4"];

const mockLoading = false;

const mockIsLoggedIn = true;

const mockToken = "mock_token";

const UserContext = React.createContext({
  user: mockUser,
  buddies: mockBuddies,
  user_data: mockUserData,
  swipedData: mockSwipedData,
  loading: mockLoading,
  isLoggedIn: mockIsLoggedIn,
  token: mockToken,
  fetchUser: jest.fn(), // mock the function
  fetchBuddies: jest.fn(), // mock the function
  fetchAllOtherUsers: jest.fn(), // mock the function
});

export { mockUser, mockBuddies, mockToken, UserContext };
