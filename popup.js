async function sendToAI(question) {
    const response = await fetch("http://localhost:1234/v1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4",
            prompt: `Question: ${question}\nAnswer:`,
            max_tokens: 100,
            temperature: 0
        })
    });

    const data = await response.json();
    const answer = data.choices[0].text.trim();
    
    document.getElementById("question").textContent = question;
    document.getElementById("answer").textContent = answer;
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "displayAnswer") {
        sendToAI(message.text);
    }
});
