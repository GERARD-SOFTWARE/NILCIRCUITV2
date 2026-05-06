class Animal {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    }

    speak() {
        console.log(`${this.name} says ${this.sound}!`);
    }

    describe() {
        console.log(`I am an animal named ${this.name}.`)
    }
}

const dog = new Animal("Pappy", "Woof!")
const cat = new Animal("Scott", "Hungry!")

dog.speak();
cat.speak();
dog.describe();