
const generateResponse = async () => {
  const singleTurn = [{
    role: "user",
    parts: [{ text: uservalue }]
  }];

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: singleTurn }) // Only one prompt
    });

    const data = await response.json();
    console.log("✅ FULL API RESPONSE", data);

    if (!data.candidates || !data.candidates[0]) {
      console.warn("⚠️ No candidates in response");
      throw new Error("Response does not include candidates.");
    }

    const parts = data.candidates[0].content?.parts;

    if (!parts || !parts[0] || !parts[0].text) {
      console.warn("⚠️ No parts text in candidates");
      throw new Error("Response data is missing expected content.");
    }

    const botText = parts[0].text.replace(/\*\*([^*]+)\*\*/g, '$1').trim();

    chatHistory.push({
      role: "user",
      parts: [{ text: uservalue }]
    });
    chatHistory.push({
      role: "bot",
      parts: [{ text: botText }]
    });

    const botReplyDiv = document.createElement("div");
    botReplyDiv.classList.add("computer-chat");
    botReplyDiv.textContent = botText;
    chatbox.appendChild(botReplyDiv);
    chatbox.scrollTop = chatbox.scrollHeight;

  } catch (err) {
    console.error("❌ Error generating response:", err);

    const errorDiv = document.createElement("div");
    errorDiv.classList.add("computer-chat");
    errorDiv.textContent = "⚠️ GPT had an issue responding. Try again.";
    chatbox.appendChild(errorDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
  }
};