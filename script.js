const form = document.querySelector(".my-form")
const input = document.querySelector(".my-input")
const btn = document.querySelector(".arrow-btn")
const chatbox = document.querySelector(".chat-contaner")


const key = "AIzaSyCpDuCXQ1Eq7PzccCQfmDPENfyJfSHykik"
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`

let uservalue = ""
const chatHistory = []


const generateResponse = async (mydiv) => {
  const textElement = mydiv.querySelector(".messageText")


  const singleTurn = [{
    role: "user",
    parts: [{ text: uservalue }]
  }]

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: singleTurn })
  })

  const data = await response.json()
  const botReplay = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, '$1').trim();
  textElement.textContent = botReplay;
  
  chatHistory.push({
    role: "bot",
    parts: [{ text: botReplay }]
  })


}

const handleformsubmit = (e) => {
  e.preventDefault()
  uservalue = input.value.trim()
  if (!uservalue) return

  const div = document.createElement("div")
  div.classList.add("user-chat")

  const para = document.createElement("p")
  para.textContent = uservalue;

  div.appendChild(para)

  chatbox.appendChild(div)


  setTimeout(() => {
    const mydiv = document.createElement("div")
    mydiv.classList.add("computer-chat")

    const img = document.createElement("img")
    img.src = "logo.png";
    img.classList.add("myimg", "loading")

    const para = document.createElement("p")
    para.classList.add("messageText")
    para.textContent = "Just a sec...";

    mydiv.appendChild(para)
    mydiv.appendChild(img)
    chatbox.appendChild(mydiv)
    generateResponse(mydiv);

    setTimeout(() => {
      img.classList.remove("loading");  // Remove the "loading" class from the image
    }, 800);

  }, 600)



  input.value = ""
}

form.addEventListener("submit", handleformsubmit)
