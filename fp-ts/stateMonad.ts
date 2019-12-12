// `State monad` is use for represent a computation depend on a state and maybe mutate that state.
// But in functional programming, mutate is side effect and break the transparency reference,
// So we maintain that state explicitly, all computation depend on or mutate it
// should accept it as parameter and return it along with computation result;
// So, we ues form: (S)=>[S,A] to classify these computation, the `S` is state,
// the A is result of computation;
// Further more, the state monad provide some useful functions to
// enable us compose/construct that kind of computation more conveniently.

import * as fp from "fp-ts";
import * as assert from "assert";

/*construct a state monad*/

// the `of` function constructs a state monad which computation result `fixed`
const f = fp.state.of(1);
assert.deepEqual(f([]), [1, []]);

// the `get` function constructs a state monad which computation result `fixed` as passed state 
const f1 = fp.state.get()
assert.deepEqual()
/* --- */




































