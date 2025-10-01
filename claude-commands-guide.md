# 🐾 Claude Code 指令實戰指南 - 寵物收集遊戲

這個寵物收集遊戲專案是專門設計來實戰演示所有 38 個 Claude Code 指令的使用場景！

## 🎮 專案介紹

**寵物收集遊戲**是一個有趣的全端 Web 遊戲：
- 🐱 收集各種可愛寵物 (貓咪、狗狗、倉鼠、甚至獨角獸！)
- ⭐ 4 種稀有度：普通、稀有、史詩、傳說
- 🎯 寵物養成：餵食、玩耍、升級
- 🏆 成就系統和玩家等級
- 💎 抽卡和商店系統

## 🚀 快速啟動

```bash
cd pet-collector-game
npm install
npm start
```

然後開啟瀏覽器訪問 `http://localhost:3000` 開始遊戲！

---

## 📋 38個 Claude Code 指令實戰場景

### **範例1：專案初始化與管理 (8個指令)**

```bash
# 1. 設定工作範圍
/add-dir C:\Users\Admin\pet-collector-game

# 2. 初始化專案文檔
/init

# 3. 查看專案狀態
/status

# 4. 查看工作上下文
/context

# 5. 設定 IDE 整合
/ide

# 6. 自訂狀態列
/statusline

# 7. 管理輸出樣式
/output-style

# 8. 創建新輸出樣式
/output-style:new
```

**實戰場景：**
- 使用 `/add-dir` 專注於前端或後端目錄
- 用 `/init` 創建專案說明文檔
- 透過 `/status` 監控開發環境

### **範例2：開發與除錯工作流 (8個指令)**

```bash
# 9. 管理待辦事項
/todos

# 10. 代碼審查
/review

# 11. 安全審查
/security-review

# 12. Git hooks 管理
/hook

# 13. 查看背景執行指令
/bashes

# 14. 回報問題
/bug

# 15. 預先註解
/pre-comments

# 16. VIM 模式
/vim
```

**實戰場景：**
- 用 `/todos` 追蹤遊戲功能開發進度
- 透過 `/review` 審查寵物系統代碼
- 使用 `/security-review` 檢查用戶數據安全
- 用 `/bashes` 監控服務器運行狀態

### **範例3：配置與代理工具 (8個指令)**

```bash
# 17. 打開配置面板
/config

# 18. 設定 AI 模型
/model

# 19. 管理代理工具
/agents

# 20. MCP 協議管理
/mcp

# 21. 工具權限管理
/permissions

# 22. 權限設定 (備用)
/premissions

# 23. 隱私設定
/privacy-settings

# 24. 查看發行說明
/release-notes
```

**實戰場景：**
- 使用 `/agents` 設定專案專用的寵物生成代理
- 透過 `/permissions` 限制某些開發工具的使用權限
- 用 `/config` 調整遊戲開發的個人化設定

### **範例4：對話與記憶管理 (7個指令)**

```bash
# 25. 清除對話歷史
/clear

# 26. 壓縮對話保留摘要
/compact "寵物系統開發完成"

# 27. 恢復對話
/resume

# 28. 匯出對話記錄
/export

# 29. 編輯 Claude 記憶
/memory

# 30. 查看使用費用
/cost

# 31. 獲取幫助
/help
```

**實戰場景：**
- 開發完寵物養成系統後用 `/compact` 保存進度摘要
- 使用 `/memory` 記住專案的特殊開發慣例
- 透過 `/cost` 監控開發過程中的 API 使用成本
- 用 `/export` 匯出重要的開發討論記錄

### **範例5：系統與帳戶管理 (7個指令)**

```bash
# 32. 登入帳戶
/login

# 33. 登出帳戶
/logout

# 34. 系統診斷
/doctor

# 35. 升級到 Max 版本
/upgrade

# 36. 安裝 GitHub 應用程式
/install-github-app

# 37. 遷移安裝版本
/migrate-installer

# 38. 退出 Claude
/exit
```

**實戰場景：**
- 用 `/doctor` 診斷開發環境問題
- 透過 `/install-github-app` 整合 GitHub 進行版本控制
- 使用 `/upgrade` 提升配額以支持大型遊戲專案開發

---

## 🎯 實際開發工作流範例

### **場景1：新功能開發**
```bash
/add-dir ./backend/models
/todos                          # 創建「添加新寵物種類」任務
/agents                         # 查看是否有寵物生成代理可用
# 開發新的寵物模型...
/review                         # 審查新代碼
/security-review               # 確保數據安全
/compact "新增龍系寵物完成"      # 保存進度
```

### **場景2：Bug 修復**
```bash
/add-dir ./frontend/js
/bug                           # 報告「寵物餵食動畫異常」
/bashes                        # 檢查伺服器日誌
# 修復代碼...
/todos                         # 更新任務狀態
/cost                          # 檢查修復過程的費用
```

### **場景3：部署準備**
```bash
/status                        # 確認整體狀態
/review                        # 最終代碼審查
/install-github-app           # 設定 CI/CD
/export                        # 匯出開發文檔
/compact "寵物遊戲 v1.0 完成"   # 完成里程碑
```

## 🎊 開始實戰！

1. **啟動遊戲**：`cd pet-collector-game && npm start`
2. **選擇場景**：從上述 5 個範例中選一個開始
3. **實際操作**：跟著指令一步步體驗
4. **自由探索**：創造你自己的指令組合！

**提示**：每個指令都在這個遊戲專案中有實際應用場景，讓學習更有趣更實用！