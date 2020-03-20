
let user = {
    name: 'txboy',
    age: 27
}

let proxy = new Proxy(user, {
    get(target, property) {
        let value = target[property];
        if (!value) {
            throw new Error(`The property [${property}] does not exist`);
        }
        return value;
    }
})

let printUser = (property) => {
    console.log(`The user ${property} is ${proxy[property]}`);
}

printUser('name');
printUser('age');