import type {Repository} from './ts-import-only-type-definition';

declare const a: Repository;
a.find(1).then(console.log);
