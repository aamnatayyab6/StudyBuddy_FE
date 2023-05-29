import SenderMessage from "../../../../src/views/components/SenderMessage";
import { render } from "@testing-library/react-native";

describe("SenderMessage Component", () => {
  test("renders message and time correctly", () => {
    const message = {
      message: "Hi, I am fine.",
      time: "2023-05-24 21:28:28",
    };

    const { getByText } = render(
      <SenderMessage message={message} />
    );

    const messageText = getByText(message.message);
    expect(messageText).toBeTruthy();

    const formattedTime = getByText(
      // copying formatting from `SenderMessage` instead of importing
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
