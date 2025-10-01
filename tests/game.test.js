// 🧪 寵物收集遊戲測試
const request = require('supertest');
const app = require('../backend/server');
const Pet = require('../backend/models/Pet');
const Player = require('../backend/models/Player');

describe('🐾 寵物收集遊戲 API 測試', () => {
    describe('健康檢查', () => {
        test('GET /api/health 應該返回服務狀態', async () => {
            const response = await request(app)
                .get('/api/health')
                .expect(200);
            
            expect(response.body.status).toBe('OK');
            expect(response.body.service).toBe('Pet Collector Game');
        });
    });

    describe('玩家管理', () => {
        test('POST /api/player/create 應該創建新玩家', async () => {
            const response = await request(app)
                .post('/api/player/create')
                .send({ playerName: '測試玩家' })
                .expect(200);
            
            expect(response.body.success).toBe(true);
            expect(response.body.player.name).toBe('測試玩家');
            expect(response.body.player.level).toBe(1);
            expect(response.body.player.coins).toBe(100);
        });

        test('POST /api/player/create 沒有名稱應該返回錯誤', async () => {
            const response = await request(app)
                .post('/api/player/create')
                .send({})
                .expect(400);
            
            expect(response.body.error).toBe('請輸入玩家名稱');
        });
    });

    describe('寵物抽取', () => {
        beforeEach(async () => {
            // 創建測試玩家
            await request(app)
                .post('/api/player/create')
                .send({ playerName: '抽卡測試玩家' });
        });

        test('POST /api/player/:name/gacha 應該抽取新寵物', async () => {
            const response = await request(app)
                .post('/api/player/抽卡測試玩家/gacha')
                .expect(200);
            
            expect(response.body.success).toBe(true);
            expect(response.body.pet).toBeDefined();
            expect(response.body.pet.name).toBeDefined();
            expect(['common', 'rare', 'epic', 'legendary']).toContain(response.body.pet.rarity);
        });
    });
});

describe('🐱 寵物模型測試', () => {
    test('應該創建基本寵物', () => {
        const pet = new Pet('測試貓咪', 'cat', 'common');
        
        expect(pet.name).toBe('測試貓咪');
        expect(pet.type).toBe('cat');
        expect(pet.rarity).toBe('common');
        expect(pet.level).toBe(1);
        expect(pet.happiness).toBe(100);
        expect(pet.energy).toBe(100);
    });

    test('餵食應該增加快樂度和精力', () => {
        const pet = new Pet('飢餓貓咪', 'cat');
        pet.happiness = 50;
        pet.energy = 30;
        
        const message = pet.feed();
        
        expect(pet.happiness).toBe(60);
        expect(pet.energy).toBe(45);
        expect(message).toContain('飢餓貓咪');
    });

    test('玩耍應該消耗精力但增加經驗', () => {
        const pet = new Pet('活潑狗狗', 'dog');
        const initialExp = pet.experience;
        const initialEnergy = pet.energy;
        
        const message = pet.play();
        
        expect(pet.energy).toBe(initialEnergy - 20);
        expect(pet.experience).toBe(initialExp + 5);
        expect(message).toContain('活潑狗狗');
    });

    test('精力不足時無法玩耍', () => {
        const pet = new Pet('疲憊兔子', 'rabbit');
        pet.energy = 10;
        
        const message = pet.play();
        
        expect(message).toContain('太累了');
        expect(pet.energy).toBe(10); // 精力不變
    });
});

describe('👤 玩家模型測試', () => {
    test('應該創建基本玩家', () => {
        const player = new Player('測試玩家');
        
        expect(player.name).toBe('測試玩家');
        expect(player.level).toBe(1);
        expect(player.coins).toBe(100);
        expect(player.gems).toBe(5);
        expect(player.pets).toHaveLength(0);
    });

    test('添加寵物應該增加經驗值', () => {
        const player = new Player('收集家');
        const pet = new Pet('新寵物', 'cat');
        const initialExp = player.experience;
        
        player.addPet(pet);
        
        expect(player.pets).toHaveLength(1);
        expect(player.experience).toBe(initialExp + 20);
        expect(player.statistics.petsCollected).toBe(1);
    });

    test('消費金幣應該正確扣除', () => {
        const player = new Player('購物者');
        
        const success = player.spendCoins(50);
        
        expect(success).toBe(true);
        expect(player.coins).toBe(50);
    });

    test('金幣不足時無法消費', () => {
        const player = new Player('窮人');
        player.coins = 10;
        
        const success = player.spendCoins(50);
        
        expect(success).toBe(false);
        expect(player.coins).toBe(10);
    });
});

// 運行測試的提示訊息
console.log('🧪 執行寵物遊戲測試套件...');
console.log('💡 使用指令: npm test');
console.log('🎯 或者: npm run test:watch (持續監控)');
console.log('🔍 單獨測試: npm run test:single -- --testNamePattern="寵物模型"');