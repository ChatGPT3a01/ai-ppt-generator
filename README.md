<div align="center">

<img src="frontend/public/logo.png" width="120" alt="亮言 Logo">

# 亮言 · 一鍵成仙

**氛圍編程簡報生成器**

*Vibe Coding PPT Generator - Create stunning presentations with AI*

</div>

---

## ✨ 功能特色

- 🚀 **一句話生成 PPT** - 輸入想法，AI 自動生成完整簡報
- 📝 **自然語言修改** - 用口語化方式調整大綱和內容
- 🎨 **多種風格模板** - 8 種預設風格 + 自訂風格描述
- 📎 **智慧素材解析** - 支援 PDF/Word/PPT 等檔案上傳解析
- 🖼️ **框選區域編輯** - 對不滿意的區域進行局部修改
- 📤 **一鍵匯出** - 支援 PPTX 和 PDF 格式匯出
- ✨ **滑鼠粒子特效** - 可開關的視覺特效
- 🎵 **背景音樂播放器** - 內建 6 首 YouTube 音樂 + 自訂連結

---

## 🖥️ 系統需求

- **作業系統**：Windows 10/11
- **Python**：3.10 或更高版本
- **Node.js**：16+ 和 npm
- **套件管理器**：[uv](https://github.com/astral-sh/uv)
- **API 金鑰**：Google Gemini API 或 OpenAI API

---

## 📦 安裝部署教學

### Step 1️⃣ 下載專案

```bash
git clone https://github.com/ChatGPT3a01/ai-ppt-generator.git
cd ai-ppt-generator
```

---

### Step 2️⃣ 設定 PATH（讓 uv 指令生效）

在 PowerShell 中執行：

```powershell
$env:Path = "C:\Users\user\.local\bin;$env:Path"
```

> 💡 如果尚未安裝 uv，請先執行：
> ```powershell
> powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
> ```

---

### Step 3️⃣ 安裝 Python 依賴

```bash
cd D:\Anti\20260103002\banana-slides
uv sync
```

---

### Step 4️⃣ 配置環境變數

編輯 `.env` 檔案，設定你的 API Key：

```bash
notepad .env
```

**需要設定的關鍵項目：**

```env
# AI 提供商格式（二選一）
AI_PROVIDER_FORMAT=gemini    # 或 openai

# Gemini 格式配置（使用 Gemini 時設定）
GOOGLE_API_KEY=你的API金鑰

# OpenAI 格式配置（使用 OpenAI 時設定）
# OPENAI_API_KEY=你的API金鑰
```

---

### Step 5️⃣ 啟動後端（Flask）

```bash
cd backend
uv run alembic upgrade head
uv run python app.py
```

**✅ 成功畫面特徵：**
- 顯示 Flask 啟動訊息
- 出現網址：`http://localhost:5000`

> 📌 **這個終端請保持開啟！**

---

### Step 6️⃣ 啟動前端（React / Vite）

👉 **開新的終端機視窗**（或在編輯器中「分割終端機」）

```bash
cd D:\Anti\20260103002\banana-slides\frontend
npm install
npm run dev
```

**✅ 成功畫面特徵：**
- 顯示 Vite dev server 啟動
- 出現網址：`http://localhost:3000`

> 📌 **這個終端也請保持開啟！**

---

### Step 7️⃣ 開始使用

打開瀏覽器，進入：

👉 **http://localhost:3000**

**🎉 系統運作流程：**
```
前端（3000）→ 呼叫後端（5000）→ 後端呼叫 AI API（Gemini / OpenAI）
```

恭喜！亮言 · 一鍵成仙 正式跑起來了！

---

## 📖 使用教學

### 🎯 創建 PPT 的三種方式

#### 方式一：一句話生成
1. 在首頁選擇「一句話生成」
2. 輸入你的想法，例如：「生成一份關於 AI 發展史的演講 PPT」
3. 選擇風格模板（或使用文字描述風格）
4. 點擊「下一步」

#### 方式二：從大綱生成
1. 選擇「從大綱生成」
2. 貼上你的 PPT 大綱
3. AI 將自動切分為結構化大綱

#### 方式三：從描述生成
1. 選擇「從描述生成」
2. 貼上完整的頁面描述
3. AI 將直接生成圖片

### 🎨 選擇風格模板

提供 8 種預設風格：
- 簡約商務
- 現代科技
- 嚴謹學術
- 活潑創意
- 極簡清爽
- 高端奢華
- 自然清新
- 漸變活力

也可以開啟「使用文字描述風格」，自訂你想要的 PPT 風格。

### 📎 上傳參考檔案

支援的檔案格式：
- PDF、Word (.doc, .docx)
- PowerPoint (.ppt, .pptx)
- Excel (.xls, .xlsx)
- 文字檔案 (.txt, .md, .csv)

上傳方式：
1. 點擊輸入框左下角的迴紋針圖示
2. 或直接在輸入框中貼上檔案

### ✏️ 編輯和修改

- **大綱編輯**：可以拖拽排序、新增、刪除大綱項目
- **描述編輯**：可以手動修改每頁的詳細描述
- **AI 修改**：使用自然語言描述你想要的修改
- **框選編輯**：在預覽頁面框選區域進行局部修改

### 📤 匯出 PPT

1. 在預覽頁面點擊「匯出」按鈕
2. 選擇匯出格式：PPTX 或 PDF
3. 等待生成完成後下載

---

## ⚙️ 側邊欄功能

### 🎵 背景音樂播放器
- 6 首預設 YouTube 音樂（點擊數字按鈕播放）
- 支援自訂 YouTube 連結
- 點擊「停止」可關閉音樂

### ✨ 滑鼠粒子特效
- 在側邊欄可開啟/關閉
- 開啟後滑鼠移動會產生金黃色粒子效果
- 設定會自動儲存

### 📁 導航選單
- 創作中心：首頁
- 歷史專案：查看過去的專案
- 系統設定：配置 API 和其他參數

---

## ❓ 常見問題

### Q：支援免費的 Gemini API 嗎？
A：免費層級只支援文字生成，不支援圖片生成。需要付費版 API。

### Q：出現 503 錯誤怎麼辦？
A：通常是模型配置不正確，請檢查 `.env` 檔案中的 API 設定。

### Q：設定了 API Key 但不生效？
A：
1. 修改 `.env` 後需要重啟服務
2. 如果在網頁設定頁中設定過，會覆蓋 `.env`，可點「重置為預設配置」還原

### Q：生成的文字有亂碼？
A：可以嘗試在系統設定中調高圖像清晰度。

---

## 🙏 致謝

本專案基於 [banana-slides](https://github.com/Anionex/banana-slides) 進行繁體中文化和功能擴充。

感謝原作者 [@Anionex](https://github.com/Anionex) 的開源貢獻！

---

## 📄 授權聲明

### 📌 原專案來源

本專案由 [banana-slides](https://github.com/Anionex/banana-slides) 改作而成。

原專案採用 **CC BY-NC-SA 4.0** 協議開源，可自由用於個人學習、研究、試驗、教育或非商業用途。

感謝原作者 [@Anionex](https://github.com/Anionex) 的開源貢獻！

---

### 📌 本改作版本授權

**© 2026 阿亮老師 版權所有**

本專案僅供「**阿亮老師課程學員**」學習使用。

### ⚠️ 禁止事項：

- 🚫 禁止修改本專案內容
- 🚫 禁止轉傳或散布
- 🚫 禁止商業使用
- 🚫 禁止未經授權之任何形式使用

如有任何授權需求，請聯繫作者。

---

<div align="center">

**由阿亮老師製作 | 亮言 · 一鍵成仙**

[Facebook](https://www.facebook.com/iddmail?locale=zh_TW) · [YouTube](https://www.youtube.com/@Liang-yt02) · [3A科技實驗室](https://www.facebook.com/groups/2754139931432955?locale=zh_TW)

</div>
