const validUser = "Familiar";
const validPass = "123";
const users = ["Familiar"];

let db = JSON.parse(localStorage.getItem('feiraDB')) || {};
users.forEach(u => { if (!db[u]) db[u] = []; });

let currentUser = "";

function saveToStorage() { localStorage.setItem('feiraDB', JSON.stringify(db)); }

function handleLogin() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if(u === validUser && p === validPass) {
        document.getElementById('login-screen').classList.add('hidden');
        showDashboard();
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

function showDashboard() {
    document.getElementById('dashboard-screen').classList.remove('hidden');
    document.getElementById('list-screen').classList.add('hidden');
    const grid = document.getElementById('user-list');
    grid.innerHTML = "";
    users.forEach(user => {
        grid.innerHTML += `<div class="user-btn" onclick="openUserList('${user}')">${user}</div>`;
    });
}

function openUserList(user) {
    currentUser = user;
    document.getElementById('dashboard-screen').classList.add('hidden');
    document.getElementById('list-screen').classList.remove('hidden');
    document.getElementById('current-user-title').innerText = `Lista de ${user}`;
    clearInputs();
    renderTable();
}

function addItem() {
    const name = document.getElementById('item-name').value;
    const qty = parseFloat(document.getElementById('item-qty').value);
    const price = parseFloat(document.getElementById('item-price').value);
    const editIndex = document.getElementById('edit-index').value;

    if(!name || isNaN(qty) || isNaN(price)) return alert("Preencha todos os campos!");

    const itemData = { name, qty, price, total: (qty * price) };

    if(editIndex === "") {
        db[currentUser].push(itemData);
    } else {
        db[currentUser][editIndex] = itemData;
        document.getElementById('add-btn').innerText = "Salvar";
    }

    saveToStorage();
    clearInputs();
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('table-body');
    const searchTerm = document.getElementById('item-name').value.toLowerCase();
    const budgetInput = document.getElementById('budget-value').value;
    const balanceSpan = document.getElementById('remaining-balance');
    
    tbody.innerHTML = "";
    let grandTotal = 0;

    db[currentUser].forEach((item, index) => {
        if (item.name.toLowerCase().includes(searchTerm)) {
            grandTotal += item.total;
            tbody.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.qty}</td>
                    <td>R$ ${item.price.toFixed(2)}</td>
                    <td>R$ ${item.total.toFixed(2)}</td>
                    <td>
                        <button class="btn-edit" onclick="editItem(${index})">✏️</button>
                        <button class="btn-delete" onclick="deleteItem(${index})">🗑️</button>
                    </td>
                </tr>`;
        }
    });

    // Atualiza o Total Geral
    document.getElementById('grand-total').innerText = grandTotal.toFixed(2);

    // Lógica do Orçamento
    const budget = parseFloat(budgetInput) || 0;
    const remaining = budget - grandTotal;
    
    balanceSpan.innerText = remaining.toFixed(2);

    // Muda a cor do saldo (Verde se tiver dinheiro, Vermelho se estourar)
    if (remaining < 0) {
        balanceSpan.parentElement.className = "balance-negative";
    } else {
        balanceSpan.parentElement.className = "balance-positive";
    }
}

// FUNÇÃO PARA CAPTURAR E COMPARTILHAR A LISTA
function shareWhatsApp() {
    const list = db[currentUser];
    if (list.length === 0) return alert("A lista está vazia!");

    // Cabeçalho
    let text = `*LISTA DE FEIRA - ${currentUser.toUpperCase()}*\n`;
    text += "```----------------------------------\n";
    text += "ITEM            | QTD | UNIT | TOTAL\n";
    text += "----------------------------------\n";

    let totalGeral = 0;

    list.forEach(item => {
        // Formata cada coluna para ter um tamanho fixo (Padding)
        const name = item.name.substring(0, 15).padEnd(15, ' ');
        const qty = item.qty.toString().padEnd(3, ' ');
        const price = item.price.toFixed(2).padEnd(5, ' ');
        const total = item.total.toFixed(2);
        
        text += `${name} | ${qty} | ${price} | ${total}\n`;
        totalGeral += item.total;
    });

    text += "----------------------------------```\n";
    text += `*TOTAL GERAL: R$ ${totalGeral.toFixed(2)}*`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
}

function deleteItem(index) {
    if(confirm("Excluir item?")) {
        db[currentUser].splice(index, 1);
        saveToStorage();
        renderTable();
    }
}

function clearFullList() {
    if(confirm("Apagar toda a lista?")) {
        db[currentUser] = [];
        saveToStorage();
        renderTable();
    }
}

function editItem(index) {
    const item = db[currentUser][index];
    document.getElementById('item-name').value = item.name;
    document.getElementById('item-qty').value = item.qty;
    document.getElementById('item-price').value = item.price;
    document.getElementById('edit-index').value = index;
    document.getElementById('add-btn').innerText = "OK";
    window.scrollTo(0,0);
}

function clearInputs() {
    document.getElementById('item-name').value = "";
    document.getElementById('item-qty').value = "";
    document.getElementById('item-price').value = "";
    document.getElementById('edit-index').value = "";
    document.getElementById('add-btn').innerText = "Salvar";
}

function logout() { location.reload(); }