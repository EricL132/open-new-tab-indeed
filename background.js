chrome.webNavigation.onBeforeNavigate.addListener((e)=>{
    if(e.url==="https://indeedapply.indeedusercontent.com/callback/"){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            var activeTabId = activeTab.id;
            chrome.tabs.duplicate(activeTabId,(tab)=>{
                chrome.tabs.update(activeTabId,{active:true})
            })
         });
    }
})


