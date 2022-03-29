const socket = io();

//DOM
const inputEmail = document.getElementById("inputEmail");
const inputMessage = document.getElementById("inputMessage");
const chatBox = document.getElementById("chatBox");

const addMessage = (e) => {
  const msg = {
    userEmail: inputEmail.value,
    time: new Date(),
    message: inputMessage.value,
  };
  socket.emit("newMessage", msg);
  return false;
};

const renderChat = (data) => {
  console.log(data);
  chatBox.innerHTML = "";
  const html = data
    .map((message) => {
      return `<div>
                <strong>${message.userEmail} ha dejado un mesaje</strong>: 
                <em>${message.message} a las ${message.time}</em>
              </div>`;
    })
    .join(" ");
  chatBox.innerHTML = html;
};

socket.on("requestChat", (messages) => {
  render(messages);
});

socket.on("newMessages", (messages) => {
  render(messages);
});
