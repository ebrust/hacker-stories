import React from "react";
import renderer from "react-test-renderer";

// import InputWithLabel from "./InputWithLabel";

import InputWithLabel from "./index";

describe("InputWithLabel", () => {
  test("renders snapshot", () => {
    const component = renderer.create(
      <InputWithLabel id="1" value="a">
        Input with Label
      </InputWithLabel>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
