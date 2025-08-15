function clearForm(form) {
    form.querySelectorAll("input").forEach((input) => (input.value = ""));
}

// 1

const firstQuestion = document.querySelector('.question[data-order="1"]');

function userInfo(e) {
    e.preventDefault();
    const userName = document.querySelector("#name").value.trim();
    const userAge = Number(document.querySelector("#age").value.trim());
    const firstOutput = document.querySelector('output[data-out="1"]');

    if (!userName || isNaN(userAge) || userAge < 0) {
        alert("INvalido");
        return;
    }
    firstOutput.textContent = `Nome: ${userName} \nIdade: ${userAge}`;
    clearForm(firstQuestion);
}

firstQuestion.addEventListener("submit", userInfo);

// 2

const secondQuestion = document.querySelector('.question[data-order="2"]');

function operations(e) {
    e.preventDefault();
    const numberOne = Number(document.querySelector("#number-one").value.trim());
    const numberTwo = Number(document.querySelector("#number-two").value.trim());
    const secondOutput = document.querySelector('output[data-out="2"');

    if (isNaN(numberOne) || isNaN(numberTwo)) {
        alert("Invalido");
        return;
    }

    secondOutput.textContent = `Soma: ${numberOne + numberTwo}\nSubtração: ${numberOne - numberTwo}\nMultiplicação: ${
        numberOne * numberTwo
    }\nDivisão: ${numberOne / numberTwo}`;
    clearForm(secondQuestion);
}

secondQuestion.addEventListener("submit", operations);

// 3

function userAge(age) {
    age >= 18 ? console.log("Maior de idade.") : console.log("Menor de idade.");
}

userAge(18);

// 4

for (let i = 0; i <= 100; i++) {
    console.log(i);
}

// 5

function sumNumbers(num1, num2) {
    console.log(num1 + num2);
}

sumNumbers(20, 20);

// 6

const arr = ["Maça", "Banana", "Uva", "Morango", "Melancia"];

arr.forEach((fruta) => {
    console.log(fruta);
});

// 7

const livro = {
    titulo: "Os Miseraveis",
    autor: "Victor Hugo",
    paginas: 64,
};

for (let key in livro) {
    console.log(livro[key]);
}

// 8

const btn = document.querySelector("button");

btn.addEventListener("click", () => alert("Clicou"));

// 9

function stringUp(str) {
    const strArr = str.split(" ");
    for (let i = 0; i < strArr.length; i++) {
        strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
    }

    return strArr.join(" ");
}

console.log(stringUp("O gato roeu a roupa do rei de roma."));

// 10

async function searchUsers(req) {
    try {
        req = await fetch("https://jsonplaceholder.typicode.com/users");

        const users = await req.json();

        users.forEach((user) => {
            console.log(user.name);
        });
    } catch (error) {
        console.error(error);
    }
}

searchUsers();
