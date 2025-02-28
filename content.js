async function extractTextFromImage(imagePath) {
    const worker = await Tesseract.createWorker("eng");
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const { data: { text } } = await worker.recognize(imagePath);
    console.log("Extracted Text:", text);
    await worker.terminate();
    return text;
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === "processImage") {
        const extractedText = await extractTextFromImage(message.path);
        sendToAI(extractedText);
    }
});
