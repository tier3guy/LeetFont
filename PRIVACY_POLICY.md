# 🛡️ Privacy Policy for LeetFont

**Last updated:** November 2025

Thank you for using **LeetFont** — a Chrome extension designed to let you customize and change fonts on [LeetCode](https://leetcode.com) for improved readability.

Your privacy is extremely important to us. This policy explains what data (if any) LeetFont collects, how it is used, and your rights regarding that information.

---

## 🔍 1. Information We Collect

**LeetFont does not collect, store, or transmit any personal data.**
The extension operates entirely within your browser and does not communicate with any external servers.

The only information saved is your **font preference**, stored locally using the **Chrome Storage API** (`chrome.storage.sync`).

This data includes:

* The selected font name (e.g., “Fira Code”, “JetBrains Mono”, etc.)

This information:

* Never leaves your browser
* Is not shared with anyone
* Is only used to remember your chosen font between sessions

---

## ⚙️ 2. Permissions Explanation

LeetFont requests the following Chrome permissions:

| Permission                                    | Purpose                                                                      | Data Accessed                 |
| --------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------- |
| `storage`                                     | To save and load your preferred font style                                   | Font name only                |
| `activeTab`                                   | To apply font changes to the current LeetCode tab when you select a new font | Page styling only             |
| `host_permissions` (`https://leetcode.com/*`) | To inject styling scripts into LeetCode pages                                | None (only updates CSS fonts) |

LeetFont **does not** access your code editor content, problem data, submissions, or any other user data on LeetCode.

---

## 🧠 3. How LeetFont Works

* When you install LeetFont, it sets a default font (like *Fira Code*).
* When you visit LeetCode, the extension injects a small script to apply your chosen font style.
* If you change the font in the popup, the new font is saved in Chrome Storage and immediately applied.
* No data ever leaves your browser or is sent to any external server.

---

## 🔒 4. Data Sharing and Third Parties

LeetFont does **not**:

* Share data with third parties
* Use analytics or tracking tools
* Send network requests to remote servers

All scripts are packaged locally within the extension and verified by Chrome Web Store’s review process.

---

## 📁 5. Data Security

Because LeetFont doesn’t handle or transmit personal information, no external data storage or transmission occurs.
All functionality is self-contained and runs securely within your browser environment.

---

## 🧹 6. Data Deletion

To remove all saved data, you can:

1. Uninstall the LeetFont extension from Chrome.
2. Or clear the extension’s data manually via Chrome Settings → “Clear browsing data → Site and extension data”.

This will delete all locally stored font preferences.

---

## 📜 7. Changes to This Policy

If LeetFont’s functionality or data usage changes in the future, this privacy policy will be updated accordingly.
Any significant changes will be reflected in the extension description and this document.

---

## 📩 8. Contact

If you have any questions, concerns, or suggestions about this privacy policy, feel free to reach out:

**Email:** `avinashgupta.works@zohomail.in`
**Author:** Avinash Gupta

---

✅ **Summary:**
LeetFont respects your privacy.

* No personal data collected
* No analytics
* No third-party access
* 100% local, secure, and transparent
