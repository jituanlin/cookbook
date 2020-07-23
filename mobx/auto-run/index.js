const proxies = new WeakMap()
let currentDeps = []
const depsController = new WeakMap()
const stack = []

const bootstrap = () => {
	stack.forEach(fn => {
		fn()
		currentDeps.forEach(({obj, prop}) => {
			if (!depsController.has(obj)) {
				depsController.set(
					obj,
					new Map()
				)
			}

			if (!depsController.get(obj)
			                   .has(prop)) {
				depsController.get(obj)
				              .set(
					              prop,
					              []
				              )
			}

			depsController.get(obj)
			              .get(prop)
			              .push(fn)

		})
		currentDeps = []
	})

	currentDeps = []
}

const autoRun = fn => {
	stack.push(fn)
}

const bootstrapPromise = Promise.resolve()
                                .then(bootstrap)

const observable = target => {
	return new Proxy(
		target,
		{
			get(obj, prop) {
				currentDeps.push({
					                 obj,
					                 prop
				                 })
				return obj[prop]
			},
			set(obj, prop, val) {
				bootstrapPromise.then(() => {
					obj[prop] = val

					if (depsController.get(obj) && depsController.get(obj)
					                                             .get(prop)) {
						depsController.get(obj)
						              .get(prop)
						              .forEach(fn => fn())
					}
				})
			}
		}
	)

}


const obj = observable({a: 1})

autoRun(() => console.log(obj.a))


obj.b = 3

obj.a = 3