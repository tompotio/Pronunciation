document.getElementById('americanBtn').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: speakText,
        args: ['en-US']
        });
    });
});
  
document.getElementById('britishBtn').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: speakText,
        args: ['en-GB']
        });
    });
});
  
function speakText(lang) {
    const selection = window.getSelection().toString();
    if (selection) {
        const utterance = new SpeechSynthesisUtterance(selection);
        utterance.lang = lang;
        window.speechSynthesis.speak(utterance);
    }
}