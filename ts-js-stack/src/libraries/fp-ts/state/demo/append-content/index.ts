import * as F from 'fp-ts3';

export const appendContent = F.function.pipe(
  F.state.gets((content: string) => content.split('\n').length),
  F.state.chain(lineCount => content => [lineCount + 1, content + '\n1'])
);
