/**
 * `State monad` is used to represent a computation which depend on a state and may mutate that state.
 * But in functional programming, mutate is side effect and break the transparency reference.
 * So we maintain that state explicitly, all computation depend on or mutate it
 * should accept it as parameter and return it along with computation result.
 * So, we ues form: (S)=>[S,A] to classify those computation, the `S` is state, the A is result of computation.
 * Further more, the state monad provide some useful functions to
 * enable us compose/construct that kind of computation more conveniently.
 */
