// 🐾 寵物收集遊戲前端邏輯
let currentPlayer = null;
let playerPets = [];

// 初始化遊戲
document.addEventListener('DOMContentLoaded', function() {
    console.log('🐾 寵物收集遊戲已載入！');
    
    // 檢查是否有保存的玩家資料
    const savedPlayer = localStorage.getItem('petGamePlayer');
    if (savedPlayer) {
        document.getElementById('playerName').value = savedPlayer;
    }
});

// 創建玩家
async function createPlayer() {
    const playerName = document.getElementById('playerName').value.trim();
    if (!playerName) {
        showMessage('請輸入玩家名稱！', 'error');
        return;
    }

    try {
        const response = await fetch('/api/player/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playerName })
        });

        const data = await response.json();
        
        if (data.success) {
            currentPlayer = data.player;
            localStorage.setItem('petGamePlayer', playerName);
            showGameSection();
            showMessage(data.message);
            updatePlayerInfo();
            loadPlayerPets();
        } else {
            showMessage(data.error, 'error');
        }
    } catch (error) {
        showMessage('連接伺服器失敗！', 'error');
        console.error('Error:', error);
    }
}

// 顯示遊戲主界面
function showGameSection() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('gameSection').style.display = 'block';
    document.getElementById('playerInfo').style.display = 'block';
}

// 更新玩家資訊
function updatePlayerInfo() {
    if (currentPlayer) {
        document.getElementById('playerLevel').textContent = currentPlayer.level;
        document.getElementById('playerCoins').textContent = currentPlayer.coins;
        document.getElementById('playerGems').textContent = currentPlayer.gems;
        document.getElementById('petCount').textContent = currentPlayer.petsCount;
    }
}

// 載入玩家寵物
async function loadPlayerPets() {
    if (!currentPlayer) return;

    try {
        const response = await fetch(`/api/player/${currentPlayer.name}/pets`);
        const pets = await response.json();
        
        playerPets = pets;
        displayPets();
    } catch (error) {
        console.error('載入寵物失敗:', error);
    }
}

// 顯示寵物清單
function displayPets() {
    const petsList = document.getElementById('petsList');
    
    if (playerPets.length === 0) {
        petsList.innerHTML = '<p class="empty-message">還沒有寵物，快去抽取一隻吧！</p>';
        return;
    }

    petsList.innerHTML = '';
    playerPets.forEach(pet => {
        const petCard = createPetCard(pet);
        petsList.appendChild(petCard);
    });
}

// 創建寵物卡片
function createPetCard(pet) {
    const card = document.createElement('div');
    card.className = `pet-card ${pet.rarity}`;
    card.onclick = () => showPetDetails(pet);

    const rarityEmojis = {
        common: '⭐',
        rare: '✨',
        epic: '💎',
        legendary: '👑'
    };

    const typeEmojis = {
        cat: '🐱',
        dog: '🐶',
        hamster: '🐹',
        rabbit: '🐰',
        chinchilla: '🐭',
        fox: '🦊',
        unicorn: '🦄',
        phoenix: '🔥'
    };

    card.innerHTML = `
        <div class="pet-header">
            <div style="font-size: 3em; margin-bottom: 10px;">
                ${typeEmojis[pet.type] || '🐾'}
            </div>
            <div class="pet-name">${pet.name}</div>
            <div class="pet-type">等級 ${pet.level}</div>
            <span class="pet-rarity rarity-${pet.rarity}">
                ${rarityEmojis[pet.rarity]} ${pet.rarity.toUpperCase()}
            </span>
        </div>
        <div class="pet-stats">
            <div class="stat-bar">
                <span>❤️ 快樂度:</span>
                <span>${pet.happiness}/100</span>
            </div>
            <div class="stat-bar">
                <span>⚡ 精力:</span>
                <span>${pet.energy}/100</span>
            </div>
            <div class="stat-bar">
                <span>💪 攻擊力:</span>
                <span>${pet.stats.attack}</span>
            </div>
            <div class="stat-bar">
                <span>💖 可愛度:</span>
                <span>${pet.stats.cuteness}</span>
            </div>
        </div>
        <div class="pet-actions">
            <button class="btn" onclick="feedPet('${pet.id}', event)">🍖 餵食</button>
            <button class="btn" onclick="playWithPet('${pet.id}', event)">🎾 玩耍</button>
        </div>
    `;

    return card;
}

// 抽取寵物
async function drawPet() {
    if (!currentPlayer) return;

    try {
        const response = await fetch(`/api/player/${currentPlayer.name}/gacha`, {
            method: 'POST'
        });

        const data = await response.json();
        
        if (data.success) {
            currentPlayer = data.player;
            updatePlayerInfo();
            showMessage(`🎉 ${data.message}`);
            
            // 添加抽取動畫效果
            const egg = document.querySelector('.gacha-egg');
            egg.style.animation = 'none';
            setTimeout(() => {
                egg.style.animation = 'bounce 2s infinite';
                loadPlayerPets();
            }, 100);
        } else {
            showMessage(data.error, 'error');
        }
    } catch (error) {
        showMessage('抽取失敗！', 'error');
        console.error('Error:', error);
    }
}

// 餵食寵物
async function feedPet(petId, event) {
    event.stopPropagation();
    
    try {
        const response = await fetch(`/api/player/${currentPlayer.name}/pet/${petId}/feed`, {
            method: 'POST'
        });

        const data = await response.json();
        
        if (data.success) {
            currentPlayer = data.player;
            updatePlayerInfo();
            showMessage(data.message);
            loadPlayerPets();
        } else {
            showMessage(data.error, 'error');
        }
    } catch (error) {
        showMessage('餵食失敗！', 'error');
    }
}

// 和寵物玩耍
async function playWithPet(petId, event) {
    event.stopPropagation();
    
    try {
        const response = await fetch(`/api/player/${currentPlayer.name}/pet/${petId}/play`, {
            method: 'POST'
        });

        const data = await response.json();
        
        if (data.success) {
            currentPlayer = data.player;
            updatePlayerInfo();
            showMessage(data.message);
            loadPlayerPets();
        } else {
            showMessage(data.error, 'error');
        }
    } catch (error) {
        showMessage('玩耍失敗！', 'error');
    }
}

// 切換頁籤
function showTab(tabName) {
    // 隱藏所有頁籤內容
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // 移除所有按鈕的激活狀態
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });

    // 顯示選中的頁籤
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');

    // 特殊處理
    if (tabName === 'achievements') {
        loadAchievements();
    }
}

// 載入成就
function loadAchievements() {
    if (!currentPlayer) return;

    const achievementsList = document.getElementById('achievementsList');
    const allAchievements = [
        { id: 'first_pet', name: '初次收集', desc: '獲得第一隻寵物', icon: '🏆' },
        { id: 'pet_collector', name: '寵物收集家', desc: '收集 5 隻寵物', icon: '🎯' },
        { id: 'pet_master', name: '寵物大師', desc: '收集 20 隻寵物', icon: '👑' },
        { id: 'level_10', name: '十級玩家', desc: '達到等級 10', icon: '⭐' },
        { id: 'legendary_owner', name: '傳說收藏家', desc: '擁有傳說寵物', icon: '💎' }
    ];

    achievementsList.innerHTML = '';
    allAchievements.forEach(achievement => {
        const unlocked = currentPlayer.achievements.includes(achievement.id);
        const achievementDiv = document.createElement('div');
        achievementDiv.className = `achievement ${unlocked ? '' : 'locked'}`;
        achievementDiv.innerHTML = `
            <div style="font-size: 2em; margin-right: 15px;">${achievement.icon}</div>
            <div>
                <div style="font-weight: bold;">${achievement.name}</div>
                <div style="color: #666; font-size: 0.9em;">${achievement.desc}</div>
            </div>
            <div style="margin-left: auto;">
                ${unlocked ? '✅' : '🔒'}
            </div>
        `;
        achievementsList.appendChild(achievementDiv);
    });
}

// 顯示寵物詳情
function showPetDetails(pet) {
    const modal = document.getElementById('petModal');
    const details = document.getElementById('petDetails');
    
    const typeEmojis = {
        cat: '🐱', dog: '🐶', hamster: '🐹', rabbit: '🐰',
        chinchilla: '🐭', fox: '🦊', unicorn: '🦄', phoenix: '🔥'
    };

    details.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 4em; margin-bottom: 10px;">
                ${typeEmojis[pet.type] || '🐾'}
            </div>
            <h2>${pet.name}</h2>
            <p>等級 ${pet.level} | 已陪伴 ${pet.age} 天</p>
        </div>
        <div class="pet-details-stats">
            <h3>寵物狀態</h3>
            <div class="stat-bar"><span>❤️ 快樂度:</span><span>${pet.happiness}/100</span></div>
            <div class="stat-bar"><span>⚡ 精力:</span><span>${pet.energy}/100</span></div>
            <div class="stat-bar"><span>📈 經驗值:</span><span>${pet.experience}</span></div>
            
            <h3 style="margin-top: 20px;">戰鬥屬性</h3>
            <div class="stat-bar"><span>💪 攻擊力:</span><span>${pet.stats.attack}</span></div>
            <div class="stat-bar"><span>🛡️ 防禦力:</span><span>${pet.stats.defense}</span></div>
            <div class="stat-bar"><span>💨 速度:</span><span>${pet.stats.speed}</span></div>
            <div class="stat-bar"><span>💖 可愛度:</span><span>${pet.stats.cuteness}</span></div>
            
            <h3 style="margin-top: 20px;">特殊能力</h3>
            <div>${pet.abilities.join(', ')}</div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// 關閉寵物詳情對話框
function closePetModal() {
    document.getElementById('petModal').style.display = 'none';
}

// 顯示訊息
function showMessage(message, type = 'success') {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.className = `message-box ${type} show`;
    
    setTimeout(() => {
        messageBox.classList.remove('show');
    }, 3000);
}

// 點擊模態框外部關閉
window.onclick = function(event) {
    const modal = document.getElementById('petModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}