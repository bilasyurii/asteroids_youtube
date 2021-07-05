export default class Observable {
  constructor() {
    this._subscribers = [];
  }

  subscribe(callback, context) {
    this._subscribers.push({
      callback,
      context,
    });
    return this;
  }

  unsubscribe(callback, context) {
    const subscribers = this._subscribers;
    const count = subscribers.length;
    
    for (let i = 0; i < count; ++i) {
      const subscriber = subscribers[i];
      if (subscriber.callback === callback && subscriber.context === context) {
        subscribers.splice(i, 1);
        return this;
      }
    }

    return this;
  }

  post() {
    const subscribers = this._subscribers;
    const count = subscribers.length;
    
    for (let i = 0; i < count; ++i) {
      const subscriber = subscribers[i];
      subscriber.callback.call(subscriber.context, ...arguments);
    }

    return this;
  }
}
