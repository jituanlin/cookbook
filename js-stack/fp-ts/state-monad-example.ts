import * as F from 'fp-ts3';

const main = () => {
  F.function.pipe(
    F.state.gets((content: string) => content.split('\n').length),
    F.state.chain(lineCount => content => [lineCount + 1, content + '\n1']),
    F.state.execute(''),
    console.log
  );
};

// log: `\n 1`
main();
