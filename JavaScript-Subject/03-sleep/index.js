class PersonA {
    constructor(name) {
        this.name = name;
        this.sayName();
        this.rope = Promise.resolve();
    }
    sayName() {
        console.log(`Hello, ${this.name}`);
    }
    sleep(delay) {
        this.rope = this.rope.then(() => {
            return new Promise(function (resolve, reject) {
                setTimeout(() => {
                    resolve()
                }, delay * 1000);
            })
        })
        return this;
    }
    eat(food) {
        this.rope = this.rope.then(() => {
            console.log(`${this.name} eat ${food}`);
        })
        return this;
    }
}

new PersonA('txboy').sleep(3).eat('apple').sleep(5).eat('banana');


// class Person {
//     constructor(name) {
//         this.name = name;
//         this.sayName();
//     }
//     sayName() {
//         console.log(`Hello, ${this.name}`);
//     }
//     sleep(delay) {
//         this.rope = new Promise(function (resolve, reject) {
//             setTimeout(() => {
//                 resolve()
//             }, delay * 1000);
//         })
//         return this;
//     }
//     eat(food) {
//         this.rope = this.rope.then(() => {
//             console.log(`${this.name} eat ${food}`);
//         })
//         return this;
//     }
// }

// new Person('txboy').sleep(3).eat('apple').sleep(5).eat('banana');


