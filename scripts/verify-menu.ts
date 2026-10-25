import fs from "fs";
import path from "path";
import { MenuData } from "../types/menu";

function verifyMenu() {
  console.log("🔍 Meyra Kafe Menü Doğrulama Başlatılıyor...\n");

  const filePath = path.join(process.cwd(), "menu-data.json");
  if (!fs.existsSync(filePath)) {
    console.error("❌ menu-data.json bulunamadı!");
    process.exit(1);
  }

  const rawData = fs.readFileSync(filePath, "utf-8");
  const data: MenuData = JSON.parse(rawData);

  let hasError = false;

  // 1. Categories check (Expected 8)
  const categories = data.categories;
  console.log(`📁 Kategori Sayısı: ${categories.length} (Beklenen: 8)`);
  if (categories.length !== 8) {
    console.error("❌ Kategori sayısı 8 değil!");
    hasError = true;
  } else {
    console.log("✅ Kategori sayısı doğru.");
  }

  // 2. Products check (Expected 72)
  const products = data.products;
  console.log(`☕ Ürün Sayısı: ${products.length} (Beklenen: 72)`);
  if (products.length !== 72) {
    console.error("❌ Ürün sayısı 72 değil!");
    hasError = true;
  } else {
    console.log("✅ Ürün sayısı doğru.");
  }

  // 3. Unique IDs check
  const ids = products.map((p) => p.id);
  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== 72) {
    console.error(`❌ Benzersiz ID sayısı 72 değil (${uniqueIds.size})!`);
    hasError = true;
  } else {
    console.log("✅ Tüm 72 ürün ID'si benzersiz.");
  }

  // 4. Drinks (expected 59) & Food (expected 13) check
  const drinks = products.filter((p) => p.kind === "drink");
  const foods = products.filter((p) => p.kind === "food");
  console.log(`🥤 İçecek Sayısı: ${drinks.length} (Beklenen: 59)`);
  console.log(`🍰 Yiyecek Sayısı: ${foods.length} (Beklenen: 13)`);
  if (drinks.length !== 59 || foods.length !== 13) {
    console.error("❌ İçecek veya yiyecek sayıları uyuşmuyor!");
    hasError = true;
  } else {
    console.log("✅ İçecek ve yiyecek sayıları doğru.");
  }

  // 5. Price variants check (47 drinks use 8 oz; all other products are single-price)
  let totalVariants = 0;
  let eightOzVariants = 0;
  products.forEach((p) => {
    totalVariants += p.variants.length;
    if (p.variants.length !== 1) {
      console.error(`❌ Ürün ${p.name} varyant sayısı 1 değil (${p.variants.length})!`);
      hasError = true;
    }
    p.variants.forEach((v) => {
      if (v.label === "8 oz") eightOzVariants++;
      if (v.label === "12 oz" || v.label === "Büyük Boy") {
        console.error(`❌ 12 oz boy menüde kullanılmamalı: ${p.name}`);
        hasError = true;
      }
      if (typeof v.price !== "number" || v.price <= 0) {
        console.error(`❌ Geçersiz fiyat: ${p.name} -> ${v.label}: ${v.price}`);
        hasError = true;
      }
    });
  });
  console.log(`💰 Toplam Fiyat Varyantı: ${totalVariants} (Beklenen: 72)`);
  console.log(`☕ 8 oz ürün sayısı: ${eightOzVariants} (Beklenen: 47)`);
  if (eightOzVariants !== 47) {
    console.error("❌ 8 oz ürün sayısı 47 değil!");
    hasError = true;
  }
  if (totalVariants !== 72) {
    console.error(`❌ Toplam fiyat varyantı 72 değil (${totalVariants})!`);
    hasError = true;
  } else {
    console.log("✅ Toplam fiyat varyantı sayısı doğru ve tüm fiyatlar pozitif.");
  }

  // 6. Image file existence check
  let missingImages = 0;
  products.forEach((p) => {
    if (p.image) {
      const localPath = path.join(process.cwd(), "public", p.image.replace(/^\//, ""));
      if (!fs.existsSync(localPath)) {
        console.error(`❌ Eksik görsel dosyası: ${p.image} (Ürün: ${p.name})`);
        missingImages++;
        hasError = true;
      }
    }
  });

  categories.forEach((c) => {
    if (c.image) {
      const localPath = path.join(process.cwd(), "public", c.image.replace(/^\//, ""));
      if (!fs.existsSync(localPath)) {
        console.error(`❌ Eksik kategori görsel dosyası: ${c.image} (Kategori: ${c.name})`);
        missingImages++;
        hasError = true;
      }
    }
  });

  if (missingImages === 0) {
    console.log("✅ Bütün yerel görseller disk üzerinde mevcut.");
  }

  console.log("\n-------------------------------------------");
  if (hasError) {
    console.error("❌ Doğrulama BAŞARISIZ! Lütfen hataları giderin.");
    process.exit(1);
  } else {
    console.log("🎉 Doğrulama BAŞARILI! Tüm kontroller başarıyla tamamlandı.");
    process.exit(0);
  }
}

verifyMenu();
