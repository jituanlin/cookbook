// `State monad` is use for represent a computation depend on a state and maybe mutate that state.
// But in functional programming, mutate is side effect and break the transparency reference,
// So we maintain that state explicitly, all computation depend on or mutate it
// should accept it as parameter and return it along with computation result;
// So, we ues form: (S)=>[S,A] to classify these computation, the `S` is state,
// the A is result of computation;
// Further more, the state monad provide some useful functions to
// enable us compose/construct that kind of computation more conveniently.

import * as fp from 'fp-ts';
import * as assert from 'assert';

/*construct a state monad*/

// the `of` function constructs a state monad which computation result `fixed`
const f = fp.state.of(1);
assert.deepEqual(f([]), [1, []]);

// the `get` function constructs a state monad which computation result `fixed` as passed state
const f1 = fp.state.get();
assert.deepEqual(f1(1), [1, 1]);

// the `put` function constructs a state monad which state be fixed by passed parameter
const f2 = fp.state.put(1);
assert.deepEqual(f2(3), [undefined, 1]);

// the `modify` function constructs a state monad which state be `modify` by passed function
const f3 = fp.state.modify((n: number) => n + 1);
assert.deepEqual(f3(4), [undefined, 5]);

// Like `of` function, but add modify behaviour
// The `gets` function constructs a state monad from a `a computation function`
// `The computation function` accept state as input, and output the computation result
// Maybe the most useful function to construct state monad?
const f4 = fp.state.gets((n: number) => n + 1);
assert.deepEqual(f4(3), [4, 3]);
/* --- */

/*run state monad
 * state monad just a computation depend on a state
 * So, it's `lazy`, we need to run it to get compute result
 * or final state
 * */

// get the compute result
const f5 = fp.state.gets((n: number) => n + 1);
assert.deepEqual(fp.state.evalState(f5, 1), 2);

// get the final state
const f6 = fp.state.gets((n: number) => n + 1);
assert.deepEqual(fp.state.execState(f6, 1), 1);

/* --- */

/* operation on state monad */

// the `map` operation modify the computation result and left state not touched
const t1 = fp.state.of<number, number>(1);
const f7 = fp.state.map((n: number) => n + 1)(t1);
assert.deepEqual(f7(20), [2, 20]);

// the `chain` operation could be use to driver new state monad
// from previous state monad's computation result and state
const t2 = fp.state.gets<number[], number>(ns => ns[ns.length - 1]);
const f8 = fp.state.chain((a: number) => (s: number[]) => [
  a + 1,
  s.concat(a + 1),
])(t2);
assert.deepEqual(f8([0]), [1, [0, 1]]);

/*the `ap` operation is apply a state monad `fab` of function(which response for generate new computation result)
to another state monad `fa`, the operation result is a new state monad
when the state monad be execution, following steps run:
1. apply the state to the `fab`
2. get the computation result f (function) and the new state
3. apply the new state to `fa`, get the computation result a2
and the new state s2
4. apply the `a2` to the f, get the result `a3`
return [a3,s2]

graph:
        state
         |  
        fab
      /    \
    a->b   a
    |      |
    |      fa
    |     | \
    \     a  s
     \ /     |  
     [b  ,  a]
     
usage:
sometimes, we need driving a computation (function) 
*then* the input value for that computation 
from state, so `ap`;
beware that for get that computation,
we maybe cause a new state, so the ordering is required,
driving computation first then value;
*/

/* --- */
