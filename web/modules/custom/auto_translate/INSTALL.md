# Auto Translate Module - 快速安装指南

## 步骤 1: 启用模块

1. 前往 Drupal 后台：`/admin/modules`
2. 找到 "Auto Translate" 模块（在 Custom 分类下）
3. 勾选模块
4. 点击 "Install" 按钮

## 步骤 2: 配置 Google Translate API

### 2.1 获取 API 密钥（免费配额说明）

**重要：Google Cloud Translation API 提供免费配额！**

✅ **每月免费配额：500,000 字符**
- 前 500,000 字符完全免费
- 超出后按 $20/百万字符计费
- 对于大多数小型网站，免费配额已经足够使用

⚠️ **注意事项：**
- 需要 Google 账户（Gmail 账户即可）
- 需要绑定信用卡进行验证（但免费额度内不会扣费）
- 可以设置预算警报，避免意外费用

### 2.2 详细获取步骤

1. **注册 Google Cloud 账户**
   - 访问 [Google Cloud Console](https://console.cloud.google.com/)
   - 使用您的 Gmail 账户登录
   - 接受服务条款

2. **创建项目（免费）**
   - 点击顶部项目选择器
   - 点击 "New Project"
   - 输入项目名称（例如：my-translation-project）
   - 点击 "Create"

3. **启用 Cloud Translation API（重要！）**
   - 前往 "APIs & Services" > "Library"
   - 搜索 "Cloud Translation API" 或 "Cloud Translation API (Basic)"
   - 点击进入 API 详情页面
   - 点击 "Enable" 按钮启用 API
   - ⚠️ **如果看到错误提示 API 未启用，请直接访问：**
     `https://console.developers.google.com/apis/api/translate.googleapis.com/overview?project=YOUR_PROJECT_ID`
     （将 YOUR_PROJECT_ID 替换为您的项目 ID）
   - 启用后，等待几分钟让更改生效

4. **创建 API 密钥**
   - 前往 "APIs & Services" > "Credentials"
   - 点击 "Create Credentials" > "API Key"
   - 复制生成的 API 密钥
   - （可选）点击 "Restrict Key" 限制 API 密钥只能用于 Translation API

5. **设置预算警报（推荐）**
   - 前往 "Billing" > "Budgets & alerts"
   - 创建预算，设置 $0 或 $1 作为上限
   - 这样即使超出免费配额也会收到通知

### 2.3 在 Drupal 中配置

1. 前往 `/admin/config/services/auto-translate`
2. 将 Google Translate API 密钥粘贴到 "Google Translate API Key" 字段
3. 点击 "Save configuration"

## 步骤 3: 使用翻译功能

1. 编辑任何节点（例如：`/node/123/edit`）
2. 在编辑表单底部，您会看到两个按钮：
   - **Translate to TC (繁體)** - 翻译为繁体中文
   - **Translate to SC (簡體)** - 翻译为简体中文
3. 点击其中一个按钮，等待翻译完成
4. 翻译完成后，会出现 "Save Translation" 按钮
5. 点击 "Save Translation" 保存翻译后的内容

## 费用说明

### 免费配额
- ✅ **每月前 500,000 字符完全免费**
- ✅ 对于大多数内容管理系统，这个配额已经足够
- ✅ 例如：一篇 1000 字的文章 = 约 1000 字符，可以免费翻译 500 篇文章/月

### 超出免费配额后
- 💰 超出后按 **$20/百万字符** 计费
- 💰 例如：翻译 100 万字 = 约 $20
- 💡 建议：设置预算警报，避免意外费用

### 如何查看使用量
1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 选择您的项目
3. 前往 "APIs & Services" > "Dashboard"
4. 查看 "Cloud Translation API" 的使用量统计

## 注意事项

- 确保您有编辑节点的权限
- Google Translate API 提供每月 500,000 字符的免费配额
- 翻译质量取决于 Google Translate API
- 支持从英文、简体中文、繁体中文之间的互相翻译
- 建议设置预算警报以避免意外费用

## 故障排除

### 翻译按钮不显示
- 确保您在节点编辑页面
- 检查模块是否已启用
- 清除 Drupal 缓存：`drush cr` 或前往 `/admin/config/development/performance`

### 翻译失败

#### 错误：403 Forbidden - "Cloud Translation API has not been used... or it is disabled"
**这是最常见的问题！** 表示 API 未启用。

**解决方法：**
1. 访问 Google Cloud Console：https://console.cloud.google.com/
2. 选择您的项目（项目 ID 会在错误信息中显示，例如：736297923478）
3. 前往 "APIs & Services" > "Library"
4. 搜索 "Cloud Translation API"
5. 点击进入，然后点击 "Enable" 按钮
6. 或者直接访问启用链接（在错误信息中会提供）：
   `https://console.developers.google.com/apis/api/translate.googleapis.com/overview?project=YOUR_PROJECT_ID`
7. 启用后，等待 2-5 分钟让更改生效
8. 刷新页面，重新尝试翻译

#### 其他常见错误
- **API 密钥错误**：检查密钥是否正确复制（没有多余空格）
- **配额用完**：前往 Google Cloud Console 查看使用量
- **网络错误**：检查服务器是否能访问 Google API
- 查看浏览器控制台（F12）的详细错误信息
- 查看 Drupal 日志：`/admin/reports/dblog`，筛选 "auto_translate" 类型

### 保存失败
- 确保您有编辑该节点的权限
- 检查节点 ID 是否正确
- 查看 Drupal 日志：`/admin/reports/dblog`

