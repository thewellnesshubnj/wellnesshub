# The Wellness Hub — Setup Guide

## Prerequisites: Install Node.js

Node.js is not currently installed on this machine. Install it first:

1. Go to https://nodejs.org and download the **LTS** version (v20+)
2. Run the installer, then verify in Terminal:
   ```bash
   node --version   # should print v20.x.x
   npm --version    # should print 10.x.x
   ```

---

## 1. Install all dependencies

```bash
cd ~/Desktop/thewellnesshub
npm install
```

This installs Next.js, React, Tailwind CSS, TypeScript, `motion`, `lucide-react`, and all shadcn utilities.

---

## 2. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 3. Wire up the sign-up form → Google Sheets

### Step A — Create a Google Sheet
1. Go to https://sheets.google.com → create a new sheet
2. Add headers in Row 1: `Timestamp | Full Name | Email | Phone`
3. Copy the Sheet ID from the URL:  
   `https://docs.google.com/spreadsheets/d/`**THIS-IS-THE-ID**`/edit`

### Step B — Create an Apps Script
1. In your Sheet, go to **Extensions → Apps Script**
2. Replace all code with:
   ```js
   function doPost(e) {
     const data = JSON.parse(e.postData.contents);
     const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
     sheet.appendRow([data.timestamp, data.fullName, data.email, data.phone]);
     return ContentService.createTextOutput('OK');
   }
   ```
3. Replace `YOUR_SHEET_ID` with your actual Sheet ID
4. Click **Deploy → New Deployment → Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the **Web App URL**

### Step C — Add the URL to the site
Open `src/app/page.tsx` and replace line 7:
```ts
const APPS_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
```
with your actual URL.

---

## 4. Add your logo

Drop your logo image into `public/logo.png`, then in `page.tsx` replace the inline SVG logo with:
```tsx
<Image src="/logo.png" alt="The Wellness Hub" width={38} height={38} />
```

---

## 5. Build for production

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    layout.tsx        # fonts (DM Sans + Playfair Display), metadata
    page.tsx          # full landing page
    globals.css       # CSS variables + Tailwind
  components/
    ui/
      origin-button.tsx   # animated fill button (shadcn-compatible)
  lib/
    utils.ts          # cn() helper
components.json       # shadcn config
tsconfig.json
```
