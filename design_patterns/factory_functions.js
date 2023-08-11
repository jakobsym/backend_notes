/* Design Patterns */

// - Factory Function -
const personFactory = (name, age) => {
    const sayHello = () => console.log('hello!');
    return { name, age, sayHello };
  };
  
const henry = personFactory('jeff', 27);
  
console.log(henry.name); // 'jeff'
  
henry.sayHello(); // calls the function and logs 'hello!'

/* Little trick for logging values */
const uName = "Maynard";
const color = "red";
const number = 34;
const food = "rice";

// if you simply turn them into an object with brackets,
// the output is much easier to decipher:
console.log({uName, color, number, food});
// { uName: 'Maynard', color: 'red', number: 34, food: 'rice' }



// Factory Function Example:
const Player = (name, level) => {
    let health = level * 2;
    const getLevel = () => level;
    const getName  = () => name;
    const die = () => {
      // uh oh
    };
    const damage = x => {
      health -= x;
      if (health <= 0) {
        die();
      }
    };
    const attack = enemy => {
      if (level < enemy.getLevel()) {
        damage(1);
        console.log(`${enemy.getName()} has damaged ${name}`);
      }
      if (level >= enemy.getLevel()) {
        enemy.damage(1);
        console.log(`${name} has damaged ${enemy.getName()}`);
      }
    };
    return {attack, damage, getLevel, getName};
};
  
// Creation of 2 players using 'Player' Factory
const jimmie = Player('jim', 10);
const badGuy = Player('jeff', 5);
jimmie.attack(badGuy); // jim has damaged jeff


// Inheritance w/ Factories (You decide what gets inherited) 
const Person = (name) => {
    const sayName = () => console.log(`my name is ${name}`);
    const yellName = () => console.log(`MY NAME IS %s`, name.toUpperCase());
    return {sayName}; // I decide to return only 'sayName()'
}
  
const Nerd = (name) => {
// simply create a person and pull out the sayName function with destructuring assignment syntax!
    const {sayName} = Person(name);
    const doSomethingNerdy = () => console.log('nerd stuff');
    return {sayName, doSomethingNerdy};
}
  
const jeff = Nerd('jeff');
  
jeff.sayName(); // my name is jeff
jeff.doSomethingNerdy(); // nerd stuff

// Inheritance w/ Factotires cont. (Everything gets inherited)
const eNerd = (name) => {
    const prototype = Person(name);
    const doSomethingeNerdy = () => console.log('Im a nerd');

    return Object.assign({}, prototype, {doSomethingeNerdy});   // assigns all 'prototype' variables to 'eNerd' and returns 'eNerd' specfic functions
}

const billy = eNerd('billy');
billy.sayName(); // 'Person' specific function being called by an 'eNerd' object
billy.doSomethingeNerdy();