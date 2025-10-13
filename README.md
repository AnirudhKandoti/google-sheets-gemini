# Google Sheets Gemini AI Integration

This project integrates **Google Sheets** with **Google Gemini 2.0 Flash AI** using Google Apps Script.  
It allows you to enter prompts in a Google Sheet and automatically logs AI responses in a separate sheet.

---

## **Features**
- Type a prompt in `G1` of your main sheet.
- Run the Apps Script (`runGeminiDynamic`) to send the prompt to Gemini AI.
- Gemini’s response is logged in a separate sheet called `Gemini Output`.
- Automatically formats text: wraps content, resizes columns, adjusts row height.
- Keeps your original table safe and visible.

---

## **File Structure**


---

## **Setup Instructions**

1. **Clone the repo**:
```bash
git clone <your-repo-url>

2. **Create your Google Sheet**:


Add your table in columns A–E.

Reserve G1 for prompts.

3. **Add your Gemini API key**:

Open apps-script/Config.js

Replace "YOUR_GEMINI_API_KEY" with your actual key from Google AI Studio.

4. **Run the script**:

Open your sheet → Extensions → Apps Script → Run runGeminiDynamic

Check the Gemini Output sheet for responses.
---------------------------
Usage Examples

Prompt: Explain how AI works in a few words

Prompt: Which company has the highest profit margin based on my table?

Responses are automatically logged with timestamps.
-------------------------
Important Notes

Do not commit your real API key to GitHub.

Use .gitignore to exclude Config.js.

The script automatically creates the Gemini Output sheet if it doesn’t exist.
---------------------------
License

MIT License