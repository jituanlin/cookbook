import {fromArray} from 'rxjs/internal/observable/fromArray';
import {fromPromise} from 'rxjs/internal-compatibility';
import {EventEmitter} from 'events';
import {fromEvent} from 'rxjs';

const observableFromArray = fromArray([1, 2, 3]);

/* log:
 1
 2
 3
 1
 2
 3
* */
observableFromArray.subscribe(console.log);
observableFromArray.subscribe(console.log);

const observableFromPromise = fromPromise(
  new Promise(resolve => setTimeout(() => resolve('done'), 1000))
);

/* log:
 by first subscribe test1
* */
const eventEmitter = new EventEmitter();
const observableFromEvent = fromEvent(eventEmitter, 'test');
observableFromEvent.subscribe(x => console.log('by first subscribe', x));
eventEmitter.emit('test', 'test1');
observableFromEvent.subscribe(x => console.log('by second subscribe', x));

/* log:
 done
 done
 * */
observableFromPromise.subscribe(console.log);
setTimeout(() => observableFromPromise.subscribe(console.log), 2000);
