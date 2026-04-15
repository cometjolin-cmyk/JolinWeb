export const PERSONAL_INFO = {
  name: "Jolin Hsu",
  role: "Freshman EECS Student & Creative Developer",
  tagline: "Jolin Hsu — Freshman EECS Student & Creative Developer.",
  hook: "I didn’t plan this path. But I found it by solving problems.",
  avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=short-black-hair-girl&backgroundColor=b6e3f4",
};

export const ABOUT_ME = {
  title: "My Journey",
  sections: [
    {
      id: "past",
      title: "【過去：迷失的輸入模式】",
      content: "曾經，學習是單向的硬碟寫入，資訊雖多卻無法索引。我掙扎於傳統的死記硬背，那些僵化的結構無法適應我的思維方式，讓我像是在沒有指南針的資訊海洋中迷航。"
    },
    {
      id: "turning",
      title: "【轉折：AI 啟蒙的邏輯重組】",
      content: "接觸 AI 後，我發現學習是可以被『設計』的。AI 不僅是工具，更是我大腦的「外掛」。我學會了將學習從單純的背誦進化為系統性的架構設計，將零散的知識拼湊成完整的邏輯版圖。"
    },
    {
      id: "present",
      title: "【現在：資安與系統的獵人】",
      content: "資安是我的主戰場，探索漏洞不僅是技術，更是對系統本質的深度拆解。我專注於建立自己的學習系統，結合 AI 的效率與現代開發美學，在攻防之間尋找邏輯的極致平衡。"
    },
    {
      id: "future",
      title: "【未來：技術的價值實現】",
      content: "我要修補的是世界的真實問題，而不僅僅是程式碼裡的 Bug。我的目標是建立不僅安全，且能賦予他人力量的系統，讓更多像我一樣曾感到迷惘的人，能透過技術找到屬於自己的路徑。"
    }
  ],
};

export const PROJECTS = [
  {
    id: "01",
    title: "阿爸的家園 (Aba's Healthy Food)",
    filename: "Aba_Food_v1.0.exe",
    folder: "AI_Nutrition",
    category: "Full-stack / AI Integration",
    catchphrase: "用 AI 與精品美學重新定義數位餐飲體驗。",
    problem: "解決健康飲食中的「資訊疲勞」，將選餐不再是數學題，而是一場互動式的健康管理體驗。",
    action: "整合 Gemini API 實現能讀取菜單並針對生理參數給予建議的智能助手；導入 Bento Grid 佈局與微互動音效系統；使用 Recharts 構建數據監控儀表板。",
    result: "成功將傳統訂餐流程轉化為「互動式健康管理體驗」。透過 AI 助手建立了品牌專業度，展現了跨領域技術（AI + Data Viz + UX）的整合能力。",
    role: "Full-stack Developer / UI Designer",
    tools: ["React 18", "TypeScript", "Tailwind CSS", "Gemini API", "Recharts"],
    outcome: "Boutique aesthetic meets AI-driven personalization.",
    tags: ["AI Integration", "Bento UI", "E-commerce"],
    image: "https://picsum.photos/seed/healthy-food/1200/800?grayscale",
    video: "https://youtu.be/iPxUFb2UwS8?si=8gOhBqHJSnTeucWw",
    link: "https://dusky-delta.vercel.app",
    status: "Completed / Stable",
    core: "AI 營養助手 + Bento UI",
    gallery: [
      "https://picsum.photos/seed/aba-1/800/600?grayscale",
      "https://picsum.photos/seed/aba-2/800/600?grayscale"
    ]
  },
  {
    id: "02",
    title: "MBTI 互動性格分析",
    filename: "MBTI_Analytics.app",
    folder: "UIUX_Lab",
    category: "Web Development / UI Design",
    catchphrase: "跨足互動開發與 UI/UX 的解決方案。",
    problem: "解決傳統測驗過於靜態導致的使用者流失問題，透過強化參與感提升完測率。",
    action: "導入直覺式路徑與視覺回饋，強化參與感；使用 Vercel 實現穩定運行與現代開發工作流。",
    result: "成功提升完測率，並在 Vercel 上穩定運行，展現了前端部署流程、UI 整合實力與人機互動體驗的強化。",
    role: "Lead Developer & UI Designer",
    tools: ["Vercel", "JavaScript", "CSS Animations", "UI/UX Design"],
    outcome: "Enhanced user engagement through dynamic UI.",
    tags: ["UI/UX", "Vercel", "Analytics"],
    image: "https://picsum.photos/seed/mbti-ruby/1200/800?grayscale",
    link: "https://mbti-ruby.vercel.app",
    status: "Stable",
    core: "Dynamic Transitions + Vercel",
    gallery: [
      "https://i.ibb.co/vxMfwWhr/2026-04-15-11-02-11.png",
      "https://picsum.photos/seed/mbti-2/800/600?grayscale"
    ]
  },
  {
    id: "03",
    title: "CNN 影像辨識與深度學習",
    filename: "CNN_Model_v2.sys",
    folder: "Deep_Learning",
    category: "AI Research & Implementation",
    catchphrase: "縮短機器學習理論與實際模型開發的落差。",
    problem: "手動建構卷積神經網絡，掌握從數據預處理到調優的底層邏輯。",
    action: "自定義卷積層與池化層，深入 AI 運作原理；透過可視化工具分析模型收斂，打下 AI 整合基礎。",
    result: "建立穩定的影像分類模型，掌握深度學習開發流程，並學會透過可視化工具分析效能，為未來 AI 應用打下底層邏輯基礎。",
    role: "AI Research & Implementation",
    tools: ["Python", "TensorFlow/Keras", "NumPy", "Matplotlib"],
    outcome: "Solid technical foundation for deep learning applications.",
    tags: ["Deep Learning", "Computer Vision", "Python"],
    image: "https://picsum.photos/seed/cnn-ai/1200/800?grayscale",
    link: "https://github.com/cometjolin-cmyk/CNN_recongnition",
    status: "Research / Stable",
    core: "Custom CNN Layers + Performance Analysis",
    gallery: [
      "https://picsum.photos/seed/cnn-1/800/600?grayscale",
      "https://picsum.photos/seed/cnn-2/800/600?grayscale"
    ]
  },
];

export const CHATBOT_INFO = {
  intro: "I'm Jolin's digital twin. I've been trained on her journey, projects, and goals. Ask me anything about how she learns or what she's building next.",
  exampleQuestions: [
    "How did you start with AI?",
    "What are your cybersecurity goals?",
    "Tell me about your study system.",
    "What's your favorite project?"
  ],
};
