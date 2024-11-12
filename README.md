# Memory Game
 
## ブラウザ上で動く記憶ゲーム (神経衰弱)
- 使用する技術
  - HTML
  - CSS
  - JavaScript
  - React
  - Node.js  
- 引用
  - いらすとや（ <https://www.irasutoya.com/2017/05/card.html> ）

## 初回起動時のセットアップ
1. ブラウザで[Node.js](https://nodejs.org/en/)をインストール（`npm -v`でインストールされているか確認）
 
2. react-scriptsをインストール
```shell
npm install react-scripts
```
 
3. package.jsonに以下を手動で追加  
```json
"scripts": {
  "start": "react-scripts start"
}
```

## ブラウザの立ち上げ方（LinuxまたはmacOSの場合，１は不要）
1. Powershellの実行ポリシーをRemoteSignedに変更
```shell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

2. Node.jsプロジェクトを開始
```
npm start
```
