// This script runs in the page context and can access window.monaco
// It's loaded as a web_accessible_resource to bypass CSP

(function () {
    'use strict';

    // Listen for font change messages
    window.addEventListener('LEETCODE_FONT_CHANGE', (event) => {
        const fontFamily = event.detail;

        console.log('[LeetFont - Injected] Received font change:', fontFamily);

        function updateMonacoEditors() {
            try {
                if (window.monaco && window.monaco.editor) {
                    const editors = window.monaco.editor.getEditors();

                    if (editors && editors.length > 0) {
                        editors.forEach((editor, index) => {
                            try {
                                editor.updateOptions({
                                    fontFamily: fontFamily
                                });

                                // Force layout recalculation
                                setTimeout(() => {
                                    editor.layout();
                                }, 50);

                                console.log('[LeetFont - Injected] Updated editor', index);
                            } catch (e) {
                                console.error('[LeetFont - Injected] Error updating editor:', e);
                            }
                        });

                        return true;
                    }
                }
            } catch (e) {
                console.error('[LeetFont - Injected] Error accessing Monaco:', e);
            }
            return false;
        }

        // Try immediately
        if (!updateMonacoEditors()) {
            // Retry if Monaco isn't ready yet
            let attempts = 0;
            const interval = setInterval(() => {
                attempts++;
                if (updateMonacoEditors() || attempts > 20) {
                    clearInterval(interval);
                }
            }, 300);
        }
    });

    console.log('[LeetFont - Injected] Script loaded and listening for font changes');
})();
