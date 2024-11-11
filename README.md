# Memory Game
 
### ブラウザ上で動く記憶ゲーム (神経衰弱)
- 使用する技術
  - HTML
  - CSS
  - JavaScript
  - React
  - Node.js  
- 引用
  - いらすとや（ <https://www.irasutoya.com/2017/05/card.html> ）

### 初回起動時のセットアップ
- ブラウザで[Node.js](https://nodejs.org/en/)をインストール（`npm -v`でインストールされているか確認）
- PS ~\memory-game> `npm install react-scripts`
- package.jsonに以下を手動で追加．  
```json
"scripts": {
  "start": "react-scripts start"
}
```

### ブラウザの立ち上げ方（LinuxまたはmacOSの場合，一行目は不要）
- PS ~\memory-game> `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- PS ~\memory-game> `npm start`
