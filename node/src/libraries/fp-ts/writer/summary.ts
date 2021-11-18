/**
 * Writer represents those calculations that not only return the result (denoted as "A") but also accumulate other values (denoted as "W").
 * Compare to state monad(quote from https://stackoverflow.com/questions/23942890/is-the-writer-monad-effectively-the-same-as-the-state-monad):
 * > The difference is that Writer is much more limited,
 * > in that it doesn't allow you to read the accumulated state
 * > (until you cash out at the end).
 * > The only thing you can perform with the state in a Writer is
 * > tack more stuff onto the end.
 * */
