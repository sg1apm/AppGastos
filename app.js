let expenses = [];

function loadExpenses() {
  try {
    const data = JSON.parse(localStorage.getItem('expenses') || '[]');
    if (Array.isArray(data)) {
      expenses = data;
    }
  } catch (e) {
    expenses = [];
  }
}

function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function updateTotal() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  document.getElementById('total').textContent = total.toFixed(2);
}

function render() {
  const ul = document.getElementById('expenses');
  ul.innerHTML = '';

  expenses.forEach((e, i) => {
    const li = document.createElement('li');

    const textNode = document.createTextNode(`${e.desc} - €${e.amount.toFixed(2)}`);
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.classList.add('delete-btn');
    btn.addEventListener('click', () => {
      removeExpense(i);
    });

    li.appendChild(textNode);
    li.appendChild(btn);
    ul.appendChild(li);
  });

  updateTotal();
}

function addExpense() {
  const descInput = document.getElementById('desc');
  const amountInput = document.getElementById('amount');

  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!desc || isNaN(amount) || amount <= 0) {
    alert('Introduce una descripción válida y una cantidad mayor que 0.');
    return;
  }

  expenses.push({ desc, amount });
  saveExpenses();
  render();

  descInput.value = '';
  amountInput.value = '';
  descInput.focus();
}

function removeExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  render();
}

document.getElementById('addExpenseBtn').addEventListener('click', addExpense);

loadExpenses();
render();