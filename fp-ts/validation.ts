import * as fp from 'fp-ts';

const callService = async n => {
    if (n % 2 !== 0) {
        throw new Error(n);
    }
    return n;
};

const applicativeValidation = fp.taskEither.getTaskValidation(
    fp.array.getMonoid<Error>(),
);

const r = fp.pipeable.pipe(
    [1, 2, 3,4],
    fp.array.map(n =>
        fp.taskEither.tryCatch(() => callService(n), fp.function.identity),
    ),
    fp.array.map(fp.taskEither.mapLeft(fp.array.of)),
    // @ts-ignore
    xs => fp.apply.sequenceT(applicativeValidation)(...xs),
)();

r.then(x => console.log(x));
