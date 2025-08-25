const inputAge = document.querySelector("#age");
const button = document.querySelector("button");
const output = document.querySelector("output");

function verifyAge() {
    if (!inputAge || inputAge.value.trim() === "") {
        output.innerHTML = `<span>Inválido</span>`;
        return;
    }

    const age = getValue(inputAge);
    if (isNaN(age)) return;

    age >= 18
        ? (output.textContent = `Você é maior de idade por ter ${age} anos.`)
        : (output.textContent = `Você não é maior de idade por que ainda tem ${age} anos.`);
}

button.addEventListener("click", (e) => {
    e.preventDefault();
    verifyAge();
});
