# Sosyal Medya İçerik Üretici Web Uygulaması - Proje Dökümanı

## Özet

Bu proje, kullanıcıdan stepper (adım adım ilerleyen form) aracılığıyla belirli bilgiler alarak, bu bilgiler doğrultusunda sosyal medya platformları (Instagram, Twitter, LinkedIn vb.) için görsel, metin veya görsel+metin içerik oluşturan bir web uygulamasıdır.

Oluşturulacak içerikler, Google'ın **Imagen 3 API'si** ve **Gemini 2.0 Flash** modeli kullanılarak üretilecektir. Görsel ve metin içeriklerin ayrı ayrı veya birlikte üretilmesi seçenekleri sunulacaktır.

## Teknolojiler

- **Frontend:** Next.js 14 (App Router) + TypeScript
- **UI Kit:** Tailwind CSS + shadcn/ui
- **LLM Entegrasyonu:**
  - `Gemini 2.0 Flash` (Google)
  - `Imagen 3` (Google)

## Özellikler

- Stepper yapısı ile kullanıcıdan içerik bilgisi alma
- Kullanıcı seçimine göre platform odaklı içerik üretimi
- Metin, görsel veya her ikisini üretebilme
- Görsel içerikler için Imagen 3 API kullanımı
- Metin üretimi için Gemini 2.0 Flash modeli
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
- Metin: Gemini 2.0 Flash API kullanılır
- Görsel: Imagen 3 API kullanılır
- Tüm içerikler önizlenebilir

### 4. İçerik Çıktısı Sayfası (`/result`)

- Oluşturulan içerik görüntülenir
- Metin: kopyala butonu
- Görsel: indir butonu

## API Entegrasyon Akışı

### Imagen 3 (Google)

- Kullanıcı prompt'una göre görsel üretimi için kullanılır.
- Görsel istemi: stepper'dan toplanan bilgilerle şekillendirilir.

### Gemini 2.0 Flash

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

Bu döküman, Gemini 2.0 Flash ve Imagen 3 API'leri ile geliştirilecek olan bu projeye teknik bir yol haritası sağlamak amacıyla hazırlanmıştır. Detaylara göre bileşen bileşen geliştirme yapılabilir.

