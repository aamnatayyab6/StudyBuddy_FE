import Loader from "../../../../src/views/components/Loader";
import { render } from "@testing-library/react-native";

describe("Loader Component", () => {
  test("renders Loader component when visible prop is true", () => {
    const { getByTestId } = render(<Loader visible={true} />);
    const loaderComponent = getByTestId("loader");
    expect(loaderComponent).toBeTruthy();
  });

  test("does not render Loader component when visible prop is false", () => {
    const { queryByTestId } = render(<Loader visible={false} />);
    const loaderComponent = queryByTestId("loader");
    expect(loaderComponent).toBeNull();
  });
});
