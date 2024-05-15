// Function to create and insert the arXiv Vanity button
function insertArxivVanityButton() {
    const pdfButton = document.querySelector('a[accesskey="f"]');
    if (!pdfButton) return;
  
    const vanityButton = document.createElement('li');
    vanityButton.innerHTML = `
      <a href="https://www.arxiv-vanity.com/papers/${window.location.pathname.split('/')[2]}/" class="abs-button" id="vanity-download-link">HTML (ar5iv)</a>
    `;
    pdfButton.parentElement.insertAdjacentElement('afterend', vanityButton);
  }
  
// Check if the HTML (experimental) button is present
function checkForExperimentalHtmlButton() {
    console.log('Checking for HTML (experimental) button...');
    const htmlExperimentalButton = document.querySelector('#latexml-download-link');
    if (!htmlExperimentalButton) {
        // HTML (experimental) button is not present, add arXiv Vanity button
        insertArxivVanityButton();
    }
}

// Execute the function when the DOM is fully loaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkForExperimentalHtmlButton);
  } else {
    checkForExperimentalHtmlButton();
  }