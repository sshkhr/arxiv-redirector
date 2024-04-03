// content.js
function checkAndRedirect() {
    const errorMessageElement = document.querySelector('main.container > h1');
    if (errorMessageElement && errorMessageElement.textContent.includes("No HTML for")) {
      // Create and display the message
      const messageElement = document.createElement('div');
      messageElement.textContent = "Arxiv redirector looking for arxiv-vanity HTML version...";
      messageElement.style.position = 'fixed';
      messageElement.style.bottom = '20px';
      messageElement.style.left = '20px';
      messageElement.style.backgroundColor = 'yellow';
      messageElement.style.padding = '10px';
      messageElement.style.zIndex = '1000';
      
      // Insert the message right below the errorMessageElement
      errorMessageElement.insertAdjacentElement('afterBegin', messageElement);
  
      // Extract the paper ID from the current URL
      const paperId = window.location.pathname.split('/')[2].replace(/v\d+$/, '');
  
      // Construct the new URL
      const newURL = `https://ar5iv.labs.arxiv.org/html/${paperId}`;
  
      // Wait for 2 seconds, then redirect
      setTimeout(() => {
        messageElement.remove(); // Remove the message
        // Send a message to the background script to perform the redirection
        chrome.runtime.sendMessage({redirect: newURL});
      }, 2000);
    }
  }
  
  // Execute the function when the DOM is fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkAndRedirect);
  } else {
    checkAndRedirect();
  }
  