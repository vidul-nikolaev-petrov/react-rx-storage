import Rx from 'rxjs/Rx';

const store = {
    subscribe(component) {
        const route = this.getName(component);

        this.$[route.comp] = component; // new react context

        if (!this.$[route.store]) {
            this.$[route.store] = {};
            this.$[route.subject] = new Rx.Subject();
            this.$[route.subject].subscribe(
                value => {
                    const key = value.key || value.errorKey;
                    const val = value.value;

                    this.$[route.store][key] = this.assignVal(val);

                    if (value.globally) {
                        this.$$[key] = this.$[route.store][key];
                    }
                }
            );
        }
    },
    complete(component) {
        // @TODO cleanup
    },
    dispatch(component, key, value, cbs={}) {
        const { comp, subject } = this.getName(component);
        const errorKey = `error$${key}`;
        const globally = cbs.globally;
        const rxVal = this.isObject(value) ? value : [value];

        const isCbGiven = fn => {
            if (this.isObject(fn)) {
                fn.__given = true;
                return fn;
            }
        };

        const processResult = (fn, value) => {
            const result = fn(value);
            return fn.__given ? result : value;
        };

        cbs.onSuccess = isCbGiven(cbs.onSuccess) || (value => {
            this.$[comp].setState({ [key]: value });
            return value;
        });

        cbs.onError = isCbGiven(cbs.onError) || (error => {
            this.$[comp].setState({ [errorKey]: error.message });
            return error;
        });
        
        cbs.onComplete = isCbGiven(cbs.onComplete) || (() => {});

        return Rx.Observable.from(rxVal)
            .subscribe(
                value => this.$[subject].next({ globally, key,
                    value: processResult(cbs.onSuccess, value)
                }),
                error => this.$[subject].next({ globally, errorKey,
                    value: processResult(cbs.onError, value)
                }),
                comlpete => cbs.onComplete(value)
            );
    },
    dispatchOnce(...args) {
        const subscription = this.dispatch(...args);
        setTimeout(subscription.unsubscribe);
    },
    get(component, key) {
        const { store } = this.getName(component);
        return this.$[store][key];
    },
    getGlobal(key) {
        return this.$$[key];
    },
    getName(component) {
        var comp = component.constructor.name;
        const store = '$' + comp; // this store component's namespace
        const subject = 'subject$' + comp; // Rx subject's identifier
        comp = 'component' + store; // React component's indetifier
        return { comp, store, subject };
    },
    isObject(val) {
        return val !== null && ['function', 'object'].includes(typeof val);
    },
    assignVal(val) {
        return this.isObject(val) ? Object.assign({}, val) : val;
    }
};

export { store as default };

(function initStore() {
    store.$ = {};
    store.$$ = {};
})();
