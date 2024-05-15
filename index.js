import inquirer from 'inquirer';
// Class for the hero character
class Hero {
    name;
    health;
    constructor(name) {
        this.name = name;
        this.health = 100; // Hero starts with full health
    }
    // Method to decrease hero's health
    decreaseHealth(amount) {
        this.health -= amount;
    }
    // Method to reset hero's health to full
    increaseHealth() {
        this.health = 100;
    }
}
// Class for the enemy character
class Enemy {
    name;
    health;
    constructor(name) {
        this.name = name;
        this.health = 100; // Enemy starts with full health
    }
    // Method to decrease enemy's health
    decreaseHealth(amount) {
        this.health -= amount;
    }
    // Method to reset enemy's health to full
    increaseHealth() {
        this.health = 100;
    }
}
// Main game function
async function main() {
    // Get hero's name from user input
    const { heroName } = await inquirer.prompt([{
            type: "input",
            name: "heroName",
            message: "Enter your Hero Name",
        }]);
    // Get enemy type from user input
    const { enemyType } = await inquirer.prompt([{
            type: "list",
            name: "enemyType",
            choices: ["Alien", "Witch", "Zombie"],
            message: "Select the enemy you fight with: "
        }]);
    // Create hero and enemy objects
    const hero = new Hero(heroName);
    const enemy = new Enemy(enemyType);
    console.log(`${enemy.name} v/s ${hero.name}`);
    // Game loop
    do {
        // Get action from user input
        const { action } = await inquirer.prompt([{
                type: "list",
                name: "action",
                choices: ["attack", "run", "defend", "range target"],
                message: "Choose the attack type to perform action",
            }]);
        // Perform action based on user input
        switch (action) {
            case "attack":
                // Determine if hero or enemy gets hit based on random chance
                const isHeroAttacking = Math.random() > 0.5;
                const damage = Math.floor(Math.random() * 20) + 10; // Random damage between 10 to 30
                if (isHeroAttacking) {
                    enemy.decreaseHealth(damage);
                    console.log(`You attacked ${enemy.name} and caused ${damage} damage!`);
                }
                else {
                    hero.decreaseHealth(damage);
                    console.log(`${enemy.name} attacked you and caused ${damage} damage!`);
                }
                break;
            // other cases...
        }
        // Display hero and enemy health after action
        console.log(`${hero.name} health: ${hero.health}`);
        console.log(`${enemy.name} health: ${enemy.health}`);
        // Check for victory or loss condition
        if (hero.health <= 0) {
            console.log("You Lost! Try Again");
            return;
        }
        else if (enemy.health <= 0) {
            console.log("Congratulations! You Win");
            return;
        }
    } while (true);
}
// Start the game
main();
