//Wait for popup to finish loading
document.addEventListener("DOMContentLoaded", () => {
    const toggleStayElement = document.getElementById("toggle-stay");
    //Gets the current settings saved in storage
    chrome.storage.sync.get(["toggle-stay"], (val) => {
        toggleStayElement.checked = val["toggle-stay"];
    });
    //On toggle button click change the values in storage and background.js
    toggleStayElement.addEventListener("change", (e) => {
        chrome.storage.sync.set({ "toggle-stay": e.target.checked });
        chrome.runtime.sendMessage({ "toggle-stay": e.target.checked });
    });
});
