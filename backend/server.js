// 🐾 寵物收集遊戲伺服器
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');

const Pet = require('./models/Pet');
const Player = require('./models/Player');

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件設置
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// 遊戲數據存儲 (簡化版，實際應用可用資料庫)
let gameData = {
    players: new Map(),
    petTemplates: []
};

// 載入寵物模板
function loadPetTemplates() {
    const templates = [
        { name: '小橘貓', type: 'cat', rarity: 'common' },
        { name: '柴犬', type: 'dog', rarity: 'common' },
        { name: '倉鼠', type: 'hamster', rarity: 'common' },
        { name: '波斯貓', type: 'cat', rarity: 'rare' },
        { name: '哈士奇', type: 'dog', rarity: 'rare' },
        { name: '垂耳兔', type: 'rabbit', rarity: 'rare' },
        { name: '緬因貓', type: 'cat', rarity: 'epic' },
        { name: '邊境牧羊犬', type: 'dog', rarity: 'epic' },
        { name: '龍貓', type: 'chinchilla', rarity: 'epic' },
        { name: '彩虹獨角獸', type: 'unicorn', rarity: 'legendary' },
        { name: '九尾狐', type: 'fox', rarity: 'legendary' },
        { name: '鳳凰', type: 'phoenix', rarity: 'legendary' }
    ];
    gameData.petTemplates = templates;
}

// 初始化遊戲
loadPetTemplates();

// API 路由

// 首頁
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 創建玩家
app.post('/api/player/create', (req, res) => {
    const { playerName } = req.body;
    if (!playerName) {
        return res.status(400).json({ error: '請輸入玩家名稱' });
    }

    const player = new Player(playerName);
    gameData.players.set(playerName, player);
    
    res.json({
        success: true,
        message: `歡迎加入寵物世界，${playerName}！`,
        player: player.getPlayerInfo()
    });
});

// 獲取玩家資訊
app.get('/api/player/:name', (req, res) => {
    const player = gameData.players.get(req.params.name);
    if (!player) {
        return res.status(404).json({ error: '找不到玩家' });
    }
    res.json(player.getPlayerInfo());
});

// 獲取玩家所有寵物
app.get('/api/player/:name/pets', (req, res) => {
    const player = gameData.players.get(req.params.name);
    if (!player) {
        return res.status(404).json({ error: '找不到玩家' });
    }
    res.json(player.getAllPets());
});

// 抽取新寵物
app.post('/api/player/:name/gacha', (req, res) => {
    const player = gameData.players.get(req.params.name);
    if (!player) {
        return res.status(404).json({ error: '找不到玩家' });
    }

    if (!player.spendGems(1)) {
        return res.status(400).json({ error: '寶石不足！' });
    }

    // 抽取邏輯
    const rand = Math.random();
    let rarity;
    if (rand < 0.5) rarity = 'common';
    else if (rand < 0.8) rarity = 'rare';
    else if (rand < 0.95) rarity = 'epic';
    else rarity = 'legendary';

    const availablePets = gameData.petTemplates.filter(t => t.rarity === rarity);
    const template = availablePets[Math.floor(Math.random() * availablePets.length)];
    
    const newPet = new Pet(template.name, template.type, template.rarity);
    const message = player.addPet(newPet);

    res.json({
        success: true,
        message,
        pet: newPet.getInfo(),
        player: player.getPlayerInfo()
    });
});

// 餵食寵物
app.post('/api/player/:name/pet/:petId/feed', (req, res) => {
    const player = gameData.players.get(req.params.name);
    if (!player) {
        return res.status(404).json({ error: '找不到玩家' });
    }

    const pet = player.getPet(req.params.petId);
    if (!pet) {
        return res.status(404).json({ error: '找不到寵物' });
    }

    if (!player.useItem('food')) {
        return res.status(400).json({ error: '食物不足！' });
    }

    const message = pet.feed();
    player.gainExperience(5);

    res.json({
        success: true,
        message,
        pet: pet.getInfo(),
        player: player.getPlayerInfo()
    });
});

// 和寵物玩耍
app.post('/api/player/:name/pet/:petId/play', (req, res) => {
    const player = gameData.players.get(req.params.name);
    if (!player) {
        return res.status(404).json({ error: '找不到玩家' });
    }

    const pet = player.getPet(req.params.petId);
    if (!pet) {
        return res.status(404).json({ error: '找不到寵物' });
    }

    const message = pet.play();
    player.gainExperience(10);
    player.statistics.gamesPlayed++;

    res.json({
        success: true,
        message,
        pet: pet.getInfo(),
        player: player.getPlayerInfo()
    });
});

// 健康檢查
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'Pet Collector Game',
        players: gameData.players.size,
        petTemplates: gameData.petTemplates.length,
        timestamp: new Date().toISOString()
    });
});

// 錯誤處理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '伺服器錯誤' });
});

// 404 處理
app.use((req, res) => {
    res.status(404).json({ error: '找不到頁面' });
});

// 啟動伺服器
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🐾 寵物收集遊戲伺服器運行在 http://localhost:${PORT}`);
        console.log('📱 開啟瀏覽器開始收集可愛寵物吧！');
    });
}

module.exports = app;