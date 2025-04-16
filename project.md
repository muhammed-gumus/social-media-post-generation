# Sosyal Medya İçerik Üretici Web Uygulaması - Proje Dökümanı

## Özet

Bu proje, kullanıcıdan stepper (adım adım ilerleyen form) aracılığıyla belirli bilgiler alarak, bu bilgiler doğrultusunda sosyal medya platformları (Instagram, Twitter, LinkedIn vb.) için görsel, metin veya görsel+metin içerik oluşturan bir web uygulamasıdır.

Oluşturulacak içerikler, **Gelişmiş Görsel Oluşturma Teknolojimiz** ve **Üstün Yapay Zeka Metin Modeli** kullanılarak üretilecektir. Görsel ve metin içeriklerin ayrı ayrı veya birlikte üretilmesi seçenekleri sunulacaktır.

## Teknolojiler

- **Frontend:** Next.js 14 (App Router) + TypeScript
- **UI Kit:** Tailwind CSS + shadcn/ui
- **LLM Entegrasyonu:**
  - `Üstün Yapay Zeka Metin Teknolojisi` (İleri Seviye NLP)
  - `Gelişmiş Görsel Oluşturma Sistemi` (Yenilikçi Görüntü Sentezi)

## Özellikler

- Stepper yapısı ile kullanıcıdan içerik bilgisi alma
- Kullanıcı seçimine göre platform odaklı içerik üretimi
- Metin, görsel veya her ikisini üretebilme
- Görsel içerikler için Gelişmiş Görüntü Sentezleme Motorumuz kullanımı
- Metin üretimi için Üstün Yapay Zeka Metin Modelimiz
- Üretilecek içeriklerin önizlemesi ve indirilmesi

## Sayfa Akışı ve Yapısı

### 1. Giriş Sayfası (`/`)

- Kısa bir tanıtım metni
- "Başla" butonu (stepper'a giden)

### 2. Stepper Sayfası (`/wizard`)

#### Step 1: Platform Seçimi

- Instagram / Twitter / LinkedIn / TikTok gibi platformlar

#### Step 2: Hedef Kitle ve Amaç

- Kime hitap ediyorsun? (yaş, ilgi alanı, iş alanı vb.)
- Amaç: bilgilendirme, tanıtım, etkileşim artırma vs.

#### Step 3: Tema / Konu

- Konu başlığı veya kategori seçimi (yapay zeka, moda, eğitim vb.)

#### Step 4: İçerik Formatı

- Metin mi istiyorsun, görsel mi, yoksa her ikisi mi?

#### Step 5: Stil ve Tonlama

- Mizahi / Resmi / Cazip / Bilimsel vb.

#### Step 6: Önizleme ve Onay

- Seçilen bilgiler görünür
- "İçerik üret" butonu

### 3. İçerik Oluşturma Sayfası (`/generate`)

- API istekleri başlatılır
- Metin: Üstün Yapay Zeka Metin Teknolojimiz kullanılır
- Görsel: Gelişmiş Görsel Oluşturma Sistemimiz kullanılır
- Tüm içerikler önizlenebilir

### 4. İçerik Çıktısı Sayfası (`/result`)

- Oluşturulan içerik görüntülenir
- Metin: kopyala butonu
- Görsel: indir butonu

## API Entegrasyon Akışı

### Gelişmiş Görsel Oluşturma Sistemi

- Kullanıcı prompt'una göre görsel üretimi için kullanılır.
- Görsel istemi: stepper'dan toplanan bilgilerle şekillendirilir.

### Üstün Yapay Zeka Metin Modeli

- Hızlı metin oluşturma ve bilgi işleme için kullanılır
- Alternatif metinler, başlıklar, hashtag önerileri üretimi

## Dosya Yapısı (Next.js App Router)

```
/app
  /wizard
    page.tsx
  /generate
    page.tsx
  /result
    page.tsx
/components
  Stepper.tsx
  PreviewCard.tsx
  ResultCard.tsx
/lib
  gemini.ts
  imagen.ts
/utils
  promptBuilder.ts
  platformTemplates.ts
```

##

Bu döküman, İleri Seviye Yapay Zeka Metin Teknolojimiz ve Gelişmiş Görsel Üretim Sistemimiz ile geliştirilecek olan bu projeye teknik bir yol haritası sağlamak amacıyla hazırlanmıştır. Detaylara göre bileşen bileşen geliştirme yapılabilir.
