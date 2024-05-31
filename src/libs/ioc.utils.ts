import container from "./container";

export function getService<T>(serviceName: string): T {
    return container.get(serviceName) as T;
}