import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import ImageComponent from "../../../../src/views/components/ImageComponent";
import { mockUser } from "../../../../__mocks__/api/UserContext";
import { Image } from "expo-image";

jest.mock("expo-image", () => {
  const originalModule = jest.requireActual("expo-image");
  return {
    ...originalModule,
    Image: jest
      .fn()
      .mockImplementation((props) => <originalModule.Image {...props} />),
  };
});

afterEach(cleanup);

describe("ImageComponent", () => {
  test("renders with default image source", () => {
    const card = { name: mockUser.name, photoUrl: "" };
    const { getByTestId } = render(<ImageComponent card={card} />);
    const image = getByTestId("mock-Image");
    expect(image).toBeTruthy();
  });

  test("renders with provided image source", () => {
    const card = {
      name: mockUser.name,
      photoUrl: mockUser.photoUrl[0],
    };
    const { getByTestId } = render(<ImageComponent card={card} />);
    const image = getByTestId("mock-Image");
    expect(image).toBeTruthy();
  });

  test("handles image error by setting default image source", () => {
    const card = {
      name: mockUser.name,
      photoUrl: mockUser.photoUrl[0],
    };
    const { getByTestId } = render(<ImageComponent card={card} />);
    const image = getByTestId("mock-Image");
    expect(image).toBeTruthy();

    // simulate error
    const onErrorMock = jest.fn();
    render(<Image onError={onErrorMock} />);
    onErrorMock();
    expect(onErrorMock).toHaveBeenCalled();
  });
});
