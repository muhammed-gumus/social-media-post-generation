/**
 * Wizard Configuration
 * Contains centralized configuration for the wizard steps, platforms, and content types
 */

// Step configuration
export interface WizardStepConfig {
  id: string;
  title: string;
  description: string;
  nextValidationKey?: keyof WizardState; // The state key to check for validation
  required?: boolean; // Whether the step is required or can be skipped
}

// Define the wizard step configurations
export const wizardSteps: WizardStepConfig[] = [
  {
    id: "language",
    title: "Dil Seçimi",
    description: "İçeriğinizin dilini seçin",
    nextValidationKey: "selectedLanguage",
    required: true,
  },
  {
    id: "platform",
    title: "Platform Seçimi",
    description: "Hangi platform için içerik oluşturmak istersiniz?",
    nextValidationKey: "selectedPlatform",
    required: true,
  },
  {
    id: "contentType",
    title: "İçerik Türü",
    description: "Platform için nasıl bir içerik türü istiyorsunuz?",
    nextValidationKey: "selectedContentType",
    required: true,
  },
  {
    id: "industry",
    title: "Sektör Seçimi",
    description: "İçeriğinizin hangi sektöre hitap ettiğini seçin",
    nextValidationKey: "selectedIndustry",
    required: true,
  },
  {
    id: "purpose",
    title: "İçerik Amacı",
    description: "İçeriğinizin amacını belirleyin",
    nextValidationKey: "selectedPurpose",
    required: false,
  },
  {
    id: "audienceCategory",
    title: "Hedef Kitle Kategorisi",
    description: "Hedef kitle kategorinizi seçin",
    nextValidationKey: "selectedAudienceCategory",
    required: false,
  },
  {
    id: "audience",
    title: "Hedef Kitle",
    description: "Spesifik hedef kitlenizi belirleyin",
    nextValidationKey: "selectedAudience",
    required: true,
  },
  {
    id: "tone",
    title: "İçerik Tonu",
    description: "İçeriğinizin tonunu seçin",
    nextValidationKey: "selectedTone",
    required: false,
  },
  {
    id: "contentDetails",
    title: "İçerik Detayları",
    description: "İçeriğinizi detaylandırın",
    nextValidationKey: "contentDescription",
    required: true,
  },
  {
    id: "profileInfo",
    title: "Profil Bilgileri",
    description: "Mockup için profil bilgileriniz (opsiyonel)",
    required: false,
  },
];

// Platform configuration
export interface PlatformConfig {
  id: string;
  name: string;
  icon: string;
  defaultPurpose: string;
  defaultTone: string;
  targetAudience: string[];
  recommendedContentLength: string;
  contentTypes: ContentTypeConfig[];
  platformSpecificFields?: {
    id: string;
    name: string;
    type: "select" | "input" | "checkbox";
    options?: { value: string; label: string }[];
    defaultValue?: string | boolean;
    description: string;
  }[];
}

// Content type configuration
export interface ContentTypeConfig {
  id: string;
  name: string;
  description: string;
  minLength?: number;
  maxLength?: number;
  supportsImage: boolean;
  defaultTone?: string;
  tips: string[];
}

// Define platform configurations
export const platforms: PlatformConfig[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "📱",
    defaultPurpose: "engagement",
    defaultTone: "friendly",
    targetAudience: ["gen_z", "millennials"],
    recommendedContentLength: "medium",
    platformSpecificFields: [
      {
        id: "instagramFilter",
        name: "Instagram Filtresi",
        type: "select",
        options: [
          { value: "", label: "Filtre yok" },
          { value: "clarendon", label: "Clarendon" },
          { value: "gingham", label: "Gingham" },
          { value: "moon", label: "Moon" },
          { value: "lark", label: "Lark" },
          { value: "reyes", label: "Reyes" },
        ],
        defaultValue: "",
        description: "Instagram görseliniz için tercih edilen filtre",
      },
    ],
    contentTypes: [
      {
        id: "post",
        name: "Gönderi",
        description: "Tek görsel içeriği (1:1 format)",
        supportsImage: true,
        minLength: 10,
        maxLength: 2200,
        tips: [
          "Kısa ve öz bir başlık kullanın",
          "Görsel içerikle metnin uyumlu olmasına dikkat edin",
          "En fazla 5-10 hashtag kullanın",
          "Takipçilerinizi etkileşime teşvik eden bir soru veya çağrı ekleyin",
        ],
      },
      {
        id: "story",
        name: "Hikaye",
        description: "24 saatlik dikey içerik (9:16 format)",
        supportsImage: true,
        minLength: 1,
        maxLength: 250,
        tips: [
          "Kısa ve çarpıcı mesajlar kullanın",
          "Görsel içeriği ön planda tutun",
          "Etiket ve konum ekleyin",
          "Etkileşimi artırmak için anket, soru-cevap gibi araçları kullanın",
        ],
      },
      {
        id: "guide",
        name: "Rehber",
        description: "Eğitici ve bilgilendirici içerik serisi",
        defaultTone: "informative",
        supportsImage: true,
        minLength: 50,
        maxLength: 3000,
        tips: [
          "Adım adım bilgileri sıralayın",
          "Her adımı görsellerle destekleyin",
          "Anlaşılır bir dil kullanın",
          "Pratik örnekler verin",
        ],
      },
      {
        id: "carousel",
        name: "Carousel",
        description: "Çoklu görsel içerik (kaydırmalı)",
        supportsImage: true,
        minLength: 30,
        maxLength: 2200,
        tips: [
          "Her slayt için kısa bir başlık belirleyin",
          "Görsel akışında bir hikaye anlatın",
          "İlk görseli dikkat çekici yapın",
          "Sayı veya madde işaretleriyle içeriği organize edin",
        ],
      },
    ],
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: "🐦",
    defaultPurpose: "awareness",
    defaultTone: "conversational",
    targetAudience: ["professionals", "tech"],
    recommendedContentLength: "short",
    platformSpecificFields: [
      {
        id: "twitterCharLimit",
        name: "Karakter Limiti",
        type: "select",
        options: [
          { value: "280", label: "Standart (280)" },
          { value: "140", label: "Kısa (140)" },
          { value: "200", label: "Orta (200)" },
        ],
        defaultValue: "280",
        description: "Tweet başına maksimum karakter sayısı",
      },
    ],
    contentTypes: [
      {
        id: "tweet",
        name: "Tweet",
        description: "Standart metin ve görsel içeriği (280 karakter)",
        supportsImage: true,
        maxLength: 280,
        tips: [
          "Kısa ve öz mesajlar yazın",
          "Güncel konular ve hashtagler kullanın",
          "Soru sorarak etkileşimi artırın",
          "İlgili hesapları etiketleyin",
        ],
      },
      {
        id: "thread",
        name: "Flood",
        description: "Birbiriyle bağlantılı tweet serisi (Thread)",
        supportsImage: false,
        defaultTone: "storytelling",
        maxLength: 280,
        tips: [
          "Thread'ler için numaralandırma yapın (1/X formatında)",
          "Her tweet 280 karakteri geçmemeli",
          "Konuyu mantıklı bir sırayla anlatın",
          "Son tweet'te özet veya çağrı ekleyin",
        ],
      },
      {
        id: "textOnly",
        name: "Sadece Metin",
        description: "Görselsiz, sade metin içeriği",
        supportsImage: false,
        maxLength: 280,
        tips: [
          "Vurucu bir giriş cümlesi kullanın",
          "Emojiler kullanarak ifadenizi güçlendirin",
          "Kısa ve anlaşılır olun",
          "Bir hashtag ekleyin",
        ],
      },
      {
        id: "poll",
        name: "Anket",
        description: "Kullanıcı oylaması içeren içerik",
        supportsImage: false,
        maxLength: 280,
        tips: [
          "Net ve tarafsız bir soru sorun",
          "Anlaşılır seçenekler sunun",
          "Anketin amacını belirtin",
          "Sonucu paylaşacağınızı duyurun",
        ],
      },
      {
        id: "quote",
        name: "Alıntı Tweet",
        description: "Başka bir tweet'i alıntılayan içerik",
        supportsImage: true,
        maxLength: 280,
        tips: [
          "Alıntıladığınız içerikle ilgili kendi görüşünüzü ekleyin",
          "Katılmadığınız noktalarda nazik olun",
          "İlave bilgi verin",
          "Bağlam sağlayın",
        ],
      },
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    defaultPurpose: "thought_leadership",
    defaultTone: "professional",
    targetAudience: ["professionals", "executives"],
    recommendedContentLength: "medium",
    contentTypes: [
      {
        id: "post",
        name: "Gönderi",
        description: "Profesyonel görsel ve metin içeriği",
        supportsImage: true,
        minLength: 50,
        maxLength: 3000,
        tips: [
          "Profesyonel bir dil kullanın",
          "Sektörel bilgiler ve deneyimlerinizi paylaşın",
          "Mesleki gelişim tavsiyesi verin",
          "İlgili profesyonelleri etiketleyin",
        ],
      },
      {
        id: "article",
        name: "Makale",
        description: "Uzun formatlı detaylı içerik",
        defaultTone: "authoritative",
        supportsImage: true,
        minLength: 300,
        tips: [
          "Giriş, gelişme ve sonuç bölümlerini belirgin yapın",
          "Alt başlıklar kullanın",
          "Önemli noktaları vurgulayın",
          "Profesyonel bir dil kullanın",
        ],
      },
      {
        id: "newsletter",
        name: "Bülten",
        description: "Periyodik profesyonel içerik serisi",
        supportsImage: true,
        minLength: 200,
        tips: [
          "Net bir konu odağı belirleyin",
          "Okuyucunun ilgisini çekecek bir başlık seçin",
          "Sektörel içgörüler ve analiz ekleyin",
          "Düzenli yayın periyodu belirleyin",
        ],
      },
      {
        id: "poll",
        name: "Anket",
        description: "Profesyonel bağlantı ağınızla anket",
        supportsImage: false,
        minLength: 20,
        maxLength: 1500,
        tips: [
          "Sektörle ilgili güncel bir konu seçin",
          "Profesyonel bir dil kullanın",
          "Anket sonrası yorumlarla etkileşim kurun",
          "Sonuçları değerlendirip paylaşın",
        ],
      },
      {
        id: "document",
        name: "Doküman",
        description: "PDF veya sunum formatında içerik",
        supportsImage: true,
        tips: [
          "Markalaşmış bir şablon kullanın",
          "Görsellerle destekleyin",
          "Özet bir giriş yazısı hazırlayın",
          "Okuyuculara dokümanı neden indirmeleri gerektiğini açıklayın",
        ],
      },
    ],
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "👍",
    defaultPurpose: "engagement",
    defaultTone: "friendly",
    targetAudience: ["gen_x", "boomers"],
    recommendedContentLength: "medium",
    platformSpecificFields: [
      {
        id: "facebookPrivacy",
        name: "Görünürlük",
        type: "select",
        options: [
          { value: "public", label: "Herkese Açık" },
          { value: "friends", label: "Arkadaşlar" },
          { value: "specific", label: "Belirli Gruplar" },
        ],
        defaultValue: "public",
        description:
          "İçeriğin Facebook üzerinde kimler tarafından görülebileceği",
      },
    ],
    contentTypes: [
      {
        id: "post",
        name: "Gönderi",
        description: "Standart görsel ve metin içeriği",
        supportsImage: true,
        minLength: 20,
        maxLength: 5000,
        tips: [
          "Samimi bir dil kullanın",
          "Görsellerle destekleyin",
          "Soru sorarak etkileşimi artırın",
          "İlgili kişileri etiketleyin",
        ],
      },
      {
        id: "longPost",
        name: "Uzun Gönderi",
        description: "Detaylı metin ve görsel içeriği",
        supportsImage: true,
        minLength: 200,
        tips: [
          "Hikaye anlatımı tekniklerini kullanın",
          "Bölümler halinde düzenleyin",
          "Görseller ekleyin",
          "Sonunda okuyucuyu bir eyleme teşvik edin",
        ],
      },
      {
        id: "event",
        name: "Etkinlik",
        description: "Etkinlik tanıtım içeriği",
        supportsImage: true,
        minLength: 50,
        tips: [
          "Etkinlik detaylarını net belirtin (tarih, saat, yer)",
          "Etkinliğin amacını açıklayın",
          "RSVP bilgisi ekleyin",
          "İlgili görseller kullanın",
        ],
      },
      {
        id: "album",
        name: "Fotoğraf Albümü",
        description: "Çoklu fotoğraf koleksiyonu",
        supportsImage: true,
        minLength: 20,
        tips: [
          "Albüme açıklayıcı bir isim verin",
          "Fotoğrafları kronolojik veya tematik olarak sıralayın",
          "Her fotoğrafa kısa açıklamalar ekleyin",
          "İlgili kişileri etiketleyin",
        ],
      },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "🎵",
    defaultPurpose: "entertainment",
    defaultTone: "humorous",
    targetAudience: ["gen_z"],
    recommendedContentLength: "short",
    contentTypes: [
      {
        id: "post",
        name: "Post",
        description: "Kısa ve etkili görsel içerik",
        supportsImage: true,
        maxLength: 150,
        tips: [
          "Trend olan müzik ve hashtag'leri kullanın",
          "İlk 3 saniyede dikkat çekin",
          "Kısa ve eğlenceli olun",
          "Meydan okumalar veya challenge'lar oluşturun",
        ],
      },
      {
        id: "story",
        name: "Hikaye",
        description: "24 saatlik geçici içerik",
        supportsImage: true,
        maxLength: 150,
        tips: [
          "Günlük ve samimi bir yaklaşım benimseyin",
          "Arka planda müzik kullanın",
          "Görsel efektlerle zenginleştirin",
          "İzleyicilerinizi etiketleyin ve etkileşime geçirin",
        ],
      },
      {
        id: "series",
        name: "Seri İçerik",
        description: "Bölümler halinde bilgi paylaşımı",
        supportsImage: true,
        maxLength: 150,
        tips: [
          "Her bölüm için tutarlı bir format belirleyin",
          "Kısa ve merak uyandırıcı bölümler oluşturun",
          "Bir sonraki bölüm için merak uyandırın",
          "Her bölümde aynı hashtag'i kullanın",
        ],
      },
    ],
  },
];

// Content tone configuration
export interface ToneConfig {
  id: string;
  name: string;
  description: string;
  examples: string[];
}

// Define content tones
export const contentTones: ToneConfig[] = [
  {
    id: "informative",
    name: "Bilgilendirici",
    description: "Eğitici ve açıklayıcı ton",
    examples: [
      "Yapay zeka, insanların yapabildiği bilişsel görevleri gerçekleştiren bilgisayar sistemlerini ifade eder.",
      "Bu teknik 3 adımda uygulanır: önce analiz, sonra planlama ve en son uygulama.",
    ],
  },
  {
    id: "professional",
    name: "Profesyonel",
    description: "Kurumsal ve resmi dil",
    examples: [
      "Şirketimiz, sürdürülebilirlik hedeflerimize ulaşmak için yeni bir strateji geliştirmiştir.",
      "Profesyonel gelişiminize katkı sağlayacak bu seminer, sektörün önde gelen uzmanları tarafından sunulacaktır.",
    ],
  },
  {
    id: "friendly",
    name: "Samimi",
    description: "Arkadaşça ve ulaşılabilir ton",
    examples: [
      "Hey! Bugün nasılsın? Harika bir haberimiz var seninle paylaşmak istediğimiz!",
      "Biz de senin gibi düşünüyoruz, bu yüzden yeni ürünümüzü tam da ihtiyacın olduğu gibi tasarladık.",
    ],
  },
  {
    id: "humorous",
    name: "Esprili",
    description: "Mizah içeren rahat dil",
    examples: [
      'Pazartesiler o kadar zor ki, kahvemiz bile "Bu çok erken, ben hazır değilim" diyor.',
      "Toplantılarımızdaki tek egzersiz, sonuçlara atlama olmamalı!",
    ],
  },
  {
    id: "inspirational",
    name: "İlham Verici",
    description: "Motive edici ve pozitif",
    examples: [
      "Her başarısızlık, başarıya giden yolda bir adımdır. Asla vazgeçme!",
      "Potansiyelinin sınırlarını zorla. Bugün dünden daha güçlü ol.",
    ],
  },
  {
    id: "authoritative",
    name: "Otoriter",
    description: "Uzman ve güven veren ton",
    examples: [
      "15 yıllık araştırmalarımız gösteriyor ki bu yaklaşım %40 daha etkili sonuçlar veriyor.",
      "Bu alandaki deneyimime dayanarak söyleyebilirim ki, en etkili yöntem şu şekildedir.",
    ],
  },
  {
    id: "emotional",
    name: "Duygusal",
    description: "Duygulara hitap eden içerik",
    examples: [
      "O an, hayatımın dönüm noktasıydı. Kalbim hızla atarken, tüm zorluklara rağmen ilerlemeye karar verdim.",
      "Her gülümseme, her gözyaşı bizim hikayemizin bir parçası. Birlikte yarattığımız anılar sonsuza dek kalacak.",
    ],
  },
  {
    id: "controversial",
    name: "Tartışmalı",
    description: "Dikkat çeken ve farklı görüşlere yer veren",
    examples: [
      "Herkes bu konuda hemfikir görünse de, gerçek veriler tam tersini gösteriyor.",
      "Bu popüler inanış, aslında büyük bir yanılgıdan ibaret olabilir mi?",
    ],
  },
  {
    id: "urgent",
    name: "Acil/Heyecanlı",
    description: "Hızlı aksiyon almaya teşvik eden",
    examples: [
      "Son başvuru tarihi bu gece yarısı! Bu fırsatı kaçırmayın!",
      "Stoklar tükenmek üzere! Hemen şimdi sipariş verin!",
    ],
  },
  {
    id: "storytelling",
    name: "Hikaye Anlatımı",
    description: "Anlatı formatında içerik",
    examples: [
      "Küçük bir kasabada başlayan yolculuğumuz, bugün global bir harekete dönüştü. İşte bizim hikayemiz...",
      "Sabahın erken saatleriydi. Güneş yeni doğmuştu ve ben büyük bir kararın eşiğindeydim.",
    ],
  },
];

// Content purpose configuration
export interface PurposeConfig {
  id: string;
  name: string;
  description: string;
  bestPractices: string[];
}

// Define content purposes
export const contentPurposes: PurposeConfig[] = [
  {
    id: "awareness",
    name: "Farkındalık",
    description: "Marka veya ürün bilinirliğini artırma",
    bestPractices: [
      "Markanızın değerlerini vurgulayın",
      "Görsel öğeleri öne çıkarın",
      "Akılda kalıcı ve kısa mesajlar kullanın",
      "Geniş kitleye hitap eden içerik üretin",
    ],
  },
  {
    id: "engagement",
    name: "Etkileşim",
    description: "Beğeni, yorum ve paylaşım oranlarını artırma",
    bestPractices: [
      "Sorular sorun ve tartışma başlatın",
      "Güncel konuları ele alın",
      "İzleyiciyi içeriğe dahil edin",
      "Yorumlara hızlı yanıt verin",
    ],
  },
  {
    id: "conversion",
    name: "Dönüşüm",
    description: "Satış veya kayıt gibi somut sonuçlar elde etme",
    bestPractices: [
      "Net bir çağrı ifadesi (CTA) ekleyin",
      "Ürün/hizmet faydalarını vurgulayın",
      "Müşteri sorunlarına çözüm sunun",
      "Güven oluşturan unsurlar kullanın (testimonialler, garantiler)",
    ],
  },
  {
    id: "loyalty",
    name: "Sadakat",
    description: "Mevcut müşteri bağlılığını güçlendirme",
    bestPractices: [
      "Mevcut müşterilere özel avantajlar sunun",
      "Kullanıcı deneyimlerini paylaşın",
      "Topluluk hissi oluşturun",
      "Kişiselleştirilmiş içerik üretin",
    ],
  },
  {
    id: "education",
    name: "Eğitim",
    description: "Bilgi paylaşımı ve eğitim amacı",
    bestPractices: [
      "Karmaşık konuları basitleştirin",
      "Adım adım rehberler hazırlayın",
      "Görsellerle destekleyin",
      "Pratik örnekler verin",
    ],
  },
  {
    id: "entertainment",
    name: "Eğlence",
    description: "Eğlendirici ve ilgi çekici içerik",
    bestPractices: [
      "Mizah öğeleri kullanın",
      "Güncel trendlere bağlantı kurun",
      "Beklenmedik içerikler sunun",
      "Hikaye anlatımı tekniklerinden yararlanın",
    ],
  },
  {
    id: "thought_leadership",
    name: "Düşünce Liderliği",
    description: "Sektörde otorite olarak konumlandırma",
    bestPractices: [
      "Sektörel içgörüler paylaşın",
      "Özgün fikirler ve çözümler sunun",
      "Veri ve araştırmalarla destekleyin",
      "Gelecek trendlere dair öngörüler oluşturun",
    ],
  },
];

// Get specific platform configuration by ID
export function getPlatformConfig(
  platformId: string
): PlatformConfig | undefined {
  return platforms.find((p) => p.id === platformId);
}

// Get specific content type configuration
export function getContentTypeConfig(
  platformId: string,
  contentTypeId: string
): ContentTypeConfig | undefined {
  const platform = getPlatformConfig(platformId);
  if (!platform) return undefined;

  return platform.contentTypes.find((ct) => ct.id === contentTypeId);
}

// Get content tone configuration by ID
export function getToneConfig(toneId: string): ToneConfig | undefined {
  return contentTones.find((t) => t.id === toneId);
}

// Get content purpose configuration by ID
export function getPurposeConfig(purposeId: string): PurposeConfig | undefined {
  return contentPurposes.find((p) => p.id === purposeId);
}

// Get wizard step configuration by index
export function getStepConfig(stepIndex: number): WizardStepConfig | undefined {
  if (stepIndex >= 0 && stepIndex < wizardSteps.length) {
    return wizardSteps[stepIndex];
  }
  return undefined;
}

// Generate content placeholders based on parameters
export function generateContentPlaceholder(
  platformId: string,
  contentTypeId: string
): string {
  const platform = getPlatformConfig(platformId);
  const contentType = getContentTypeConfig(platformId, contentTypeId);

  if (!platform || !contentType) {
    return "İçeriğiniz için detaylı bir açıklama yazın. Ana konuyu, hedeflenen mesajı ve vurgulanması gereken noktaları belirtin.";
  }

  if (platformId === "twitter" && contentTypeId === "thread") {
    return "Yapay zeka trendleri hakkında bir thread. Önemli gelişmeleri, etkileri ve geleceğe dair öngörüleri içeren 5-10 tweet'lik bir seri.";
  } else if (platformId === "instagram" && contentTypeId === "guide") {
    return "Sağlıklı beslenme hakkında kapsamlı bir rehber. Her bölümde farklı bir beslenme önerisi ve pratik tarifler.";
  } else if (platformId === "linkedin" && contentTypeId === "article") {
    return "İş dünyasında yapay zeka kullanımı hakkında detaylı bir analiz. Sektörel örnekler ve istatistiklerle desteklenmiş.";
  } else if (platformId === "facebook" && contentTypeId === "event") {
    return "Şirketinizin yıllık teknoloji konferansı için etkinlik duyurusu. Konuşmacılar, program ve katılım detayları.";
  }

  return `${platform.name} için bir ${contentType.name} içeriği oluşturmak istiyorum. İçeriğin konusu ve ana mesajı şu olacak: [Konu ve mesajınızı buraya yazın]`;
}

// Wizard state interface
export interface WizardState {
  // Step tracking
  currentStep: number;
  progress: number;

  // User selections
  selectedPlatform: string;
  selectedContentType: string;
  selectedAudience: string;
  selectedAudienceCategory: string;
  selectedTone: string;
  selectedPurpose: string;
  selectedIndustry: string;
  selectedLanguage: string;

  // Content details
  contentDescription: string;
  contentKeywords: string;
  imageRequired: boolean;
  contentLength: string;

  // Target audience details
  targetAgeRange: string;
  targetGender: string;
  targetLocation: string;

  // Profile information for mockup
  useProfileInfo: boolean;
  username: string;
  profilePhotoUrl: string;

  // Platform specific preferences
  instagramFilter: string;
  twitterCharLimit: number;
  facebookPrivacy: string;
}
