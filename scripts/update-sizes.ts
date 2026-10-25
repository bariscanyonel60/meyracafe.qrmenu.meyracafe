import fs from "fs";
import path from "path";
import { MenuData } from "../types/menu";

const filePath = path.join(process.cwd(), "menu-data.json");
const data: MenuData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

let removedVariantsCount = 0;

data.products.forEach((product) => {
  const eightOz = product.variants.find(
    (variant) => variant.label === "8 oz" || variant.label === "Küçük Boy",
  );

  if (product.variants.length > 1 && !eightOz) {
    throw new Error(`8 oz fiyatı bulunamadı: ${product.name}`);
  }

  if (eightOz) {
    removedVariantsCount += product.variants.length - 1;
    product.variants = [{ ...eightOz, label: "8 oz" }];
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
console.log(`✅ Yalnızca 8 oz fiyatları bırakıldı; ${removedVariantsCount} büyük boy varyantı kaldırıldı.`);
