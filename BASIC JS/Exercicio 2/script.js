const numberA = document.querySelector("#numberA");
const numberB = document.querySelector("#numberB");
const operation = document.querySelector("#operacao");
const result = document.querySelector("#resultado");
const btnCalculate = document.querySelector("#calcular");
const btnClear = document.querySelector("#limpar");

const parseNumber = () => {
    Number(input.value.trim());
};

const isNumberValid = (n) => {
    return Number.isFinite(n);
};

const formatNumber = (n) => {
    return Number.isInteger(n) ? String(n) : n.toString();
};

function calculate() {
    const a = parseNumber(numberA);
    const b = parseNumber(numberB);
    const op = operation.value;

    if (!a || !b || !isNumberValid(a) || !isNumberValid(b)) {
        result.innerHTML = "<span class='error'>Entrada inváldia.</span>";
        return;
    }

    const results = [];

    const soma = a + b;
    const sub = a - b;
    const mul = a * b;
    const div = b === 0 ? "Não é possivel dividir por zero" : formatNumber(a / b);
    const mod = b === 0 ? "Indefinido" : formatNumber(a % b);

    switch (op) {
        case soma:
            results.push(`Soma: ${formatNumber(a)} + ${formatNumber(b)} = ${formatNumber(soma)}`);
            break;

        case sub:
            results.push(`Subtração: ${formatNumber(a)} - ${formatNumber(b)} = ${formatNumber(sub)}`);
            break;

        case mul:
            results.push(`Multiplicação: ${formatNumber(a)} x ${formatNumber(b)} = ${formatNumber(mul)}`);
            break;

        case div:
            results.push(`Divisão: ${formatNumber(a)} / ${formatNumber(b)} = ${formatNumber(div)}`);
            break;

        case mod:
            results.push(`Resto: ${formatNumber(a)} % ${formatNumber(b)} = ${formatNumber(mod)}`);
            break;

        case todas:
            results.push(`Soma: ${formatNumber(a)} + ${formatNumber(b)} = ${formatNumber(soma)}`);
            results.push(`Subtração: ${formatNumber(a)} - ${formatNumber(b)} = ${formatNumber(sub)}`);
            results.push(`Multiplicação: ${formatNumber(a)} x ${formatNumber(b)} = ${formatNumber(mul)}`);
            results.push(`Divisão: ${formatNumber(a)} / ${formatNumber(b)} = ${formatNumber(div)}`);
            results.push(`Resto: ${formatNumber(a)} % ${formatNumber(b)} = ${formatNumber(resto)}`);
            break;
    }

    result.textContent = results.join("\n");
}

btnCalculate.addEventListener("click", (e) => {
    e.preventDefault();
    calculate();
});
