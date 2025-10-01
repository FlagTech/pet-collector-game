// 玩家模型系統
class Player {
    constructor(name) {
        this.name = name;
        this.level = 1;
        this.experience = 0;
        this.coins = 100;
        this.gems = 5;
        this.pets = [];
        this.inventory = {
            food: 10,
            toys: 3,
            potions: 1
        };
        this.achievements = [];
        this.statistics = {
            petsCollected: 0,
            totalPlayTime: 0,
            foodUsed: 0,
            gamesPlayed: 0
        };
        this.createdAt = new Date();
        this.lastLogin = new Date();
    }

    addPet(pet) {
        this.pets.push(pet);
        this.statistics.petsCollected++;
        this.gainExperience(20);
        this.checkAchievements();
        return `恭喜！您獲得了新寵物：${pet.name} (${pet.type})！`;
    }

    removePet(petId) {
        const index = this.pets.findIndex(pet => pet.id === petId);
        if (index === -1) return false;
        
        const pet = this.pets[index];
        this.pets.splice(index, 1);
        return `${pet.name} 已被釋放到野外！`;
    }

    getPet(petId) {
        return this.pets.find(pet => pet.id === petId);
    }

    getAllPets() {
        return this.pets.map(pet => pet.getInfo());
    }

    gainExperience(amount) {
        this.experience += amount;
        this.checkLevelUp();
    }

    checkLevelUp() {
        const expNeeded = this.level * 100;
        if (this.experience >= expNeeded) {
            this.level++;
            this.experience -= expNeeded;
            this.coins += 50;
            this.gems += 2;
            return {
                levelUp: true,
                newLevel: this.level,
                reward: { coins: 50, gems: 2 }
            };
        }
        return { levelUp: false };
    }

    spendCoins(amount) {
        if (this.coins >= amount) {
            this.coins -= amount;
            return true;
        }
        return false;
    }

    spendGems(amount) {
        if (this.gems >= amount) {
            this.gems -= amount;
            return true;
        }
        return false;
    }

    addCoins(amount) {
        this.coins += amount;
    }

    addGems(amount) {
        this.gems += amount;
    }

    useItem(itemType) {
        if (this.inventory[itemType] > 0) {
            this.inventory[itemType]--;
            this.statistics[itemType + 'Used']++;
            return true;
        }
        return false;
    }

    addItem(itemType, amount = 1) {
        this.inventory[itemType] = (this.inventory[itemType] || 0) + amount;
    }

    checkAchievements() {
        const newAchievements = [];

        // 收集成就
        if (this.statistics.petsCollected === 1 && !this.achievements.includes('first_pet')) {
            newAchievements.push('first_pet');
        }
        if (this.statistics.petsCollected === 5 && !this.achievements.includes('pet_collector')) {
            newAchievements.push('pet_collector');
        }
        if (this.statistics.petsCollected === 20 && !this.achievements.includes('pet_master')) {
            newAchievements.push('pet_master');
        }

        // 等級成就
        if (this.level === 10 && !this.achievements.includes('level_10')) {
            newAchievements.push('level_10');
        }

        // 稀有度成就
        const legendaryPets = this.pets.filter(pet => pet.rarity === 'legendary');
        if (legendaryPets.length >= 1 && !this.achievements.includes('legendary_owner')) {
            newAchievements.push('legendary_owner');
        }

        this.achievements.push(...newAchievements);
        return newAchievements;
    }

    getPlayerInfo() {
        return {
            name: this.name,
            level: this.level,
            experience: this.experience,
            coins: this.coins,
            gems: this.gems,
            petsCount: this.pets.length,
            inventory: this.inventory,
            achievements: this.achievements,
            statistics: this.statistics,
            daysSinceJoined: Math.floor((new Date() - this.createdAt) / (1000 * 60 * 60 * 24)) + 1
        };
    }
}

module.exports = Player;