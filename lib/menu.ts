import fs from "fs";
import path from "path";
import { MenuData, Product, Category } from "@/types/menu";

export function getMenuData(): MenuData {
  const filePath = path.join(process.cwd(), "menu-data.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent) as MenuData;
}
