import ReceiverMessage from "../../../../src/views/components/ReceiverMessage";
import { render } from "@testing-library/react-native";

describe("ReceiverMessage Component", () => {
  test("renders message and time correctly", () => {
    const message = {
      message: "Hello, how are you?",
      time: "2023-05-24 21:26:28",
    };
    const photoUrl = require("../../../../src/assets/images/profile_picture_placeholder.jpg");

    const { getByText } = render(
      <ReceiverMessage message={message} photoUrl={photoUrl} />
    );

    const messageText = getByText(message.message);
    expect(messageText).toBeTruthy();

    const formattedTime = getByText(
      // copying formatting from `ReceiverMessage` instead of importing
      new Date(message.time).toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
    expect(formattedTime).toBeTruthy();
  });
});
