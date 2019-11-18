// This constant is written in column C for rows for which an email
// has been sent successfully.
var EMAIL_SENT = 'EMAIL_SENT';

/**
 * Sends non-duplicate emails with data from the current spreadsheet.
 */
function sendEmails2() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 173; // First row of data to process
  var numRows = 3; // Number of rows to processs
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 6);
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var emailAddress = row[2]; // First column
    var message = 'Hello Aliyah and Kalyan! This email has been sent from GoogleSheets via custom functionality ;). It just literaally picks up all the emails in a given range of rows and sends an email to each of them! So yeah it is possible!s'; // Second column
    var emailSent = row[5]; // Third column
    if (emailSent !== EMAIL_SENT) { // Prevents sending duplicates
      var subject = 'Sending emails from a Spreadsheet';
      MailApp.sendEmail(emailAddress, subject, message);
      sheet.getRange(startRow + i, 6).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  }
}
