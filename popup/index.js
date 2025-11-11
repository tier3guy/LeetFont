document.addEventListener("DOMContentLoaded", () => {
    loadSavedFont();
    attachEventListeners();
});

/**
 * Load the saved font preference from storage
 */
function loadSavedFont() {
    chrome.storage.sync.get(["selectedFont"], (result) => {
        const fontKey = result.selectedFont || "default";
        const fontSelect = document.getElementById("fontSelect");
        if (fontSelect) {
            fontSelect.value = fontKey;
        }
    });
}

/**
 * Attach event listeners
 */
function attachEventListeners() {
    const applyBtn = document.getElementById("applyBtn");
    const fontSelect = document.getElementById("fontSelect");

    if (!applyBtn || !fontSelect) {
        console.error("Popup elements not found! Check HTML IDs.");
        return;
    }

    applyBtn.addEventListener("click", () => {
        const selectedFont = fontSelect.value;
        applyFontAndReload(selectedFont);
    });
}

/**
 * Apply font and reload the LeetCode page
 * @param {string} fontKey - The key of the selected font
 */
function applyFontAndReload(fontKey) {
    const applyBtn = document.getElementById("applyBtn");

    // Disable button and show loading state
    applyBtn.disabled = true;
    applyBtn.textContent = "Applying...";

    // Save font preference
    chrome.storage.sync.set({ selectedFont: fontKey }, () => {
        showStatus("Font applied! Reloading LeetCode...");

        // Send message to content script to apply font
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];

            if (tab && tab.url && tab.url.includes("leetcode.com")) {
                chrome.tabs
                    .sendMessage(tab.id, {
                        action: "applyFont",
                        fontKey: fontKey,
                    })
                    .catch(() => {
                        // Content script might not be loaded yet
                    });

                // Reload the page after a short delay
                setTimeout(() => {
                    chrome.tabs.reload(tab.id, () => {
                        setTimeout(() => window.close(), 500);
                    });
                }, 500);
            } else {
                showStatus("Please open a LeetCode page first!");
                applyBtn.disabled = false;
                applyBtn.textContent = "Apply Font";
            }
        });
    });
}

/**
 * Show a status message to the user
 * @param {string} message - The message to display
 */
function showStatus(message) {
    const statusElement = document.getElementById("status");
    if (!statusElement) return;

    statusElement.textContent = message;
    statusElement.classList.add("show");

    // Hide status after 2 seconds
    setTimeout(() => {
        statusElement.classList.remove("show");
    }, 2000);
}
