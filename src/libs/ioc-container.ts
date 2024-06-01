// src/libs/ioc-container.ts
class Container {
  private static instance: Container;
  private services: Map<string, any> = new Map();
  private constructor() {}

  static getInstance() {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  register(name: string, instance: Object) {
    if (!name || !instance) {
      throw new Error('Service name and service object must be provided');
    }
    this.services.set(name, instance);
  }

  get(name: string) {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found`);
    }
    return service;
  }
}

export default Container;
