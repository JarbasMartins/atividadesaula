const numberA = document.querySelector("#numberA");
const numberB = document.querySelector("#numberB");
const button = document.querySelector("button");
const output = document.querySelector("output");

const getValue = (input) => {
    return Number(input.value.trim());
};

function sumNumbers() {
    const a = getValue(numberA);
    const b = getValue(numberB);

    if (!a || !b || isNaN(a) || isNaN(b)) {
        output.innerHTML = "<span>Inválido</span>";
        return;
    }

    const sum = a + b;

    output.textContent = sum;
    numberA.value = "";
    numberB.value = "";
}

button.addEventListener("click", (e) => {
    e.preventDefault();
    sumNumbers();
});
