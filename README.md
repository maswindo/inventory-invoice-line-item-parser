# Invoice Line-Item Parser

A Google Apps Script solution for automating the parsing and logging of invoice data into a structured, analysis-ready format in Google Sheets.

## 📦 Features

- Automatically splits invoice data into individual line items.
- Standardizes product, vendor, quantity, price, and UOM data.
- Populates the `Invoice Line Items` log sheet for spend analysis and historical tracking.

## 📌 Use Case

Designed to streamline invoice processing for inventory management teams.  
By logging each line item, users can perform vendor spend analysis, price trend monitoring, and procurement planning.

## 🚀 How to Use

1. Enter or import invoices into the `Invoice Input` sheet.
2. Run the `Invoice Parser` Apps Script function.
3. Line items will be parsed and logged into `Invoice Line Items` for historical records.

## 🔧 Technologies

- Google Sheets
- Google Apps Script

## 📈 Future Plans

- Add vendor auto-linking.
- Integrate directly with spend analysis dashboards.
