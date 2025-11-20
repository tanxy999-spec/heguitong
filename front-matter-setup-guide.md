# Front Matter 插件设置指南

本文档将指导您如何配置和使用Front Matter插件来更新和管理您的Hugo网站内容。

## 一、Front Matter插件基本介绍

Front Matter是一个VS Code插件，专为静态网站生成器（如Hugo）设计，提供了友好的界面来管理Markdown文件的front matter（前置元数据）。

## 二、配置Front Matter插件

### 1. 创建Front Matter配置文件

在您的Hugo项目根目录创建一个名为`.frontmatter`的文件夹，并在其中创建`frontmatter.json`配置文件：

```json
{
  "frontMatter.taxonomy.contentTypes": [
    {
      "name": "compliance_guide",
      "pageBundle": false,
      "previewPath": null,
      "publicFolder": "public",
      "filePrefix": null,
      "clearEmpty": true,
      "fields": [
        {
          "title": "标题",
          "name": "title",
          "type": "string",
          "single": true
        },
        {
          "title": "描述",
          "name": "description",
          "type": "string"
        },
        {
          "title": "分类",
          "name": "categories",
          "type": "taxonomy",
          "taxonomyType": "categories"
        },
        {
          "title": "日期",
          "name": "date",
          "type": "datetime",
          "default": "{{now}}"
        }
      ]
    },
    {
      "name": "cases",
      "pageBundle": false,
      "previewPath": null,
      "publicFolder": "public",
      "filePrefix": null,
      "clearEmpty": true,
      "fields": [
        {
          "title": "标题",
          "name": "title",
          "type": "string",
          "single": true
        },
        {
          "title": "描述",
          "name": "description",
          "type": "string"
        },
        {
          "title": "分类",
          "name": "categories",
          "type": "taxonomy",
          "taxonomyType": "categories"
        },
        {
          "title": "日期",
          "name": "date",
          "type": "datetime",
          "default": "{{now}}"
        }
      ]
    },
    {
      "name": "regulations",
      "pageBundle": false,
      "previewPath": null,
      "publicFolder": "public",
      "filePrefix": null,
      "clearEmpty": true,
      "fields": [
        {
          "title": "标题",
          "name": "title",
          "type": "string",
          "single": true
        },
        {
          "title": "描述",
          "name": "description",
          "type": "string"
        },
        {
          "title": "分类",
          "name": "categories",
          "type": "taxonomy",
          "taxonomyType": "categories"
        },
        {
          "title": "日期",
          "name": "date",
          "type": "datetime",
          "default": "{{now}}"
        }
      ]
    }
  ],
  "frontMatter.taxonomy.taxonomies": [
    {
      "id": "categories",
      "name": "分类",
      "contentPath": "content",
      "options": [
        "国家法规",
        "地方政策",
        "行政处罚案例",
        "财务管理",
        "信息披露",
        "运营管理"
      ]
    }
  ],
  "frontMatter.content.publicFolder": "public",
  "frontMatter.content.pageFolders": [
    {
      "title": "合规指南",
      "path": "content/compliance_guide"
    },
    {
      "title": "典型案例",
      "path": "content/cases"
    },
    {
      "title": "法规政策",
      "path": "content/regulations"
    }
  ]
}
```

### 2. 配置VS Code用户设置

在VS Code中，按`Ctrl+,`打开设置，搜索"Front Matter"，然后配置以下选项：

```json
{
  "frontMatter.content.publicFolder": "public",
  "frontMatter.framework": "hugo",
  "frontMatter.content.pageFolders": [
    {
      "title": "合规指南",
      "path": "content/compliance_guide"
    },
    {
      "title": "典型案例",
      "path": "content/cases"
    },
    {
      "title": "法规政策",
      "path": "content/regulations"
    }
  ]
}
```

## 三、使用Front Matter插件管理内容

### 1. 创建新内容

1. 在VS Code左侧活动栏中，点击Front Matter图标
2. 点击"创建新内容"按钮
3. 选择内容类型（合规指南、典型案例或法规政策）
4. 填写标题、描述、分类和日期等信息
5. 点击"创建"按钮

### 2. 编辑现有内容的Front Matter

1. 打开Markdown文件
2. 点击编辑器顶部的"Front Matter"图标
3. 在弹出的界面中编辑各项元数据
4. 点击"保存"按钮

### 3. 更新内容分类

如果您需要添加新的分类选项：

1. 编辑`.frontmatter/frontmatter.json`文件
2. 在`frontMatter.taxonomy.taxonomies`数组中添加新的分类选项
3. 保存文件后，新分类将在创建或编辑内容时可用

## 四、Front Matter与Hugo的协作

### 1. 预览内容

1. 确保Hugo服务器已启动（`hugo server`）
2. 在Front Matter面板中，点击文件旁边的预览图标
3. 将在浏览器中打开对应的页面

### 2. 自动生成slug

默认情况下，Front Matter会根据标题自动生成URL友好的slug。您也可以在创建内容时自定义slug。

### 3. 批量更新

对于多个文件需要更新相同的front matter字段：

1. 在文件资源管理器中选择多个Markdown文件
2. 右键点击并选择"Front Matter: 批量操作"
3. 选择要更新的字段和值
4. 点击"应用"按钮

## 五、最佳实践

1. **保持一致的front matter格式**：确保所有文件使用相同的字段结构
2. **使用有意义的分类**：选择能够准确描述内容的分类
3. **定期更新日期**：在修改内容时更新日期字段
4. **编写详细的描述**：描述字段对SEO和内容预览很重要
5. **备份配置**：定期备份`.frontmatter/frontmatter.json`文件

## 六、故障排除

1. **Front Matter面板不显示**
   - 确保插件已正确安装
   - 检查项目根目录是否有`.frontmatter`文件夹

2. **创建新内容失败**
   - 检查文件路径和权限
   - 确保配置的内容类型正确

3. **预览不工作**
   - 确保Hugo服务器正在运行
   - 检查URL配置是否正确

希望这份指南能帮助您有效使用Front Matter插件管理Hugo网站内容！