chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "pronounceAmerican",
      title: "Pronounce in American English",
      contexts: ["selection"]
    });
  
    chrome.contextMenus.create({
      id: "pronounceBritish",
      title: "Pronounce in British English",
      contexts: ["selection"]
    });
});
  
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "pronounceAmerican" || info.menuItemId === "pronounceBritish") {
        const lang = info.menuItemId === "pronounceAmerican" ? "en-US" : "en-GB";
        chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: speakText,
        args: [info.selectionText, lang]
        });
    }
});

function speakText(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
}
