const immutable = require("immutable");

const state = [{ a: 1, b: { c: 4 } }, { a: 2, b: { c: 4 } }];

const newState = immutable
  .fromJS(state)
  .update(0, elm => elm.set("a", elm.get("a") + 42))
  .toJS();

const convertedState = immutable.fromJS(state);

const convertedNewState = convertedState.update(0, elm =>
  elm.set("a", elm.get("a") + 42)
);

console.log(
  convertedState.get(0).get("b") === convertedNewState.get(0).get("b"),
  convertedState.get(0).get("b"),
  convertedNewState.get(0).get("b")
);

console.log(convertedState, convertedNewState);