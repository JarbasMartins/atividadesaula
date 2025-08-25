const output = document.querySelector("output");
const button = document.querySelector("button");

async function searchUsers(req) {
    output.textContent = "";
    try {
        req = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await req.json();

        users.forEach((user) => {
            output.textContent += `${user.name}\n`;
        });
    } catch (error) {
        console.error(error);
    }
}

button.addEventListener("click", (e) => {
    e.preventDefault();
    searchUsers();
});
