import type {Locale} from "@/i18n/routing";

type LocalizedText = Record<Locale, string>;

export type LegalSection = {
  heading: LocalizedText;
  body: LocalizedText[];
};

export type LegalDocument = {
  slug: string;
  kicker: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  updated: string;
  sections: LegalSection[];
};

export const legalDocuments: LegalDocument[] = [
  {
    slug: "contact-disclosure",
    updated: "2026-01-01",
    kicker: {
      tr: "Kişisel Veri Bildirimi",
      en: "Data Notice",
      ar: "إشعار البيانات",
    },
    title: {
      tr: "İletişim Aydınlatma Metni",
      en: "Contact Disclosure Notice",
      ar: "إشعار الإفصاح عن الاتصال",
    },
    summary: {
      tr: "İletişim formu, e-posta veya telefon aracılığıyla bizimle iletişime geçtiğinizde kişisel verilerinizin nasıl işlendiğine ilişkin aydınlatma metni.",
      en: "How your personal data is processed when you contact us through our contact form, email or phone.",
      ar: "كيفية معالجة بياناتك الشخصية عند التواصل معنا عبر نموذج الاتصال أو البريد الإلكتروني أو الهاتف.",
    },
    sections: [
      {
        heading: {
          tr: "Veri Sorumlusu",
          en: "Data Controller",
          ar: "المتحكم بالبيانات",
        },
        body: [
          {
            tr: "6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") uyarınca kişisel verileriniz; veri sorumlusu sıfatıyla FGPOOL (\"Şirket\") tarafından, 6172 Sokak No: 14F İç Kapı No: 11 Bornova / İzmir adresinde faaliyet gösterdiğimiz kapsamda aşağıda açıklanan şekilde işlenmektedir.",
            en: "Under Law No. 6698 on the Protection of Personal Data (\"KVKK\"), your personal data is processed by FGPOOL (\"Company\"), located at 6172 Sokak No: 14F İç Kapı No: 11 Bornova / İzmir, Türkiye, acting as the data controller, as described below.",
            ar: "بموجب القانون رقم 6698 لحماية البيانات الشخصية (\"KVKK\")، تتم معالجة بياناتك الشخصية من قبل شركة FGPOOL (\"الشركة\")، الكائنة في 6172 Sokak No: 14F İç Kapı No: 11 Bornova / İzmir، تركيا، بصفتها المتحكم بالبيانات، على النحو الموضح أدناه.",
          },
        ],
      },
      {
        heading: {
          tr: "İşlenen Kişisel Veriler",
          en: "Personal Data Processed",
          ar: "البيانات الشخصية التي تتم معالجتها",
        },
        body: [
          {
            tr: "İletişim formunu doldurduğunuzda veya bize e-posta ya da telefon yoluyla ulaştığınızda ad-soyad, e-posta adresi, telefon numarası, şirket bilginiz ve mesaj içeriğiniz gibi kimlik ve iletişim verileriniz işlenir.",
            en: "When you submit our contact form or reach us by email or phone, we process identity and contact data such as your name, email address, phone number, company information and the content of your message.",
            ar: "عند تعبئة نموذج الاتصال أو التواصل معنا عبر البريد الإلكتروني أو الهاتف، نقوم بمعالجة بيانات الهوية والاتصال مثل الاسم والبريد الإلكتروني ورقم الهاتف ومعلومات الشركة ومحتوى رسالتك.",
          },
        ],
      },
      {
        heading: {
          tr: "İşleme Amaçları",
          en: "Purposes of Processing",
          ar: "أغراض المعالجة",
        },
        body: [
          {
            tr: "Verileriniz; talebinizin değerlendirilmesi, tarafınıza dönüş yapılması, teklif ve satış süreçlerinin yürütülmesi, müşteri ilişkilerinin yönetimi ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenir.",
            en: "Your data is processed to evaluate and respond to your request, carry out quotation and sales processes, manage customer relationships and fulfil our legal obligations.",
            ar: "تتم معالجة بياناتك لتقييم طلبك والرد عليه، وتنفيذ عمليات التسعير والبيع، وإدارة علاقات العملاء، والوفاء بالتزاماتنا القانونية.",
          },
        ],
      },
      {
        heading: {
          tr: "Hukuki Sebep ve Aktarım",
          en: "Legal Basis and Transfer",
          ar: "الأساس القانوني والنقل",
        },
        body: [
          {
            tr: "Verileriniz, KVKK m.5/2 kapsamında bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması ile meşru menfaat hukuki sebeplerine dayanılarak işlenir; gerekli olması halinde tedarikçilerimiz, iş ortaklarımız ve yasal olarak yetkili kamu kurumlarıyla sınırlı olarak paylaşılabilir.",
            en: "Your data is processed based on the legal grounds of contractual necessity and legitimate interest under KVKK Art. 5/2, and may be shared, where necessary, with our suppliers, business partners and legally authorised public bodies.",
            ar: "تتم معالجة بياناتك استناداً إلى الأسس القانونية للضرورة التعاقدية والمصلحة المشروعة بموجب المادة 5/2 من قانون حماية البيانات الشخصية، وقد تتم مشاركتها عند الحاجة مع الموردين والشركاء والجهات الحكومية المخولة قانونياً.",
          },
        ],
      },
      {
        heading: {
          tr: "Saklama Süresi ve Haklarınız",
          en: "Retention Period and Your Rights",
          ar: "مدة الاحتفاظ وحقوقك",
        },
        body: [
          {
            tr: "Verileriniz, ilgili mevzuatta öngörülen ya da işleme amacının gerektirdiği süre boyunca saklanır. KVKK m.11 kapsamındaki haklarınızı kullanmak için sales@fgpool.com adresinden bizimle iletişime geçebilirsiniz.",
            en: "Your data is retained for the period required by applicable legislation or the purpose of processing. You may exercise your rights under KVKK Art. 11 by contacting us at sales@fgpool.com.",
            ar: "يتم الاحتفاظ ببياناتك للمدة التي تتطلبها التشريعات المعمول بها أو الغرض من المعالجة. يمكنك ممارسة حقوقك بموجب المادة 11 من قانون حماية البيانات الشخصية عبر التواصل معنا على sales@fgpool.com.",
          },
        ],
      },
    ],
  },
  {
    slug: "terms-of-use",
    updated: "2026-01-01",
    kicker: {
      tr: "Hukuki Metin",
      en: "Legal Terms",
      ar: "الشروط القانونية",
    },
    title: {
      tr: "Kullanım Koşulları",
      en: "Terms of Use",
      ar: "شروط الاستخدام",
    },
    summary: {
      tr: "FGPOOL internet sitesini ziyaret ederek ve kullanarak kabul etmiş sayıldığınız kullanım koşulları.",
      en: "The terms you accept by visiting and using the FGPOOL website.",
      ar: "الشروط التي تقبلها عند زيارة موقع FGPOOL واستخدامه.",
    },
    sections: [
      {
        heading: {
          tr: "Kabul",
          en: "Acceptance",
          ar: "القبول",
        },
        body: [
          {
            tr: "Bu internet sitesini kullanarak işbu kullanım koşullarını kabul etmiş sayılırsınız. Koşulları kabul etmiyorsanız siteyi kullanmamanızı rica ederiz.",
            en: "By using this website you are deemed to accept these terms of use. If you do not agree, please refrain from using the site.",
            ar: "باستخدامك لهذا الموقع، فإنك تعتبر موافقاً على شروط الاستخدام هذه. إذا كنت لا توافق، يرجى الامتناع عن استخدام الموقع.",
          },
        ],
      },
      {
        heading: {
          tr: "Sitenin Kullanımı",
          en: "Use of the Site",
          ar: "استخدام الموقع",
        },
        body: [
          {
            tr: "Site içeriği yalnızca bilgilendirme ve ticari tanıtım amacıyla sunulmaktadır. Sitedeki bilgileri hukuka aykırı, yanıltıcı veya üçüncü kişilerin haklarını ihlal edecek şekilde kullanamazsınız.",
            en: "The content of the site is provided for informational and commercial promotion purposes only. You may not use the information on the site unlawfully, misleadingly, or in a way that infringes the rights of third parties.",
            ar: "يتم توفير محتوى الموقع لأغراض إعلامية وترويجية تجارية فقط. لا يجوز لك استخدام المعلومات الواردة في الموقع بشكل غير قانوني أو مضلل أو بطريقة تنتهك حقوق الغير.",
          },
        ],
      },
      {
        heading: {
          tr: "Fikri Mülkiyet",
          en: "Intellectual Property",
          ar: "الملكية الفكرية",
        },
        body: [
          {
            tr: "Sitede yer alan logo, marka, metin, görsel ve teknik doküman gibi tüm içerikler FGPOOL'a aittir veya FGPOOL tarafından lisanslı olarak kullanılmaktadır; önceden yazılı izin olmaksızın çoğaltılamaz veya dağıtılamaz.",
            en: "All content on the site, including logos, trademarks, text, imagery and technical documents, belongs to or is licensed to FGPOOL and may not be reproduced or distributed without prior written consent.",
            ar: "جميع المحتويات الموجودة على الموقع، بما في ذلك الشعارات والعلامات التجارية والنصوص والصور والمستندات الفنية، مملوكة لشركة FGPOOL أو مرخصة لها، ولا يجوز نسخها أو توزيعها دون إذن كتابي مسبق.",
          },
        ],
      },
      {
        heading: {
          tr: "Sorumluluğun Sınırlandırılması",
          en: "Limitation of Liability",
          ar: "تحديد المسؤولية",
        },
        body: [
          {
            tr: "FGPOOL, sitede yer alan bilgilerin güncelliği ve doğruluğu için makul özeni gösterir; ancak sitenin kesintisiz veya hatasız olacağını garanti etmez ve sitenin kullanımından doğabilecek dolaylı zararlardan sorumlu tutulamaz.",
            en: "FGPOOL takes reasonable care to keep the information on the site accurate and up to date, but does not warrant that the site will be uninterrupted or error-free and shall not be liable for any indirect damages arising from its use.",
            ar: "تبذل شركة FGPOOL عناية معقولة للحفاظ على دقة المعلومات الواردة في الموقع وتحديثها، لكنها لا تضمن أن يكون الموقع خالياً من الانقطاع أو الأخطاء، ولا تتحمل المسؤولية عن أي أضرار غير مباشرة ناتجة عن استخدامه.",
          },
        ],
      },
      {
        heading: {
          tr: "Değişiklikler ve Uygulanacak Hukuk",
          en: "Changes and Governing Law",
          ar: "التعديلات والقانون الواجب التطبيق",
        },
        body: [
          {
            tr: "FGPOOL, işbu kullanım koşullarını dilediği zaman güncelleyebilir. Bu koşullar Türkiye Cumhuriyeti kanunlarına tabidir; doğabilecek uyuşmazlıklarda İzmir (Merkez) Mahkemeleri ve İcra Daireleri yetkilidir.",
            en: "FGPOOL may update these terms of use at any time. These terms are governed by the laws of the Republic of Türkiye, and the courts and enforcement offices of İzmir (Central) shall have jurisdiction over any disputes.",
            ar: "يجوز لشركة FGPOOL تحديث شروط الاستخدام هذه في أي وقت. تخضع هذه الشروط لقوانين جمهورية تركيا، وتختص محاكم ودوائر التنفيذ في إزمير (المركز) بالفصل في أي نزاعات.",
          },
        ],
      },
    ],
  },
  {
    slug: "commercial-electronic-message",
    updated: "2026-01-01",
    kicker: {
      tr: "Pazarlama İzni",
      en: "Marketing Consent",
      ar: "موافقة تسويقية",
    },
    title: {
      tr: "Ticari Elektronik İleti Aydınlatma Metni",
      en: "Commercial Electronic Message Disclosure",
      ar: "إشعار الرسائل الإلكترونية التجارية",
    },
    summary: {
      tr: "Onayınız dahilinde tarafınıza gönderilecek ticari elektronik iletilere ilişkin bilgilendirme metni.",
      en: "Information about commercial electronic messages sent to you with your consent.",
      ar: "معلومات حول الرسائل الإلكترونية التجارية التي تُرسل إليك بموافقتك.",
    },
    sections: [
      {
        heading: {
          tr: "Kapsam",
          en: "Scope",
          ar: "النطاق",
        },
        body: [
          {
            tr: "6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ve ilgili yönetmelik uyarınca, tarafınıza e-posta, SMS veya telefon yoluyla ticari elektronik ileti (kampanya, ürün duyurusu, bülten vb.) gönderilebilmesi için önceden onayınız alınır.",
            en: "In accordance with Law No. 6563 on the Regulation of Electronic Commerce and its related regulation, your prior consent is obtained before sending you commercial electronic messages (campaigns, product announcements, newsletters, etc.) by email, SMS or phone.",
            ar: "وفقاً للقانون رقم 6563 بشأن تنظيم التجارة الإلكترونية واللائحة ذات الصلة، يتم الحصول على موافقتك المسبقة قبل إرسال رسائل إلكترونية تجارية إليك (حملات، إعلانات منتجات، نشرات إخبارية، إلخ) عبر البريد الإلكتروني أو الرسائل النصية أو الهاتف.",
          },
        ],
      },
      {
        heading: {
          tr: "İşlenen Veriler ve Amaç",
          en: "Data Processed and Purpose",
          ar: "البيانات المعالجة والغرض",
        },
        body: [
          {
            tr: "Onay sürecinde ad-soyad, e-posta adresi, telefon numarası ve onay tarihi gibi veriler; size uygun ürün, kampanya ve içeriklerin iletilmesi, pazarlama faaliyetlerinin yürütülmesi amacıyla işlenir.",
            en: "During the consent process, data such as your name, email address, phone number and consent date are processed for the purpose of delivering relevant product, campaign and content information and carrying out marketing activities.",
            ar: "أثناء عملية الموافقة، تتم معالجة بيانات مثل الاسم والبريد الإلكتروني ورقم الهاتف وتاريخ الموافقة بهدف تزويدك بمعلومات المنتجات والحملات والمحتوى ذي الصلة وتنفيذ الأنشطة التسويقية.",
          },
        ],
      },
      {
        heading: {
          tr: "Ret Hakkı ve İYS",
          en: "Right to Refuse and Message Management System",
          ar: "حق الرفض ونظام إدارة الرسائل",
        },
        body: [
          {
            tr: "Verdiğiniz onayı, tarafınıza gönderilen her iletideki ret bağlantısı üzerinden, İleti Yönetim Sistemi (İYS) üzerinden veya sales@fgpool.com adresine yazılı başvuru ile dilediğiniz zaman ücretsiz olarak geri alabilirsiniz. Ret talebiniz en geç 3 iş günü içinde işleme alınır.",
            en: "You may withdraw your consent at any time, free of charge, via the unsubscribe link included in each message, through the Message Management System (İYS), or by written request to sales@fgpool.com. Your refusal request will be processed within 3 business days.",
            ar: "يمكنك سحب موافقتك في أي وقت ومجاناً عبر رابط إلغاء الاشتراك المرفق في كل رسالة، أو من خلال نظام إدارة الرسائل (İYS)، أو بطلب كتابي إلى sales@fgpool.com. سيتم معالجة طلب الرفض خلال 3 أيام عمل كحد أقصى.",
          },
        ],
      },
      {
        heading: {
          tr: "Saklama Süresi",
          en: "Retention Period",
          ar: "مدة الاحتفاظ",
        },
        body: [
          {
            tr: "Onay kayıtlarınız, ilgili mevzuatta öngörülen ispat yükümlülüğü süresince veya onayınızı geri alana kadar saklanır.",
            en: "Your consent records are retained for the period required to fulfil the applicable proof obligation, or until you withdraw your consent.",
            ar: "يتم الاحتفاظ بسجلات موافقتك للمدة المطلوبة للوفاء بالتزام الإثبات المعمول به، أو حتى سحب موافقتك.",
          },
        ],
      },
    ],
  },
  {
    slug: "kvkk-disclosure",
    updated: "2026-01-01",
    kicker: {
      tr: "KVKK",
      en: "Data Protection",
      ar: "حماية البيانات",
    },
    title: {
      tr: "KVKK Aydınlatma Metni",
      en: "Personal Data Protection Disclosure (KVKK)",
      ar: "إشعار حماية البيانات الشخصية (KVKK)",
    },
    summary: {
      tr: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla kişisel verilerinizin işlenmesine ilişkin genel aydınlatma metni.",
      en: "General disclosure on the processing of your personal data by FGPOOL as data controller under Law No. 6698 on the Protection of Personal Data.",
      ar: "إشعار عام بشأن معالجة بياناتك الشخصية من قبل شركة FGPOOL بصفتها المتحكم بالبيانات بموجب القانون رقم 6698 لحماية البيانات الشخصية.",
    },
    sections: [
      {
        heading: {
          tr: "Veri Sorumlusunun Kimliği",
          en: "Identity of the Data Controller",
          ar: "هوية المتحكم بالبيانات",
        },
        body: [
          {
            tr: "FGPOOL, 6172 Sokak No: 14F İç Kapı No: 11 Bornova / İzmir adresinde faaliyet gösteren, havuz ekipmanları üretimi ve toptan tedariki alanında faaliyet gösteren veri sorumlusudur.",
            en: "FGPOOL, operating at 6172 Sokak No: 14F İç Kapı No: 11 Bornova / İzmir, Türkiye, and active in the manufacturing and wholesale supply of pool equipment, acts as the data controller.",
            ar: "شركة FGPOOL، الكائنة في 6172 Sokak No: 14F İç Kapı No: 11 Bornova / İzmir، تركيا، والعاملة في تصنيع وتوريد معدات المسابح بالجملة، هي المتحكم بالبيانات.",
          },
        ],
      },
      {
        heading: {
          tr: "İşlenen Kişisel Veri Kategorileri",
          en: "Categories of Personal Data Processed",
          ar: "فئات البيانات الشخصية التي تتم معالجتها",
        },
        body: [
          {
            tr: "Kimlik (ad-soyad), iletişim (e-posta, telefon, adres), müşteri işlem (sipariş, teklif geçmişi) ve işlem güvenliği (IP adresi, çerez kayıtları) verileriniz işlenmektedir.",
            en: "We process identity data (name), contact data (email, phone, address), customer transaction data (order and quotation history) and transaction security data (IP address, cookie records).",
            ar: "نقوم بمعالجة بيانات الهوية (الاسم)، وبيانات الاتصال (البريد الإلكتروني، الهاتف، العنوان)، وبيانات معاملات العملاء (سجل الطلبات وعروض الأسعار)، وبيانات أمان المعاملات (عنوان IP، سجلات ملفات تعريف الارتباط).",
          },
        ],
      },
      {
        heading: {
          tr: "İşleme Amaçları ve Hukuki Sebep",
          en: "Purposes of Processing and Legal Basis",
          ar: "أغراض المعالجة والأساس القانوني",
        },
        body: [
          {
            tr: "Verileriniz; satış ve teklif süreçlerinin yürütülmesi, müşteri ilişkileri yönetimi, ürün ve hizmet kalitesinin artırılması ile yasal yükümlülüklerin yerine getirilmesi amacıyla, KVKK m.5'te sayılan sözleşmenin kurulması, hukuki yükümlülük ve meşru menfaat sebeplerine dayanılarak işlenir.",
            en: "Your data is processed for the purposes of carrying out sales and quotation processes, managing customer relationships, improving product and service quality, and fulfilling legal obligations, based on the legal grounds of contract performance, legal obligation and legitimate interest listed under KVKK Art. 5.",
            ar: "تتم معالجة بياناتك لأغراض تنفيذ عمليات البيع والتسعير، وإدارة علاقات العملاء، وتحسين جودة المنتجات والخدمات، والوفاء بالالتزامات القانونية، استناداً إلى الأسس القانونية لتنفيذ العقد والالتزام القانوني والمصلحة المشروعة المذكورة في المادة 5 من قانون حماية البيانات الشخصية.",
          },
        ],
      },
      {
        heading: {
          tr: "Aktarılabileceği Taraflar",
          en: "Parties to Whom Data May Be Transferred",
          ar: "الجهات التي قد يتم نقل البيانات إليها",
        },
        body: [
          {
            tr: "Kişisel verileriniz; kanunen yetkili kamu kurum ve kuruluşları, lojistik ve tedarik iş ortaklarımız, bilgi teknolojileri hizmet sağlayıcılarımız ile sınırlı ve gerekli ölçüde paylaşılabilir.",
            en: "Your personal data may be shared, to a limited and necessary extent, with legally authorised public institutions, our logistics and supply business partners, and our information technology service providers.",
            ar: "قد تتم مشاركة بياناتك الشخصية، ضمن الحد الضروري والمحدود، مع الجهات الحكومية المخولة قانونياً، وشركاء اللوجستيات والتوريد، ومزودي خدمات تكنولوجيا المعلومات لدينا.",
          },
        ],
      },
      {
        heading: {
          tr: "Toplama Yöntemi",
          en: "Method of Collection",
          ar: "طريقة الجمع",
        },
        body: [
          {
            tr: "Kişisel verileriniz; internet sitemiz, iletişim formu, e-posta, telefon ve fiziki başvurular gibi kanallar aracılığıyla otomatik veya otomatik olmayan yöntemlerle toplanmaktadır.",
            en: "Your personal data is collected through automatic or non-automatic means via channels such as our website, contact form, email, phone and in-person applications.",
            ar: "يتم جمع بياناتك الشخصية بوسائل آلية أو غير آلية عبر قنوات مثل موقعنا الإلكتروني ونموذج الاتصال والبريد الإلكتروني والهاتف والطلبات الشخصية.",
          },
        ],
      },
      {
        heading: {
          tr: "Haklarınız ve Başvuru Yöntemi",
          en: "Your Rights and How to Apply",
          ar: "حقوقك وكيفية التقدم بطلب",
        },
        body: [
          {
            tr: "KVKK m.11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını öğrenme, yurt içi/yurt dışı üçüncü kişilere aktarılıp aktarılmadığını öğrenme, eksik/yanlış işlenmişse düzeltilmesini isteme, silinmesini/yok edilmesini isteme ve zarara uğramanız halinde tazminat talep etme haklarına sahipsiniz.",
            en: "Under KVKK Art. 11, you have the right to learn whether your data is processed, request information about it, learn its purpose, learn whether it is transferred to third parties in Türkiye or abroad, request correction if it is incomplete or inaccurate, request its deletion or destruction, and claim compensation if you suffer damage.",
            ar: "بموجب المادة 11 من قانون حماية البيانات الشخصية، يحق لك معرفة ما إذا كانت بياناتك تتم معالجتها، وطلب معلومات عنها، ومعرفة الغرض من معالجتها، ومعرفة ما إذا كانت قد نُقلت إلى أطراف ثالثة داخل تركيا أو خارجها، وطلب تصحيحها إذا كانت غير مكتملة أو غير دقيقة، وطلب حذفها أو إتلافها، والمطالبة بالتعويض في حال تعرضك لضرر.",
          },
          {
            tr: "Bu haklarınızı kullanmak için kimliğinizi tevsik eden belgelerle birlikte sales@fgpool.com adresine yazılı olarak başvurabilirsiniz.",
            en: "You may exercise these rights by submitting a written application, together with documents verifying your identity, to sales@fgpool.com.",
            ar: "يمكنك ممارسة هذه الحقوق بتقديم طلب كتابي، مرفقاً بمستندات تثبت هويتك، إلى sales@fgpool.com.",
          },
        ],
      },
    ],
  },
  {
    slug: "cookie-policy",
    updated: "2026-01-01",
    kicker: {
      tr: "Çerez Yönetimi",
      en: "Cookie Management",
      ar: "إدارة ملفات الارتباط",
    },
    title: {
      tr: "Çerez Politikası",
      en: "Cookie Policy",
      ar: "سياسة ملفات تعريف الارتباط",
    },
    summary: {
      tr: "İnternet sitemizde kullanılan çerezler ve tercihlerinizi nasıl yönetebileceğiniz hakkında bilgilendirme.",
      en: "Information about the cookies used on our website and how you can manage your preferences.",
      ar: "معلومات حول ملفات تعريف الارتباط المستخدمة في موقعنا وكيفية إدارة تفضيلاتك.",
    },
    sections: [
      {
        heading: {
          tr: "Çerez Nedir?",
          en: "What Is a Cookie?",
          ar: "ما هو ملف تعريف الارتباط؟",
        },
        body: [
          {
            tr: "Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcınıza yerleştirilen ve sitenin düzgün çalışmasını, tercihlerinizin hatırlanmasını ve kullanım deneyiminizin iyileştirilmesini sağlayan küçük metin dosyalarıdır.",
            en: "Cookies are small text files placed on your browser by the websites you visit, which allow the site to function properly, remember your preferences and improve your browsing experience.",
            ar: "ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على متصفحك من قبل المواقع التي تزورها، وتتيح للموقع العمل بشكل صحيح وتذكر تفضيلاتك وتحسين تجربة تصفحك.",
          },
        ],
      },
      {
        heading: {
          tr: "Kullanılan Çerez Türleri",
          en: "Types of Cookies Used",
          ar: "أنواع ملفات تعريف الارتباط المستخدمة",
        },
        body: [
          {
            tr: "Sitemizde sitenin çalışması için zorunlu olan teknik çerezler, tercihlerinizi hatırlayan işlevsel çerezler ve site kullanımını analiz etmemizi sağlayan performans/analitik çerezler kullanılmaktadır.",
            en: "Our site uses technical cookies that are essential for the site to function, functional cookies that remember your preferences, and performance/analytics cookies that allow us to analyse site usage.",
            ar: "يستخدم موقعنا ملفات تعريف ارتباط تقنية ضرورية لعمل الموقع، وملفات تعريف ارتباط وظيفية تتذكر تفضيلاتك، وملفات تعريف ارتباط للأداء والتحليلات تتيح لنا تحليل استخدام الموقع.",
          },
        ],
      },
      {
        heading: {
          tr: "Kullanım Amaçları",
          en: "Purposes of Use",
          ar: "أغراض الاستخدام",
        },
        body: [
          {
            tr: "Çerezler; sitenin temel işlevlerinin sağlanması, dil ve görünüm tercihlerinizin hatırlanması, site performansının ölçülmesi ve size daha ilgili içerik sunulması amaçlarıyla kullanılır.",
            en: "Cookies are used to provide the core functions of the site, remember your language and display preferences, measure site performance, and present you with more relevant content.",
            ar: "تُستخدم ملفات تعريف الارتباط لتوفير الوظائف الأساسية للموقع، وتذكر تفضيلات اللغة والعرض الخاصة بك، وقياس أداء الموقع، وتقديم محتوى أكثر ملاءمة لك.",
          },
        ],
      },
      {
        heading: {
          tr: "Çerez Yönetimi",
          en: "Managing Cookies",
          ar: "إدارة ملفات تعريف الارتباط",
        },
        body: [
          {
            tr: "Tarayıcınızın ayarlar menüsünden çerezleri kabul etme, engelleme veya silme tercihinizi yönetebilirsiniz. Zorunlu çerezlerin engellenmesi, sitenin bazı bölümlerinin düzgün çalışmamasına neden olabilir.",
            en: "You can manage your preferences to accept, block or delete cookies through your browser's settings menu. Blocking essential cookies may cause some parts of the site to function incorrectly.",
            ar: "يمكنك إدارة تفضيلاتك لقبول ملفات تعريف الارتباط أو حظرها أو حذفها من خلال قائمة إعدادات متصفحك. قد يؤدي حظر ملفات تعريف الارتباط الأساسية إلى عدم عمل بعض أجزاء الموقع بشكل صحيح.",
          },
        ],
      },
      {
        heading: {
          tr: "Politika Güncellemeleri",
          en: "Policy Updates",
          ar: "تحديثات السياسة",
        },
        body: [
          {
            tr: "İşbu Çerez Politikası, mevzuat değişiklikleri veya site üzerindeki güncellemeler doğrultusunda zaman zaman revize edilebilir; güncel sürüm her zaman bu sayfada yayımlanır.",
            en: "This Cookie Policy may be revised from time to time in line with regulatory changes or updates to the site; the current version is always published on this page.",
            ar: "قد يتم تعديل سياسة ملفات تعريف الارتباط هذه من وقت لآخر وفقاً للتغييرات التنظيمية أو التحديثات على الموقع؛ يتم دائماً نشر النسخة الحالية على هذه الصفحة.",
          },
        ],
      },
    ],
  },
];

export function getLegalDocument(slug: string) {
  return legalDocuments.find((document) => document.slug === slug);
}
