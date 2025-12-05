<p align="center">
    <img src="readme-assets/agency-logo.png" width="160">
</p>

# [Foxy - Vue 代理商登陸頁面](https://ryanbalieiro.github.io/vue-agency-landing-page-template/) 作者：Ryan Balieiro

**Foxy** 是一個使用 Vue3 建構的代理商登陸頁面主題。它包含多種內容區塊，包括作品集畫廊、客戶見證、服務展示、聯絡資訊等。

![alt tag1](readme-assets/foxy-promo.png)

主要特色：
- 使用 Vue3 **Composition API**。
- 輕量且完全響應式。
- 使用 Vite 進行打包。
- 使用 **EmailJS** 發送郵件 – 無需後端！
- 超級容易自訂！

## 線上預覽

查看模板的線上版本 **[這裡](https://ryanbalieiro.github.io/vue-agency-landing-page-template/)。**

### 1. 基礎佈局
主題結合了舒適的橙色色調與簡潔、極簡的深色和白色色調，營造出清新、現代的感覺。狐狸啟發的主題增添了迷人的觸感，創造出既吸引人又視覺上引人入勝的使用者介面。

![alt tag1](readme-assets/foxy-preview.png)

### 2. 桌面截圖
佈局採用居中視圖，頂部有側邊欄，完美適應不同的螢幕尺寸，從 4:3 顯示器到超寬顯示器。

![alt tag1](readme-assets/foxy-desktop.png)

### 3. 行動裝置截圖
在行動裝置上，導航列會壓縮並可切換，保持登陸頁面的流暢流程，區塊按順序排列。

![alt tag1](readme-assets/foxy-mobile.png)

## 開始使用 

1. 複製儲存庫：
```
git clone https://github.com/ryanbalieiro/vue-agency-landing-page-template
```

2. 進入專案的根目錄，使用 npm 安裝所有必需的元件：
```
npm install
```

3. 在開發模式下啟動專案：
```
npm run dev
```

4. 如果您想在調整主題期間暫時停用預載動畫，請前往 `src/composables/settings.js` 並修改以下欄位：

```js
const getLoaderEnabled = () => {
    return false
}
```

## 快速自訂

### 1. 快速自訂顏色

您可以快速自訂主題顏色以符合您的風格。只需存取 `src/scss/_variables.scss` 並調整顏色變數。例如，您可以透過更改這一行將主色從橙色改為藍色：

```scss
$primary: #07c5ee; /** 將主色改為藍色！ **/
$dark: #212529;
```

### 2. 更改應用程式內容
模板的內容可以透過編輯 `vue/content` 資料夾中的檔案輕鬆修改。 

在此資料夾中，您會找到：
- `Master.vue` – 在這裡您可以編輯導航列品牌以及頁尾資訊。
- `pages/` – 在這裡您可以調整應用程式頁面並根據需要重新排序區塊。
- `sections/` – 在這裡您可以修改應用程式區塊的內容。

### 3. 頁面
模板附帶三個預設頁面：首頁登陸頁面、隱私政策頁面和授權頁面。每個頁面在 `vue/content/pages` 資料夾中都有自己的檔案。要向模板添加新頁面：

- 在 `vue/content/pages` 資料夾中創建一個新的 `YourNewPage.vue` 檔案。
- 前往 `main.js` 並為新頁面添加路由。

要移除頁面，只需前往 `main.js` 並移除該頁面的路由。這將使該頁面無法存取。

### 4. 區塊
應用程式的每個頁面都包含一組區塊。要從頁面添加、重新排序或移除區塊，請開啟對應的頁面檔案並根據需要匯入或移除區塊。

例如：
```js
import AboutSection from "/src/vue/content/sections/AboutSection.vue"
import ServicesSection from "/src/vue/content/sections/ServicesSection.vue"

const sections = [
    new SectionInfo('about',    AboutSection,    'About',    'fa-solid fa-file'),
    new SectionInfo('services', ServicesSection, 'Services', 'fa-solid fa-wrench'),
    //(...)
]
```

每個區塊在 `vue/content/sections` 資料夾中都有自己的獨立檔案。要為應用程式創建新區塊，請遵循現有區塊的結構以保持一致性並確保模式得以保留。

### 5. 區塊內容
應用程式的每個區塊由一組文章組成。文章是用於顯示資訊區塊的通用元件。這些文章的實作可以在 `vue/components/articles` 資料夾中找到。

區塊元件的範例：

```vue
<PageSection variant="default" 
             :id="props.id">
    <PageSectionHeader title="My Section Title"
                       subtitle="This is my new section!"/>

    <PageSectionContent>
        <ArticleParagraph title="Article 1"
                          fa-icon="fa-solid fa-circle"
                          :description="[]"/>

        <ArticleParagraph title="Article 2"
                          fa-icon="fa-solid fa-circle"
                          :description="[]"/>
    </PageSectionContent>
</PageSection>
```

可用的區塊變體：
- `default` - 白色背景。
- `primary` - 橙色背景。
- `dark` - 灰色背景。
- `promo` - 帶有筆記型電腦圖片的背景。

要修改區塊的內容，只需開啟 `vue/content/sections` 資料夾中對應的檔案。從那裡，您可以根據需要添加、編輯或移除文章。 

要了解每個文章實作的工作原理，請參考現有的區塊檔案。

### 6. 聯絡表單配置

`ContactForm.vue` 元件整合了 `EmailJS`。EmailJS 是一項免費服務，允許您使用 JavaScript 發送電子郵件 - 無需後端。

要配置您的聯絡表單，請按照以下步驟操作：
- 創建一個 EmailJS 帳戶 (https://www.emailjs.com/)
- 在您的 EmailJS 帳戶面板中，創建一個電子郵件服務，該服務配置將發送電子郵件的提供者（例如，您的 Gmail 或 iCloud 帳戶）。
- 接下來，在您的儀表板上，創建一個新的電子郵件模板，如下所示：

```
You got a new message from {{from_name}} ({{from_email}}):

Subject: {{custom_subject}}

{{message}}
```

- 現在，在您的專案中開啟 `src/composables/settings.js` 並輸入您的 `EmailJS` 資訊：
```js
const getCredentialsForEmailJS = () => {
    return {
        publicKey: "YOUR_EMAIL_JS_PUBLIC_KEY",
        serviceId: "YOUR_EMAIL_JS_SERVICE_ID",
        templateId: "YOUR_EMAIL_JS_TEMPLATE_ID"
    }
}
```

- 完成了！現在您可以提交您的第一封電子郵件！

## 部署

### 1. Vite 配置
開啟 `vite.config.js` 並設定應用程式的基本目錄。此設定定義您的網站將託管在的主要路徑。

```js
export default defineConfig({
  base: '/vue-agency-landing-page-template/',
  plugins: [vue()],
})
```

簡單來說，如果您考慮 GitHub 在 URL `https://ryanbalieiro.github.io/vue-agency-landing-page-template/` 上託管此儲存庫的 GitHub Pages 網站，則要設定的正確基本目錄是 `/vue-agency-landing-page-template/`。

如果您要部署到 Netlify 或您自己的自訂網域，其中您的網站位於根目錄，您可以將 `base` 設定保留為 `'/'`。

### 2. 建置生產版本
要編譯您的專案以進行生產，請執行：

```
npm run build
``` 

此命令觸發一系列流程，打包您的程式碼、資源和其他必要的檔案，最終創建專案的生產就緒版本。執行命令後，您會在 `dist` 資料夾中找到編譯後的檔案。

### 3. 為 GitHub Pages 建置
如果您要部署到 GitHub Pages，請確保改為執行此自訂命令：

```
npm run ghdeploy
``` 

此命令建置您的應用程式，然後創建一個 `404.html` 檔案作為 `index.html` 的副本。這確保存取次要路由的使用者會被重新導向到您的應用程式，而不是看到 GitHub 的預設 404 頁面。

## 關於

此模板由 **[Ryan Balieiro](https://ryanbalieiro.com/)** 創建並維護。

它基於由 Mark Otto 和 Jacob Thorton 創建的 [Bootstrap](https://getbootstrap.com/) 框架；以及由 Evan You 創建的 [Vue](https://vuejs.org/) 框架。

使用的其他框架和插件包括：
- **Font Awesome**：免費向量圖示庫。
- **Swiper**：用於創建觸控滑桿的強大庫。
- **EmailJS**：允許您使用 JavaScript 發送電子郵件的免費服務。


## 版權和授權

程式碼在 [MIT](https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE) 授權下發布，提供完全的使用自由。歡迎增強和調整它以滿足您的需求。

哦...如果您喜歡這個模板，別忘了 **給它一個 ⭐** :)

