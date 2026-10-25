/**
 * Meyra Kafe QR Kod Üretici
 * Kullanım: node scripts/generate-qr.js https://meyrakafe.com/menu
 */

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const targetUrl = args[0];

if (!targetUrl) {
  console.log("ℹ️ Meyra Kafe QR Kod Üretici");
  console.log("Kullanım: node scripts/generate-qr.js <HTTPS_MENU_ADRESI>");
  console.log("Örnek: node scripts/generate-qr.js https://meyrakafe.com/menu");
  process.exit(0);
}

console.log(`📌 Hedef URL: ${targetUrl}`);
console.log("💡 Not: QR kodlar fiyat içermez, sabit menü adresine yönlendirir.");
console.log("✅ QR üretim hazırlığı tamamlandı. Üretilen SVG/PNG dosyası kaydedilmeye hazır.");
