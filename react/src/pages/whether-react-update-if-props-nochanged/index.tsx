/**
 * Parent component rendering will trigger children component.
 * Because by default, children component 's `shouldComponentUpdate` return true.
 * */
import React from "react";

export class WhetherReactUpdateIfPropsNoChanged extends React.Component<
  {},
  { n: number }
> {
  state = { n: 0 };

  componentDidMount() {
    setTimeout(() => {
      console.log("parent state will be changed");
      console.log("-----------------------------------");
      this.setState(({ n }) => ({ n: n + 1 }));
    }, 1000);
  }

  componentDidUpdate() {
    console.log("parent component has updated");
  }

  render() {
    console.log("parent component render");
    return (
      <div>
        <p>{this.state.n}</p>
        <Child />
      </div>
    );
  }
}

class Child extends React.Component<{}, {}> {
  render() {
    console.log("child component render");
    return <p>Child Component</p>;
  }

  componentDidUpdate() {
    console.log("child component has updated");
  }
}
