# Invoice Line-Item Parser

A smart automation tool that extracts and formats detailed invoice data from vendor summary sheets, making it ready for reporting, analysis, and dashboards.

---

## 🧾 What It Does

- Parses invoice summaries and extracts individual product line items
- Assigns unique invoice IDs dynamically based on vendor/date
- Avoids duplicates and skips already-logged entries
- Outputs clean, normalized records for pivot tables and Tableau use

---

## 🧰 Tools Used

| Tool              | Purpose                            |
|-------------------|------------------------------------|
| **Google Apps Script** | Automates the parsing workflow |
| **Google Sheets**      | Primary workspace and output    |
| **Regex & Logic**      | Extracts, splits, and cleans values |

---

## 💡 Key Features

- Automated conversion from block-format invoices to row-by-row line items
- Timestamped invoice logging
- Format-agnostic logic (adjustable per vendor format)
- Minimal manual input required — uses a one-click trigger

---

## 🧠 Why I Built This

Manually entering invoice data was time-consuming, error-prone, and inconsistent. I built this parser to automate the process, speed up analysis, and ensure all vendor purchases were properly logged and reviewed.

---

📫 Contact me: [masonhotalingcs@gmail.com](mailto:masonhotalingcs@gmail.com)  
🌐 Portfolio: [maswindo.github.io](https://maswindo.github.io)
