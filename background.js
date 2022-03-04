let toggleStay=true;

//Gets current toggle setting from storage
chrome.storage.sync.get(["toggle-stay"], (val) => {
    if (val) return toggleStay = val["toggle-stay"];
    toggleStay = true;
});

//Listens for toggle change from popup
chrome.runtime.onMessage.addListener((req) => {
    toggleStay = req["toggle-stay"];
});
//Listens for navigation and runs callback function before navigation 
//If url matches url continues and opens page in new tab 
chrome.webNavigation.onBeforeNavigate.addListener((e) => {
    if (e.url === "https://indeedapply.indeedusercontent.com/callback/") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            var activeTabId = activeTab.id;
            chrome.tabs.duplicate(activeTabId, (tab) => {
                //Option to go to new tab or stay on current {active:toggleStay}
                chrome.tabs.update(activeTabId, { active: toggleStay });
                //Opens new tab right of current tab, change index to put new tab elsewhere
                chrome.tabs.move(activeTabId, { index: activeTab.index + 1 });
            });
        });
    }
});
