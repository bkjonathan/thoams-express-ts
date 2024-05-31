class Container{
    private services :{[key:string]:Object} = {};

    register(name:string, service:Object){
        this.services[name] = service;
    }

    get(name:string){
        const service = this.services[name];
        if(!service){
            throw new Error(`Service ${name} not found`);
        }
        return service;
    }
}

export default Container;