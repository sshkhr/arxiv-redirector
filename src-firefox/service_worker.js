chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['redirectRule'], function(result) {
    if (result.redirectRule === undefined) {
      // If redirectRule is not set, initialize it to 'noChange'
      chrome.storage.sync.set({ redirectRule: 'noChange' });
    }
    // If redirectRule is already set, do nothing, letting the user's choice persist
  });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let key in changes) {
    if (key === 'redirectRule') {
      let newRule = changes[key].newValue;
      if (newRule === 'absOnly') {
        chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: ['ruleset2'],
          disableRulesetIds: ['ruleset1', 'ruleset3']
        });
      } else if (newRule === 'pdfOnly') {
        chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: ['ruleset1'],
          disableRulesetIds: ['ruleset2', 'ruleset3']
        });
      } else if (newRule === 'htmlOnly') {
        chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: ['ruleset3'],
          disableRulesetIds: ['ruleset1', 'ruleset2']
        });
      } else { // Handle no redirect option
        chrome.declarativeNetRequest.updateEnabledRulesets({
          disableRulesetIds: ['ruleset1', 'ruleset2', 'ruleset3']
        });
      }
    }
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.redirect) {
    // Use tabs API to redirect the current tab to the new URL
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
  }
});