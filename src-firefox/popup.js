function updateUIForCurrentRule(currentRule) {
  console.log("Updating UI for rule:", currentRule);
  const selectElement = document.getElementById('redirectRule');
  selectElement.value = currentRule;
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get('redirectRule', function(data) {
    console.log("Retrieved rule:", data.redirectRule);
    const currentRule = data.redirectRule || 'absOnly';
    console.log("Current rule:", currentRule);
    updateUIForCurrentRule(currentRule);
  });
});

document.getElementById('ruleForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const selectElement = document.getElementById('redirectRule');
  const selectedRule = selectElement.value;
  console.log("Saving rule:", selectedRule);
  chrome.storage.sync.set({ redirectRule: selectedRule }, function() {
    console.log("Rule saved:", selectedRule);
    // Optionally, update the UI or give feedback to the user
  });
  // Close the popup window
  window.close();
});
