export class EventBus {
  private functionMap: Map<string, Function[]> = new Map();

  on(event: string, callBack: Function) {
    if (!this.functionMap.has(event)) {
      this.functionMap.set(event, [callBack]);
    } else {
      this.functionMap.get(event).push(callBack);
    }
  }

  emit(event: string, ...args: any[]) {
    let functions = this.functionMap.get(event);

    if (functions?.length > 0) {
      functions.forEach((f) => f.call(null, ...args));
    }
  }
}
