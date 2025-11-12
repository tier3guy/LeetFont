// Content script for LeetFont
// Handles font changes and communicates with the injected script

let styleElement = null;
let currentFont = 'default';
let injectedScriptLoaded = false;

const FONTS = {
    'default': 'Menlo, Monaco, "Courier New", monospace',
    'fira-code': '"Fira Code", Menlo, Monaco, "Courier New", monospace',
    'jetbrains-mono': '"JetBrains Mono", Menlo, Monaco, "Courier New", monospace',
    'cascadia-code': '"Cascadia Code", Menlo, Monaco, "Courier New", monospace',
    'source-code-pro': '"Source Code Pro", Menlo, Monaco, "Courier New", monospace',
    'consolas': 'Consolas, Menlo, Monaco, "Courier New", monospace',
    'ubuntu-mono': '"Ubuntu Mono", Menlo, Monaco, "Courier New", monospace',
    'roboto-mono': '"Roboto Mono", Menlo, Monaco, "Courier New", monospace',
    'noto-sans-mono': '"Noto Sans Mono", Menlo, Monaco, "Courier New", monospace',
    'google-sans-mono': '"Google Sans Code", "Google Sans", Menlo, Monaco, "Courier New", monospace',
    'courier-new': '"Courier Prime", Courier, monospace',
    'monaco': 'Monaco, Menlo, "Courier New", monospace'
};

/**
 * Inject the page script using web_accessible_resources
 * This bypasses CSP restrictions
 */
function injectPageScript() {
    if (injectedScriptLoaded) return;

    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('injected.js');
    script.onload = function () {
        this.remove();
        injectedScriptLoaded = true;
        console.log('[LeetFont] Injected script loaded');
    };
    (document.head || document.documentElement).appendChild(script);
}

/**
 * Notify the injected script to update Monaco editors
 */
function notifyFontChange(fontFamily) {
    const event = new CustomEvent('LEETCODE_FONT_CHANGE', {
        detail: fontFamily
    });
    window.dispatchEvent(event);
    console.log('[LeetFont] Dispatched font change event:', fontFamily);
}

/**
 * Load Google Fonts dynamically
 */
function loadGoogleFonts() {
    // Check if fonts are already loaded
    if (document.getElementById('leetfont-google-fonts')) return;

    // Create link element for Google Fonts
    const link = document.createElement('link');
    link.id = 'leetfont-google-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Fira+Code:wght@300..700&family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Noto+Sans+Mono:wght@100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet';

    document.head.appendChild(link);
    console.log('[LeetFont] Google Fonts loaded');
}

/**
 * Apply font using CSS and Monaco API
 */
function applyFont(fontKey) {
    const fontFamily = FONTS[fontKey] || FONTS['default'];
    currentFont = fontKey;

    // Load Google Fonts first
    loadGoogleFonts();

    // Remove existing style element
    if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
    }

    // Create and inject CSS for immediate visual feedback
    styleElement = document.createElement('style');
    styleElement.id = 'leetcode-font-changer-style';
    styleElement.textContent = `
    /* Apply font to Monaco editor */
    .monaco-editor {
        font-family: ${fontFamily} !important;
    }

    /* Only apply to text areas and tokens, not icons */
    .monaco-editor .view-lines,
    .monaco-editor .view-line,
    .monaco-editor .view-line > span:not(.codicon):not([class*="icon"]) {
        font-family: ${fontFamily} !important;
    }

    /* Apply to Monaco text tokens but skip icon fonts */
    .monaco-editor .mtk1:not(.codicon),
    .monaco-editor .mtk2:not(.codicon),
    .monaco-editor .mtk3:not(.codicon),
    .monaco-editor .mtk4:not(.codicon),
    .monaco-editor .mtk5:not(.codicon),
    .monaco-editor .mtk6:not(.codicon),
    .monaco-editor .mtk7:not(.codicon),
    .monaco-editor .mtk8:not(.codicon),
    .monaco-editor .mtk9:not(.codicon),
    .monaco-editor .mtk10:not(.codicon),
    .monaco-editor .mtk11:not(.codicon),
    .monaco-editor .mtk12:not(.codicon) {
        font-family: ${fontFamily} !important;
    }

    /* Preserve codicon (icon font) rendering */
    .codicon,
    [class*="codicon"],
    .monaco-icon-label,
    .monaco-editor .codicon {
        font-family: "codicon" !important;
    }

  `;

    document.head.appendChild(styleElement);

    // Notify the injected script to update Monaco API
    notifyFontChange(fontFamily);

    // Also trigger resize to help Monaco remeasure
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 100);

    console.log('[LeetFont] Applied font:', fontKey);
}

/**
 * Initialize the extension
 */
function init() {
    // Load Google Fonts first
    loadGoogleFonts();

    // Inject the page script first
    injectPageScript();

    // Load saved font preference
    chrome.storage.sync.get(['selectedFont'], (result) => {
        const fontKey = result.selectedFont || 'default';
        // Delay to ensure injected script is ready
        setTimeout(() => {
            applyFont(fontKey);
        }, 500);
    });

    // Listen for font changes from the popup
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync' && changes.selectedFont) {
            applyFont(changes.selectedFont.newValue);
        }
    });

    // Listen for direct messages from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'applyFont' && request.fontKey) {
            applyFont(request.fontKey);
            sendResponse({ success: true });
        }
        return true;
    });
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle SPA navigation
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        injectedScriptLoaded = false; // Reset flag

        setTimeout(() => {
            injectPageScript();

            chrome.storage.sync.get(['selectedFont'], (result) => {
                const fontKey = result.selectedFont || 'default';
                setTimeout(() => {
                    applyFont(fontKey);
                }, 800);
            });
        }, 500);
    }
}).observe(document, { subtree: true, childList: true });

// Watch for new Monaco editors being created
const editorObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType === 1 && node.classList) {
                if (node.classList.contains('monaco-editor') ||
                    (node.querySelector && node.querySelector('.monaco-editor'))) {
                    setTimeout(() => {
                        if (currentFont) {
                            applyFont(currentFont);
                        }
                    }, 400);
                    break;
                }
            }
        }
    }
});

editorObserver.observe(document.body, {
    childList: true,
    subtree: true
});
