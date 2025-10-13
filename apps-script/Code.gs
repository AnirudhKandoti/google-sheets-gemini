// Code.gs
// Main Google Apps Script to send prompt from G1 to Gemini and log in a new sheet

function runGeminiDynamic() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const mainSheet = ss.getActiveSheet();
  const promptCell = mainSheet.getRange("G1");
  const apiKey = CONFIG.GEMINI_API_KEY; // Pull key from Config.js
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  // Create or get "Gemini Output" sheet
  let outputSheet = ss.getSheetByName("Gemini Output");
  if (!outputSheet) {
    outputSheet = ss.insertSheet("Gemini Output");
    outputSheet.getRange("A1").setValue("Timestamp");
    outputSheet.getRange("B1").setValue("Prompt");
    outputSheet.getRange("C1").setValue("Gemini Response");
  }

  const prompt = promptCell.getValue();
  if (!prompt) {
    SpreadsheetApp.getUi().alert("⚠ Please enter a prompt in G1 first.");
    return;
  }

  const payload = { contents: [{ parts: [{ text: prompt }] }] };
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    headers: { "X-goog-api-key": apiKey },
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());
    const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "⚠ No response from Gemini.";

    // Append new row
    outputSheet.appendRow([new Date(), prompt, output]);

    // Auto-format for readability
    const lastRow = outputSheet.getLastRow();
    const outputCell = outputSheet.getRange(lastRow, 3);
    outputCell.setWrap(true);
    outputSheet.autoResizeColumn(2);
    outputSheet.autoResizeColumn(3);

    // Adjust row height
    const lines = output.split(/\r\n|\r|\n/).length;
    const rowHeight = Math.min(300, Math.max(40, lines * 18));
    outputSheet.setRowHeight(lastRow, rowHeight);

  } catch (error) {
    outputSheet.appendRow([new Date(), prompt, "❌ Error: " + error]);
  }
}
