# Auto Translate Module

自动翻译模块，集成 Google Translate API，支持在节点编辑页面一键将内容翻译为繁体中文（TC）或简体中文（SC）。

## 功能特性

- ✅ 一键翻译为繁体中文（TC）
- ✅ 一键翻译为简体中文（SC）
- ✅ 支持从英文、简体中文、繁体中文之间的互相翻译
- ✅ 自动检测源语言
- ✅ 支持 CKEditor 编辑器
- ✅ 翻译后保存功能
- ✅ 集成 Google Translate API

## 安装步骤

1. **启用模块**
   - 前往 `/admin/modules`
   - 找到 "Auto Translate" 模块
   - 勾选并保存

2. **配置 Google Translate API 密钥**
   - 前往 `/admin/config/services/auto-translate`
   - 输入您的 Google Cloud Translation API 密钥
   - 保存配置

3. **获取 Google Translate API 密钥**
   - 访问 [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - 创建新项目或选择现有项目
   - 启用 "Cloud Translation API"
   - 创建 API 密钥
   - 将 API 密钥复制到模块配置中

## 使用方法

1. **编辑节点**
   - 前往任何节点的编辑页面（例如 `/node/123/edit`）

2. **翻译内容**
   - 点击 "Translate to TC (繁體)" 按钮将内容翻译为繁体中文
   - 或点击 "Translate to SC (簡體)" 按钮将内容翻译为简体中文
   - 翻译完成后，页面上的文本字段会自动更新

3. **保存翻译**
   - 翻译完成后，会出现 "Save Translation" 按钮
   - 点击该按钮保存翻译后的内容到节点

## 支持的字段类型

- 标题字段（Title）
- 正文字段（Body）- 支持 CKEditor
- 其他文本字段（Text fields）
- 文本区域（Textarea）

## 技术说明

### 模块结构

```
auto_translate/
├── auto_translate.info.yml          # 模块信息
├── auto_translate.module             # 主模块文件
├── auto_translate.libraries.yml      # 库定义
├── auto_translate.routing.yml         # 路由定义
├── auto_translate.services.yml        # 服务定义
├── auto_translate.links.menu.yml      # 菜单链接
├── config/
│   ├── install/
│   │   └── auto_translate.settings.yml
│   └── schema/
│       └── auto_translate.schema.yml
├── src/
│   ├── Controller/
│   │   └── TranslateController.php
│   ├── Form/
│   │   └── TranslateSettingsForm.php
│   └── Service/
│       └── TranslateService.php
├── js/
│   └── auto-translate.js
└── css/
    └── auto-translate.css
```

### API 端点

- `POST /auto-translate/translate` - 翻译文本
- `POST /auto-translate/save` - 保存翻译后的内容

### 权限要求

- `edit any content` - 编辑内容权限（用于翻译和保存）
- `administer site configuration` - 管理配置权限（用于配置 API 密钥）

## 故障排除

### 翻译不工作

1. 检查 Google Translate API 密钥是否正确配置
2. 检查 API 密钥是否有足够的配额
3. 查看浏览器控制台是否有错误信息

### 保存失败

1. 确保您有编辑该节点的权限
2. 检查节点 ID 是否正确
3. 查看浏览器控制台和 Drupal 日志

## 开发说明

模块使用以下技术：
- Drupal 10/11
- Google Cloud Translation API v2
- jQuery (Drupal 核心)
- AJAX

## 许可证

此模块遵循 Drupal 的 GPL v2+ 许可证。

