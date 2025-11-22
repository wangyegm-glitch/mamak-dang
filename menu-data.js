// 菜单数据结构
const menuData = {
    appetizer: [
        { id: 1, name: "Coconut Shrimp Rolls", nameCN: "椰丝虾卷", code: "S.ROLL", price: 11.99, description: "5pcs" },
        { id: 2, name: "Curry Chicken Potato Bites", nameCN: "咖喱鸡土豆块", code: "C.C.POTATO", price: 11.99, description: "" },
        { id: 3, name: "Deep Fried Fish Balls", nameCN: "炸鱼丸", code: "D FB", price: 8.99, description: "9pcs" },
        { id: 4, name: "Stuffed Bean Curd Sheets", nameCN: "酿豆腐皮", code: "BEAN CURD", price: 8.99, description: "7pcs" },
        { id: 5, name: "Chili Cheese Fries", nameCN: "辣椒芝士薯条", code: "FRIES", price: 7.99, description: "200g" },
        { id: 6, name: "Popcorn Chicken", nameCN: "爆米花鸡", code: "POPCORN", price: 9.49, description: "200g (Chicken nugget)" },
        { id: 7, name: "Deep Fried Pork Wonton", nameCN: "炸猪肉云吞", code: "WONTON", price: 6.99, description: "5pcs" },
        { id: 8, name: "Satay Chicken Skewer", nameCN: "沙爹鸡肉串", code: "SKEWER", price: 19.50, description: "6pcs" },
        { id: 9, name: "Deep Fried Salt & Pepper Tofu", nameCN: "椒盐炸豆腐", code: "D TOFU", price: 7.99, description: "" },
        { id: 10, name: "Chili Cheese Chicken Fries", nameCN: "辣椒芝士鸡块薯条", code: "C.C.C FRIES", price: 9.49, description: "200g" },
        { id: 11, name: "Chicken Fries", nameCN: "鸡块薯条", code: "C FRIES", price: 8.99, description: "200g" },
        { id: 12, name: "Vegetable Spring Rolls", nameCN: "蔬菜春卷", code: "VEG ROLL", price: 8.99, description: "6pcs" }
    ],
    roti: [
        { id: 20, name: "Roti Paratha", nameCN: "印度煎饼", code: "ROTI", price: 5.50, description: "2pcs (no sauce)" },
        { id: 21, name: "Roti with Curry Sauce", nameCN: "咖喱酱印度煎饼", code: "ROTI CURRY", price: 7.49, description: "" },
        { id: 22, name: "Roti with Rendang Sauce", nameCN: "仁当酱印度煎饼", code: "ROTI RENDANG", price: 7.49, description: "" },
        { id: 23, name: "Roti Curry Chicken", nameCN: "咖喱鸡印度煎饼", code: "ROTI C", price: 18.50, description: "1/2 lbs" },
        { id: 24, name: "Roti Rendang Beef", nameCN: "仁当牛肉印度煎饼", code: "ROTI B", price: 18.50, description: "1/2 lbs" },
        { id: 25, name: "Roti Curry Fish Balls", nameCN: "咖喱鱼丸印度煎饼", code: "ROTI FB", price: 18.00, description: "11pcs" },
        { id: 26, name: "Roti Curry Stuffed Bean Curd", nameCN: "咖喱酿豆腐印度煎饼", code: "ROTI BEAN CURD", price: 18.00, description: "8pcs" },
        { id: 27, name: "Roti Sweet Milk", nameCN: "甜奶印度煎饼", code: "ROTI MILK", price: 5.49, description: "Dessert" }
    ],
    noodles: {
        toppings: [
            { id: "special", name: "Special", nameCN: "特别", code: "SP", price: 19.99 },
            { id: "seafood", name: "Seafood", nameCN: "海鲜", code: "S", price: 19.50 },
            { id: "fishballs", name: "Fish Balls", nameCN: "鱼丸", code: "FB", price: 17.50 },
            { id: "beefballs", name: "Beef Balls", nameCN: "牛肉丸", code: "BB", price: 17.50 },
            { id: "porkballs", name: "Pork Balls", nameCN: "猪肉丸", code: "PB", price: 17.50 },
            { id: "mixballs", name: "Mix Balls", nameCN: "混合丸", code: "MIX", price: 17.50 },
            { id: "vegetable", name: "Vegetable", nameCN: "蔬菜", code: "VEG", price: 17.50, note: "Non Vegetarian" },
            { id: "rendang", name: "Rendang Beef", nameCN: "仁当牛肉", code: "B", price: 19.50 },
            { id: "curry", name: "Curry Chicken", nameCN: "咖喱鸡", code: "C", price: 19.50 },
            { id: "wonton", name: "Fried Wonton", nameCN: "炸云吞", code: "WONTON", price: 18.50 },
            { id: "plain", name: "Plain", nameCN: "清汤", code: "PLAIN", price: 11.99, note: "Only Noodle & Soup" },
            { id: "small", name: "Cute Size", nameCN: "小份", code: "SMALL", price: 15.00, note: "Half Size" }
        ],
        bases: [
            { id: "laksa", name: "Laksa", nameCN: "叻沙", code: "L", description: "Coconut Curry Seafood Soup" },
            { id: "house", name: "House", nameCN: "招牌", code: "H", description: "Chicken & Pork Bone Soup" },
            { id: "tomkha", name: "Tom Kha", nameCN: "冬阴功", code: "TK", description: "Light Coconut Tom Yum Soup" },
            { id: "dry", name: "Kon Lou Mee", nameCN: "干捞面", code: "Dry", description: "Dry Style Noodle" }
        ],
        noodleTypes: [
            { id: "thick", name: "Thick", nameCN: "粗面", code: "T" },
            { id: "egg", name: "Egg", nameCN: "蛋面", code: "EGG" },
            { id: "thin", name: "Thin", nameCN: "细面", code: "" }
        ],
        spicyLevels: [
            { id: 0, name: "No Spicy", nameCN: "不辣", icon: "🚫" },
            { id: 1, name: "Mild", nameCN: "微辣", icon: "🟢" },
            { id: 2, name: "Medium", nameCN: "中辣", icon: "🟡" },
            { id: 3, name: "Hot", nameCN: "辣", icon: "🟠" },
            { id: 4, name: "Extra Hot", nameCN: "特辣", icon: "🔴" },
            { id: 5, name: "Crazy", nameCN: "疯狂辣", icon: "🌶️" }
        ]
    },
    nasi: [
        { id: 71, name: "Nasi Rendang Beef", nameCN: "仁当牛肉椰浆饭", code: "NASI B", price: 21.99, description: "" },
        { id: 72, name: "Nasi Curry Chicken", nameCN: "咖喱鸡椰浆饭", code: "NASI C", price: 21.99, description: "" },
        { id: 73, name: "Nasi Beef & Chicken Combo", nameCN: "牛肉鸡肉组合椰浆饭", code: "NASI BC", price: 26.99, description: "" },
        { id: 74, name: "Nasi Curry Sambal Seafood", nameCN: "咖喱叁巴海鲜椰浆饭", code: "NASI SEAFOOD", price: 23.99, description: "" }
    ],
    rice: [
        { id: 80, name: "Rendang Beef Rice", nameCN: "仁当牛肉饭", code: "B RICE", price: 20.50, description: "" },
        { id: 81, name: "Curry Chicken Rice", nameCN: "咖喱鸡饭", code: "C RICE", price: 20.50, description: "" },
        { id: 82, name: "Curry Vegetable Rice", nameCN: "咖喱蔬菜饭", code: "VEG RICE", price: 18.25, description: "Non Vegetarian" }
    ],
    platter: [
        { id: 111, name: "Curry Chicken Rice Platter", nameCN: "咖喱鸡饭拼盘", code: "C 2", price: 21.99, description: "Special Platter include: Deep fried Pork Wonton, Vegetable Spring Rolls, Stuffed Pork Bean Curd Sheet, Hard boiled egg, salad with ranch top with corn, Pickle carrot & cabbage, Jasmine rice and a can of soft drink." },
        { id: 112, name: "Rendang Beef Rice Platter", nameCN: "仁当牛肉饭拼盘", code: "B 2", price: 21.99, description: "Special Platter include: Deep fried Pork Wonton, Vegetable Spring Rolls, Stuffed Pork Bean Curd Sheet, Hard boiled egg, salad with ranch top with corn, Pickle carrot & cabbage, Jasmine rice and a can of soft drink." },
        { id: 113, name: "Beef & Chicken Rice Platter", nameCN: "牛肉鸡肉饭拼盘", code: "BC 2", price: 26.99, description: "Special Platter include: Deep fried Pork Wonton, Vegetable Spring Rolls, Stuffed Pork Bean Curd Sheet, Hard boiled egg, salad with ranch top with corn, Pickle carrot & cabbage, Jasmine rice and a can of soft drink." }
    ],
    extra: [
        { id: 90, name: "1 Lbs Rendang Beef", nameCN: "1磅仁当牛肉", code: "1 LBS B", price: 0, description: "" },
        { id: 91, name: "1 Lbs Curry Chicken", nameCN: "1磅咖喱鸡", code: "1 LBS C", price: 0, description: "" },
        { id: 92, name: "Jasmine Rice", nameCN: "茉莉香米饭", code: "RICE", price: 0, description: "" },
        { id: 93, name: "Coconut Rice", nameCN: "椰浆饭", code: "CO RICE", price: 0, description: "" },
        { id: 94, name: "Vermicelli Rice Noodle", nameCN: "米粉", code: "T", price: 0, description: "" },
        { id: 95, name: "Thick Rice Noodle", nameCN: "粗米粉", code: "", price: 0, description: "" },
        { id: 96, name: "Egg Noodle", nameCN: "蛋面", code: "EGG", price: 0, description: "" }
    ]
};

// 短代码映射表（用于快速输入）
const shortCodeMap = {};
function buildShortCodeMap() {
    // 开胃菜
    menuData.appetizer.forEach(item => {
        shortCodeMap[item.code.toUpperCase()] = { type: 'appetizer', item: item };
    });
    
    // Roti
    menuData.roti.forEach(item => {
        shortCodeMap[item.code.toUpperCase()] = { type: 'roti', item: item };
    });
    
    // Nasi Lemak
    menuData.nasi.forEach(item => {
        shortCodeMap[item.code.toUpperCase()] = { type: 'nasi', item: item };
    });
    
    // Rice
    menuData.rice.forEach(item => {
        shortCodeMap[item.code.toUpperCase()] = { type: 'rice', item: item };
    });
    
    // Platter
    menuData.platter.forEach(item => {
        shortCodeMap[item.code.toUpperCase()] = { type: 'platter', item: item };
    });
    
    // 面类短代码（格式：TOPPING BASE，如 "SP L", "C H"）
    menuData.noodles.toppings.forEach(topping => {
        menuData.noodles.bases.forEach(base => {
            const code = `${topping.code} ${base.code}`.trim();
            shortCodeMap[code.toUpperCase()] = {
                type: 'noodle',
                topping: topping,
                base: base
            };
        });
    });
}

buildShortCodeMap();
