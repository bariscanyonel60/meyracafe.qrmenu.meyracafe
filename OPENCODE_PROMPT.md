# Meyra Kafe QR Menü — OpenCode uygulama promptu

Meyra Kafe için premium görünümlü, hızlı, mobil öncelikli ve animasyonlu bir QR menü uygulamasını uçtan uca geliştir. Sadece plan anlatma: çalışan kodu, veri bağlantılarını, kontrolleri ve README'yi tamamla.

## Girdi dosyaları ve doğruluk

Bu pakette `menu-data.json`, `image-sources.json`, `gorsel-kaynaklari.csv`, `urun-fiyatlari.csv` ve `public/images` bulunuyor. Önce hepsini incele. JSON müşteri menüsü için tek doğruluk kaynağı olsun. 72 ürün, 8 kategori, toplam 119 fiyat varyantı var: 59 içecek ve 13 yiyecek. 47 kahvede hem 8 oz hem 12 oz fiyatı var; 12 içecekte tek fiyat, 13 yiyecekte porsiyon fiyatı var. Hiçbir ürünü atlama veya çoğaltma. Kaynaktaki ürün sırasını koru.

Ürün isimlerini ve fiyatları aynen al. Özellikle Espresso 8 oz 110 TL, 12 oz 200 TL; diğer sade ve soğuk sade kahveler 180/240 TL; sütlü kahveler 210/270 TL. 8 oz/12 oz etiketleri kaynak tablonun bardak başlıklarıdır; bunlardan espresso shot hacmi veya ml cinsinden reçete çıkarma. Tek fiyatlı içeceklere 12 oz fiyat uydurma.

`Espresso Dopper`, `Melenge`, `Cut`, `Dripped Eye` isimlerini otomatik düzeltme. Bunları README'de işletmenin teyit edeceği isimler olarak belirt. Maliyet ve kâr bilgileri müşteri verisinde veya arayüzünde yer almasın. Açıklama, alerjen, içerik, kalori, gramaj veya popülerlik verisi uydurma. Null alanları müşteri arayüzünde gösterme. İşletme adresi, telefon, çalışma saati ve sosyal hesap uydurma.

## Teknik mimari

Next.js App Router + TypeScript strict + Tailwind CSS kullan. Projede hâlihazırda sürümler varsa uyumlu olanları koru; sıfır projede güncel kararlı ve birbiriyle uyumlu sürümleri kur, lockfile ekle. Animasyon için Motion for React, ikonlar için lucide-react kullan. Kurulu sürümlerin resmi dokümantasyonunu kontrol ederek API seç.

İlk sürümde veritabanına, giriş sistemine, ödeme altyapısına, sipariş backend'ine veya yönetim paneline ihtiyaç yok. Menü salt okunur olsun. Fiyatlar tek JSON dosyasından güncellensin; değişikliklerin yeniden build/yayın gerektirdiğini README'ye yaz. Ana sayfa ve ürün içeriğini mümkün olduğunca sunucuda üret; sadece arama, filtre, favori ve modal gibi etkileşimleri client component yap. Tüm sayfayı gereksiz yere client component'e dönüştürme.

Önerilen yapı: `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `components/menu/{MenuShell,CategoryNav,ProductCard,ProductDialog,SearchBar,SizeSelector,FavoriteButton,EmptyState,ProductImage}.tsx`, `data/menu-data.json`, `data/image-sources.json`, `lib/{menu,format,search}.ts`, `types/menu.ts`, `public/images/{products,categories}`. Bileşenleri gerçek ihtiyaç doğrultusunda sade tut.

## Görsel tasarım

Butik kahve dükkânı hissi veren özgün bir tasarım kur: sıcak kırık beyaz #F7F3EC arka plan, koyu espresso #29201B ana metin, adaçayı #66745E yardımcı ton, ölçülü bakır #B88960 vurgu. Rahat boşluklar, 18–22 px kart köşeleri, ince kenarlıklar, çok hafif gölgeler kullan. Büyük dekoratif gradientler, neon, ağır cam efektleri ve sürekli hareket eden arka planlardan kaçın. Başlıklarda zarif serif, içerikte Türkçe karakterleri destekleyen okunaklı sans kullan. Fontlar yerel veya optimize servis edilsin, sistem fallback bulunsun.

Logo dosyası sağlanmadıysa sahte logo üretme; `Meyra Kafe` yazılı tipografik başlık göster. Üst bölüm mobilde ekranı kaplamasın: marka, kısa `Kahve, tatlı ve keyifli molalar` metni, arama ve kategori geçişi ilk ekranda erişilebilir olsun. Logo sonradan eklenebilir bir bileşen olsun.

## Menü akışı

Kategori sekmeleri: Sade Kahve, Sıcak Sütlü, Soğuk Kahve, Soğuk Sütlü Kahve, Çaylar, Diğer Kahveler & Sıcak İçecekler, Tatlılar, Aperatifler. Kategori adlarını JSON'dan üret. `Tümü` ve `Favoriler` sanal filtre olarak eklenebilir. Mobilde yapışkan ve yatay kaydırılabilir kategori çubuğu kullan. Seçilen kategori görünür alana gelsin; sayfanın tamamı yatay taşmasın.

Ürün kartında görsel, tam ürün adı, fiyat ve favori düğmesi olsun. 47 iki fiyatlı üründe ilk görünüm 8 oz seçili olsun; 8 oz / 12 oz seçici fiyatı kartta ve detayda tutarlı değiştirsin. Tek fiyatlı üründe boy seçici gösterme. Kart açıldığında mobilde alttan çıkan erişilebilir detay penceresi, masaüstünde ortalanmış modal göster. Detayda büyük görsel, kategori, isim, doğru fiyat ve boy seçenekleri bulunsun. Kapatma düğmesi, Escape, odak kilidi, açılan kontrole odak iadesi ve arka plan scroll kilidi çalışsın.

Arama Türkçe karakterlerle çalışsın: İ/i, I/ı, ş/s, ğ/g, ç/c, ö/o, ü/u normalizasyonu yap. `cay`, `fistik`, `sutlu`, `espresso` aramalarını doğrula. Arama, kategori ve favori filtreleri birlikte tutarlı çalışsın; aktif filtreleri temizleme seçeneği sun. Sonuç yoksa kısa bir mesaj ve filtreleri temizleme düğmesi göster. Favorileri sürümlü localStorage anahtarıyla sakla, SSR/hydration hatasını önle. Fiyatları `Intl.NumberFormat('tr-TR', {style:'currency',currency:'TRY',maximumFractionDigits:0})` ile göster.

## Görseller ve kaynak doğruluğu

Pakette her ürün için ayrı dosya yolu bulunuyor; ancak 72 dosya 24 farklı kaynak fotoğraftan hazırlanmış, benzer kahveler ve bitki çaylarında kaynaklar ortak. Bunu 72 benzersiz veya gerçek Meyra ürün fotoğrafı gibi sunma. `image-sources.json` eşleşme ve lisans notlarını içerir. Tatlılar ve bazı diğer ürünler başka işletmelerin referans fotoğraflarıdır. Stok görseller de Meyra sunumunun birebir kanıtı değildir.

Geliştirme önizlemesinde referans görselleri gösterebilirsin; kısa `Görseller temsilidir` notu kullan. Yayın öncesi hangi görsellerin işletme fotoğrafı/lisans doğrulaması gerektirdiğini README'de açıkça raporla. `imageApproved` alanını kendiliğinden true yapma; siteye sahte bir doğrulama mekanizması veya izin popup'ı ekleme. Onaysız referansların üretimde gizlenebileceği tek bir yapılandırma seçeneği sağla.

İnternetten rastgele yeni görsel çekme, hotlink veya geçici arama servisi kullanma. Yerel `public/images` dosyalarını kullan. Eksik veya bozuk dosya için görsel alanının ölçüsünü koruyan markaya uygun nötr fallback yap; başka ürünü fotoğraf olarak sessizce koyma. Mevcut kategori fotoğrafları ilgili ürün fotoğrafının kopyasıdır, farklı çekim değildir.

`next/image` ile boyutları önceden belirle. Mobil liste kartında yaklaşık 104–120 px kare thumbnail + esnek metin bölümü kullan; geniş ekranda 4:3 görselli kart düzenine geç. Ürünün tamamını korumak için önce `object-contain`, nötr arka plan ve iç boşluk kullan; fotoğraf bazında gerekirse `imageFit` / `imagePosition` metadata desteği ekle. En-boy oranını bozma, görsel içine fiyat veya ürün adı basma. Görseli CSS background olarak uygunsuz kırpma. `fill` kullanılıyorsa ebeveyn `position:relative` ve sabit aspect-ratio taşısın; gerçek yerleşime uygun `sizes` ver. Sadece ilk görünür görsel gerekiyorsa öncelikli yüklensin, kalanlar lazy-load olsun.

## Animasyon ve erişilebilirlik

Kategori değişimi, kart görünmesi, favori dokunuşu ve modal açılışında 160–250 ms arası kısa opacity/transform geçişleri kullan. Ürünleri uzun stagger zincirleriyle bekletme. Scroll parallax, autoplay video, 3D dönüş ve sürekli titreşim kullanma. MotionConfig reducedMotion='user' ve CSS prefers-reduced-motion desteği ekle. Klavye, görünür focus, uygun aria adları ve en az 44×44 px dokunma alanları sağla. Sticky alanlar odaklanan içeriği kapatmasın.

## Performans, QR ve yayın

Öncelik hızlı ilk açılış ve stabil yerleşim. Mobil LCP <2.5 sn ve CLS <0.1 hedefle; ölçülmeyen skorları elde edilmiş gibi yazma. Kullanılmayan bağımlılık kurma. Fotoğraflar WebP olarak yerel; bütün tam boy görselleri peşinen indirme. `lang='tr'`, başlık ve açıklama ekle. Alan adı verilmediği için gerçek canonical/QR hedefi uydurma. İşletmenin doğruladığı kalıcı HTTPS adresi yapılandırıldığında o adrese yönelen SVG/PNG QR üretmek için ayrı bir script sağla. QR fiyat verisini içermesin; sabit menü URL'sine işaret etsin. Böylece fiyat güncellemesinde basılı QR değişmesin.

Varsayılan Next.js yayını çalışsın. Statik hosting istenirse kurulu Next.js sürümünün `output:'export'` gereksinimlerini kontrol et; varsayılan sunucu görüntü optimizasyonunun statik export ile çalışacağını varsayma, uygun loader/unoptimized seçeneğini açıkça yapılandır.

## Tamamlama ve doğrulama

Veri doğrulama scripti yaz: 72 benzersiz ID, 8 kategori, 59 içecek, 13 yiyecek, 47 çift boy, 119 fiyat varyantı, geçerli pozitif fiyatlar, eksiksiz yerel görsel yolları. JSON'u kaynak CSV ile ürün ve fiyat düzeyinde karşılaştır. Asset kontrolünde her dosyanın gerçekten çözülebildiğini kontrol et; sadece uzantıya bakma.

320, 375, 390, 430, 768 ve 1440 px genişliklerde taşma, kesilen ürün adı ve görsel oranını kontrol et. Özellikle Buzlu İtalyan Cappuccino ve Buzlu Espresso Macchiato gibi uzun adları test et. Arama, kategori, favori, iki boy fiyat geçişi, tek fiyatlı ürün ve modal klavye davranışı için anlamlı etkileşim testleri yap. Görsel yokluğu ve reduced-motion davranışını da kontrol et. Typecheck, lint ve production build çalıştır. Hataları düzelt. Gerçekte çalıştırmadığın testi başarılı diye raporlama.

Son tesliminde çalışan uygulamayı, kurulum komutlarını, veri/fotoğraf değiştirme adımlarını, QR üretim komutunu, çalıştırılan kontrolleri ve kalan somut eksikleri açıkça belirt. Sadece tasarım taslağıyla işi bitirme.
