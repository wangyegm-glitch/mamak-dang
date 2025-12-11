// 应用状态
const appState = {
    currentCategory: 'appetizer',
    selectedTable: null, // 选中的桌号
    // 每个桌号的购物车 { '1': [...], '2': [...], ... }
    tableCarts: {},
    // 每个桌号的已提交订单 { '1': [...], '2': [...], ... }
    tableOrders: {},
    noodleCustomization: {
        currentStep: 1,
        selectedTopping: null,
        selectedBase: null,
        selectedNoodle: null,
        selectedSpicy: null,
        selectedSize: null  // 规格选择（Cute Size）
    }
};

// 获取当前桌号的购物车
function getCurrentCart() {
    if (!appState.selectedTable) return [];
    if (!appState.tableCarts[appState.selectedTable]) {
        appState.tableCarts[appState.selectedTable] = [];
    }
    return appState.tableCarts[appState.selectedTable];
}

// 设置当前桌号的购物车
function setCurrentCart(cart) {
    if (!appState.selectedTable) return;
    appState.tableCarts[appState.selectedTable] = cart;
}

// DOM 元素
const elements = {
    menuContainer: document.getElementById('menuContainer'),
    tableList: document.getElementById('tableList'),
    cartIcon: document.getElementById('cartIcon'),
    cartBadge: document.getElementById('cartBadge'),
    cartSidebar: document.getElementById('cartSidebar'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    cartHeaderTitle: document.getElementById('cartHeaderTitle'),
    closeCartBtn: document.getElementById('closeCartBtn'),
    submitOrderBtn: document.getElementById('submitOrderBtn'),
    clearCartBtn: document.getElementById('clearCartBtn'),
    overlay: document.getElementById('overlay'),
    noodleModal: document.getElementById('noodleModal'),
    closeNoodleModal: document.getElementById('closeNoodleModal'),
    stepContent: document.getElementById('stepContent'),
    selectedInfo: document.getElementById('selectedInfo'),
    prevStepBtn: document.getElementById('prevStepBtn'),
    nextStepBtn: document.getElementById('nextStepBtn'),
    addNoodleBtn: document.getElementById('addNoodleBtn'),
    shortCodeInput: document.getElementById('shortCodeInput'),
    addByCodeBtn: document.getElementById('addByCodeBtn')
};

// 初始化应用
function init() {
    setupEventListeners();
    renderAllMenus();
    renderTables();
    // 初始化第一个桌号的购物车
    if (appState.selectedTable) {
        getCurrentCart(); // 确保购物车已初始化
    }
    updateCartBadge();
    updateTableStatus();
}

// 设置事件监听器
function setupEventListeners() {
    // 购物车相关
    elements.cartIcon.addEventListener('click', openCart);
    elements.closeCartBtn.addEventListener('click', closeCart);
    elements.overlay.addEventListener('click', () => {
        closeCart();
        closeNoodleModal();
    });
    elements.submitOrderBtn.addEventListener('click', submitOrder);
    elements.clearCartBtn.addEventListener('click', clearCart);

    // 面类定制相关
    elements.closeNoodleModal.addEventListener('click', closeNoodleModal);
    elements.nextStepBtn.addEventListener('click', nextStep);
    elements.prevStepBtn.addEventListener('click', prevStep);
    elements.addNoodleBtn.addEventListener('click', addNoodleToCart);

    // 短代码输入
    elements.addByCodeBtn.addEventListener('click', addByShortCode);
    elements.shortCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addByShortCode();
        }
    });
}

// 渲染所有菜单（所有分类同时显示）
function renderAllMenus() {
    elements.menuContainer.innerHTML = '';
    
    // 定义分类顺序和显示名称（只显示英文）
    const categories = [
        { key: 'appetizer', name: 'Appetizer', color: '#FF9800' },
        { key: 'roti', name: 'Roti Paratha', color: '#8B4513' },
        { key: 'noodles', name: 'Noodle', color: '#FF69B4' },
        { key: 'nasi', name: 'Nasi Lemak', color: '#9C27B0' },
        { key: 'rice', name: 'Jasmine Rice', color: '#F44336' },
        { key: 'platter', name: 'Mamak Dang Special Platter', color: '#9C27B0' },
        { key: 'extra', name: 'Extra', color: '#FF9800' }
    ];
    
    categories.forEach(category => {
        // 添加分类标题
        const titleDiv = document.createElement('div');
        titleDiv.className = 'category-title';
        titleDiv.style.borderLeftColor = category.color;
        titleDiv.textContent = category.name;
        elements.menuContainer.appendChild(titleDiv);
        
        // 渲染该分类下的所有菜品
        if (category.key === 'noodles') {
            // 面类特殊处理 - 显示"开始定制"按钮
            const noodleBtn = document.createElement('button');
            noodleBtn.className = 'menu-item-btn';
            noodleBtn.style.borderLeftColor = category.color;
            noodleBtn.onclick = startNoodleCustomization;
            noodleBtn.innerHTML = `
                <div class="menu-btn-name">Customize Noodles</div>
            `;
            elements.menuContainer.appendChild(noodleBtn);
        } else {
            const items = menuData[category.key] || [];
            items.forEach(item => {
                const menuItem = createMenuItem(item, category.key, category.color);
                elements.menuContainer.appendChild(menuItem);
            });
        }
    });
}

// 渲染桌台列表
function renderTables() {
    // 指定的桌号列表
    const tableNumbers = ['1', '2', '3', '4', '5a', '5b', '6a', '6b', '7a', '7b'];
    
    elements.tableList.innerHTML = tableNumbers.map((tableNum, index) => `
        <div class="table-item ${index === 0 ? 'active' : ''}" data-table-num="${tableNum}">
            <span>⋯</span>
            <span>${tableNum}</span>
        </div>
    `).join('');
    
    // 默认选择第一个桌台
    if (tableNumbers.length > 0) {
        appState.selectedTable = tableNumbers[0];
    }
    
    // 添加桌台点击事件
    elements.tableList.querySelectorAll('.table-item').forEach(item => {
        item.addEventListener('click', () => {
            elements.tableList.querySelectorAll('.table-item').forEach(t => t.classList.remove('active'));
            item.classList.add('active');
            const newTable = item.dataset.tableNum;
            appState.selectedTable = newTable;
            
            // 切换桌号时，更新购物车显示
            updateCartBadge();
            if (elements.cartSidebar.classList.contains('open')) {
                renderCart();
                if (elements.cartHeaderTitle) {
                    elements.cartHeaderTitle.textContent = `Order - Table ${appState.selectedTable}`;
                }
            }
            
            // 更新桌号显示状态
            updateTableStatus();
        });
    });
    
    // 初始化时更新桌号状态
    updateTableStatus();
}


// 创建菜单项 - 按钮样式，只显示英文名
function createMenuItem(item, category, color) {
    const button = document.createElement('button');
    button.className = 'menu-item-btn';
    button.style.borderLeftColor = color;
    button.onclick = () => addToCart(item.id, category);
    
    // 只显示英文名，不显示价格
    button.innerHTML = `
        <div class="menu-btn-name">${item.name}</div>
    `;
    return button;
}

// 添加到购物车
function addToCart(itemId, category) {
    // 检查是否选择了桌号
    if (!appState.selectedTable) {
        showToast('Please select a table first');
        return;
    }
    
    const items = menuData[category];
    const item = items.find(i => i.id === itemId);
    
    if (!item) return;

    const cart = getCurrentCart();
    const cartItem = {
        id: Date.now(),
        name: item.name, // 只使用英文名
        code: item.code,
        price: item.price,
        description: item.description || '',
        category: category,
        quantity: 1,
        table: appState.selectedTable // 记录桌号
    };

    cart.push(cartItem);
    setCurrentCart(cart);
    updateCartBadge();
    updateTableStatus();
    showToast('Added to order');
}

// 开始面类定制
function startNoodleCustomization() {
    // 重置定制状态
    appState.noodleCustomization = {
        currentStep: 1,
        selectedTopping: null,
        selectedBase: null,
        selectedNoodle: null,
        selectedSpicy: null,
        selectedSize: null  // 规格选择
    };
    
    openNoodleModal();
    renderStep(1);
}

// 打开面类定制模态框
function openNoodleModal() {
    elements.noodleModal.classList.add('active');
    elements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭面类定制模态框
function closeNoodleModal() {
    elements.noodleModal.classList.remove('active');
    elements.overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// 渲染步骤
function renderStep(step) {
    appState.noodleCustomization.currentStep = step;
    
    // 更新步骤指示器
    document.querySelectorAll('.step').forEach((stepEl, index) => {
        const stepNum = index + 1;
        if (stepNum <= step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });

    // 渲染步骤内容
    let html = '';
    switch(step) {
        case 1:
            html = renderToppingStep();
            break;
        case 2:
            html = renderBaseStep();
            break;
        case 3:
            html = renderNoodleStep();
            break;
        case 4:
            html = renderSpicyStep();
            break;
    }
    
    elements.stepContent.innerHTML = html;
    
    // 更新按钮状态
    elements.prevStepBtn.style.display = step > 1 ? 'block' : 'none';
    elements.nextStepBtn.style.display = step < 4 ? 'block' : 'none';
    elements.addNoodleBtn.style.display = step === 4 ? 'block' : 'none';
    
    // 更新已选信息
    updateSelectedInfo();
}

// 渲染配料选择步骤
function renderToppingStep() {
    // 过滤掉small（Cute Size），因为它是规格而不是配料
    const toppings = menuData.noodles.toppings.filter(topping => topping.id !== 'small');
    
    return `
        <h3 style="margin-bottom: 12px; color: #333; font-size: 14px;">Select Ingredients</h3>
        <div class="option-grid">
            ${toppings.map(topping => {
                return `
                <button class="option-card ${appState.noodleCustomization.selectedTopping?.id === topping.id ? 'selected' : ''}" 
                     onclick="selectTopping('${topping.id}')">
                    <div class="option-card-name">${topping.name}</div>
                </button>
            `;
            }).join('')}
        </div>
        <!-- 规格选择 -->
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e0e0e0;">
            <h4 style="margin-bottom: 8px; color: #666; font-size: 12px; font-weight: 600;">Size (Optional)</h4>
            <div class="option-grid">
                ${(() => {
                    const cuteSize = menuData.noodles.toppings.find(t => t.id === 'small');
                    if (!cuteSize) return '';
                    return `
                    <button class="option-card ${appState.noodleCustomization.selectedSize?.id === cuteSize.id ? 'selected' : ''}" 
                         onclick="selectSize('${cuteSize.id}')">
                        <div class="option-card-name">${cuteSize.name}</div>
                    </button>
                `;
                })()}
            </div>
        </div>
    `;
}

// 渲染汤底选择步骤
function renderBaseStep() {
    return `
        <h3 style="margin-bottom: 12px; color: #333; font-size: 14px;">Select Soup Base</h3>
        <div class="option-grid">
            ${menuData.noodles.bases.map(base => {
                return `
                <button class="option-card ${appState.noodleCustomization.selectedBase?.id === base.id ? 'selected' : ''}" 
                     onclick="selectBase('${base.id}')">
                    <div class="option-card-name">${base.name}</div>
                </button>
            `;
            }).join('')}
        </div>
    `;
}

// 渲染面条类型选择步骤
function renderNoodleStep() {
    return `
        <h3 style="margin-bottom: 12px; color: #333; font-size: 14px;">Select Noodle Type</h3>
        <div class="option-grid">
            ${menuData.noodles.noodleTypes.map(noodle => {
                return `
                <button class="option-card ${appState.noodleCustomization.selectedNoodle?.id === noodle.id ? 'selected' : ''}" 
                     onclick="selectNoodle('${noodle.id}')">
                    <div class="option-card-name">${noodle.name}</div>
                </button>
            `;
            }).join('')}
        </div>
    `;
}

// 渲染辣度选择步骤
function renderSpicyStep() {
    return `
        <h3 style="margin-bottom: 12px; color: #333; font-size: 14px;">Select Spice Level</h3>
        <div class="option-grid">
            ${menuData.noodles.spicyLevels.map(level => {
                return `
                <button class="option-card ${appState.noodleCustomization.selectedSpicy?.id === level.id ? 'selected' : ''}" 
                     onclick="selectSpicy(${level.id})">
                    <div class="option-card-name">${level.name} ${level.icon}</div>
                </button>
            `;
            }).join('')}
        </div>
    `;
}

// 选择配料
function selectTopping(toppingId) {
    const topping = menuData.noodles.toppings.find(t => t.id === toppingId);
    appState.noodleCustomization.selectedTopping = topping;
    renderStep(1);
}

// 选择汤底
function selectBase(baseId) {
    const base = menuData.noodles.bases.find(b => b.id === baseId);
    appState.noodleCustomization.selectedBase = base;
    renderStep(2);
}

// 选择面条类型
function selectNoodle(noodleId) {
    const noodle = menuData.noodles.noodleTypes.find(n => n.id === noodleId);
    appState.noodleCustomization.selectedNoodle = noodle;
    renderStep(3);
}

// 选择辣度
function selectSpicy(spicyId) {
    const spicy = menuData.noodles.spicyLevels.find(s => s.id === spicyId);
    appState.noodleCustomization.selectedSpicy = spicy;
    renderStep(4);
}

// 选择规格（Size）
function selectSize(sizeId) {
    const size = menuData.noodles.toppings.find(t => t.id === sizeId);
    // 如果已经选择了相同规格，则取消选择
    if (appState.noodleCustomization.selectedSize?.id === sizeId) {
        appState.noodleCustomization.selectedSize = null;
    } else {
        appState.noodleCustomization.selectedSize = size;
    }
    renderStep(1); // 重新渲染第一步以更新选择状态
}

// 更新已选信息
function updateSelectedInfo() {
    const { selectedTopping, selectedBase, selectedNoodle, selectedSpicy, selectedSize } = appState.noodleCustomization;
    const info = [];
    
    if (selectedTopping) {
        info.push(`Ingredients: ${selectedTopping.name}`);
    }
    if (selectedBase) {
        info.push(`Soup Base: ${selectedBase.name}`);
    }
    if (selectedNoodle) {
        info.push(`Noodles: ${selectedNoodle.name}`);
    }
    if (selectedSpicy) {
        info.push(`Spice Level: ${selectedSpicy.name} ${selectedSpicy.icon}`);
    }
    if (selectedSize) {
        info.push(`Size: ${selectedSize.name}`);
    }
    
    if (info.length > 0) {
        elements.selectedInfo.innerHTML = `
            <div class="selected-info-title">Selected:</div>
            ${info.map(item => `<div class="selected-info-item">${item}</div>`).join('')}
        `;
    } else {
        elements.selectedInfo.innerHTML = '';
    }
}

// 下一步
function nextStep() {
    const { currentStep, selectedTopping, selectedBase, selectedNoodle } = appState.noodleCustomization;
    
    if (currentStep === 1 && !selectedTopping) {
        showToast('Please select ingredients first');
        return;
    }
    if (currentStep === 2 && !selectedBase) {
        showToast('Please select soup base first');
        return;
    }
    if (currentStep === 3 && !selectedNoodle) {
        showToast('Please select noodle type first');
        return;
    }
    
    renderStep(currentStep + 1);
}

// 上一步
function prevStep() {
    renderStep(appState.noodleCustomization.currentStep - 1);
}

// 添加面类到购物车
function addNoodleToCart() {
    const { selectedTopping, selectedBase, selectedNoodle, selectedSpicy, selectedSize } = appState.noodleCustomization;
    
    if (!selectedTopping || !selectedBase || !selectedNoodle || !selectedSpicy) {
        showToast('Please complete all selections');
        return;
    }
    
    // 生成短代码（如果选择了规格，需要在代码中包含）
    let code = `${selectedTopping.code} ${selectedBase.code}`.trim();
    if (selectedSize) {
        code = `${selectedSize.code} ${code}`.trim();
    }
    
    // 生成名称（只使用英文）
    const toppingName = selectedTopping.name;
    const baseName = selectedBase.name;
    const noodleName = selectedNoodle.name;
    const spicyName = selectedSpicy.name;
    const sizeName = selectedSize ? selectedSize.name : '';
    
    // 如果有规格，在名称前添加规格信息
    let name = `${toppingName} ${baseName} (${noodleName}, ${spicyName})`;
    if (selectedSize) {
        name = `${sizeName} ${name}`;
    }
    
    // 价格：如果选择了规格，使用规格的价格，否则使用配料的原价
    const price = selectedSize ? selectedSize.price : selectedTopping.price;
    
    // 检查是否选择了桌号
    if (!appState.selectedTable) {
        showToast('Please select a table first');
        return;
    }
    
    const cart = getCurrentCart();
    const cartItem = {
        id: Date.now(),
        name: name,
        code: code,
        price: price,
        description: `${selectedBase.description} | ${noodleName} | ${spicyName} ${selectedSpicy.icon}${selectedSize ? ` | ${sizeName}` : ''}`,
        category: 'noodles',
        quantity: 1,
        table: appState.selectedTable, // 记录桌号
        customization: {
            topping: selectedTopping,
            base: selectedBase,
            noodle: selectedNoodle,
            spicy: selectedSpicy,
            size: selectedSize
        }
    };
    
    cart.push(cartItem);
    setCurrentCart(cart);
    updateCartBadge();
    updateTableStatus();
    showToast('Added to order');
    closeNoodleModal();
}

// 打开购物车
function openCart() {
    elements.cartSidebar.classList.add('open');
    elements.overlay.classList.add('active');
    renderCart();
    // 更新购物车标题显示桌号
    if (elements.cartHeaderTitle) {
        if (appState.selectedTable) {
            elements.cartHeaderTitle.textContent = `Order - Table ${appState.selectedTable}`;
        } else {
            elements.cartHeaderTitle.textContent = 'Order - Select Table';
        }
    }
}

// 关闭购物车
function closeCart() {
    elements.cartSidebar.classList.remove('open');
    elements.overlay.classList.remove('active');
}

// 渲染购物车
function renderCart() {
    const cart = getCurrentCart();
    
    if (cart.length === 0) {
        elements.cartItems.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛒</div>
                <div>Order is empty</div>
            </div>
        `;
        elements.cartTotal.textContent = '0.00';
        return;
    }
    
    elements.cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                ${item.description ? `<div class="cart-item-details">${item.description}</div>` : ''}
                <div class="cart-item-details">Code: ${item.code}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        </div>
    `).join('');
    
    updateCartTotal();
}

// 更新数量
function updateQuantity(itemId, change) {
    const cart = getCurrentCart();
    const item = cart.find(i => i.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        const newCart = cart.filter(i => i.id !== itemId);
        setCurrentCart(newCart);
    } else {
        setCurrentCart(cart);
    }
    
    updateCartBadge();
    updateTableStatus();
    renderCart();
}

// 更新购物车总计
function updateCartTotal() {
    const cart = getCurrentCart();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    elements.cartTotal.textContent = total.toFixed(2);
}

// 更新购物车徽章
function updateCartBadge() {
    const cart = getCurrentCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartBadge.textContent = count;
    elements.cartBadge.style.display = count > 0 ? 'flex' : 'none';
}

// 更新桌号状态显示
function updateTableStatus() {
    const tableNumbers = ['1', '2', '3', '4', '5a', '5b', '6a', '6b', '7a', '7b'];
    
    elements.tableList.querySelectorAll('.table-item').forEach(item => {
        const tableNum = item.dataset.tableNum;
        const cart = appState.tableCarts[tableNum] || [];
        const orders = appState.tableOrders[tableNum] || [];
        const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const orderCount = orders.length;
        
        // 移除旧的指示器
        const oldIndicator = item.querySelector('.table-indicator');
        if (oldIndicator) {
            oldIndicator.remove();
        }
        
        // 如果有购物车项目或订单，显示指示器
        if (cartCount > 0 || orderCount > 0) {
            const indicator = document.createElement('span');
            indicator.className = 'table-indicator';
            indicator.textContent = cartCount > 0 ? cartCount : (orderCount > 0 ? '✓' : '');
            item.appendChild(indicator);
        }
    });
}

// 提交订单
function submitOrder() {
    // 检查是否选择了桌号
    if (!appState.selectedTable) {
        showToast('Please select a table first');
        return;
    }
    
    const cart = getCurrentCart();
    
    if (cart.length === 0) {
        showToast('Order is empty');
        return;
    }
    
    // 创建订单对象
    const order = {
        id: Date.now(),
        table: appState.selectedTable,
        items: [...cart], // 复制购物车项目
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        timestamp: new Date().toISOString(),
        status: 'submitted'
    };
    
    // 将订单添加到该桌号的订单列表
    if (!appState.tableOrders[appState.selectedTable]) {
        appState.tableOrders[appState.selectedTable] = [];
    }
    appState.tableOrders[appState.selectedTable].push(order);
    
    // 生成订单摘要
    let orderSummary = `Table: ${appState.selectedTable}\n`;
    orderSummary += `Order #${order.id}\n`;
    orderSummary += `Order Details:\n\n`;
    cart.forEach((item, index) => {
        orderSummary += `${index + 1}. ${item.name} x${item.quantity}\n`;
        orderSummary += `   Code: ${item.code}\n`;
        orderSummary += `   Price: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    orderSummary += `Total: $${order.total.toFixed(2)}`;
    
    // 这里可以发送到服务器或打印
    console.log('Order submitted:', order);
    console.log(orderSummary);
    alert(orderSummary);
    
    // 清空当前桌号的购物车
    setCurrentCart([]);
    updateCartBadge();
    updateTableStatus();
    renderCart();
    showToast('Order submitted');
}

// 清空购物车
function clearCart() {
    if (confirm('Clear order?')) {
        setCurrentCart([]);
        updateCartBadge();
        updateTableStatus();
        renderCart();
        showToast('Order cleared');
    }
}

// 通过短代码添加
function addByShortCode() {
    const code = elements.shortCodeInput.value.trim().toUpperCase();
    if (!code) {
        showToast('Please enter code');
        return;
    }
    
    // 检查是否选择了桌号
    if (!appState.selectedTable) {
        showToast('Please select a table first');
        return;
    }
    
    const mapped = shortCodeMap[code];
    if (!mapped) {
        showToast('Code not found');
        return;
    }
    
    if (mapped.type === 'noodle') {
        // 面类需要定制
        appState.noodleCustomization = {
            currentStep: 1,
            selectedTopping: mapped.topping,
            selectedBase: mapped.base,
            selectedNoodle: null,
            selectedSpicy: null,
            selectedSize: null  // 规格选择
        };
        openNoodleModal();
        renderStep(2); // 从第二步开始，因为配料和汤底已选择
    } else {
        // 其他直接添加
        addToCart(mapped.item.id, mapped.type);
    }
    
    elements.shortCodeInput.value = '';
}

// 显示提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// 将函数暴露到全局作用域，供 HTML onclick 使用
window.startNoodleCustomization = startNoodleCustomization;
window.addToCart = addToCart;
window.selectTopping = selectTopping;
window.selectBase = selectBase;
window.selectNoodle = selectNoodle;
window.selectSpicy = selectSpicy;
window.selectSize = selectSize;
window.updateQuantity = updateQuantity;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
