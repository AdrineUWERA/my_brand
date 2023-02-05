
let allMessages = [];
const retrieving = async () => {
    allMessages = await JSON.parse(localStorage.getItem("messages"));
    console.log(allMessages) 
    allMessages.map((message) => {
    // let splittedArr = message[message].split(" ");
    // splittedArr.splice(12);
    const container = document.getElementById("all-messages");
    container.innerHTML += `<div class="message-content"> <h4>${message.fullName}</h4> <p>${message.email}</p> <p class="short-description"> ${message.message} </p> </div>`
  });
};

window.onload = () => {retrieving();}

