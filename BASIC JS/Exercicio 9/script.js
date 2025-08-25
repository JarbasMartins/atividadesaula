const output = document.querySelector("output");
const button = document.querySelector("button");
const text = document.querySelector("#frase");

function stringUp() {
    const str = text.value.trim();
    let arr = str.split(" ");

    if (!str || arr.length === 0) {
        output.innerHTML = `<span>Inválido</span>`;
        return;
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    output.textContent = arr.join(" ");
    text.value = "";
}

button.addEventListener("click", (e) => {
    e.preventDefault();
    stringUp();
});
