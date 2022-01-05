# Mingxiang

簡單且方便調整內容的形象網站

---

## 簡易設置

打開 [設定檔](./self.json) 檔案

並依照以下說明調整

| 欄位             | 說明                                          |
| ---------------- | --------------------------------------------- |
| logo             | 商標設定                                      |
| --text           | 圖標後的文字 (若需省略請輸入空字串`""`)       |
| --uri            | 圖標位置(專案位置 如: 註 2)                   |
| --alt            | 圖標說明                                      |
| contact          | 聯絡資訊                                      |
| --address        | 地址                                          |
| ----text         | 地址                                          |
| ----link         | 連結(例如: Google Maps)                       |
| --phone          | 連絡電話(加上國碼)                            |
| --email          | 電子信箱                                      |
| --author         | 版權聲明                                      |
| --scoial         | 社群                                          |
| ----uri          | 圖標資源                                      |
| ----alt          | 圖標說明                                      |
| ----link         | 圖標連結                                      |
| swiper           | 輪播圖設定                                    |
| --loopTime       | 輪播圖自動換張的等待時間(單位: 毫秒)          |
| --swiperDistence | 滑動輪播圖的距離判定(數值越小越靈敏 單位: px) |
| --limitWith      | 滑到底的延伸距離(單位: px)                    |
| --images         | 輪播圖的圖片資源, 請給予如預設值之物件(註 1)  |
| ----alt          | 圖片說明(若圖片顯示失敗)                      |
| ----uri          | 圖片的位置(註 2)                              |

> 註 1: 建議不要太多張, 約莫 2~5 張 且 大小約 2:1 及 圖片的重點位於中心處

> 註 2: 可用[imgur](https://imgur.com/)之類的圖床, 圖片若是要放在專案內 圖片請至於此 [這個資料夾](./src/assets), 且 路徑位置依照範例添加 (`assets/[圖片].[格式]`)

打開 [網頁](./src/index.html)

於第五行 將 `Mingxiang` 修改為網站名稱

```html
<title>Mingxiang</title>
```

並於第八行 將 `content="Mingxiang"` 中的 `Mingxiang` 修改成網站介紹的文字

```html
<meta name="description" content="Mingxiang" />
```

最後替換 [網頁圖標](./src/favicon.ico) 以相同的名稱直接替換

---
