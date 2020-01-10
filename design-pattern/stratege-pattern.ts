/**
 * Strategy-pattern:
 * Core:
 * 1. Separate a set of operations that implement different
 * but same semantics into separate classes,
 * but share the same parent class.
 * 2. Differ the operation selection to runtime and
 * passes the selection to the client end.
 *
 * Why:
 * 1. Open: Meaning if we add new operation, we could
 * implement new class, and then the client end could select it and use it,
 * rather than modify the `long switch case`
 *
 * 2. Subdivision complexity: Separate different implementation to
 * independent sub class
 *
 * When:
 * 1. A set of operations that implement different but same semantics
 * */
