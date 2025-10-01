// 寵物模型系統
class Pet {
    constructor(name, type, rarity = 'common', stats = {}) {
        this.id = require('uuid').v4();
        this.name = name;
        this.type = type;
        this.rarity = rarity; // common, rare, epic, legendary
        this.level = 1;
        this.experience = 0;
        this.happiness = 100;
        this.energy = 100;
        this.stats = {
            attack: stats.attack || this.getBaseStat('attack'),
            defense: stats.defense || this.getBaseStat('defense'),
            speed: stats.speed || this.getBaseStat('speed'),
            cuteness: stats.cuteness || this.getBaseStat('cuteness')
        };
        this.abilities = this.generateAbilities();
        this.createdAt = new Date();
        this.lastFed = new Date();
    }

    getBaseStat(stat) {
        const rarityMultipliers = {
            common: 1,
            rare: 1.2,
            epic: 1.5,
            legendary: 2.0
        };
        
        const baseStats = {
            attack: Math.floor(Math.random() * 20) + 10,
            defense: Math.floor(Math.random() * 20) + 10,
            speed: Math.floor(Math.random() * 20) + 10,
            cuteness: Math.floor(Math.random() * 50) + 50
        };

        return Math.floor(baseStats[stat] * rarityMultipliers[this.rarity]);
    }

    generateAbilities() {
        const abilities = {
            common: ['撒嬌', '翻滾'],
            rare: ['撒嬌', '翻滾', '賣萌'],
            epic: ['撒嬌', '翻滾', '賣萌', '治癒術'],
            legendary: ['撒嬌', '翻滾', '賣萌', '治癒術', '超級可愛光波']
        };
        return abilities[this.rarity] || abilities.common;
    }

    feed() {
        this.happiness = Math.min(100, this.happiness + 10);
        this.energy = Math.min(100, this.energy + 15);
        this.lastFed = new Date();
        return `${this.name} 很開心地吃了食物！`;
    }

    play() {
        if (this.energy < 20) {
            return `${this.name} 太累了，需要休息！`;
        }
        this.happiness = Math.min(100, this.happiness + 15);
        this.energy -= 20;
        this.experience += 5;
        this.checkLevelUp();
        return `和 ${this.name} 一起玩得很開心！`;
    }

    rest() {
        this.energy = Math.min(100, this.energy + 30);
        return `${this.name} 睡得很香甜！`;
    }

    checkLevelUp() {
        const expNeeded = this.level * 50;
        if (this.experience >= expNeeded) {
            this.level++;
            this.experience -= expNeeded;
            this.levelUpStats();
            return true;
        }
        return false;
    }

    levelUpStats() {
        this.stats.attack += Math.floor(Math.random() * 5) + 1;
        this.stats.defense += Math.floor(Math.random() * 5) + 1;
        this.stats.speed += Math.floor(Math.random() * 5) + 1;
        this.stats.cuteness += Math.floor(Math.random() * 10) + 5;
    }

    getInfo() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            rarity: this.rarity,
            level: this.level,
            experience: this.experience,
            happiness: this.happiness,
            energy: this.energy,
            stats: this.stats,
            abilities: this.abilities,
            age: Math.floor((new Date() - this.createdAt) / (1000 * 60 * 60 * 24)) + 1
        };
    }
}

module.exports = Pet;