// Invoice Line-Item Parser
// Parses Invoice View into Invoice Line Items and logs Price History

function parseInvoicesToLineItems() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const viewSheet = ss.getSheetByName("Invoice View");
  const lineItemSheet = ss.getSheetByName("Invoice Line Items");

  if (!viewSheet || !lineItemSheet) {
    Browser.msgBox("Missing required sheets.");
    return;
  }

  const viewData = viewSheet.getDataRange().getValues();
  const existingLineItems = lineItemSheet.getDataRange().getValues();
  const loggedInvoiceIDs = new Set(existingLineItems.map(row => row[0]));

  let currentInvoice = null;
  let productRows = [];

  for (let i = 0; i < viewData.length; i++) {
    const row = viewData[i];
    if (row[0] === "Invoice:") {
      if (currentInvoice && productRows.length > 0) {
        logLineItems(currentInvoice, productRows, lineItemSheet, loggedInvoiceIDs);
        productRows = [];
      }
      currentInvoice = {
        invoiceNum: row[1],
        distributor: viewData[i + 1][1],
        dateReceived: formatDate(viewData[i + 1][4]),
        orderedTo: viewData[i + 2][1],
        idBase: sanitize(viewData[i + 1][1]) + "_" + formatDate(viewData[i + 1][4])
      };
    } else if (currentInvoice && row[0] && row[1] && row[2] && !isNaN(row[2])) {
      productRows.push({
        product: row[0],
        quantity: row[1],
        unitPrice: row[2],
        total: row[1] * row[2]
      });
    }
  }

  if (currentInvoice && productRows.length > 0) {
    logLineItems(currentInvoice, productRows, lineItemSheet, loggedInvoiceIDs);
  }

  Browser.msgBox("Invoice parsing complete!");
}

function logLineItems(invoice, products, sheet, loggedSet) {
  let sequence = 1;
  let baseID = invoice.idBase;
  let invoiceID = `${baseID}_${pad(sequence)}`;

  while (loggedSet.has(invoiceID)) {
    sequence++;
    invoiceID = `${baseID}_${pad(sequence)}`;
  }

  for (let product of products) {
    sheet.appendRow([
      invoiceID,
      product.product,
      product.quantity,
      product.unitPrice,
      product.total,
      invoice.distributor,
      invoice.dateReceived,
      invoice.orderedTo
    ]);
  }

  loggedSet.add(invoiceID);
}

function formatDate(dateObj) {
  if (!(dateObj instanceof Date)) return "UNKNOWNDATE";
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

function sanitize(name) {
  return name ? name.toUpperCase().replace(/\s+/g, '').replace(/[^A-Z0-9]/g, '') : "UNKNOWNVENDOR";
}

function pad(num) {
  return String(num).padStart(3, '0');
}

function logPriceHistoryFromLineItems() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const lineItemSheet = ss.getSheetByName("Invoice Line Items");
  const historySheet = ss.getSheetByName("Price History");

  if (!lineItemSheet || !historySheet) {
    Browser.msgBox("Missing required sheets.");
    return;
  }

  const lineItems = lineItemSheet.getDataRange().getValues();
  const history = historySheet.getDataRange().getValues();
  const historySet = new Set(history.slice(1).map(row => `${row[0]}|${row[1]}|${row[2]}|${row[3]}`));

  for (let i = 1; i < lineItems.length; i++) {
    const [invoiceID, product, qty, unitPrice, total, vendor, invoiceDate, orderedTo] = lineItems[i];
    const key = `${product}|${vendor}|${unitPrice}|${invoiceDate}`;

    if (!historySet.has(key)) {
      historySheet.appendRow([product, vendor, unitPrice, invoiceDate, invoiceID, orderedTo]);
      historySet.add(key);
    }
  }

  Browser.msgBox("Price history updated!");
}
