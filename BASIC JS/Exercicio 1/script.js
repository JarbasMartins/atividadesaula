// 1

const question = document.querySelector(".question");

function userInfo(e) {
    e.preventDefault();
    const userName = document.querySelector("#name").value.trim();
    const userAge = parseInt(document.querySelector("#age").value.trim());
    const output = document.querySelector("output");

    if (!userName || isNaN(userAge) || userAge < 0) {
        alert("INvalido");
        return;
    }
    output.textContent = `Nome: ${userName} \nIdade: ${userAge}`;
    question.reset();
}

question.addEventListener("submit", userInfo);
