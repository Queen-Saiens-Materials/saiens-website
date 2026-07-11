import type { LegalSection } from "@/components/LegalPage";

export const heroTagline = "OUR QUALITY\nREMAINS\nFEW DECADE\nAS ONE DAY";
export const heroSubtitle = "品質保証\n数十年経っても変わらぬ美しさを";

export const sections: LegalSection[] = [
  { type: "heading", level: 3, text: "品質保証サービス" },
  {
    type: "paragraph",
    text: "Saiens 取扱製品はすべて、NSF・SGS の硬度試験および吸水率試験に合格し、当社が定める厳格な品質基準・耐久基準を満たしています。さらに一般家庭での日常使用に適合しており、製品ごとに材料保証および加工保証を提供しています。各製品の保証範囲や条件は、シリーズごとの詳細をご確認ください。",
  },
  { type: "heading", level: 4, text: "品質保証について" },
  {
    type: "paragraph",
    text: "Saiens 製品はシリーズにより保証年数が異なり、施工完了日から起算して、通常家庭での使用における非外力的な破損について保証します。（※保証は製品本体のみ対象となり、運送料・階上搬入費・その他付帯サービスは含まれません。）",
  },
  {
    type: "paragraph",
    text: "保証対象は材料そのもの（例：天板のひび割れ・キズ等）であり、ご使用に際してはメーカー発行のメンテナンスカード記載の方法に従い、定期的に清掃・保養を行ってください。不適切な使用や外的要因による損傷は保証対象外となります。サービス提供地域は台湾本島に限ります。また転売品、特価品、現品処分品は保証対象外となります。",
  },
  { type: "heading", level: 4, text: "保証対象外の主なケース" },
  {
    type: "list",
    items: [
      "高温・直射日光・多湿・通気不良環境での使用による損傷",
      "酸・アルカリなど化学薬品との接触による損傷",
      "天災・火災・地震・台風など不可抗力による損傷",
      "誤った保管・使用方法（不適切な清掃・過度な加熱・水濡れ・腐食・部品紛失 等）",
      "日常使用による消耗・摩耗",
      "ペットによる汚れ・キズ・破損",
      "商業施設・船舶・店舗など家庭以外での使用",
      "本来の用途以外での使用",
      "その他、当社に帰責できない損害",
    ],
  },
  { type: "heading", level: 4, text: "材料保証期間" },
  { type: "heading", level: 4, text: "25年保証" },
  {
    type: "paragraph",
    text: "Mikado Quartz 帝雉石シリーズ：施工完了日より25年間の材料保証。非外力破損に限り、原則無料修理対応。",
  },
  {
    type: "image",
    src: "/images/c116cc9d-db9e-4f41-bcb6-b5ed6a9988f0/_25_.png",
    alt: "品質保証図示25年",
    width: 873,
    height: 839,
  },
  { type: "heading", level: 4, text: "15年保証" },
  {
    type: "paragraph",
    text: "QJ Quartz Stone 闊石、ETERNOS 永恆石シリーズ：施工完了日より15年間の材料保証。非外力破損に限り、原則無料修理対応。",
  },
  {
    type: "image",
    src: "/images/645fc5a5-aba6-41f0-babf-13a3faf6ec5a/_15_.png",
    alt: "品質保証図示15年",
    width: 873,
    height: 839,
  },
  { type: "heading", level: 4, text: "1年保証" },
  {
    type: "paragraph",
    text: "Ubari シンクシリーズ：施工完了日より1年間の材料保証。非外力破損に限り、原則無料修理対応。",
  },
  {
    type: "image",
    src: "/images/405de771-1fbc-4a64-a2ff-67190796f5bc/_1_.png",
    alt: "品質保証図示1年",
    width: 873,
    height: 839,
  },
  { type: "heading", level: 4, text: "加工保証" },
  {
    type: "paragraph",
    text: "当社による石材施工はすべて、施工完了日より 1年間の加工保証 を付与します。（台湾本島限定）",
  },
  {
    type: "list",
    items: [
      "家具の構造保証：ダイニングテーブル等の大型家具：2年間の構造保証（組立後の返品・交換不可）。サイドテーブル等の小型家具：1年間の構造保証（組立後の返品・交換不可）",
      "シリコン施工保証：シリコン施工は防水が目的ですが、素材の性質上、保証は 3ヶ月間 とします。期間内に接合部のズレが発生した場合は無償補修いたします。それ以降は有償対応となります。",
    ],
  },
  { type: "heading", level: 4, text: "保証サービスの流れ" },
  {
    type: "list",
    ordered: true,
    items: [
      "購入情報の確認",
      "オンラインでの状況確認・施工方法の診断",
      "原廠技師による修理対応",
    ],
  },
  {
    type: "paragraph",
    text: "※保証期間外または保証条件外の場合は、有償修理サービスを提供します。",
  },
  { type: "heading", level: 4, text: "よくある修理・有償サービス例" },
  {
    type: "table",
    headers: ["工程内容", "費用／説明"],
    rows: [
      ["天板の欠け補修", "購入情報と写真をお送りください。速やかにご案内します。"],
      ["天板のひび割れ補修", "購入情報と写真をお送りください。速やかにご案内します。"],
      ["シリコン再施工", "購入情報と写真をお送りください。速やかにご案内します。"],
      ["Omat コーティング液（抗菌ナノ銀）", "約3〜6ヶ月効果持続。1750¥／本"],
      [
        "Liquid Shield コーティング液（ナノ分子保護層）",
        "約6〜9ヶ月効果持続。対象素材により要相談購。",
      ],
    ],
  },
  { type: "heading", level: 4, text: "お問い合わせ" },
  {
    type: "list",
    items: ["LINE公式：＠saiens", "メール：service@saiens.tw"],
  },
  {
    type: "paragraph",
    text: "Saiens 実業股份有限公司は、2023年1月1日以降、本保証サービスを正式導入しましたが、それ以前のご購入者様にも従来通り保証対応を行っております。",
  },
  {
    type: "image",
    src: "/images/b4d9244f-5250-4468-af56-d0e5ad500532/0-02.png",
    alt: "紙の保証書を保管する煩わしさから解放 図示",
    width: 591,
    height: 592,
  },
  { type: "heading", level: 3, text: "紙の保証書を保管する煩わしさから解放", center: true },
  {
    type: "paragraph",
    text: "Saiens では 1 年から最長 25 年までの保証をご用意し、長い年月の中でお客様の商品情報と保証内容を私たちがしっかり記録・管理いたします。",
    center: true,
  },
  {
    type: "image",
    src: "/images/508b7af9-8e2a-4f57-bbb2-37c04fbf06bc/0__+1.png",
    alt: "安心のコンタクト窓口 図示",
    width: 592,
    height: 592,
  },
  { type: "heading", level: 3, text: "安心のコンタクト窓口", center: true },
  {
    type: "paragraph",
    text: "購入後に問題が起きても「誰に相談すればいいのか分からない」という心配はありません。Saiens の安心サポートプラットフォームを通じて、いつでも製品情報を確認でき、確実にサポートを受けられます。",
    center: true,
  },
  {
    type: "image",
    src: "/images/16c81f35-5e20-414a-ac36-227a5db3ed60/0-03.png",
    alt: "VIPアフターサービスを体験 図示",
    width: 591,
    height: 592,
  },
  { type: "heading", level: 3, text: "VIPアフターサービスを体験", center: true },
  {
    type: "paragraph",
    text: "製品をご登録いただくことで、Saiens があなた専属のワークトップ・マテリアルのコンシェルジュとなり、あらゆるご質問やトラブルに迅速に対応いたします。ご登録により、当社のサービスチームがご利用中の製品情報を正確に把握し、スムーズに問題解決へとつなげます。",
    center: true,
  },
  {
    type: "heading",
    level: 2,
    text: "登録フォーム\nREGISTER YOUR PRODUCT",
    center: true,
  },
];
