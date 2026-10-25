# Meyra Kafe QR Menü Uygulaması

Meyra Kafe için Next.js App Router, TypeScript strict, Tailwind CSS, Motion ve Lucide React kullanılarak geliştirilmiş, hızlı, premium görünümlü, animasyonlu ve mobil öncelikli QR menü uygulamasıdır.

## Özellikler

- **Butik Kafe Tasarımı:** Sıcak kırık beyaz zemin (`#F7F3EC`), koyu espresso metin (`#29201B`), adaçayı (`#66745E`) ve ölçülü bakır vurgular (`#B88960`). Zarif serif başlıklar ve Türkçe karakter destekli sans metinler.
- **Akıllı Arama & Filtreleme:** Türkçe karakter normalizasyonu (İ/i, I/ı, ş/s, ğ/g, ç/c, ö/o, ü/u) ile hızlı arama. Yapışkan ve yatay kaydırılabilir kategori çubuğu.
- **8 oz Menü:** 47 boy seçenekli içecekte yalnızca 8 oz fiyatı kullanılır; 12 oz seçeneği menüde yer almaz.
- **Detay Modal / Alttan Açılır Pencere:** Mobilde alttan açılan, masaüstünde ortalanmış modal; klavye erişilebilirliği (Escape, odak kilidi) ve arka plan scroll kilidi.
- **Doğrulanmış Veri:** 72 ürün, 8 kategori ve 72 fiyat kaydı `menu-data.json` üzerinden yönetilir. Ürün fotoğrafları WebP biçiminde yerel olarak sunulur.

---

## Kurulum ve Çalıştırma

1. Proje dizinine gidin:
   ```bash
   cd Meyra_Kafe_QR_Menu_Hazirlik/meyra-qr-menu
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
   Tarayıcınızda `http://localhost:3000` adresini açın.

4. Üretim (Production) derlemesi alın:
   ```bash
   npm run build
   npm start
   ```

---

## Doğrulama ve Test Komutları

- **Veri ve Asset Doğrulama Scripti:**
  ```bash
  npm run verify
  ```
  *(72 ürün, 8 kategori, 59 içecek, 13 yiyecek, 47 adet 8 oz içecek fiyatı, 72 toplam fiyat kaydı ve tüm yerel görsel dosyalarının disk üzerindeki varlığını doğrular; 12 oz seçeneği olmadığını kontrol eder.)*

---

## Veri ve Fotoğraf Güncelleme Yöntemi

1. **Fiyat ve Ürün Güncelleme:**
   - `menu-data.json` dosyasını düzenleyin.
   - Fiyat değişikliklerinden sonra projeyi yeniden derleyin (`npm run build`) ve yayınlayın. Basılı QR kodlar sabit menü adresine yönlendirdiği için QR kodun değiştirilmesine gerek yoktur.

2. **Görsel Güncelleme:**
   - Yeni WebP formatındaki görselleri `public/images/products/` veya `public/images/categories/` klasörüne ekleyin.
   - `menu-data.json` içerisindeki ilgili ürünün `image` yolunu güncelleyin.

---

## Önemli Notlar ve Teyit Edilecek Adlar

- **Ürün İsimleri:** `Espresso Dopper`, `Melenge`, `Cut` ve `Dripped Eye` isimleri kaynak kaynaktan aynen korunmuştur; işletme teyidi önerilir.
- **Görseller:** Ürün fotoğrafları WebP biçiminde sunulur. Kategori fotoğrafları temsili stok görselleridir.
