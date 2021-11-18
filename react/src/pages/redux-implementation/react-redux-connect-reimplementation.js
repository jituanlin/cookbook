import React from "react";

export const DefaultContext = React.createContext();

export const connect = ({ mapStateToProps, mapDispatchToProps }) => (
  WrappedComponent
) => {
  return class ConnectedComponent extends React.Component {
    static contextType = DefaultContext;

    render() {
      return (
        <WrappedComponent
          {...mapStateToProps(this.context.getState(), this.props)}
          {...mapDispatchToProps(
            this.context.dispatch.bind(this.context),
            this.props
          )}
        />
      );
    }
    componentDidMount() {
      WrappedComponent.componentDidMount &&
        WrappedComponent.componentDidMount();
      this.unSubscribe = this.context.subscribe(() => this.forceUpdate());
    }
    componentWillUnmount() {
      this.unSubscribe();
    }
  };
};
