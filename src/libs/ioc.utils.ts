import Container from "./ioc-container";
import services from "../container.ioc";

const container = new Container();

// Register each service with the IoC container
services.forEach(service => {
    try {
        container.register(service.name, service.provider);
    } catch (error:any) {
        console.error(`Failed to register service ${service.name}: ${error.message}`);
    }
});


export function getContainer<T>(serviceName: string): T {
    return container.get(serviceName) as T;
}

export default container;