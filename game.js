const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
      name: "Leo",
      type: "Cat",
      companion: {
        name: "Frank",
        type: "Flea",
        belongings: ["small hat", "sunglasses"]
      }
    },
    roll(mod = 0) {
      const result = Math.floor(Math.random() * 20) + 1 + mod;
      console.log(`${this.name} rolled a ${result}.`);
    }
  };

  // Test adventurer roll method
adventurer.roll();

// Part 2: 
class Character {
    static MAX_HEALTH = 100;
  
    constructor(name) {
      this.name = name;
      this.health = Character.MAX_HEALTH;
      this.inventory = [];
    }
  
    roll(mod = 0) {
      const result = Math.floor(Math.random() * 20) + 1 + mod;
      console.log(`${this.name} rolled a ${result}.`);
      return result; // Return result for duel logic later
    }
  }
  
  // Create Robin as an instance of Character class
  const robin = new Character("Robin");
  robin.inventory = ["sword", "potion", "artifact"];
  robin.companion = new Character("Leo");
  robin.companion.type = "Cat";
  robin.companion.companion = new Character("Frank");
  robin.companion.companion.type = "Flea";
  robin.companion.companion.inventory = ["small hat", "sunglasses"];
  
  // Test rolling for Robin's companion
  robin.companion.roll();

  // Part 3: Class Features
class Adventurer extends Character {
    static ROLES = ["Fighter", "Healer", "Wizard"];
  
    constructor(name, role) {
      if (!Adventurer.ROLES.includes(role)) {
        throw new Error(`Invalid role: ${role}`);
      }
      super(name);
      this.role = role;
      this.inventory.push("bedroll", "50 gold coins");
    }
  
    scout() {
      console.log(`${this.name} is scouting ahead...`);
      super.roll();
    }
  
    duel(opponent) {
      console.log(`${this.name} is dueling ${opponent.name}!`);
  
      // Continue dueling until one player's health falls below 50
      while (this.health > 50 && opponent.health > 50) {
        const myRoll = this.roll();
        const oppRoll = opponent.roll();
        if (myRoll > oppRoll) {
          opponent.health -= 1;
          console.log(`${opponent.name} loses 1 health. Current health: ${opponent.health}`);
        } else {
          this.health -= 1;
          console.log(`${this.name} loses 1 health. Current health: ${this.health}`);
        }
      }
  
      const winner = this.health > 50 ? this.name : opponent.name;
      console.log(`${winner} wins the duel!`);
    }
  }
  
  // Create instances of Adventurer class
  const robinAdventurer = new Adventurer("Robin", "Fighter");
  const leoAdventurer = new Adventurer("Leo", "Wizard");
  
  // Test the scout method
  robinAdventurer.scout();
  leoAdventurer.scout();
  
  // Part 4: Class Uniforms
  // Robin and Leo duel each other
  robinAdventurer.duel(leoAdventurer);
  
  // Part 5: Factory
  class AdventurerFactory {
    constructor(role) {
      this.role = role;
      this.adventurers = [];
    }
  
    generate(name) {
      const newAdventurer = new Adventurer(name, this.role);
      this.adventurers.push(newAdventurer);
    }
  
    findByIndex(index) {
      return this.adventurers[index];
    }
  
    findByName(name) {
      return this.adventurers.find(a => a.name === name);
    }
  }
  
  // Create a factory for healers
  const healerFactory = new AdventurerFactory("Healer");
  healerFactory.generate("Lily");
  healerFactory.generate("Maya");
  
  console.log(healerFactory.findByName("Lily"));