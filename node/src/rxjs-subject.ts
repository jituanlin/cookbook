import {from, Observable, Subject} from 'rxjs';
import {multicast} from 'rxjs/operators';

/**
 * Subject is observable and observer
 * */

//subject is observable
const subject1 = new Subject();
subject1.subscribe(n => console.log(n));
subject1.next(1);

//subject is observer
const subject2 = new Subject();
subject2.subscribe(n => console.log(n));
const observable1 = from([1, 2, 3]);
observable1.subscribe(subject2);

/**
 * `normal` observable 's execution context is isolated,
 * but there is two ways to make a observable share execution context:
 *  1. subscribe a observable by a subject
 *  2. multicast it
 * */

const observable2 = new Observable(subscriber => {
    subscriber.next(Math.random());
    subscriber.complete();
});
observable2.subscribe(n => console.log(n));
observable2.subscribe(n => console.log(n));

const observable3 = new Observable(subscriber => {
    subscriber.next(Math.random());
    subscriber.complete();
});
const subject3 = new Subject();
subject3.subscribe(n => console.log(n)); // output two same number
subject3.subscribe(n => console.log(n));
observable3.subscribe(subject3);

const observable4 = new Observable(subscriber => {
    subscriber.next(Math.random());
    subscriber.complete();
});
const subject4 = new Subject();
const multicasted = observable4.pipe(multicast(subject4));
multicasted.subscribe(n => console.log(n));
multicasted.subscribe(n => console.log(n));
(multicasted as any).connect();

/**
 * reimplement Observable and Subject
 * */

interface Observe_<T> {
    complete?: () => void;
    next: (v: T) => void;
    error?: (e: Error) => void;
}

interface Subscription_ {
    unSubscribe: () => void;
}

interface Subscribable_<T> {
    subscribe: (ob: Observe_<T>) => Subscription_;
}

const noopSubscription: Subscription_ = {
    unSubscribe: () => {
    },
};

class Observable_<T> implements Subscribable_<T> {
    constructor(
        private readonly producer: (observe: Observe_<T>) => Subscription_
    ) {
    }

    subscribe(ob: Observe_<T>) {
        const subscription = this.producer(ob);
        return subscription;
    }
}

const observable11 = new Observable_(observe => {
    observe.next(1);
    return noopSubscription;
});

observable11.subscribe({
    next: n => console.log(n),
});

class Subject_<T> implements Observe_<T>, Subscribable_<T> {
    private observers: Observe_<T>[] = [];

    subscribe(ob: Observe_<T>): Subscription_ {
        const idx = this.observers.push(ob);
        return {
            unSubscribe: () => {
                this.observers = this.observers.splice(idx, 1);
            },
        };
    }

    next(v: T) {
        this.observers.forEach(ob => ob.next(v));
    }
}

const subject11 = new Subject_();
subject11.subscribe({next: n => console.log(n)});
subject11.next(42);

const subject12 = new Subject_();
subject12.subscribe({next: n => console.log(n)});
subject12.subscribe({next: n => console.log(n)});
const observable12 = new Observable_(ob => {
    ob.next(Math.random());
    return noopSubscription;
});
observable12.subscribe(subject12);

const multicast11 = <T>(observable: Observable_<T>, subject: Subject_<T>) => ({
    connect: () => observable.subscribe(subject),
    subscribe: subject.subscribe.bind(subject),
});
const observable13 = new Observable_(observe => {
    observe.next(44);
    return noopSubscription;
});
const subject13 = new Subject_();
const multicasted11 = multicast11(observable13, subject13);
multicasted11.subscribe({next: n => console.log(n)});
multicasted11.subscribe({next: n => console.log(n)});
multicasted11.connect();
