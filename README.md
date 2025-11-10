# LeetFont

A Chrome extension that allows you to change the font family in LeetCode's Monaco editor without causing cursor position issues.

## Features

- 🎨 **10 Popular Coding Fonts** - Choose from Fira Code, JetBrains Mono, Cascadia Code, and more
- 🎯 **No Cursor Issues** - Carefully crafted CSS ensures cursor position stays accurate
- 💾 **Persistent Settings** - Your font choice is saved and synced across devices
- ⚡ **Instant Apply** - Font changes apply immediately without page refresh
- 🚫 **No Icons** - Clean, text-only interface

## Installation

### From Source (Developer Mode)

1. **Download the Extension**
   - Download or clone this repository to your computer
   - Extract the files to a folder

2. **Open Chrome Extensions**
   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Or: Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the folder containing the extension files
   - The extension will now appear in your extensions list

5. **Pin the Extension (Optional)**
   - Click the puzzle piece icon in the Chrome toolbar
   - Find "LeetFont" and click the pin icon

## Usage

1. **Navigate to LeetCode**
   - Go to [leetcode.com](https://leetcode.com)
   - Open any problem with the code editor

2. **Open the Extension**
   - Click the LeetFont extension icon in your toolbar

3. **Select a Font**
   - Choose your preferred font from the list
   - The font will be applied immediately

4. **Enjoy Coding!**
   - Your font preference is saved automatically
   - It will persist across browser sessions and devices (if Chrome sync is enabled)

## Available Fonts

All fonts marked with 📦 are automatically downloaded from Google Fonts - no installation required!

- **Default** - LeetCode's default Monaco editor font
- **Fira Code** 📦 - Popular font with programming ligatures (auto-loaded)
- **JetBrains Mono** 📦 - Modern font designed for developers (auto-loaded)
- **Cascadia Code** - Microsoft's font for coding (system font)
- **Source Code Pro** 📦 - Adobe's monospace font (auto-loaded)
- **Consolas** - Classic Microsoft monospace font (system font)
- **Ubuntu Mono** 📦 - Ubuntu's monospace font (auto-loaded)
- **Roboto Mono** 📦 - Google's monospace font (auto-loaded)
- **Courier New** - Traditional typewriter font (system font)
- **Monaco** - Apple's classic monospace font (system font)

## Technical Details

### How It Fixes Cursor Position Issues

The extension addresses Monaco editor cursor positioning problems by:

1. **Only modifying `font-family`** - Never changes `font-size` or `line-height`
2. **Using `!important` flags** - Overrides Monaco's inline styles properly
3. **Targeting correct selectors** - Applies fonts to all relevant Monaco classes
4. **Monospace fonts only** - Ensures consistent character widths
5. **No layout changes** - Preserves Monaco's internal layout calculations

### Files Structure

```
Leetcode-Font-Changer/
├── manifest.json       # Extension configuration
├── content.js          # Content script (runs on LeetCode pages)
├── injected.js         # Page context script (Monaco API access)
├── fonts.css           # Google Fonts imports
├── popup.html          # Extension popup interface
├── popup.css           # Popup styling
├── popup.js            # Popup functionality
└── README.md           # This file
```

### Permissions

- **storage** - To save your font preference
- **activeTab** - To apply fonts to the current LeetCode tab
- **host_permissions** - Limited to `leetcode.com` only

## Troubleshooting

### Font not applying?

1. Refresh the LeetCode page after selecting a font
2. Make sure you're on a LeetCode problem page with the editor open
3. Most fonts are auto-loaded from Google Fonts, so no installation needed!

### Cursor still misaligned?

1. Try selecting "Default" font first, then your preferred font
2. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
3. Clear your browser cache and reload

### Extension not showing in toolbar?

1. Go to `chrome://extensions/`
2. Verify the extension is enabled
3. Click the puzzle icon and pin "LeetFont"

## Browser Compatibility

- **Chrome** - Fully supported (v88+)
- **Edge** - Fully supported (Chromium-based)
- **Brave** - Fully supported
- **Opera** - Should work (Chromium-based)
- **Firefox** - Not supported (requires Manifest V2 adaptation)

## Privacy

This extension:
- ✅ Only runs on leetcode.com
- ✅ Only stores your font preference locally
- ✅ Does not collect any personal data
- ✅ Does not make external network requests
- ✅ Open source - inspect the code yourself

## Contributing

Feel free to submit issues or pull requests if you:
- Find bugs
- Want to add more fonts
- Have suggestions for improvements

## License

MIT License - Feel free to use and modify as needed.

## Credits

Created for developers who want a better coding experience on LeetCode! 🚀

---

**Note**: This extension is not affiliated with or endorsed by LeetCode.
