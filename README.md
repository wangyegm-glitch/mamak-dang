# 餐厅点餐系统

这是一个专为餐厅服务员设计的手机点餐应用，支持快速点餐和面类多步骤定制。

## 功能特点

### 1. 菜单浏览
- 分类浏览：开胃菜、Roti Paratha、面类、Nasi Lemak、茉莉香米饭、特别拼盘、额外选项
- 显示菜品名称、价格、短代码和描述

### 2. 面类定制系统
面类支持多步骤定制流程：
- **步骤1：选择配料** - Special、Seafood、Fish Balls、Beef Balls、Pork Balls、Mix Balls、Vegetable、Rendang Beef、Curry Chicken、Fried Wonton、Plain、Cute Size
- **步骤2：选择汤底** - Laksa（叻沙）、House（招牌）、Tom Kha（冬阴功）、Kon Lou Mee（干捞面）
- **步骤3：选择面条类型** - Thick（粗面）、Egg（蛋面）、Thin（细面）
- **步骤4：选择辣度** - No Spicy（不辣）、Mild（微辣）、Medium（中辣）、Hot（辣）、Extra Hot（特辣）、Crazy（疯狂辣）

### 3. 短代码快速输入
- 支持通过短代码快速添加菜品
- 例如：输入 "SP L" 快速添加 Special Laksa
- 面类短代码会自动打开定制界面，已预选配料和汤底

### 4. 购物车管理
- 实时显示订单数量和总价
- 支持修改数量
- 查看订单详情
- 提交订单和清空订单

## 使用方法

### 基本操作
1. 打开 `index.html` 文件
2. 点击分类标签浏览不同类别的菜品
3. 点击"添加到订单"按钮将菜品加入购物车
4. 点击购物车图标查看订单
5. 在购物车中可以修改数量或删除项目
6. 点击"提交订单"完成点餐

### 面类定制
1. 进入"面类"分类
2. 点击"开始定制"按钮
3. 按照步骤依次选择：
   - 配料 → 汤底 → 面条类型 → 辣度
4. 完成所有选择后，点击"添加到订单"

### 短代码输入
1. 在顶部输入框输入短代码（如：`ROTI C`、`SP L`、`NASI B`）
2. 点击"添加"按钮或按回车键
3. 如果是面类短代码，会自动打开定制界面

## 短代码参考

### 开胃菜
- `S.ROLL` - Coconut Shrimp Rolls
- `C.C.POTATO` - Curry Chicken Potato Bites
- `D FB` - Deep Fried Fish Balls
- `BEAN CURD` - Stuffed Bean Curd Sheets
- `FRIES` - Chili Cheese Fries
- `POPCORN` - Popcorn Chicken
- `WONTON` - Deep Fried Pork Wonton
- `SKEWER` - Satay Chicken Skewer
- `D TOFU` - Deep Fried Salt & Pepper Tofu
- `C.C.C FRIES` - Chili Cheese Chicken Fries
- `C FRIES` - Chicken Fries
- `VEG ROLL` - Vegetable Spring Rolls

### Roti Paratha
- `ROTI` - Roti Paratha
- `ROTI CURRY` - Roti with Curry Sauce
- `ROTI RENDANG` - Roti with Rendang Sauce
- `ROTI C` - Roti Curry Chicken
- `ROTI B` - Roti Rendang Beef
- `ROTI FB` - Roti Curry Fish Balls
- `ROTI BEAN CURD` - Roti Curry Stuffed Bean Curd
- `ROTI MILK` - Roti Sweet Milk

### 面类（格式：配料代码 + 空格 + 汤底代码）
- `SP L` - Special Laksa
- `S H` - Seafood House
- `C TK` - Curry Chicken Tom Kha
- `FB Dry` - Fish Balls Kon Lou Mee
- `PLAIN L` - Plain Laksa
- `SMALL H` - Cute Size House

**配料代码：** SP, S, FB, BB, PB, MIX, VEG, B, C, WONTON, PLAIN, SMALL
**汤底代码：** L (Laksa), H (House), TK (Tom Kha), Dry (Kon Lou Mee)

### Nasi Lemak
- `NASI B` - Nasi Rendang Beef
- `NASI C` - Nasi Curry Chicken
- `NASI BC` - Nasi Beef & Chicken Combo
- `NASI SEAFOOD` - Nasi Curry Sambal Seafood

### 茉莉香米饭
- `B RICE` - Rendang Beef Rice
- `C RICE` - Curry Chicken Rice
- `VEG RICE` - Curry Vegetable Rice

### 特别拼盘
- `C 2` - Curry Chicken Rice Platter
- `B 2` - Rendang Beef Rice Platter
- `BC 2` - Beef & Chicken Rice Platter

## 技术说明

- 纯前端应用，无需服务器
- 响应式设计，适配手机屏幕
- 使用原生 JavaScript，无依赖
- 数据存储在内存中，刷新页面会清空订单

## 文件结构

```
restaurant-ordering-app/
├── index.html      # 主HTML文件
├── styles.css      # 样式文件
├── menu-data.js    # 菜单数据
├── app.js          # 应用逻辑
└── README.md       # 说明文档
```

## 注意事项

- 订单数据仅存储在浏览器内存中，刷新页面会丢失
- 如需持久化存储，可以集成后端API或使用 localStorage
- 价格信息来自菜单图片，如有更新请修改 `menu-data.js`
