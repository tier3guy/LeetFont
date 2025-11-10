// Popup script for LeetFont

// Load the saved font selection when popup opens
document.addEventListener('DOMContentLoaded', () => {
    loadSavedFont();
    attachEventListeners();
});

/**
 * Load the saved font preference from storage
 */
function loadSavedFont() {
    chrome.storage.sync.get(['selectedFont'], (result) => {
        const fontKey = result.selectedFont || 'default';
        const radioButton = document.querySelector(`input[value="${fontKey}"]`);
        if (radioButton) {
            radioButton.checked = true;
        }
    });
}

/**
 * Attach event listeners
 */
function attachEventListeners() {
    const applyBtn = document.getElementById('applyBtn');

    applyBtn.addEventListener('click', () => {
        const selectedRadio = document.querySelector('input[name="font"]:checked');
        if (selectedRadio) {
            const selectedFont = selectedRadio.value;
            applyFontAndReload(selectedFont);
        }
    });
}

/**
 * Apply font and reload the LeetCode page
 * @param {string} fontKey - The key of the selected font
 */
function applyFontAndReload(fontKey) {
    const applyBtn = document.getElementById('applyBtn');

    // Disable button and show loading state
    applyBtn.disabled = true;
    applyBtn.classList.add('loading');
    applyBtn.querySelector('.btn-text').textContent = 'Applying';

    // Save font preference
    chrome.storage.sync.set({ selectedFont: fontKey }, () => {
        showStatus('Font applied! Reloading page...');

        // Send message to content script to apply font
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && tabs[0].url && tabs[0].url.includes('leetcode.com')) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'applyFont',
                    fontKey: fontKey
                }).catch(() => {
                    // Content script might not be loaded yet
                });

                // Reload the page after a short delay
                setTimeout(() => {
                    chrome.tabs.reload(tabs[0].id, () => {
                        // Close popup after reload
                        setTimeout(() => {
                            window.close();
                        }, 500);
                    });
                }, 500);
            } else {
                showStatus('Please open a LeetCode page first!');
                applyBtn.disabled = false;
                applyBtn.classList.remove('loading');
                applyBtn.querySelector('.btn-text').textContent = 'Apply Font';
            }
        });
    });
}

/**
 * Show a status message to the user
 * @param {string} message - The message to display
 */
function showStatus(message) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
    statusElement.classList.add('show', 'success');

    // Hide status after 2 seconds
    setTimeout(() => {
        statusElement.classList.remove('show');
    }, 2000);
}
