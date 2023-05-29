import { Image } from "expo-image";
import React, { useState } from "react";

const ImageComponent = ({ card }) => {
  const [imageSource, setImageSource] = useState(
    card?.photoUrl[0] === ""
      ? require("../../assets/images/profile_picture_placeholder.jpg")
      : { uri: `${card?.photoUrl[0]}` }
  );

  const handleImageError = () => {
    setImageSource(
      require("../../assets/images/profile_picture_placeholder.jpg")
    );
  };
  return (
    <Image
      testID="mock-Image"
      source={imageSource}
      onError={handleImageError}
      cachePolicy={"none"}
      className="absolute top-0 h-full w-full rounded-xl flex flex-shrink-1"
      style={{ contentFit: "contain" }}
    />
  );
};

export default ImageComponent;
