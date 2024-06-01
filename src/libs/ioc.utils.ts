import Container from './ioc-container';
import services from '../container.ioc';

// const container = new Container();
const container = Container.getInstance();

// Register each service with the IoC container
services.forEach((service) => {
  try {
    container.register(service.name, service.provider);
  } catch (error: any) {
    console.error(
      `Failed to register service ${service.name}: ${error.message}`,
    );
  }
});

export function containerResolve<T>(serviceName: string): T {
  return container.get(serviceName) as T;
}

export function Injectable() {
  return (constructor: any) => {
    const name = constructor.name;
    const instance = new constructor();

    const container = Container.getInstance();
    container.register(name, instance);
  };
}
export default container;
