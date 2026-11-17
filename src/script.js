const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const resultEl = document.getElementById('result');
const buttons = document.querySelector('.buttons');

function parseNumber(value) {
  const str = value.trim().replace(',', '.');
  if (str === '') return NaN;
  const num = Number(str);
  return Number.isFinite(num) ? num : NaN;
}

function showResult(text) {
  resultEl.textContent = text;
  resultEl.classList.remove('error');
}

function showError(text) {
  resultEl.textContent = text;
  resultEl.classList.add('error');
}

function calculate(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
  }
}

buttons.addEventListener('click', (event) => {
  const op = event.target.dataset.op;
  if (!op) return;

  const a = parseNumber(num1Input.value);
  const b = parseNumber(num2Input.value);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    showError('Помилка: введіть коректні числа в обидва поля!');
    return;
  }

  if (op === '/' && b === 0) {
    showError('Помилка: ділити на нуль не можна!');
    return;
  }

  let result = calculate(a, b, op);

  if (!Number.isInteger(result)) {
    result = Math.round((result + Number.EPSILON) * 100) / 100;
  }

  showResult(result);
});