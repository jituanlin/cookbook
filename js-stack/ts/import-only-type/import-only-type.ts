import type {Repository} from './class-definition';

declare const a: Repository;
a.find(1).then(console.log);
