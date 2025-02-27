
/// Event helper is based on Dropzone.js's Emitter class
// @see https://github.com/dropzone/dropzone/blob/main/src/emitter.js
export default class EventRegistry {

    constructor() {
        this._callbacks = {};
    }

    // Add an event listener for given event
    add(event, fn) {
        // Create namespace for this event
        if (!this._callbacks[event]) {
            this._callbacks[event] = [];
        }
        this._callbacks[event].push(fn);
        return this;
    }

    // Remove event listener for given event. If fn is not provided, all event
    // listeners for that event will be removed. If neither is provided, all
    // event listeners will be removed.
    remove(event, fn) {
        if (!this._callbacks || arguments.length === 0) {
            this._callbacks = {};
            return this;
        }

        // specific event
        let callbacks = this._callbacks[event];
        if (!callbacks) {
            return this;
        }

        // remove all handlers
        if (arguments.length === 1) {
            delete this._callbacks[event];
            return this;
        }

        // remove specific handler
        for (let i = 0; i < callbacks.length; i++) {
            let callback = callbacks[i];
            if (callback === fn) {
                callbacks.splice(i, 1);
                break;
            }
        }

        return this;
    }

    get(event) {
        // specific event
        let callbacks = this._callbacks[event];
        if (!callbacks) {
            return null;
        }

        return callbacks;
    }

    getAll() {
        return this._callbacks;
    }
}
