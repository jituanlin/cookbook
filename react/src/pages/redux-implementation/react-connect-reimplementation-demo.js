import {
  connect,
  DefaultContext,
} from "./react-redux-connect-reimplementation";
import React from "react";

const store = {
  state: {
    n: 42,
  },
  getState() {
    return this.state;
  },

  dispatch(action) {
    switch (action.type) {
      case "inc":
        this.state = {
          ...this.state,
          n: this.state.n + 1,
        };
        this.listeners.forEach((fn) => fn());
        return;
    }
  },

  listeners: [],

  subscribe(fn) {
    const idx = this.listeners.push(fn) - 1;
    return () => this.listeners.splice(idx, 1);
  },
};

class Content extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.n}</p>
        <button onClick={this.props.inc}>inc</button>
      </div>
    );
  }
}

const ConnectedContent = connect({
  mapStateToProps: ({ n }) => ({
    n,
  }),
  mapDispatchToProps: (dispatch) => ({
    inc: () => dispatch({ type: "inc" }),
  }),
})(Content);

export const ReactConnectReimplementation = () => {
  return (
    <DefaultContext.Provider value={store}>
      <ConnectedContent />
    </DefaultContext.Provider>
  );
};
