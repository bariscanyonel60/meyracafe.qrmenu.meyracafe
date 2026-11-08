import fs from "fs";
import path from "path";
import { MenuData } from "../types/menu";

function verifyMenu() {
  console.log("Meyra Kafe Menü Doğrulama Başlatılıyor...\n");

  const filePath = path.join(process.cwd(), "menu-data.json");
  if (!fs.existsSync(filePath)) {
    console.error("menu-data.json bulunamadı!");
    process.exit(1);
  }

  const rawData = fs.readFileSync(filePath, "utf-8");
  const data: MenuData = JSON.parse(rawData);

  let hasError = false;

  const categories = data.categories;
  console.log(`Kategori Sayısı: ${categories.length} (Beklenen: 8)`);
  if (categories.length !== 8) {
    console.error("Kategori sayısı 8 değil!");
    hasError = true;
  } else {
    console.log("Kategori sayısı doğru.");
  }

  const products = data.products;
  console.log(`Ürün Sayısı: ${products.length}`);

  const ids = products.map((p) => p.id);
  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== products.length) {
    console.error(`Benzersiz ID sayısı ürün sayısıyla uyuşmuyor (${uniqueIds.size}/${products.length})!`);
    hasError = true;
  } else {
    console.log("Tüm ürün ID'leri benzersiz.");
  }

  const drinks = products.filter((p) => p.kind === "drink");
  const foods = products.filter((p) => p.kind === "food");
  console.log(`İçecek: ${drinks.length}`);
  console.log(`Yiyecek: ${foods.length}`);

  let totalVariants = 0;
  products.forEach((p) => {
    if (!p.variants.length) {
      console.error(`Ürün ${p.name} varyantsız!`);
      hasError = true;
    }
    totalVariants += p.variants.length;
    p.variants.forEach((v) => {
      if (v.label === "12 oz" || v.label === "Büyük Boy") {
        console.error(`12 oz boy menüde kullanılmamalı: ${p.name}`);
        hasError = true;
      }
      if (typeof v.price !== "number" || v.price <= 0) {
        console.error(`Geçersiz fiyat: ${p.name} -> ${v.label}: ${v.price}`);
        hasError = true;
      }
    });
  });
  console.log(`Toplam fiyat varyantı: ${totalVariants}`);

  let missingImages = 0;
  products.forEach((p) => {
    if (p.image) {
      const localPath = path.join(process.cwd(), "public", p.image.replace(/^\//, ""));
      if (!fs.existsSync(localPath)) {
        console.error(`Eksik görsel: ${p.image} (${p.name})`);
        missingImages++;
        hasError = true;
      }
    }
  });

  categories.forEach((c) => {
    if (c.image) {
      const localPath = path.join(process.cwd(), "public", c.image.replace(/^\//, ""));
      if (!fs.existsSync(localPath)) {
        console.error(`Eksik kategori görseli: ${c.image} (${c.name})`);
        missingImages++;
        hasError = true;
      }
    }
  });

  if (missingImages === 0) {
    console.log("Bütün yerel görseller mevcut.");
  }

  console.log("\n-------------------------------------------");
  if (hasError) {
    console.error("Doğrulama BAŞARISIZ!");
    process.exit(1);
  } else {
    console.log("Doğrulama BAŞARILI!");
    process.exit(0);
  }
}

verifyMenu();
