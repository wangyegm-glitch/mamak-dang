// 应用状态
const appState = {
    currentCategory: 'appetizer',
    cart: [],
    noodleCustomization: {
        currentStep: 1,
        selectedTopping: null,
        selectedBase: null,
        selectedNoodle: null,
        selectedSpicy: null,
        selectedSize: null  // 规格选择（Cute Size）
    }
};

// DOM 元素
const elements = {
    categoryTabs: document.getElementById('categoryTabs'),
    menuContainer: document.getElementById('menuContainer'),
    cartIcon: document.getElementById('cartIcon'),
    cartBadge: document.getElementById('cartBadge'),
    cartSidebar: document.getElementById('cartSidebar'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
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
    renderMenu('appetizer');
    updateCartBadge();
}

// 设置事件监听器
function setupEventListeners() {
    // 分类标签切换
    elements.categoryTabs.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            const category = e.target.dataset.category;
            switchCategory(category);
        }
    });

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

// 切换分类
function switchCategory(category) {
    appState.currentCategory = category;
    
    // 更新标签状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    renderMenu(category);
}

// 渲染菜单
function renderMenu(category) {
    elements.menuContainer.innerHTML = '';

    if (category === 'noodles') {
        // 面类特殊处理 - 显示"开始定制"按钮
        const noodleCard = document.createElement('div');
        noodleCard.className = 'menu-item';
        noodleCard.innerHTML = `
            <div class="menu-item-image">🍜</div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <div class="menu-item-name">Customize Noodles<br>定制面类</div>
                </div>
                <div class="menu-item-description">Select ingredients, soup base, noodle type and spice level<br>选择配料、汤底、面条类型和辣度</div>
                <button class="add-btn" onclick="startNoodleCustomization()">Start Customization<br>开始定制</button>
            </div>
        `;
        elements.menuContainer.appendChild(noodleCard);
    } else {
        const items = menuData[category] || [];
        items.forEach(item => {
            const menuItem = createMenuItem(item, category);
            elements.menuContainer.appendChild(menuItem);
        });
    }
}

// 创建菜单项
function createMenuItem(item, category) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    const nameDisplay = item.nameCN ? `${item.name}<br>${item.nameCN}` : item.name;
    // 生成随机评分（4.0-5.0之间）
    const rating = (4.0 + Math.random() * 1.0).toFixed(1);
    const reviewCount = Math.floor(Math.random() * 200) + 50;
    
    div.innerHTML = `
        <div class="menu-item-image">🍽️</div>
        <div class="menu-item-content">
            <div class="menu-item-header">
                <div>
                    <div class="menu-item-name">${nameDisplay}</div>
                    <div class="menu-item-rating">
                        <span class="rating-stars">${'⭐'.repeat(5)}</span>
                        <span class="rating-text">${rating} (${reviewCount} Reviews)</span>
                    </div>
                </div>
                <div class="menu-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="menu-item-code">Code / 代码: ${item.code}</div>
            ${item.description ? `<div class="menu-item-description">${item.description}</div>` : ''}
            <button class="add-btn" onclick="addToCart(${item.id}, '${category}')">Add to Order<br>添加到订单</button>
        </div>
    `;
    return div;
}

// 添加到购物车
function addToCart(itemId, category) {
    const items = menuData[category];
    const item = items.find(i => i.id === itemId);
    
    if (!item) return;

    const cartItem = {
        id: Date.now(),
        name: item.nameCN || item.name,
        code: item.code,
        price: item.price,
        description: item.description || '',
        category: category,
        quantity: 1
    };

    appState.cart.push(cartItem);
    updateCartBadge();
    showToast('已添加到订单');
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
        <h3 style="margin-bottom: 20px; color: #333;">Select Ingredients<br>选择配料</h3>
        <div class="option-grid">
            ${toppings.map(topping => {
                const nameDisplay = topping.nameCN ? `${topping.name}<br>${topping.nameCN}` : topping.name;
                return `
                <div class="option-card ${appState.noodleCustomization.selectedTopping?.id === topping.id ? 'selected' : ''}" 
                     onclick="selectTopping('${topping.id}')">
                    <div class="option-card-name">${nameDisplay}</div>
                    <div class="option-card-price">$${topping.price.toFixed(2)}</div>
                    ${topping.note ? `<div style="font-size: 11px; color: #999; margin-top: 5px;">${topping.note}</div>` : ''}
                </div>
            `;
            }).join('')}
        </div>
        <!-- 规格选择 -->
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <h4 style="margin-bottom: 12px; color: #666; font-size: 14px; font-weight: 600;">Size / 规格（可选）</h4>
            <div class="option-grid" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));">
                ${(() => {
                    const cuteSize = menuData.noodles.toppings.find(t => t.id === 'small');
                    if (!cuteSize) return '';
                    const nameDisplay = cuteSize.nameCN ? `${cuteSize.name}<br>${cuteSize.nameCN}` : cuteSize.name;
                    return `
                    <div class="option-card ${appState.noodleCustomization.selectedSize?.id === cuteSize.id ? 'selected' : ''}" 
                         onclick="selectSize('${cuteSize.id}')">
                        <div class="option-card-name">${nameDisplay}</div>
                        <div class="option-card-price">$${cuteSize.price.toFixed(2)}</div>
                        ${cuteSize.note ? `<div style="font-size: 11px; color: #999; margin-top: 5px;">${cuteSize.note}</div>` : ''}
                    </div>
                `;
                })()}
            </div>
        </div>
    `;
}

// 渲染汤底选择步骤
function renderBaseStep() {
    return `
        <h3 style="margin-bottom: 20px; color: #333;">Select Soup Base<br>选择汤底</h3>
        <div class="option-grid">
            ${menuData.noodles.bases.map(base => {
                const nameDisplay = base.nameCN ? `${base.name}<br>${base.nameCN}` : base.name;
                return `
                <div class="option-card ${appState.noodleCustomization.selectedBase?.id === base.id ? 'selected' : ''}" 
                     onclick="selectBase('${base.id}')">
                    <div class="option-card-name">${nameDisplay}</div>
                    <div style="font-size: 12px; color: #666; margin-top: 5px;">${base.description}</div>
                </div>
            `;
            }).join('')}
        </div>
    `;
}

// 渲染面条类型选择步骤
function renderNoodleStep() {
    return `
        <h3 style="margin-bottom: 20px; color: #333;">Select Noodle Type<br>选择面条类型</h3>
        <div class="option-grid">
            ${menuData.noodles.noodleTypes.map(noodle => {
                const nameDisplay = noodle.nameCN ? `${noodle.name}<br>${noodle.nameCN}` : noodle.name;
                return `
                <div class="option-card ${appState.noodleCustomization.selectedNoodle?.id === noodle.id ? 'selected' : ''}" 
                     onclick="selectNoodle('${noodle.id}')">
                    <div class="option-card-name">${nameDisplay}</div>
                </div>
            `;
            }).join('')}
        </div>
    `;
}

// 渲染辣度选择步骤
function renderSpicyStep() {
    return `
        <h3 style="margin-bottom: 20px; color: #333;">Select Spice Level<br>选择辣度</h3>
        <div class="spicy-levels">
            ${menuData.noodles.spicyLevels.map(level => {
                const nameDisplay = level.nameCN ? `${level.name}<br>${level.nameCN}` : level.name;
                return `
                <div class="spicy-option ${appState.noodleCustomization.selectedSpicy?.id === level.id ? 'selected' : ''}" 
                     onclick="selectSpicy(${level.id})">
                    <div>
                        <div class="spicy-name">${nameDisplay}</div>
                    </div>
                    <div class="spicy-icon">${level.icon}</div>
                </div>
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
        const toppingDisplay = selectedTopping.nameCN ? `${selectedTopping.name} / ${selectedTopping.nameCN}` : selectedTopping.name;
        info.push(`Ingredients / 配料: ${toppingDisplay}`);
    }
    if (selectedBase) {
        const baseDisplay = selectedBase.nameCN ? `${selectedBase.name} / ${selectedBase.nameCN}` : selectedBase.name;
        info.push(`Soup Base / 汤底: ${baseDisplay}`);
    }
    if (selectedNoodle) {
        const noodleDisplay = selectedNoodle.nameCN ? `${selectedNoodle.name} / ${selectedNoodle.nameCN}` : selectedNoodle.name;
        info.push(`Noodles / 面条: ${noodleDisplay}`);
    }
    if (selectedSpicy) {
        const spicyDisplay = selectedSpicy.nameCN ? `${selectedSpicy.name} / ${selectedSpicy.nameCN}` : selectedSpicy.name;
        info.push(`Spice Level / 辣度: ${spicyDisplay} ${selectedSpicy.icon}`);
    }
    if (selectedSize) {
        const sizeDisplay = selectedSize.nameCN ? `${selectedSize.name} / ${selectedSize.nameCN}` : selectedSize.name;
        info.push(`Size / 规格: ${sizeDisplay}`);
    }
    
    if (info.length > 0) {
        elements.selectedInfo.innerHTML = `
            <div class="selected-info-title">Selected / 已选择：</div>
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
        showToast('Please select ingredients first / 请先选择配料');
        return;
    }
    if (currentStep === 2 && !selectedBase) {
        showToast('Please select soup base first / 请先选择汤底');
        return;
    }
    if (currentStep === 3 && !selectedNoodle) {
        showToast('Please select noodle type first / 请先选择面条类型');
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
        showToast('Please complete all selections / 请完成所有选择');
        return;
    }
    
    // 生成短代码（如果选择了规格，需要在代码中包含）
    let code = `${selectedTopping.code} ${selectedBase.code}`.trim();
    if (selectedSize) {
        code = `${selectedSize.code} ${code}`.trim();
    }
    
    // 生成名称（双语）
    const toppingName = selectedTopping.nameCN ? `${selectedTopping.name} / ${selectedTopping.nameCN}` : selectedTopping.name;
    const baseName = selectedBase.nameCN ? `${selectedBase.name} / ${selectedBase.nameCN}` : selectedBase.name;
    const noodleName = selectedNoodle.nameCN ? `${selectedNoodle.name} / ${selectedNoodle.nameCN}` : selectedNoodle.name;
    const spicyName = selectedSpicy.nameCN ? `${selectedSpicy.name} / ${selectedSpicy.nameCN}` : selectedSpicy.name;
    const sizeName = selectedSize ? (selectedSize.nameCN ? `${selectedSize.name} / ${selectedSize.nameCN}` : selectedSize.name) : '';
    
    // 如果有规格，在名称前添加规格信息
    let name = `${toppingName} ${baseName} (${noodleName}, ${spicyName})`;
    if (selectedSize) {
        name = `${sizeName} ${name}`;
    }
    
    // 价格：如果选择了规格，使用规格的价格，否则使用配料的原价
    const price = selectedSize ? selectedSize.price : selectedTopping.price;
    
    const cartItem = {
        id: Date.now(),
        name: name,
        nameEN: selectedSize ? `${selectedSize.name} ${selectedTopping.name} ${selectedBase.name} (${selectedNoodle.name}, ${selectedSpicy.name})` : `${selectedTopping.name} ${selectedBase.name} (${selectedNoodle.name}, ${selectedSpicy.name})`,
        nameCN: selectedSize ? `${selectedSize.nameCN || selectedSize.name} ${selectedTopping.nameCN || selectedTopping.name} ${selectedBase.nameCN || selectedBase.name} (${selectedNoodle.nameCN || selectedNoodle.name}, ${selectedSpicy.nameCN || selectedSpicy.name})` : `${selectedTopping.nameCN || selectedTopping.name} ${selectedBase.nameCN || selectedBase.name} (${selectedNoodle.nameCN || selectedNoodle.name}, ${selectedSpicy.nameCN || selectedSpicy.name})`,
        code: code,
        price: price,
        description: `${selectedBase.description} | ${noodleName} | ${spicyName} ${selectedSpicy.icon}${selectedSize ? ` | ${sizeName}` : ''}`,
        category: 'noodles',
        quantity: 1,
        customization: {
            topping: selectedTopping,
            base: selectedBase,
            noodle: selectedNoodle,
            spicy: selectedSpicy,
            size: selectedSize
        }
    };
    
    appState.cart.push(cartItem);
    updateCartBadge();
    showToast('Added to order / 已添加到订单');
    closeNoodleModal();
}

// 打开购物车
function openCart() {
    elements.cartSidebar.classList.add('open');
    elements.overlay.classList.add('active');
    renderCart();
}

// 关闭购物车
function closeCart() {
    elements.cartSidebar.classList.remove('open');
    elements.overlay.classList.remove('active');
}

// 渲染购物车
function renderCart() {
    if (appState.cart.length === 0) {
        elements.cartItems.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛒</div>
                <div>订单为空</div>
            </div>
        `;
        elements.cartTotal.textContent = '0.00';
        return;
    }
    
    elements.cartItems.innerHTML = appState.cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                ${item.description ? `<div class="cart-item-details">${item.description}</div>` : ''}
                <div class="cart-item-details">代码: ${item.code}</div>
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
    const item = appState.cart.find(i => i.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        appState.cart = appState.cart.filter(i => i.id !== itemId);
    }
    
    updateCartBadge();
    renderCart();
}

// 更新购物车总计
function updateCartTotal() {
    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    elements.cartTotal.textContent = total.toFixed(2);
}

// 更新购物车徽章
function updateCartBadge() {
    const count = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartBadge.textContent = count;
    elements.cartBadge.style.display = count > 0 ? 'flex' : 'none';
}

// 提交订单
function submitOrder() {
    if (appState.cart.length === 0) {
        showToast('订单为空');
        return;
    }
    
    // 生成订单摘要
    let orderSummary = '订单详情：\n\n';
    appState.cart.forEach((item, index) => {
        orderSummary += `${index + 1}. ${item.name} x${item.quantity}\n`;
        orderSummary += `   代码: ${item.code}\n`;
        orderSummary += `   价格: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderSummary += `总计: $${total.toFixed(2)}`;
    
    // 这里可以发送到服务器或打印
    console.log(orderSummary);
    alert(orderSummary);
    
    // 清空购物车
    clearCart();
    showToast('订单已提交');
}

// 清空购物车
function clearCart() {
    if (confirm('确定要清空订单吗？')) {
        appState.cart = [];
        updateCartBadge();
        renderCart();
        showToast('订单已清空');
    }
}

// 通过短代码添加
function addByShortCode() {
    const code = elements.shortCodeInput.value.trim().toUpperCase();
    if (!code) {
        showToast('请输入短代码');
        return;
    }
    
    const mapped = shortCodeMap[code];
    if (!mapped) {
        showToast('未找到该短代码');
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
