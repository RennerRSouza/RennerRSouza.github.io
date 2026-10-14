let appliances = JSON.parse(localStorage.getItem('myEnergyApp')) || [];
let isDarkMode = localStorage.getItem('darkMode') === 'true';

if (isDarkMode) {
    document.body.classList.add('dark-mode');
    document.getElementById('themeBtn').innerText = '☀️';
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.getElementById('themeBtn').innerText = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDarkMode);
}

function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    
    const itemData = {
        id: id ? parseInt(id) : Date.now(),
        comodo: document.getElementById('comodo').value,
        aparelho: document.getElementById('aparelho').value,
        potencia: parseFloat(document.getElementById('potencia').value),
        horas: parseFloat(document.getElementById('horas').value)
    };

    if (id) {
        // Atualiza item existente
        const index = appliances.findIndex(app => app.id === parseInt(id));
        appliances[index] = itemData;
        cancelEdit(); // Limpa estado de edição
    } else {
        // Adiciona novo item
        appliances.push(itemData);
        document.getElementById('aparelho').value = '';
        document.getElementById('potencia').value = '';
        document.getElementById('horas').value = '';
        document.getElementById('aparelho').focus();
    }
    
    saveData();
}

function editAppliance(id) {
    const app = appliances.find(a => a.id === id);
    document.getElementById('editId').value = app.id;
    document.getElementById('comodo').value = app.comodo;
    document.getElementById('aparelho').value = app.aparelho;
    document.getElementById('potencia').value = app.potencia;
    document.getElementById('horas').value = app.horas;
    
    document.getElementById('submitBtn').innerText = '💾 Salvar Alterações';
    document.getElementById('cancelBtn').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
    document.getElementById('editId').value = '';
    document.getElementById('aparelho').value = '';
    document.getElementById('potencia').value = '';
    document.getElementById('horas').value = '';
    
    document.getElementById('submitBtn').innerText = '➕ Adicionar';
    document.getElementById('cancelBtn').style.display = 'none';
}

function deleteAppliance(id) {
    if(confirm("Deseja remover este aparelho da lista?")) {
        appliances = appliances.filter(app => app.id !== id);
        saveData();
    }
}

function sortByCost() {
    appliances.sort((a, b) => {
        const costA = a.potencia * a.horas;
        const costB = b.potencia * b.horas;
        return costB - costA; // Decrescente
    });
    saveData();
}

function saveData() {
    localStorage.setItem('myEnergyApp', JSON.stringify(appliances));
    calculate(); 
}

function calculate() {
    const tarifa = parseFloat(document.getElementById('tarifa').value) || 0;
    let totalKwh = 0;

    appliances.forEach(app => {
        totalKwh += (app.potencia * app.horas * 30) / 1000;
    });

    const totalCost = totalKwh * tarifa;

    document.getElementById('totalKwh').innerText = totalKwh.toFixed(1);
    document.getElementById('totalCost').innerText = 'R$ ' + totalCost.toFixed(2);
    
    renderList(totalCost, tarifa); 
}

function renderList(totalCostGlobal, tarifa) {
    const container = document.getElementById('listContainer');
    container.innerHTML = '';
    
    if (appliances.length === 0) {
        container.innerHTML = '<p style="text-align:center; color: var(--text-muted); font-size: 0.9em; padding: 20px;">Nenhum aparelho cadastrado. Adicione acima!</p>';
        return;
    }

    appliances.forEach(app => {
        const consumoMes = (app.potencia * app.horas * 30) / 1000;
        const custoMes = consumoMes * tarifa;
        
        // Calcula a porcentagem para a barra visual
        const percentual = totalCostGlobal > 0 ? ((custoMes / totalCostGlobal) * 100).toFixed(1) : 0;
        
        // Muda a cor da barra dependendo do impacto (Vermelho > 25%, Laranja > 10%, Azul < 10%)
        let barColor = 'var(--primary)';
        if (percentual > 25) barColor = 'var(--danger)';
        else if (percentual > 10) barColor = 'var(--warning)';

        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <div class="item-details">
                <span class="badge">${app.comodo}</span>
                <h4>${app.aparelho}</h4>
                <p>${app.potencia}W • ${app.horas}h/dia • ${consumoMes.toFixed(1)} kWh/mês</p>
                <p style="font-weight:bold; font-size:1.1em; margin-top: 4px;">R$ ${custoMes.toFixed(2)} <span style="font-size: 0.7em; font-weight: normal; color: var(--text-muted);">(${percentual}%)</span></p>
                <div class="impact-bar-bg">
                    <div class="impact-bar-fill" style="width: ${percentual}%; background-color: ${barColor};"></div>
                </div>
            </div>
            <div class="actions">
                <button class="btn-action edit" onclick="editAppliance(${app.id})" title="Editar">✏️</button>
                <button class="btn-action delete" onclick="deleteAppliance(${app.id})" title="Remover">🗑️</button>
            </div>
        `;
        container.appendChild(div);
    });
}

calculate();
