const obj = {};

(obj as any)[Symbol.iterator] = () => {
    let idx = 0;
    return {
        next() {
            if (idx > 3) {
                return {done: true};
            }
            return {
                done: false,
                value: idx++,
            };
        },
    };
};

for (const v of obj as any) {
    console.log(v);
}
