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

export default container;