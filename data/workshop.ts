export type ScheduleRow = { time: string; activity: string; details: string };

export type Slide =
  | { kind: "title"; title: string; subtitle?: string; emoji?: string; notes?: string[] }
  | { kind: "bullets"; title: string; bullets: string[]; notes?: string[] }
  | { kind: "prompt"; label?: string; code: string; notes?: string[] }
  | { kind: "raw"; title?: string; html: string; notes?: string[]; fragments?: number };

export type Session = {
  id: number;
  day: 1 | 2;
  title: string;
  subtitle?: string;
  startTime: string;
  endTime: string;
  duration: string;
  type: "session" | "break" | "lunch";
  schedule: ScheduleRow[];
  slideDeck?: Slide[];
};

export const WORKSHOP_DATES: Record<1 | 2, string> = {
  1: "2026-04-18",
  2: "2026-04-19",
};

export const PRE_WORKSHOP_CHECKLIST: string[] = [
  "早上 7:30 到场",
  "场地布置：桌子、电源、投影仪、麦克风测试",
  "WiFi 测试（下载速度测）",
  "报到区准备好（名牌）",
  "背景音乐开好（轻快、有能量）",
  "录影机/三脚架架好，用来录学员见证",
  "预先做好的 demo 系统已部署到 Vercel，测试过",
  "Day 1 Build Guide 准备好，通过 WhatsApp 分享",
  "Session 6 的挑战 prompts 准备好（WhatsApp 发送）",
  "Setup 检查命令 slide,Mac 和 Windows 分开",
  "Day -1 email ； 明天 9 点前别开 Claude（quota 5 小时一个窗口，我们 10:30 才开始 build,满格才够用）",
  "3-5 个 Max 账号备好 ； 下午有人 quota 爆了直接 rescue（让他登到 Jay/Assistants 的账号）",
];

export const SESSIONS: Session[] = [
  {
    id: 1,
    day: 1,
    title: "欢迎 & Setup 检查",
    subtitle: "SESSION 1",
    startTime: "09:00",
    endTime: "09:40",
    duration: "40 min",
    type: "session",
    schedule: [
      { time: "9:00-9:10", activity: "报到 & 就位", details: "学员到场，领取名牌，找位子坐，连接 WiFi。Assistants 帮忙安顿。轻音乐播放中。" },
      { time: "9:10-9:20", activity: "Jay 开场", details: "欢迎大家。快速介绍这两天的旅程。\"今天下午 6 点前，你会有一个真正上线的网页应用，任何人用任何浏览器都能打开。\"介绍 Assistants。讲解求助顺序（先问 Claude → 问邻座 → 举手）。" },
      { time: "9:20-9:30", activity: "Setup 检查", details: "大家一起：打开 Claude（确认有 Pro)，打开 Terminal / PowerShell，运行 `node -v`、`npm -v`、`git --version`。打开 GitHub、Supabase、Vercel 账号。" },
      { time: "9:30-9:40", activity: "同步检查 ； 大家都准备好了吗？", details: "放出 gate slide:\"有东西不能用的举手。\"Assistants 四处协助。处理环境问题，必要时换备用笔电。落后的跟能用的邻座配对。Session 2 开始前必须 90% 以上准备好。（Connector 验证放到 Session 5，真正要用时才处理。）" },
    ],
    slideDeck: [
      { kind: "title", title: "Vibe Coding Workshop", subtitle: "Day 1 · 18 April 2026", notes: ["轻音乐播放中，让大家安顿", "Assistants 帮忙处理名牌", "9:10 准时开始，哪怕还有人陆续到场"] },
      {
        kind: "title",
        emoji: "📶",
        title: "WiFi",
        subtitle: "AIM.BIG_Guest · ai888888",
        notes: [
          "把这张 slide 开着，让学员一入场就能连上",
          "Assistants 走动帮忙处理连不上的",
          "记得在 workshop 开始前更新密码文字",
        ],
      },
      {
        kind: "bullets",
        title: "你的 2 天旅程",
        bullets: [
          "Day 1：建好 3 个 app，1 个真正上线",
          "Day 2：你的行业，你的系统",
          "今天下午 6 点前，上线一个web application",
        ],
        notes: [
          "能量拉高 ； \"今天下午 6 点前，你会有一个真正上线的网页应用，任何人用任何浏览器都能打开。\"",
          "按名字和区域介绍 Assistants（求助顺序下一段 House Rules 详细讲）",
        ],
      },
      {
        kind: "title",
        emoji: "🛑",
        title: "House Rules",
        subtitle: "开始之前 4 件事",
        notes: [
          "停顿一下。让 \"House Rules\" 这几个字落地。",
          "认真但不严肃 ； 像老板交代伙计，不是训话。",
          "这是期望设定环节 ； 把 2 天后可能的抱怨前置掉。",
        ],
      },
      {
        kind: "bullets",
        title: "1. 跟着我走的节奏",
        bullets: [
          "每个 prompt 我先示范，然后大家一起贴",
          "Claude Pro quota 5 小时一个窗口",
          "慢慢来，比较快",
        ],
        notes: [
          "Quota 是真的 ； $20 Pro Sonnet 大概 40-80 messages 一个 5 小时窗口。",
          "Day 1 最吃 quota 是下午 Session 5 HR + Session 6 上线。",
          "直接点名：\"不要自己偷跑。跟着节奏。\"",
          "有人已经在打字 ； 停他们：\"等一下。我们一起。\"",
          "Rescue plan ； 谁下午 quota 爆了来找 Jay/Assistant 借账号（有几个 Max plan 备用）",
          "Blame shift ； 你不听节奏 quota 用完 = 自己的决定，不能 blame workshop。",
        ],
      },
      {
        kind: "bullets",
        title: "2. 你会遇到错误",
        bullets: [
          "遇到很多问题 = 正常",
          "你来这里的目的不是避开错误，而是学会处理错误",
        ],
        notes: [
          "这是最重要的一条。重新定义错误：从 \"workshop 坏了\" → \"workshop 按设计在跑\"。",
          "\"一个人遇到错误 Google 2 小时放弃。今天举手 30 秒有人帮你。用够本。\"",
          "提前 prime 他们：等下看到红色 error 不要慌，这是内容的一部分。",
          "Blame shift ； 错误 = feature,不是 bug。",
        ],
      },
      {
        kind: "bullets",
        title: "3. Claude 不是魔法",
        bullets: [
          "Claude 很聪明，但是它不会读心术",
          "学会怎么跟 Claude 表达需求，对的 prompt 是成功的一半",
          "跟所有的工具一样，Claude 也需要练习才能用好",
        ],
        notes: [
          "打预防针。等下 Session 2 demo 太震撼 ； 有人会以为 \"按按钮就有 app\"。",
          "\"ROI 不是今天。是 2 周后你不再打开 Excel。\"",
          "老板语言 ； 讲清楚：这是 skill,不是 pill。",
          "Blame shift ； 结果取决于他们练不练，不是工具好不好。",
        ],
      },
      {
        kind: "bullets",
        title: "4. 求助顺序",
        bullets: [
          "先问 Claude ； 它知道的比你想象的多",
          "再问隔壁 ； 可能 5 秒前刚踩过一样的坑",
          "还不行 → 举手，Assistant 过来"
        ],
        notes: [
          "为什么这个顺序？培养独立。2 天后你一个人要扛。",
          "不要第一时间举手 ； 先试一次问 Claude。",
          "Assistants 人数 > Jay ； 直接找他们，不要等我。",
          "按名字和区域介绍 Assistants。",
          "Blame shift ； 不先问 Claude 就举手 = 浪费自己的机会。",
        ],
      },
      {
        kind: "bullets",
        title: "Setup 检查",
        bullets: [
          "打开 https://handbook.joinvibecode.io/",
          "打开 Claude（确认有 Pro)",
          "打开 Terminal / PowerShell",
          "输入：python --version（需要 3.10+)",
          "输入：node -v（需要 18+)",
        ],
        notes: [
          "Handbook 是他们这 2 天的参考资料 ； 保持打开",
          "在 WhatsApp 分享这张 slide，学员可以用手机看、笔电上打",
          "不要等 100% ； 90% 准备好就走。Assistants 继续帮落后的。",
          "Python + Node 是唯一硬性要求。GitHub/Supabase/Vercel 账号等下再处理。",
        ],
      },
      {
        kind: "title",
        emoji: "✋",
        title: "有东西不能用就举手",
        subtitle: "Assistants 会过来找你。",
        notes: [
          "亲自走动检查 ； 不要相信自我汇报",
          "非技术的人不会开口;看谁表情困惑",
          "任何 5 分钟内修不好的 → 跟能用的邻座配对",
        ],
      },
    ],
  },
  {
    id: 2,
    day: 1,
    title: "现场 Demo ； \"这是我专门为你做的\"",
    subtitle: "SESSION 2",
    startTime: "09:40",
    endTime: "10:20",
    duration: "40 min",
    type: "session",
    schedule: [
      { time: "9:40-9:45", activity: "你只需要知道一件事", details: "\"今天我不会讲理论。我示范，然后你们做。你只需要知道一件事：用中文描述你要什么 → Claude 写代码 → 你得到一个能用的系统。就这样。\"" },
      { time: "9:45-10:10", activity: "现场 DEMO：你们的生意，你们的问题", details: "打开 2-3 个根据真实报名表资料预先做好的 demo。每个 demo:5-7 分钟，展示系统，解释背后的 prompt。当众点名学员。\"请一个Developer最少 RM 30,000 要做几个月。我用 Claude 每一个都 20 分钟搞定。\"" },
      { time: "10:10-10:20", activity: "\"下一个就是你\"", details: "\"今天下午 6 点前，你会做到一模一样的事 ； 而且真正上线，任何人都能访问。来吧。\"快速技术栈介绍（30 秒）:Claude → Supabase → Vercel。" },
    ],
    slideDeck: [
      { kind: "title", title: "Describe it. Claude builds it.", subtitle: "一句话，两天，至少三个真正上线的系统。", notes: ["停顿一下 ； 让这句话落地", "不要讲课模式。\"我示范，然后你们做。\"", "节奏要有力 ； 三段式读法：一句话（停顿）。2 天（停顿）。3 个真正上线的系统。"] },
      {
        kind: "bullets",
        title: "这些是我昨晚专门为你做的",
        bullets: [
          "根据你们的报名表做的 2-3 个 demo",
          "跨行业 ； 餐饮、贸易、服务业都有",
          "每一个都真正上线 ； 不是截图，不是 mockup",
        ],
        notes: [
          "点名 2-3 位学员：\"C 桌的 [Name] 开面包店 ； 我昨晚 20 分钟就为他做好了。\"",
          "挑不同行业的学员 ； 瞬间变明星",
        ],
      },
      {
        kind: "title",
        emoji: "💰",
        title: "RM 30,000+",
        subtitle: "这是请一个Developer的价钱。我用 Claude 每一个 20 分钟就做完。",
        notes: [
          "让这数字沉淀一下 ； 扫视全场看反应",
          "Demo 挂了不要慌 ； 屏幕上修。\"看我怎么修。\"一样有力。",
        ],
      },
      {
        kind: "title",
        emoji: "🚀",
        title: "今天下午 6 点前",
        subtitle: "你也能做到；真正上线， 让全公司， 甚至全部人都可以使用。",
        notes: [
          "高能量 ； 这是承诺 slide",
          "不要解释理论。他们需要相信这行得通，还不用懂 WHY。",
        ],
      },
      {
        kind: "raw",
        fragments: 4,
        html: `<div style="display:flex;align-items:center;justify-content:center;gap:16px;width:100%">
          <div data-f="1" style="background:linear-gradient(135deg,#1e40af,#3b82f6);border-radius:20px;text-align:center;flex:1;padding:32px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center">
            <div style="font-size:48px;margin-bottom:10px">🧑‍💼</div>
            <div style="font-size:28px;font-weight:800;color:white">你</div>
            <div style="font-size:16px;color:#bfdbfe;margin-top:8px;line-height:1.3;white-space:nowrap">描述你要的东西</div>
          </div>
          <div data-f="2" style="font-size:32px;color:#6b7280;flex-shrink:0">→</div>
          <div data-f="2" style="background:linear-gradient(135deg,#7c3aed,#a78bfa);border-radius:20px;text-align:center;flex:1;padding:32px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center">
            <div style="font-size:48px;margin-bottom:10px">🤖</div>
            <div style="font-size:28px;font-weight:800;color:white">Claude</div>
            <div style="font-size:16px;color:#ddd6fe;margin-top:8px;line-height:1.3;white-space:nowrap">写代码</div>
          </div>
          <div data-f="3" style="font-size:32px;color:#6b7280;flex-shrink:0">→</div>
          <div data-f="3" style="background:linear-gradient(135deg,#065f46,#059669);border-radius:20px;text-align:center;flex:1;padding:32px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center">
            <div style="font-size:48px;margin-bottom:10px">⚡</div>
            <div style="font-size:28px;font-weight:800;color:white">Supabase</div>
            <div style="font-size:16px;color:#a7f3d0;margin-top:8px;line-height:1.3;white-space:nowrap">存你的数据</div>
          </div>
          <div data-f="4" style="font-size:32px;color:#6b7280;flex-shrink:0">→</div>
          <div data-f="4" style="background:linear-gradient(135deg,#0f172a,#1e293b);border:2px solid #475569;border-radius:20px;text-align:center;flex:1;padding:32px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center">
            <div style="font-size:48px;margin-bottom:10px">▲</div>
            <div style="font-size:28px;font-weight:800;color:white">Vercel</div>
            <div style="font-size:16px;color:#94a3b8;margin-top:8px;line-height:1.3;white-space:nowrap">把它放上线</div>
          </div>
        </div>`,
        notes: [
          "就 30 秒 ； 不要过度解释技术栈",
          "强调 \"任何语言都行\" ； 中文、马来文、英文，都可以",
        ],
      },
      {
        kind: "title",
        title: "现在轮到你上场",
        notes: [
          "让大家举手 ； 这是进入 Session 3 的能量桥梁",
          "\"谁想要一个属于 你自己的生意的？今天你就在做这件事。\"",
        ],
      },
    ],
  },
  {
    id: 18,
    day: 1,
    title: "Claude 快速上手",
    subtitle: "QUICK START",
    startTime: "10:20",
    endTime: "10:30",
    duration: "10 min",
    type: "session",
    schedule: [
      { time: "10:20-10:30", activity: "Claude app 导览", details: "Claude 桌面 app 快速介绍：开新 session、附加文件、处理错误。Skills/Plugins/Connectors 等下真正要用时再讲。大家在自己的笔电上跟着做。" },
    ],
    slideDeck: [
      {
        kind: "title",
        emoji: "🖥️",
        title: "Claude 快速上手",
        subtitle: "开始 build 之前，你要知道 3 件事。",
        notes: [
          "所有人现在在笔电上打开 Claude",
          "快速过一遍 ； 最多 5-8 分钟",
        ],
      },
      {
        kind: "bullets",
        title: "1. 开一个新 session",
        bullets: [
          "点侧边栏的 \"+ New session\"",
          "一个项目 = 一个 session",
          "Claude 答不对了 → 开一个新 session",
        ],
        notes: [
          "在你自己屏幕上示范 ； 点侧边栏的 + New session，指出位置",
          "App 刚改版过 ； 侧边栏显示你所有的 session",
        ],
      },
      {
        kind: "bullets",
        title: "2. 附加文件和图片",
        bullets: [
          "把文件拖进聊天框 ； 或点 + 按钮",
          "截图、CSV、PDF ； Claude 都能看",
          "或输入 @filename 拉入特定文件",
        ],
        notes: [
          "示范：随便拖一张图进聊天框，看它出现在 prompt 里",
          "今天会用到超多 ； 参考图、数据文件",
        ],
      },
      {
        kind: "bullets",
        title: "3. 遇到问题的时候",
        bullets: [
          "复制错误信息",
          "贴回同一个 session",
          "告诉 Claude: \"Fix this.\"",
          "不要开新 session 来修bug",
        ],
        notes: [
          "这是他们最需要记住的事。今天重复 3 次。",
        ],
      },
      {
        kind: "title",
        emoji: "👍",
        title: "Let's build something amazing!",
        subtitle: "其他东西，做着做着就会了。",
        notes: [
          "过渡能量 ； \"OK 讲够了。来，做你的第一个 app。\"",
        ],
      },
    ],
  },
  {
    id: 3,
    day: 1,
    title: "Landing Page",
    subtitle: "SESSION 3",
    startTime: "10:30",
    endTime: "12:30",
    duration: "120 min",
    type: "session",
    schedule: [
      { time: "10:20-10:35", activity: "项目 setup（跟着做）", details: "Jay 在屏幕上示范，大家跟着做。用 Claude 建一个新的 Next.js 项目。屏幕上显示确切的 prompts。一步。一步。来。" },
      { time: "10:35-10:40", activity: "同步检查", details: "\"项目跑起来的举手。看看周围 ； 如果邻座没举手，帮他。\"Assistants 协助。80% 以上准备好才继续。" },
      { time: "10:40-11:00", activity: "参观 Customize 页面 + 认识 Design skill", details: "投影仪打开 Sidebar → Customize。走一遍 Skills / Connectors / Plugins 三个Tab，让学员 SEE 整排工具。然后：\"今天我们只用一个 ； Design。\"从 Plugins Tab安装。现场 demo:\"Use the Design skill. Build me a hero section for a fictional mamak chain.\"展示如何用 NAMING 的方式启动 ； 没有 slash command。" },
      { time: "11:00-12:15", activity: "做你自己的 landing page", details: "每个学员挑自己的生意（真的或想象的），用 'Use the Design skill.' 开头 prompt Claude 做一个 landing page:hero、卖点、特色、CTA、footer。这是他们生意的销售门面。" },
      { time: "12:15-12:30", activity: "Milestone 1:\"你做到了！\"", details: "大家都有一个本地跑起来的 landing page。Screenshot 发 WhatsApp 群。大家投票选出 3 个最好看的。" },
    ],
    slideDeck: [
      {
        kind: "title",
        emoji: "🛒",
        title: "Landing Page",
        subtitle: "你的 landing page 是你的第一个销售员",
        notes: [
          "从 demo session 过来的高能量 ； 他们正兴奋，接住",
          "130 分钟 session，没有 morning break ； 配速好",
        ],
      },
      {
        kind: "title",
        emoji: "⚡",
        title: "什么是 Skill?",
        subtitle: "一个现成的大脑，让 Claude 变专家。",
        notes: [
          "\"今天你们学一个 skill:Design。在 prompt 里提名字启动 ； 没有 slash command。\"",
          "指向 Sidebar → Customize → 整排 skill。今天我们拿一个。",
        ],
      },
      {
        kind: "bullets",
        title: "为什么要用 Skill?",
        bullets: [
          "Claude 本来就聪明 ； 但 Skill 让它变专家",
          "一个 Skill = 给 Claude 的专业训练手册",
          "有设计、编程、SEO、营销、财务等各种 Skill",
        ],
        notes: [
          "讲得广一点 ； skill 不只是做设计",
          "类比：Claude 是聪明员工，Skill 是针对该工作的训练手册",
        ],
      },
      {
        kind: "bullets",
        title: "打开 Sidebar → Customize",
        bullets: [
          "Skills Tab - 现成的大脑",
          "Connectors Tab - Claude 的 \"双手\"",
          "Plugins Tab - 由多个 Skill 组成的工具箱",
        ],
        notes: [
          "投影仪现场操作 ； 让他们在相信之前先看到这个架子",
          "非技术学员以为 Claude 只是个聊天框。让他们看到整套工具。",
        ],
      },
      {
        kind: "bullets",
        title: "今天选：Design plugin",
        bullets: [
          "Customize → 按 \"+\" → 按 \"Browse Plugins\" → 搜 'Design' → Install",
          "UI 评判、UX 文案、精致 UI",
          "安装后打字提到 Design 就能用",
          "例子：\"Use the Design skill. Build me a landing page for…\"",
        ],
        notes: [
          "现场 demo：屏幕上安装 ； 一键搞定",
          "强调：slash menu 只显示 schedule/btw/rewind。Skill 用 NAME 启动，不是 slash。",
          "讲两次：\"prompt 以 Use the Design skill. 开头。\"",
        ],
      },
      {
        kind: "title",
        emoji: "🔍",
        title: "找一个参考",
        subtitle: "不要猜。抄一个你喜欢的风格。",
        notes: [
          "真正的设计师就是这样做事的 ； 他们从来不从零开始",
          "展示你的屏幕：Google 一个竞争对手的 landing page 或你欣赏的网站",
        ],
      },
      {
        kind: "bullets",
        title: "怎么找参考",
        bullets: [
          "Google \"[你的行业] landing page\" ； Screenshot 一个你喜欢的",
          "或Screenshot 一个竞争对手的首页",
          "或任何你喜欢的网站 ； 重要的是 STYLE",
          "把截图存到你的项目文件夹",
        ],
        notes: [
          "现场 demo:Google \"bakery landing page\"，挑一个，Screenshot",
          "强调：你抄的是 STYLE，不是内容。Claude 会写你的内容。",
        ],
      },
      {
        kind: "prompt",
        label: "Build it ； one prompt covers everything",
        code: "Use the Design skill.\n\nBuild me a landing page for [YOUR COMPANY NAME]. We are a [industry] business based in [city]. We offer [2-3 key services/products].\n\nUse the attached screenshot as design reference ； match the style, layout, and feel.\n\nInclude: hero, why us, 3 features, reviews, pricing, contact, footer.\n\nAsk me if anything is unclear about my business before you start. Then set everything up from scratch. Use Next.js + Tailwind CSS.",
        notes: [
          "The last line locks the tech stack ； \"This just makes sure everyone's on the same setup. Copy it, don't overthink.\"",
          "Remind them: drag the screenshot into the Claude chat box along with this prompt",
          "Use your real company name, real services, real city ； \"Ah Huat Bakery in Penang\" beats \"a bakery\"",
          "Anyone stuck for more than 90 seconds → Assistant sits with them and helps fill in the brackets",
        ],
      },
      {
        kind: "prompt",
        label: "一个 prompt 做出整个 landing page（中文版）",
        code: "用 Design skill。\n\n帮我做一个 [YOUR COMPANY NAME] 的 landing page。我们是一间开在 [city] 的 [industry] 生意。我们提供 [2-3 key services/products]。\n\n附上的截图是设计参考 ； 风格、排版、感觉都要跟着来。\n\n要有：hero、why us、3 个 feature、reviews、pricing、contact、footer。\n\n开始前，如果我的生意有任何地方你不清楚，先问我。然后从零开始全部 setup 好。用 Next.js + Tailwind CSS。",
        notes: [
          "最后一行锁定技术栈 ； \"这只是确保大家用同一套 setup。照抄，别烦恼。\"",
          "提醒他们：把截图跟这个 prompt 一起拖进 Claude 聊天框",
          "用你真实的公司名、真实的服务、真实的城市 ； \"Ah Huat Bakery in Penang\" 比 \"a bakery\" 强",
          "盯着超过 90 秒的 → Assistant 帮他填好方括号",
        ],
      },
      {
        kind: "bullets",
        title: "还没有自己的生意？",
        bullets: [
          "用朋友或家人的生意",
          "问 Assistant 想法 ； 他们会帮你挑",
          "直接用你的生意最好",
        ],
        notes: [
          "走动 ； 没人独自发呆。Assistants 坐在卡住的学员旁边，帮他挑一个生意。",
          "Assistants 做视觉扫视;非技术学员以为每个错误都是自己的错",
        ],
      },
      {
        kind: "bullets",
        title: "遇到问题的时候",
        bullets: [
          "STOP。不要贴下一个 prompt。",
          "复制错误 → 贴进 Claude",
          "跟 Claude 讲 \"Fix this.\"",
          "不要自己解读代码 ； 那不是今天的任务。",
        ],
        notes: [
          "重复这个口诀 ； 不要在坏代码上继续贴",
          "常见错误：白屏 = 没跑 npm run dev,module not found = 目录不对",
        ],
      },
      {
        kind: "bullets",
        title: "💡 Pro tip - Screenshot",
        bullets: [
          "屏幕上某个东西看起来不对？",
          "Screenshot →拖进 Claude",
          "说：\"This doesn't look right. Fix it.\"",
          "比用文字描述问题快得多",
        ],
        notes: [
          "现场 demo:Screenshot 一个坏掉的布局，拖进聊天框，Claude 修好",
          "这是他们的秘密武器 ； 不懂代码也能用眼睛找问题",
        ],
      },
      {
        kind: "title",
        emoji: "🎉",
        title: "Milestone 1",
        subtitle: "你做出一个价值 RM 3,000 以上的 landing page!",
        notes: [
          "掌声时刻 ； 让全场庆祝",
          "下一步：Screenshot hero section → 发 WhatsApp → 投票选前 3 名",
          "所有人现在 Screenshot 并发到 WhatsApp 群",
          "投票选出 3 个最好看的 ； 公开表扬",
        ],
      },
      {
        kind: "bullets",
        title: "做完了？ 继续挑战",
        bullets: [
          "叫 Claude 加一个 pricing section",
          "加一个 testimonials carousel",
          "整个换风格：\"Make it dark mode with neon-green\"",
        ],
        notes: [
          "快手学员保持投入，等其他人赶上",
          "同步检查：\"跟得上的举手！\"每 15-20 分钟一次",
        ],
      },
    ],
  },
  {
    id: 4,
    day: 1,
    title: "午餐",
    startTime: "12:30",
    endTime: "13:30",
    duration: "60 min",
    type: "lunch",
    schedule: [],
  },
  {
    id: 5,
    day: 1,
    title: "Dashboard",
    subtitle: "SESSION 4",
    startTime: "13:30",
    endTime: "15:00",
    duration: "90 min",
    type: "session",
    schedule: [
      { time: "1:30-1:40", activity: "Connector 检查 + 补课", details: "投影仪打开 Sidebar → Customize → Connectors。三个都应该有蓝点：Supabase、Vercel、Claude in Chrome。没做 workshop 前作业的现在补 ； 同一个地方，搜 + Connect + Authorize。Assistants 帮落后的。GATE:~90% 绿了才继续。" },
      { time: "1:40-1:50", activity: "The pitch + 丢数据集", details: "\"每个 SME 老板都有同样的痛苦：一堆 Excel 表，完全看不懂数字在说什么。今天我们把你自己的乱糟糟的 Excel 变成 Power BI 风格的 dashboard。75 分钟。\"在 WhatsApp 群丢 sample-accounting.csv。2000+ 行真实感的 SME 会计数据。\"用 Excel 打开 ； wah，乱 right?\"" },
      { time: "1:50-2:15", activity: "做 dashboard（跟着做）", details: "大家一起做同一个 dashboard。Prompt Claude：解析 CSV、按月份计算营收/开支/利润、渲染 4 个 KPI 卡片 + 2 个图表（月度 P&L 折线图、类别分布饼图）。Prompt 以 'Use the Design skill.' 开头，布局才漂亮。" },
      { time: "2:15-2:40", activity: "做成你自己的", details: "学员给自己的 dashboard 加一个自定义 widget：前 5 大客户、现金流预测、按星期几的开支热力图 ； 任何跟他们自己生意有关的。自己写 prompt。Assistants 引导，不代做。" },
      { time: "2:40-2:50", activity: "并排对比", details: "投影仪分屏：原始 Excel vs 他们的 dashboard。\"这就是你会计师每月收你 RM 3,000 做的事。你 75 分钟做好了。\"Screenshot 发 WhatsApp。" },
      { time: "2:50-2:55", activity: "Claude in Chrome ； \"Claude 自己测试你的 dashboard\"", details: "Jay 在自己的 dashboard 上 demo:\"Open my dashboard in Chrome, take a screenshot of each chart, and tell me if anything looks broken.\"Claude 在屏幕上实时驱动浏览器。全场反应 = 回报时刻。时间允许，学员在自己的上试。" },
      { time: "2:55-3:00", activity: "Milestone 2", details: "\"CHIO anot?! 你刚做了一个 Power BI 替代品。\"同步检查。大家都应该看到自己的 dashboard 显示真实数据。" },
    ],
    slideDeck: [
      {
        kind: "title",
        emoji: "📊",
        title: "Dashboard",
        subtitle: "把你的 Excel 变成 Power BI 级的 Dashboard",
        notes: [
          "午餐后能量会掉 ； 要强势开场",
          "\"每个 SME 老板都有同样的痛苦：一堆 Excel 表，完全看不懂数字在说什么。\"",
        ],
      },
      {
        kind: "title",
        emoji: "🔌",
        title: "快速回顾什么是 Connector",
        subtitle: "Claude 帮你执行原本要你手动做的事",
        notes: [
          "30 秒复习 ； workshop 前他们装过，现在要真正用",
          "没有 connector:Claude 写代码，但你要在 Supabase 点 20 个按钮。有了：Claude 帮你点。",
        ],
      },
      {
        kind: "bullets",
        title: "Connector 检查",
        bullets: [
          "打开 Sidebar → Customize → Connectors",
          "3 个都要蓝点：Supabase、Vercel、Claude in Chrome",
          "少了哪个就 Search → Connect → Authorize",
          "Claude in Chrome 要先装 claude.ai/chrome 扩展",
        ],
        notes: [
          "Workshop 前作业就覆盖这个 ； 但一般会有 20-30% 没完成。这张 slide 就是补课。",
          "Supabase 用 Supabase 账号登录，Vercel 用 GitHub/Vercel 账号登录",
          "路径：Sidebar → Customize → Connectors Tab → 搜名字 → Connect → 登录 → Authorize",
          "名字旁边蓝点 = 好。没点或卡在 \"connecting\" = Assistant 帮忙",
          "落后的举手 ； Assistants 过来一对一帮",
        ],
      },
      {
        kind: "title",
        emoji: "✋",
        title: "有东西不能用就举手",
        subtitle: "Assistants 会过来找你。",
        notes: [
          "这张是 connector gate ； 3 个 connector 都显示蓝点前不要继续",
          "STOP — 所有人 3 个 connector 都绿了才往下走",
          "常见问题：还没账号（立刻去 supabase.com / vercel.com 注册）、Chrome 扩展没装、授权弹窗被挡",
          "单一学员最多 5 分钟 ； 还卡就配对能用的邻座，继续走",
        ],
      },
      {
        kind: "bullets",
        title: "痛点",
        bullets: [
          "一堆 Excel 表",
          "完全看不懂数字在说什么",
          "会计师每月收 RM 3,000 帮你解释",
          "出粮 / 报表 = 每个月底的噩梦",
        ],
        notes: [
          "从 connector gate 过桥：\"好，手都放下了，大家都绿了。现在让我告诉你 WHY 我们要装这些…\"",
          "用相关性打 ； 每个 SME 老板都有这个痛",
          "非技术老板的 \"wow\" session;让它值得",
        ],
      },
      {
        kind: "title",
        title: "熟悉吧？",
        subtitle: "2000+ 行真实 SME 账目 ； 跟你每天面对的一样",
        notes: [
          "现在就在 WhatsApp 群丢 sample-accounting.csv",
          "在屏幕上用 Excel 打开 ； 让他们看到那个混乱",
          "口头可以说 \"wah 乱 right?\" ； 但 slide 上不要",
        ],
      },
      {
        kind: "bullets",
        title: "我们要做什么",
        bullets: [
          "4 个 KPI cards: revenue · expenses · profit · margin",
          "Monthly P&L line chart",
          "Category breakdown pie chart",
          "加一个你自己选的图表",
        ],
        notes: [
          "展示 \"做好\" 的截图，让学员知道目标长什么样",
        ],
      },
      {
        kind: "prompt",
        label: "THE dashboard prompt ； paste this, don't retype",
        code: "Use the Design skill.\n\nI've attached sample-accounting.csv ； 6 months of my business transactions.\n\nFirst, check the CSV columns and ask me if anything is unclear about the data before you start.\n\nThen turn it into a dashboard showing:\n- 4 KPI cards: total revenue, total expenses, net profit, profit margin\n- A monthly profit & loss trend\n- A spending breakdown by category\n\nUse Next.js + Tailwind CSS to make it look like a clean, professional dashboard for a business owner.",
        notes: [
          "\"Drop the CSV into your project folder. Then paste this prompt. Don't rewrite it ； use mine.\"",
          "If charts don't render, paste the error Claude gives back into the same chat. Don't let students debug on their own.",
        ],
      },
      {
        kind: "prompt",
        label: "THE dashboard prompt ； 贴这个，不要重打（中文版）",
        code: "用 Design skill。\n\n我附上 sample-accounting.csv ； 6 个月的生意交易记录。\n\n先看一下 CSV 的字段，有任何不清楚的地方先问我再开始。\n\n然后帮我做一个 dashboard，显示：\n- 4 个 KPI 卡片：总营收、总开支、净利润、利润率\n- 月度盈亏走势\n- 按类别的开支分布\n\n用 Next.js + Tailwind CSS 做成一个干净、专业的老板 dashboard。",
        notes: [
          "\"把 CSV 丢进你的项目文件夹。然后贴这个 prompt。不要自己改写 ； 用我的。\"",
          "图表渲染不出来，把 Claude 给的错误贴回同一个聊天。不要让学员自己修。",
        ],
      },
      {
        kind: "title",
        emoji: "💡",
        title: "做成你自己的",
        subtitle: "你每天早上会看哪个数字？就做那个图表。",
        notes: [
          "走动 ； 一句话讲不清自己 widget 的，Assistant 问：\"你每天早上会看哪个数字？\"",
          "这是他们的第一个独立 prompt ； 让他们自己写",
        ],
      },
      {
        kind: "bullets",
        title: "自定义图表点子",
        bullets: [
          "按分店营收（SS15 vs Bangsar vs Cheras)",
          "付款方式分布（现金 vs GrabPay vs DuitNow)",
          "按星期几的开支",
          "月度现金流走势",
        ],
        notes: [
          "给卡住的人的灵感清单 ； 挑一个就动手",
          "Assistants 引导，不代做。教他们自己写 prompt。",
        ],
      },
      {
        kind: "prompt",
        label: "💡 Pro tip - understand what you just built",
        code: "Explain what you just built in simple terms. What does each part do? Pretend I'm a business owner, not a developer.",
        notes: [
          "Powerful habit ； they should UNDERSTAND their app, not just own one",
          "Claude explains the dashboard components in plain language",
        ],
      },
      {
        kind: "prompt",
        label: "💡 Pro tip - 搞懂你做了什么（中文版）",
        code: "用白话解释你刚刚做了什么。每个部分做什么的？当我是生意老板，不是 developer。",
        notes: [
          "强大的习惯 ； 他们应该 UNDERSTAND 自己的 app，不只是拥有一个",
          "Claude 用白话解释 dashboard 组件",
        ],
      },
      {
        kind: "prompt",
        label: "Claude in Chrome ； Claude tests your app for you",
        code: "Open my dashboard in Chrome, take a screenshot of each chart, and tell me if anything looks broken.",
        notes: [
          "Jay demos on HIS dashboard on the big screen first ； then students try",
          "Claude drives the browser live ； this is the \"my god\" moment",
          "Room reaction = payoff moment. Let it sink in.",
        ],
      },
      {
        kind: "prompt",
        label: "Claude in Chrome ； Claude 自己测试你的 app（中文版）",
        code: "用 Chrome 打开我的 dashboard，Screenshot 每个图表，然后告诉我有没有看起来坏掉的。",
        notes: [
          "Jay 先在大屏幕上 demo HIS dashboard ； 然后学员试",
          "Claude 实时驱动浏览器 ； 这就是 \"my god\" 时刻",
          "全场反应 = 回报时刻。让它沉淀。",
        ],
      },
      {
        kind: "title",
        title: "原始 Excel → 你的 Dashboard",
        subtitle: "你的会计师每月收 RM 3,000 做这个。你 75 分钟做好了。",
        notes: [
          "并排对比用最好看的学员 dashboard，不是你的",
          "叫学员站起来 ； 公开表扬 = 同侪推动力",
        ],
      },
      {
        kind: "title",
        emoji: "🎉",
        title: "Milestone 2",
        subtitle: "你刚替代了 Power BI。Screenshot →WhatsApp。",
        notes: [
          "掌声时刻 ； 所有人现在Screenshot 发 WhatsApp",
          "同步检查：大家都应该看到自己的 dashboard 显示真实数据",
        ],
      },
    ],
  },
  {
    id: 6,
    day: 1,
    title: "休息",
    startTime: "15:00",
    endTime: "15:15",
    duration: "15 min",
    type: "break",
    schedule: [],
  },
  {
    id: 7,
    day: 1,
    title: "HR 运营系统",
    subtitle: "SESSION 5",
    startTime: "15:15",
    endTime: "16:30",
    duration: "75 min",
    type: "session",
    schedule: [
      { time: "3:15-3:25", activity: "The pitch + 物流公司的故事", details: "\"想象一个物流公司，30 个司机。老板完全不知道谁打卡了、谁在 OT、谁还欠津贴。WhatsApp 乱成一团。出粮日就是噩梦。今天我们修好它 ； 一个统一的 HR app。\"" },
      { time: "3:25-3:40", activity: "走一遍 4 个模块 + 定好数字", details: "屏幕上：Jay 走一遍 4 个模块 ； 打卡、津贴、OT、出粮 ； 以及它们怎么共用一个司机名单。然后是薪酬数字（底薪 RM 1,800、OT RM 15/小时、津贴 RM 20/天）。在 scaffold prompt 之前，把 \"描述问题，不是方案\" 的思维锚定下来。" },
      { time: "3:40-4:05", activity: "做 app（跟着做）", details: "Prompt Claude 搭建一个 Next.js app，有 4 个模块：(1) 司机打卡（大按钮：clock in / clock out，记录时间戳）,(2) 津贴申请表（司机名、金额、原因、照片上传）,(3) OT 记录（日期、小时）,(4) 出粮总表（自动计算：底薪 + 津贴 + OT）。开头用 'Use the Design skill.' ； mobile-first，因为司机用手机。" },
      { time: "4:05-4:15", activity: "测试流程", details: "Scaffold prompt 自动种了 10 个假司机。现在真的 USE 这个 app：给 Ahmad 打卡、提津贴申请、记 OT、打开 payroll 页 ； 看他的总薪酬自动算好。\"真的可以用\" 时刻。" },
      { time: "4:15-4:25", activity: "Claude in Chrome ； \"Claude 扮演司机\"", details: "Prompt:\"Open my app in Chrome, log in as Ahmad, clock in, file an RM 20 allowance claim, and log 2 hours of OT. Then open the payroll page and read me Ahmad's total.\"Claude 实时驱动整个流程。这就是 \"my god\" 时刻 ； Claude 30 秒就帮你的 app 做了 QA 测试。" },
      { time: "4:25-4:30", activity: "Milestone 3", details: "\"你刚刚做的东西，HR SaaS 厂商卖 RM 8,000–15,000。Claude 还帮你测试了。下一个 session：我们把它 LIVE。\"" },
    ],
    slideDeck: [
      {
        kind: "title",
        emoji: "🚚",
        title: "HR 系统",
        subtitle: "物流公司的问题",
        notes: [
          "休息后能量 ； 用故事开场，不是 slide",
          "每个人都认识有车队 / 厨房班 / 清洁队的人 ； 大玩相关性",
        ],
      },
      {
        kind: "bullets",
        title: "一家物流公司，30 个司机",
        bullets: [
          "老板不知道谁打卡了",
          "不知道谁还欠津贴",
          "不知道谁做了 OT",
          "出粮日 = 噩梦。WhatsApp 乱成一团。",
        ],
        notes: [
          "画出画面 ； WhatsApp 截图满天飞、Excel 出粮噩梦",
          "\"今天我们修好 ； 一个统一的 HR app,75 分钟搞定。\"",
        ],
      },
      {
        kind: "bullets",
        title: "🧠 先切到 Plan mode",
        bullets: [
          "打开 Mode 菜单",
          "选 \"Plan mode\"",
          "看到 Plan mode ✓ 才贴 prompt",
          "Plan mode = Claude 给你 plan，不会先动手",
        ],
        notes: [
          "投影仪示范一次 ； 打开 Mode 菜单，选 Plan mode,回到输入框。全场跟着做。",
          "看到 \"Plan mode ✓\" 才继续 ； 没切好的举手，Assistant 过来。",
          "切 mode 是 UI 动作，不是写在 prompt 里。prompt 里不用写 \"enter plan mode\"。",
          "\"Plan mode = Claude 给你 plan,不会先动手写代码。这是真正的老板工作流。\"",
          "接下来：贴 prompt → 读 plan → 改 plan → approve。",
        ],
      },
      {
        kind: "prompt",
        label: "⭐ 问题 prompt",
        code: "Use the Design skill.\n\nI run a logistics company with 30 drivers. My daily problems:\n\n- I don't know who clocked in today\n- Drivers claim allowances on WhatsApp — I lose track\n- OT calculation is manual and always wrong\n- Payroll day takes me 2 full days\n\nI want an app my drivers can use on their phones to handle these, and a page for me (the boss) to see everyone's payroll at a glance.\n\nAsk me clarifying questions first — numbers (base salary, OT rate, allowance cap), edge cases, anything ambiguous. Then give me a plan: what pages, what each page does, what data you'll track.\n\nPrepare for Next.js + Tailwind CSS + Supabase + Vercel.",
        notes: [
          "先确认大家已经切到 Plan mode（看到 ✓）。没切到的举手。",
          "Look at it ； not a single tech word. Just business pain + the outcome.",
          "No \"4 modules\" spec ； let Claude figure out the shape. That's the point.",
          "Plan mode 保证 Claude 给 plan,不会直接开始 build。你读了、改了、approve 了它才写代码。",
          "Everyone pastes now. We'll all read our plans together.",
        ],
      },
      {
        kind: "prompt",
        label: "⭐ 问题 prompt（中文版）",
        code: "用 Design skill。\n\n我开一间物流公司，有 30 个司机。我每天的问题：\n\n- 今天谁打卡我不知道\n- 司机在 WhatsApp 报 allowance，我追不到\n- OT 全部手算，算错是常事\n- 出粮日要我两整天\n\n我要一个 app，让司机用手机解决这些问题，也要一个页面给我老板看所有人的出粮。\n\n先问我几个问题 ； 数字（底薪、OT 费率、津贴上限）、边界情况、任何不清楚的地方。然后给我一份 plan：有哪些页面、每个页面做什么、你会记什么数据。\n\n用 Next.js + Tailwind CSS，为 Supabase + Vercel 做准备。简单就好 ； 这是 workshop 的原型。",
        notes: [
          "先确认所有人已经切到 Plan mode（看到 ✓）。没切到的举手。",
          "看 prompt ； 没一个技术词。只有生意痛苦 + 结果。",
          "没有写 \"4 个模块\" ； 让 Claude 自己决定。这才是重点。",
          "Plan mode 保证 Claude 给 plan,不会直接开始 build。你读了、改了、approve 了它才写代码。",
          "所有人现在贴。等下一起读你们的 plan。",
        ],
      },
      {
        kind: "bullets",
        title: "📖 读 Claude 的 plan",
        bullets: [
          "它会列：要做哪些页面、每页做什么、记什么数据",
          "看得懂就 OK ； 生意语言，不是代码",
          "看不懂的部分 ； 问回 Claude \"这部分什么意思\"",
          "不要急着 approve ； 先读一遍",
        ],
        notes: [
          "第一次看 plan 有些人会慌 ； prime 他们：这是他们母语（生意话），看得懂的。",
          "走动检查 ； 谁的 plan 只有 3 页谁的 8 页？不一样正常。",
          "\"你是老板，它是员工。员工给你方案 ； 你看合不合理。\"",
        ],
      },
      {
        kind: "bullets",
        title: "✍️ 改 plan 再执行",
        bullets: [
          "\"底薪改成 RM 1,800 / 月\"",
          "\"OT 费率 RM 15 / 小时\"",
          "\"津贴上限 RM 20 / 天\"",
          "\"预填 10 个马来西亚司机名字\"",
          "满意了 → approve，Claude 开始 build",
        ],
        notes: [
          "数字是学员自己生意里要调的。今天用物流公司的数字 ； 明天他们回去改成自己的。",
          "教他们：直接打字告诉 Claude 要改什么 ； 不要自己去动 plan。",
          "Approve 的方式 ； Claude Code 按 \"accept plan\"，Claude desktop 回复 \"go ahead\" 或 \"build it\"。",
          "这才是老板工作流：员工给方案 → 老板改重点 → 批准 → 员工干活。",
        ],
      },
      {
        kind: "bullets",
        title: "💡 Pro tip - 卡在循环里？",
        bullets: [
          "Claude 一直给同样的烂答案：",
          "开一个 FRESH session",
          "贴一段简短总结：\"I'm building X. I tried Y. It broke because Z.\"",
          "白纸从头 = 比跟糊涂的 session 死磕好",
        ],
        notes: [
          "做到 workshop 第 3 个 build session，有些学员会试图强行用坏掉的 prompt 硬推 Claude ； 主动处理",
          "直觉是留在同一个 session 继续试 ； 教他们放手",
        ],
      },
      {
        kind: "title",
        emoji: "🎯",
        title: "Milestone 3 ； 出粮自动算好",
        subtitle: "HR 软件卖 RM 8,000–15,000。你 75 分钟做好了。",
        notes: [
          "出粮自动算好是情感高潮 ； 给反应留时间",
          "\"下一个 session：我们把它 LIVE。你的司机能真的用。\"",
          "扫视全场：挑 3 个最好的 HR app 给明天 showcase",
        ],
      },
    ],
  },
  {
    id: 8,
    day: 1,
    title: "上线 (Supabase + Vercel)",
    subtitle: "SESSION 6",
    startTime: "16:30",
    endTime: "17:45",
    duration: "75 min",
    type: "session",
    schedule: [
      { time: "4:30-4:35", activity: "赌注", details: "\"你的 HR app 只存在你的笔电上。合盖子 ； 就没了。今天我们把它 LIVE，你的司机才能真正用。而且 Claude 会做 90% 的工作 ； 因为我们有 connectors。\"" },
      { time: "4:35-4:50", activity: "Supabase ； 让你的数据永久保存", details: "一个老板语言 prompt:\"Make my HR app data permanent using Supabase. Call the project hr-[myname]. Handle the setup ； I just want to stop losing my data.\"看 Claude 自己开数据库、创建需要的东西、改写代码。Supabase dashboard 一个按钮都不用点。" },
      { time: "4:50-5:00", activity: "测试 ； 你的数据活下来", details: "给 Ahmad 打卡。然后：\"Show me the most recent check-in from my Supabase data.\"Claude 从 Supabase 读出来给你看。\"你的数据现在是 PERMANENT ； 合上笔电，它还在。\"关键情感节点。" },
      { time: "5:00-5:10", activity: "GitHub ； 给你的代码一个家", details: "学员打开 github.com → 点 New → 命名 hr-[myname] → Private → 复制链接。然后一个 prompt:\"Put my HR app on GitHub so Vercel can deploy it later. Here's my empty repo: [URL]. If GitHub asks me to sign in, walk me through it.\"Claude 处理 git 的那套舞步 ； 第一次推送通常会触发一次性浏览器授权。" },
      { time: "5:10-5:25", activity: "Vercel ； 放上线", details: "一个老板语言 prompt:\"Put my HR app online using Vercel ； use my GitHub repo hr-[myname]. Make sure it still connects to Supabase the same way it does on my laptop. Give me the live URL.\"Claude 从 GitHub 拉代码、接上 Supabase 凭据、部署。学员看着自己的 URL 出现。Build 失败 → 错误贴回，Claude 修好再部署。" },
      { time: "5:25-5:35", activity: "THE BIG MOMENT", details: "\"在你 PHONE 上打开你的 live URL。给自己打卡。现在发给一个朋友。你的 HR 系统 LIVE ON THE INTERNET ； 你几乎没碰过 dashboard。\"合影。" },
      { time: "5:35-5:45", activity: "Claude in Chrome 胜利圈", details: "最后一个 prompt:\"Open my live URL in Chrome, clock in a new driver called \"Jay Demo\", and screenshot the payroll page.\"Claude 端到端驱动 live 网站。巅峰 \"this is the future\" 时刻。Milestone 4:\"三个 app。一个上线。RM 50,000+ 的开发工作。一天。\"" },
    ],
    slideDeck: [
      {
        kind: "title",
        emoji: "💻",
        title: "现在只有你自己能看到你的 app。",
        subtitle: "让任何人都能从手机打开它。",
        notes: [
          "Day 1 的顶点 ； 最大的 connector 回报从这里开始",
          "\"今早 Session 2 我给你看了一个部署好的 app。秘密是 ； 我没点过一个按钮。Claude 点的。\"",
        ],
      },
      {
        kind: "prompt",
        label: "💡 Pro tip - pre-deploy check",
        code: "Before we put my code online, check it for anything I shouldn't share publicly:\n- passwords or secret keys\n- customer data\n- anything a stranger shouldn't see\n\nFix whatever you find.",
        notes: [
          "CRITICAL habit ； one leaked secret can burn real money",
          "Do it before every deploy. Make it muscle memory.",
          "Claude will scan .env files, .gitignore, hardcoded secrets ； the boss doesn't need to know those words",
        ],
      },
      {
        kind: "prompt",
        label: "💡 Pro tip - 上线前检查（中文版）",
        code: "把我的代码放上网之前，帮我检查有没有不该公开分享的东西：\n- 密码或 secret key\n- 客户资料\n- 陌生人不该看到的东西\n\n找到什么就帮我修好。",
        notes: [
          "CRITICAL 习惯 ； 一个泄露的 secret 可以烧掉真钱",
          "每次部署前都做。变成肌肉记忆。",
          "Claude 会去查 .env 文件、.gitignore、硬编码的 secret ； 老板不用知道这些词",
        ],
      },
      {
        kind: "bullets",
        title: "App 怎么运作（餐厅式）",
        bullets: [
          "Frontend = 前厅（顾客看到的）",
          "Backend = 厨房（处理数据）",
          "Database = 储藏室（保存所有东西）",
          "Supabase = 整个后厨一站式",
        ],
        notes: [
          "30 秒比喻 ； 不要过度解释，他们做中学",
        ],
      },
      {
        kind: "title",
        emoji: "🤖",
        title: "Connectors = Claude 有双手",
        subtitle: "今早你检查过它们。现在你会 FEEL 到差别。",
        notes: [
          "回顾 Session 1 ； \"记得你检查那 3 个绿勾吗？就是为了这个。\"",
        ],
      },
      {
        kind: "bullets",
        title: "先做：Connector 健康检查",
        bullets: [
          "打开 Claude → Settings → Connectors",
          "Supabase ✓",
          "Vercel ✓",
          "Claude in Chrome ✓",
          "红勾现在修好，不要拖到中途",
        ],
        notes: [
          "所有人现在检查 ； 中途授权过期是头号失败模式",
          "这不是 prompt，是动作 ； 投影仪示范一次",
          "任何红勾举手，Assistants 过来帮授权",
        ],
      },
      {
        kind: "prompt",
        label: "⭐ THE SUPABASE HERO PROMPT",
        code: "Make my HR app data permanent using Supabase.\n\nRight now when I close my laptop, everything disappears. I want it to STAY ； drivers, clock-ins, allowances, OT, payroll, all of it.\n\nFirst, look at my existing app to see what it actually needs to remember. Ask me about anything unclear (e.g. what details belong on each driver or allowance). Then give me a plan before touching Supabase.\n\nCall the Supabase project hr-[myname]. Once I approve the plan, handle the tech ； I just want to stop losing my data.",
        notes: [
          "Everyone pastes now ； replace [myname] with your name",
          "Pure boss language ； \"stop losing my data\". Claude handles tables, schema, env vars, code changes. Students don't touch those words.",
          "Watch Claude do it live. Not a single button click in the Supabase dashboard.",
          "Connector down → that student switches to the manual fallback appendix. Don't drag the whole room.",
        ],
      },
      {
        kind: "prompt",
        label: "⭐ SUPABASE 主打 PROMPT（中文版）",
        code: "用 Supabase 让我 HR app 的数据变永久。\n\n现在我合笔电，所有东西就不见。我要它 STAY ； 司机、打卡、allowance、OT、payroll，全部都要。\n\n先看我现有的 app,了解它真正需要记住什么。有任何不明的地方先问我（例如每个司机或每笔 allowance 要记什么）。然后在动 Supabase 之前，给我一份 plan。\n\nSupabase 项目叫 hr-[myname]。我 approve 了 plan 你再开始 ； 技术的你自己搞定 ； 我只是不想再弄丢我的数据。",
        notes: [
          "所有人现在贴 ； 把 [myname] 换成你的名字",
          "纯老板语言 ； \"stop losing my data\"。Claude 自己搞定 table、schema、env var、代码改动。学员不用碰那些词。",
          "看 Claude 现场做。Supabase dashboard 一个按钮都不用点。",
          "Connector 挂 → 那个学员切到手动后备附录。不要拖垮全场。",
        ],
      },
      {
        kind: "prompt",
        label: "One prompt to test",
        code: "Show me the most recent check-in from my Supabase data.",
        notes: [
          "Clock Ahmad in first, then run this test prompt",
          "Claude reads from the database and shows it ； proof that data is permanent",
        ],
      },
      {
        kind: "prompt",
        label: "一个 prompt 测试（中文版）",
        code: "把我 Supabase 里最新一次 check-in 显示出来给我看。",
        notes: [
          "先给 Ahmad 打卡，再跑这个测试 prompt",
          "Claude 从数据库读出来显示 ； 证明数据是永久的",
        ],
      },
      {
        kind: "title",
        title: "你的数据现在是 PERMANENT",
        subtitle: "合上笔电 ； 数据还在。Claude 也能看到。",
        notes: [
          "停顿 ； 让分量落下。合笔电，数据活着。",
        ],
      },
      {
        kind: "title",
        emoji: "📦",
        title: "部署前 ； 你的代码需要一个家",
        subtitle: "GitHub = 你代码的储藏室。Vercel 从那里读。",
        notes: [
          "30 秒解说 ； GitHub 是代码在线的家，这样 Vercel 才能拿",
          "比喻：\"Supabase = 存 DATA 的储藏室。GitHub = 存 CODE 的储藏室。Vercel = 把它端给访客的服务员。\"",
        ],
      },
      {
        kind: "bullets",
        title: "建你的 GitHub 仓库（手动，90 秒）",
        bullets: [
          "打开 github.com → 点左上角绿色 \"New\" 按钮",
          "命名：hr-[myname]  ·  设为 Private",
          "其他全部不动 ； 下面的复选框都不要打勾",
          "点 \"Create repository\" → 下一页显示的链接复制下来",
        ],
        notes: [
          "屏幕上现场 demo ； 走一遍，非技术学员需要 SEE 按钮在哪",
          "链接长这样：https://github.com/yourname/hr-myname.git",
          "不要勾任何 \"initialize with...\" 复选框 ； 会加多余文件，后面头痛",
          "进下一张 slide 前，所有人剪贴板上都有链接",
        ],
      },
      {
        kind: "prompt",
        label: "⭐ THE GITHUB PUSH PROMPT",
        code: "Put my HR app on GitHub so Vercel can deploy it later.\n\nHere's my empty repo: [paste your repo URL here]\n\nBefore pushing, double-check that nothing private goes public — no passwords, no Supabase keys, no credentials. Handle the tech.\n\nIf GitHub asks me to sign in, walk me through it.",
        notes: [
          "Paste the link you copied into [paste your repo URL here]",
          "First push will pop GitHub sign-in ； Claude walks them through the browser popup (Windows uses Git Credential Manager, Mac uses Keychain for the real auth)",
          "Usually = one-time browser popup, click Authorize GitHub, done",
          "Wait for Claude to confirm code is pushed up before going to Vercel",
        ],
      },
      {
        kind: "prompt",
        label: "⭐ GITHUB 推送 PROMPT（中文版）",
        code: "把我的 HR app 放上 GitHub，这样等下 Vercel 才能部署。\n\n这是我的空 repo:[paste your repo URL here]\n\n推送前再三确认 ； 任何私密的东西（密码、Supabase key、凭证）都不要上公开 repo。技术的你自己搞定。\n\n如果 GitHub 叫我登录，一步一步带我走。",
        notes: [
          "把你复制的链接贴到 [paste your repo URL here] 那里",
          "第一次推送会弹 GitHub 登录 ； Claude 会引导他们过浏览器弹窗（Windows 用 Git Credential Manager,Mac 用 Keychain 处理真正的授权）",
          "通常 = 一次性浏览器弹窗，点 Authorize GitHub，搞定",
          "等 Claude 确认代码上去了再去 Vercel",
        ],
      },
      {
        kind: "prompt",
        label: "⭐ THE VERCEL HERO PROMPT",
        code: "Put my HR app online using Vercel. Use my GitHub repo hr-[myname].\n\nHandle the tech — install whatever you need, log me in if you have to, walk me through any browser popup.\n\nBefore deploying, make sure my Supabase connection details also exist on Vercel so the live site can reach my data (the laptop version does; the live one needs the same). Ask me if anything is ambiguous.\n\nSet it up so future changes I push to GitHub auto-deploy. If anything asks which account/team to use, pick my personal one.\n\nGive me the live URL when it's up.",
        notes: [
          "Everyone pastes now ； watch your URL appear",
          "Stealth install ； prompt quietly installs Vercel CLI + logs in if needed",
          "vercel login opens a browser tab ； one-time click, then silent forever",
          "`vercel deploy` auto-detects the GitHub remote and links the project ； no web UI needed",
          "Once linked, every `git push` triggers an auto-deploy ； the \"ship it\" magic",
          "Claude handles the Supabase env var wiring in the background ； students don't touch those words",
          "Build failing is normal ； paste the error back, Claude fixes and redeploys",
          "Call out the first one to deploy successfully: \"[Name] is LIVE! Who's next?\"",
        ],
      },
      {
        kind: "prompt",
        label: "⭐ VERCEL 主打 PROMPT（中文版）",
        code: "用 Vercel 把我的 HR app 放上网。用我的 GitHub repo hr-[myname]。\n\n技术的你自己搞定 ； 需要装什么就装，需要登录就带我走浏览器弹窗。\n\n部署前，确保我笔电那套 Supabase 连接设定，在 Vercel 那边也有一份 ； 线上的 app 也要能连到我的数据。有不确定的先问我。\n\n帮我设好：以后 push 去 GitHub 就自动部署。如果问我要用哪个账号 / team，选我个人的。\n\n上线后给我 live URL。",
        notes: [
          "所有人现在贴 ； 看你的 URL 出现",
          "Stealth install ； 这个 prompt 会悄悄装 Vercel CLI + 登录",
          "vercel login 会开一个浏览器 tab ； 点一次就永远不用再点",
          "`vercel deploy` 自己侦测 GitHub remote 自动 link ； 不用开网页",
          "Link 好之后，每次 `git push` 就自动部署 ； 这就是 \"ship it\" 的魔法",
          "Claude 在幕后处理 Supabase 的 env var 接线 ； 学员不用碰那些词",
          "Build 失败是正常的 ； 错误贴回，Claude 修好再部署",
          "第一个部署成功的叫出名字：\"[Name] is LIVE！下一个是谁？\"",
        ],
      },
      {
        kind: "bullets",
        title: "Claude 问你许可时",
        bullets: [
          "理解它要做什么",
          "然后说 yes",
          "Connector 没你同意绝不会动",
        ],
        notes: [
          "重要的安全时刻 ； connector 动之前会问",
          "快速安心：Claude 没你 OK 不会做任何事",
        ],
      },
      {
        kind: "bullets",
        title: "Build 失败怎么办",
        bullets: [
          "复制错误",
          "贴进 Claude",
          "Claude 帮你读 Vercel logs",
          "让它修好再部署。",
        ],
        notes: [
          "教这个循环：错误 → 贴给 Claude → Claude 通过 connector 修 → 重新部署",
          "Vercel build 错误还是常见 ； 这是正常，不是失败",
        ],
      },
      {
        kind: "title",
        emoji: "📱",
        title: "THE BIG MOMENT",
        subtitle: "在你手机打开看看，copy and paste 你的 URL 在我们的 WhatsApp 群里。",
        notes: [
          "所有人在 PHONE 上打开 ； 不是笔电。这是起鸡皮疙瘩时刻。",
          "不要让任何人省掉。走动确认手机都拿出来。",
        ],
      },
      {
        kind: "title",
        title: "你的 HR 系统已上线",
        subtitle: "分享给你的团队，让他们试用。",
        notes: [
          "合影是 MANDATORY ； 营销素材 + 情感锚点",
          "立刻发 WhatsApp",
        ],
      },
      {
        kind: "title",
        emoji: "🏆",
        title: "Milestone 4",
        subtitle: "3 个 app，1 个 LIVE，RM 50,000+ 的 Productivity，全部一天搞定。",
        notes: [
          "巅峰 \"this is the future\" 时刻 ； 让掌声发生",
          "脑子里挑 5-6 个最好的 build，明天 showcase 用",
        ],
      },
    ],
  },
  {
    id: 9,
    day: 1,
    title: "Day 1 收尾",
    subtitle: "SESSION 7",
    startTime: "17:45",
    endTime: "18:00",
    duration: "15 min",
    type: "session",
    schedule: [
      { time: "5:45-5:50", activity: "回顾", details: "展示旅程：空屏幕 → 3 个 app 上线（landing page、dashboard、HR 系统）,HR 在生产环境。\"请开发团队做要 2-3 个月和 RM 50,000+。你一天搞定。\"" },
      { time: "5:50-5:55", activity: "Day 2 预告", details: "\"今天：跟着我做 3 个 app。明天：你自己的系统，你自己的行业。你为自己的生意重新做一次 ； 离开的时候带着 3 个属于你自己的能用系统。\"" },
      { time: "5:55-6:00", activity: "作业", details: "\"今晚：想想你生意里 3 个最大的痛点。写下来。明天我们修好。\"" },
    ],
    slideDeck: [
      {
        kind: "bullets",
        title: "Day 1 回顾",
        bullets: [
          "Landing page ✓",
          "Dashboard ✓",
          "HR 系统（LIVE) ✓",
          "你指挥，Claude 做 90% 的工作 ✓",
        ],
        notes: [
          "快速视觉回顾 ； 让成就感叠加起来",
          "过渡到收尾能量",
        ],
      },
      {
        kind: "title",
        title: "一个开发团队 = 2-3 个月 + RM 50,000",
        subtitle: "你一天搞定。",
        notes: [
          "停顿 ； 让对比沉淀",
        ],
      },
      {
        kind: "title",
        emoji: "🌅",
        title: "明天：你自己的系统，你自己的行业",
        subtitle: "今天你跟着我做。明天你亲自打造自己的商业系统。",
        notes: [
          "\"今天：跟着我做 3 个 app。明天：你自己的系统，你自己的行业。\"",
          "为 Day 2 制造期待",
        ],
      },
      {
        kind: "bullets",
        title: "今晚的作业",
        bullets: [
          "想想你的生意",
          "写下 3 个最大的痛点",
          "明天我们一起解决",
        ],
        notes: [
          "\"今晚：想想你生意里 3 个最大的痛点。写下来。\"",
          "明天的 build session 靠这个作业",
        ],
      },
      {
        kind: "bullets",
        title: "离开前",
        bullets: [
          "有什么问题可以来前面找我",
          "明天早上 9:00 准时见",
          "晚安 👋",
        ],
        notes: [
          "今晚在 WhatsApp 群发 Day 1 回顾 + 合影",
          "之后简报 Assistants：什么有效、什么没、Day 2 的调整",
        ],
      },
    ],
  },
  {
    id: 10,
    day: 2,
    title: "The Why ； 思维转变 + SME 自动化蓝图",
    subtitle: "SESSION 8",
    startTime: "09:00",
    endTime: "10:30",
    duration: "90 min",
    type: "session",
    schedule: [
      { time: "9:00-9:15", activity: "Day 2 开场", details: "能量检查。\"昨晚有谁把 app 链接发给别人？他们怎么说？\" 2-3 个故事。2 分钟回顾 Day 1。" },
      { time: "9:15-9:35", activity: "思维转变", details: "Before vs After：请Developer(RM 50k+、3-6 个月）vs 自己做（RM 20/月、一个周末）。AI 工具地景。5 个 prompting 原则配中文例子。Bad → OK → Great prompt 对比。" },
      { time: "9:35-10:05", activity: "SME 自动化蓝图", details: "Jay 的核心 IP。走一遍一页版自动化蓝图。3 个行业例子 demo：餐饮、服务业、贸易。" },
      { time: "10:05-10:20", activity: "练习：设计你的系统", details: "每个学员填架构工作表。列出前 3 痛点、对应模块、画出数据流。" },
      { time: "10:20-10:30", activity: "志愿者分享", details: "Jay 挑 4-5 位志愿者（每人 30-60 秒）:\"我要做 X、Y、Z，因为 [痛点]。\"现场反馈。" },
    ],
    slideDeck: [
      { kind: "title", title: "Vibe Coding Workshop", subtitle: "Day 2 · 19 April 2026", notes: ["轻音乐播放中，让大家安顿", "Assistants 帮忙处理名牌", "9:10 准时开始，哪怕还有人陆续到场"] },
      {
        kind: "title",
        title: "昨晚谁把 app 发给别人？",
        subtitle: "他们怎么说？",
        notes: [
          "挑 2-3 个故事。让他们炫耀。这给整个上午制造动能。",
          "没人自告奋勇，就点名昨天做得好的人。",
        ],
      },
      {
        kind: "raw",
        title: "昨天你建了什么",
        html: `<div style="display:flex;flex-direction:column;gap:22px;margin-top:8px">
          <div style="display:flex;align-items:stretch;justify-content:center;gap:14px;width:100%">
            <div style="background:linear-gradient(135deg,#1f2937,#111827);border:1px solid #374151;border-radius:20px;flex:1;padding:22px 20px;display:flex;flex-direction:column;min-width:0">
              <div style="font-size:40px;margin-bottom:10px">📦</div>
              <div style="font-size:22px;font-weight:800;color:white;margin-bottom:4px">GitHub</div>
              <div style="font-size:13px;letter-spacing:0.2em;font-weight:700;color:#9ca3af;margin-bottom:14px">代码的家</div>
              <div style="font-size:15px;color:#e5e7eb;line-height:1.45;margin-bottom:8px">你写的 code 存这里，所有版本都留底。</div>
              <div style="margin-top:auto;padding-top:14px;border-top:1px solid #374151;font-size:12px;color:#6b7280;letter-spacing:0.1em">≈ Repository (源代码)</div>
            </div>
            <div style="font-size:28px;color:#f59e0b;flex-shrink:0;align-self:center">→</div>
            <div style="background:linear-gradient(135deg,#0f172a,#020617);border:1px solid #1e40af;border-radius:20px;flex:1.1;padding:22px 20px;display:flex;flex-direction:column;min-width:0">
              <div style="font-size:40px;margin-bottom:10px">▲</div>
              <div style="font-size:22px;font-weight:800;color:white;margin-bottom:4px">Vercel</div>
              <div style="font-size:13px;letter-spacing:0.2em;font-weight:700;color:#93c5fd;margin-bottom:14px">服务器 · 服务员</div>
              <div style="font-size:15px;color:#e5e7eb;line-height:1.45;margin-bottom:8px">从 GitHub 拉 code,部署给全世界打开。用户看到的页面 + 背后的 API,都在这里。</div>
              <div style="margin-top:auto;padding-top:14px;border-top:1px solid #1e40af;font-size:12px;color:#60a5fa;letter-spacing:0.1em">≈ Frontend + Backend API</div>
            </div>
            <div style="font-size:28px;color:#10b981;flex-shrink:0;align-self:center">↔</div>
            <div style="background:linear-gradient(135deg,#064e3b,#022c22);border:1px solid #065f46;border-radius:20px;flex:1;padding:22px 20px;display:flex;flex-direction:column;min-width:0">
              <div style="font-size:40px;margin-bottom:10px">🗄️</div>
              <div style="font-size:22px;font-weight:800;color:white;margin-bottom:4px">Supabase</div>
              <div style="font-size:13px;letter-spacing:0.2em;font-weight:700;color:#6ee7b7;margin-bottom:14px">数据的家</div>
              <div style="font-size:15px;color:#e5e7eb;line-height:1.45;margin-bottom:8px">司机、打卡、津贴、OT、payroll ； 全部永久保存，合笔电也在。</div>
              <div style="margin-top:auto;padding-top:14px;border-top:1px solid #065f46;font-size:12px;color:#6ee7b7;letter-spacing:0.1em">≈ Database</div>
            </div>
          </div>
          <div style="background:rgba(234,88,12,0.12);border:1px solid rgba(234,88,12,0.35);border-radius:14px;padding:14px 20px;text-align:center;color:#fed7aa;font-size:16px;line-height:1.5">
            <span style="font-weight:700;color:#fdba74">三个加起来</span> = 你昨天做好的 HR app,从 GitHub 上的一行 code,到全马来西亚任何人手机都能打开的 live URL。
          </div>
        </div>`,
        notes: [
          "昨天他们经历过整个流程 ； 现在给这流程命名。",
          "从左到右讲：\"你 push 到 GitHub → Vercel 从 GitHub 拉 → Vercel 上的 app 跟 Supabase 要数据。\"",
          "开发者语汇放在卡片底部（Repository / Frontend + Backend / Database）— 让他们以后看别的文章能对得上号。",
          "结尾一句：\"这不是什么黑科技。全世界的 SaaS 都这样拼起来。你昨天已经做过一次了。\"",
        ],
      },
      {
        kind: "bullets",
        title: "学会 Vibe Coding 之前",
        bullets: [
          "请开发团队：RM 50,000+",
          "做好时间：3-6 个月",
          "维护：每月付钱",
          "想为你自己的生意量身定做？Good luck。",
        ],
        notes: [
          "让这些落地 ； 他们 KNOW 这种痛。每个 bullet 后停一下。",
          "理论现在 hits different：昨天他们盲做居然成功。现在你解释为什么。",
        ],
      },
      {
        kind: "bullets",
        title: "学会 Vibe Coding 之后",
        bullets: [
          "你自己做",
          "做好时间：一个周末",
          "费用：As low as USD 20 per month",
          "想为你自己的生意量身定做？没问题。",
        ],
        notes: [
          "\"你昨天就是这样做的。这不是假设 ； 你 LIVED 过了。\"",
          "点具体的人：\"[Name]，你的 POS 做多久？\"",
        ],
      },
      {
        kind: "bullets",
        title: "5 个升级 prompt 的开关",
        bullets: [
          "1. 先讲痛苦 ； 你的生意为什么需要它",
          "2. 给具体数字 ； 2 员工、30 分钟、9am-6pm",
          "3. 用 Skill ； \"Use the Design skill\"",
          "4. 让 Claude 先反问你 ； \"Ask me to clarify first\"",
          "5. 先要 plan，不要 build ； Plan mode",
        ],
        notes: [
          "\"这 5 个开关你昨天都 activate 过了。今天给你命名。\"",
          "每一条都能点回 Day 1 的一个具体时刻：",
          "  · #1 痛苦 = HR 系统 30 司机那个开场",
          "  · #2 数字 = HR 底薪 RM 1,800 / OT RM 15",
          "  · #3 Skill = Landing page 第一句 \"Use the Design skill\"",
          "  · #4 反问 = 等下下一张 slide 的 Pro tip",
          "  · #5 Plan = Session 5 切 Plan mode 那个流程",
          "下一张 Bad → OK → Great ； Great 的卡里这 5 个开关全部打开。",
        ],
      },
      {
        kind: "raw",
        fragments: 3,
        html: `<div style="display:flex;align-items:stretch;justify-content:center;gap:16px;width:100%">
          <div data-f="1" style="background:linear-gradient(135deg,#7f1d1d,#b91c1c);border-radius:20px;flex:0.85;padding:26px 22px;display:flex;flex-direction:column;min-width:0">
            <div style="font-size:15px;font-weight:800;letter-spacing:0.25em;color:#fecaca;margin-bottom:12px">BAD</div>
            <div style="font-size:40px;margin-bottom:16px">😕</div>
            <div style="font-size:24px;color:white;font-style:italic;line-height:1.4;white-space:pre-line">"Build a booking system."</div>
            <div style="margin-top:18px;font-size:14px;color:#fecaca;font-style:normal;line-height:1.5">没有生意背景，没有痛点，Claude 乱猜。</div>
          </div>
          <div data-f="2" style="font-size:28px;color:#4b5563;flex-shrink:0;align-self:center">→</div>
          <div data-f="2" style="background:linear-gradient(135deg,#78350f,#b45309);border-radius:20px;flex:0.95;padding:26px 22px;display:flex;flex-direction:column;min-width:0">
            <div style="font-size:15px;font-weight:800;letter-spacing:0.25em;color:#fed7aa;margin-bottom:12px">OK</div>
            <div style="font-size:40px;margin-bottom:16px">😐</div>
            <div style="font-size:19px;color:white;font-style:italic;line-height:1.5;white-space:pre-line">"Build a salon booking system. Customers pick a service and time, get a confirmation."</div>
            <div style="margin-top:18px;font-size:14px;color:#fed7aa;font-style:normal;line-height:1.5">有业务了，时段、人数、流程 Claude 还是得猜。</div>
          </div>
          <div data-f="3" style="font-size:28px;color:#4b5563;flex-shrink:0;align-self:center">→</div>
          <div data-f="3" style="background:linear-gradient(135deg,#065f46,#059669);border-radius:20px;flex:1.4;padding:26px 22px;display:flex;flex-direction:column;min-width:0">
            <div style="font-size:15px;font-weight:800;letter-spacing:0.25em;color:#a7f3d0;margin-bottom:12px">GREAT</div>
            <div style="font-size:40px;margin-bottom:16px">🎯</div>
            <div style="font-size:16px;color:white;font-style:italic;line-height:1.55;white-space:pre-line">"Use the Design skill.

Salon, 2 stylists, 3 services.

My problems:
- Customers WhatsApp at night
- I double-book all the time
- New customers don't know prices

Mobile booking page: pick service, pick stylist, pick a 30-min slot 9am-6pm. WhatsApp auto-confirm.

Ask me to clarify anything unclear. Then give me a plan first."</div>
            <div style="margin-top:18px;font-size:14px;color:#a7f3d0;font-style:normal;line-height:1.5">5 个开关全部打开：痛苦 + 数字 + Skill + 反问 + Plan。</div>
          </div>
        </div>`,
        notes: [
          "每个 prompt 出现时大声读。让全场 FEEL 到差别。",
          "BAD → \"0 个开关打开。Claude 乱猜。\"",
          "OK → \"1 个开关（业务）。其他 4 个还关着。Claude 还在猜。\"",
          "GREAT → \"5 个开关全部打开：\"",
          "  · 开关 1 痛苦 → \"Customers WhatsApp / I double-book / 新客不懂价格\"",
          "  · 开关 2 数字 → \"2 stylists, 3 services, 30-min slot, 9am-6pm\"",
          "  · 开关 3 Skill → \"Use the Design skill\"",
          "  · 开关 4 反问 → \"Ask me to clarify anything unclear\"",
          "  · 开关 5 Plan → \"Give me a plan first\"",
          "收尾：\"你昨天学的每一个开关都在这里。只是换了一个生意。\"",
        ],
      },
      {
        kind: "prompt",
        label: "💡 开关 4 ； 让 Claude 先反问你",
        code: "Don't start yet. Ask me questions first to make sure you understand what I want.",
        notes: [
          "这是刚才 Bad→OK→Great 里开关 4 的独立 prompt ； 可以贴在任何开头",
          "一句话改变一切 ； Claude 会在 build 前先澄清",
          "现场 demo：打一个模糊 prompt + 这句话，让学员看 Claude 问出聪明的问题",
          "昨天他们贴 prompt。今天他们 WRITE prompt。这是升级。",
        ],
      },
      {
        kind: "prompt",
        label: "💡 开关 4 ； 让 Claude 先反问你（中文版）",
        code: "先别开始。先问我问题，确保你明白我要什么。",
        notes: [
          "这是开关 4 的中文单行版 ； 贴在任何 prompt 开头都能用",
          "一句话改变一切 ； Claude 会在 build 前先澄清",
          "现场 demo：打一个模糊 prompt + 这句话，学员看 Claude 问出聪明的问题",
        ],
      },
      {
        kind: "prompt",
        label: "💡 开关 1 ； 从生意背景开始",
        code: "I run [YOUR BUSINESS NAME], a [industry] business in [city]. We have [X] staff and serve [type of customers].\n\nToday I'm building [what]. I'll give you more details next.",
        notes: [
          "开关 1 的模板版 ； 每个新 session 都这样开头",
          "不是 Claude 的记忆功能 ； 只是好 prompting。每次都要做。",
          "填方括号 ； 让学员在自己的笔电上改成自己的生意",
        ],
      },
      {
        kind: "prompt",
        label: "💡 开关 1 ； 从生意背景开始（中文版）",
        code: "我开的是 [YOUR BUSINESS NAME]，一间在 [city] 的 [industry] 生意。我们有 [X] 个员工，服务的客人是 [type of customers]。\n\n今天我要做 [what]。等下给你更多细节。",
        notes: [
          "开关 1 的中文模板 ； 每个新 session 都这样开头",
          "不是记忆功能 ； 只是好 prompting。每次都要做。",
          "让学员在笔电上把方括号填成自己的生意",
        ],
      },
      {
        kind: "title",
        emoji: "🗺",
        title: "SME 自动化蓝图",
        subtitle: "一页计划，适用 ANY 生意",
        notes: [
          "这是你的核心 IP，最高价值的内容。这里放慢。",
          "走一遍一页蓝图 ； 每个方框、每条箭头。",
          "接下来 3 个行业例子：餐饮、服务、贸易。",
        ],
      },
      {
        kind: "bullets",
        title: "餐饮业例子",
        bullets: [
          "POS → 收集销售",
          "库存 → 卖出自动扣减",
          "Dashboard → 今天营收、库存不足警报",
        ],
        notes: [
          "场内有餐饮业学员就点名：\"这就是你今天要做的。\"",
          "强调数据流：POS 写一笔销售 → 库存读到并自动扣。",
        ],
      },
      {
        kind: "bullets",
        title: "服务业（沙龙 · 诊所 · 顾问）",
        bullets: [
          "预约 → 客户自己预约",
          "客户档案 → 过往就诊 + 备注",
          "Dashboard → 今天预约、没来的、营收",
        ],
        notes: [
          "同一套，不同行业。蓝图是通用的。",
          "服务业的人在意没来的客户 ； 提一下 dashboard 会抓出来。",
        ],
      },
      {
        kind: "bullets",
        title: "贸易业",
        bullets: [
          "报价工具 → 自动生成 PDF",
          "订单追踪 → 状态 + 跟进",
          "Dashboard → 订单漏斗、多少报价变订单",
        ],
        notes: [
          "贸易业的人喜欢 PDF 生成 ； 省掉几个小时的手动报价。",
          "强调 dashboard 上的转化率：\"多少报价变订单？现在你知道了。\"",
        ],
      },
      {
        kind: "title",
        emoji: "✏️",
        title: "练习 ； 规划 你自己的系统",
        subtitle: "15 分钟。你 3 个最大的问题 → 对应到页面 → 画出数据怎么流。",
        notes: [
          "个人工作表 ； 每个生意都是独特的。这里不搞小组。",
          "架构工作表通过 WhatsApp 分享。必须极度简单：痛点框、模块框、箭头。",
          "15 分钟后，挑 4-5 位志愿者（每人 30-60 秒）:\"我要做 X、Y、Z，因为 [痛点]。\"当众肯定每个计划。",
        ],
      },
    ],
  },
  {
    id: 11,
    day: 2,
    title: "核心模块（系统 #1)",
    subtitle: "SESSION 9",
    startTime: "10:30",
    endTime: "12:30",
    duration: "120 min",
    type: "session",
    schedule: [
      { time: "10:30-10:45", activity: "Prompt 包 + setup", details: "在 WhatsApp 分享行业专属的 prompt 包。\"这些是你的捷径。不要从零开始。\"" },
      { time: "10:45-12:00", activity: "BUILD 模块 #1", details: "每个学员根据自己的蓝图做第一个核心模块。餐饮做 POS、沙龙做预约、贸易做报价工具。Assistants 按区域协助。" },
      { time: "12:00-12:15", activity: "数据永久保存", details: "学员叫 Claude 给模块加 Supabase ； 跟 Day 1 同一个老板语言 prompt。他们懂流程了。" },
      { time: "12:15-12:30", activity: "部署模块 #1", details: "Push → 部署。第一个模块上线。\"举手 ； 模块 1 部署好的有谁？\"庆祝。" },
    ],
    slideDeck: [
      {
        kind: "title",
        emoji: "🔨",
        title: "模块 #1",
        subtitle: "你自己的系统的主页面",
        notes: [
          "第一个 personalised session ； 35-40 人做不同的东西，会感觉乱。正常。",
          "简报 Assistants：帮他们写更好的 prompt，不要代解决问题。",
        ],
      },
      {
        kind: "title",
        title: "用 prompt 包 ； 不要从零开始",
        subtitle: "为你的行业准备的现成食谱。一步一步贴。",
        notes: [
          "Prompt 包是 SEQUENCES，不是独立 prompt。第 1 步、第 2 步、第 3 步。",
          "\"这些是你的捷径。不要从零开始。\"现在通过 WhatsApp 分享。",
        ],
      },
      {
        kind: "bullets",
        title: "选你的模块",
        bullets: [
          "餐饮 → POS",
          "服务业 → 预约",
          "贸易 → 报价",
          "制造 → 工单追踪",
          "其他 → 客户 dashboard",
        ],
        notes: [
          "\"卡在 WHAT 做的，打开你的蓝图工作表 ； 你的第一个模块就是你 #1 痛点。\"",
          "客户 dashboard 是决定不了的人的后备。推他们快点选。",
        ],
      },
      {
        kind: "raw",
        title: "进度追踪",
        html: `<div style="display:flex;align-items:stretch;justify-content:center;gap:16px;width:100%;margin-top:32px">
          <div style="background:#1f2937;border:2px solid #374151;border-radius:20px;flex:1;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:18px">
            <div style="font-size:22px;font-weight:700;color:#9ca3af;letter-spacing:0.02em">模块 1</div>
            <div style="width:56px;height:56px;border:3px solid #4b5563;border-radius:50%"></div>
          </div>
          <div style="background:#1f2937;border:2px solid #374151;border-radius:20px;flex:1;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:18px">
            <div style="font-size:22px;font-weight:700;color:#9ca3af;letter-spacing:0.02em">模块 2</div>
            <div style="width:56px;height:56px;border:3px solid #4b5563;border-radius:50%"></div>
          </div>
          <div style="background:#1f2937;border:2px solid #374151;border-radius:20px;flex:1;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:18px">
            <div style="font-size:22px;font-weight:700;color:#9ca3af;letter-spacing:0.02em">模块 3</div>
            <div style="width:56px;height:56px;border:3px solid #4b5563;border-radius:50%"></div>
          </div>
        </div>`,
        notes: [
          "这张 slide 留在投影仪上，他们 build 的时候看得到。视觉上的责任感。",
          "Session 结束翻到 \"3 个模块都 LIVE\" slide 做庆祝时刻。",
        ],
      },
      {
        kind: "prompt",
        label: "Prompt pack ； step 1: build the UI",
        code: "Use the Design skill.\n\nBuild me a [POS | Booking | Quotation] page for a [industry] business.\n\nUse Supabase so my data stays permanent. Pre-fill with 3 sample [products | services | items].\n\nSame feel as yesterday ； fast, clean, works great on phones too.",
        notes: [
          "Students PASTE this, then customize the bracket parts. Don't let them retype from scratch.",
          "Common mistake: forgetting to replace ALL bracket placeholders. Remind them.",
        ],
      },
      {
        kind: "prompt",
        label: "Prompt 包 ； 第 1 步：做 UI（中文版）",
        code: "用 Design skill。\n\n帮我做一个 [POS | Booking | Quotation] 页面，给 [industry] 生意用。\n\n用 Supabase 让我的数据变永久。预填 3 个样本 [products | services | items]。\n\n跟昨天一样的感觉 ； 快、干净、手机上也好用。",
        notes: [
          "学员 PASTE 这个，然后自定义方括号部分。不要让他们从零重打。",
          "常见错误：忘记替换 ALL 方括号占位符。提醒他们。",
        ],
      },
      {
        kind: "bullets",
        title: "卡住了",
        bullets: [
          "不要自己打 ； 用 prompt 包",
          "不知道要做什么？打开你的计划工作表",
          "有错误？贴进 Claude，说 \"fix this\"",
          "落后太多？复制模版起手项目（链接在 WhatsApp)",
        ],
        notes: [
          "30 分钟节点（11:15)，举手检查：\"屏幕上有东西的？\"没有的 2 分钟内 Assistant 上门。",
          "Prompt 包对某人不行，转向 \"通用\" 模块（客户 dashboard）。做出 SOMETHING 比做到完美重要。",
          "11:15 把 3-4 个模版起手项目放 WhatsApp 作为后备。",
        ],
      },
      {
        kind: "title",
        title: "让数据永久保存",
        subtitle: "跟 Day 1 同一个 prompt ； 叫 Claude 加 Supabase。最多 15 分钟。",
        notes: [
          "他们昨天做过 ； 应该很快。",
          "Assistants 盯 Day 1 没把 Supabase 跑通的人。",
          "提醒他们：\"Make my app's data permanent using Supabase. Handle the setup.\" 这就是老板语言 prompt。",
        ],
      },
      {
        kind: "title",
        emoji: "🚀",
        title: "部署 → 庆祝",
        subtitle: "举手 ； 模块 1 上线的有谁？",
        notes: [
          "大声庆祝。第一个模块上线 = 信心大增。",
          "走动，脑子里记下最好的 5-6 个 build ； 这些是 showcase 候选。",
        ],
      },
      {
        kind: "raw",
        title: "进度追踪",
        html: `<div style="display:flex;align-items:stretch;justify-content:center;gap:16px;width:100%;margin-top:32px">
          <div style="background:linear-gradient(135deg,#065f46,#059669);border-radius:20px;flex:1;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:18px;box-shadow:0 10px 40px -10px rgba(5,150,105,0.4)">
            <div style="font-size:22px;font-weight:800;color:white;letter-spacing:0.02em">模块 1</div>
            <div style="width:56px;height:56px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:900;color:#059669;line-height:1">✓</div>
          </div>
          <div style="background:#1f2937;border:2px solid #374151;border-radius:20px;flex:1;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:18px">
            <div style="font-size:22px;font-weight:700;color:#9ca3af;letter-spacing:0.02em">模块 2</div>
            <div style="width:56px;height:56px;border:3px solid #4b5563;border-radius:50%"></div>
          </div>
          <div style="background:#1f2937;border:2px solid #374151;border-radius:20px;flex:1;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:18px">
            <div style="font-size:22px;font-weight:700;color:#9ca3af;letter-spacing:0.02em">模块 3</div>
            <div style="width:56px;height:56px;border:3px solid #4b5563;border-radius:50%"></div>
          </div>
        </div>`,
        notes: [
          "一个完成，还剩两个。午餐前的快速能量时刻。鼓励邻座互助。",
        ],
      },
    ],
  },
  {
    id: 12,
    day: 2,
    title: "午餐",
    startTime: "12:30",
    endTime: "13:30",
    duration: "60 min",
    type: "lunch",
    schedule: [],
  },
  {
    id: 13,
    day: 2,
    title: "模块 #2 + 整合",
    subtitle: "SESSION 10",
    startTime: "13:30",
    endTime: "15:15",
    duration: "105 min",
    type: "session",
    schedule: [
      { time: "1:30-1:45", activity: "一站式系统", details: "\"一个模块有用。模块互通才强大。一笔销售自动更新库存、库存低自动警报 ； 那就是一站式系统。\"" },
      { time: "1:45-2:45", activity: "BUILD 模块 #2", details: "每个学员做 SECOND 模块。必须从模块 1 的表 READ 或 WRITE 数据。用 Claude 设计连接。" },
      { time: "2:45-3:00", activity: "整合测试", details: "测试数据流：模块 1 动作 → 模块 2 看到。\"在 POS 加一笔销售。打开你的库存。有更新吗？\"" },
      { time: "3:00-3:15", activity: "部署", details: "Push + 部署。两个模块上线并互通。进度追踪现在显示 3 个里 2 个绿色，模块 3(dashboard）待完成。" },
    ],
    slideDeck: [
      {
        kind: "title",
        emoji: "🔗",
        title: "模块 #2",
        subtitle: "一个模块有用。模块互通才强大。",
        notes: [
          "\"整合是整个周末最难的事。做不到完美也 OK。\"",
          "难度预期放低，价值预期放高。能用 > 完美。",
        ],
      },
      {
        kind: "bullets",
        title: "一站式系统",
        bullets: [
          "POS 一笔销售 → 自动扣库存",
          "库存低 → 自动警报",
          "客户预约 → 自动进 CRM",
          "所有东西互相沟通。这就是 SYSTEM。",
        ],
        notes: [
          "\"一笔销售自动更新库存、库存低自动警报 ； 那就是一站式系统。\"",
          "用场内学员的行业例子。",
        ],
      },
      {
        kind: "bullets",
        title: "模块怎么连接",
        bullets: [
          "共用 Supabase 表 = 所有数据一个地方",
          "从模块 1 READ → 在 dashboard 显示数据",
          "向模块 1 WRITE → 扣库存、改状态",
          "高阶：实时更新、自动触发器",
        ],
        notes: [
          "大多数学员先做 READ 就好。WRITE 是拉伸目标。",
          "高阶学员：提一下实时订阅和自动触发器当 bonus。",
        ],
      },
      {
        kind: "prompt",
        label: "Integration prompt ； paste and fill brackets",
        code: "My app has two sections saving data in Supabase.\n\nWhen I add something new in [section 1 ； e.g. a new order], I want [section 2 ； e.g. my dashboard] to automatically update [what ； e.g. today's revenue].\n\nMake these two talk to each other.",
        notes: [
          "Common mistake: students don't swap the bracket parts for their own section names and fields.",
          "At the 45-min mark share a simplified fallback on WhatsApp if needed: \"Build Module 2 as a dashboard that READS from Module 1.\"",
        ],
      },
      {
        kind: "prompt",
        label: "整合 prompt ； 贴并填方括号（中文版）",
        code: "我的 app 有两个区块，数据都存在 Supabase。\n\n当我在 [section 1 ； e.g. a new order] 新增东西的时候，我要 [section 2 ； e.g. my dashboard] 自动更新 [what ； e.g. today's revenue]。\n\n让这两个互通。",
        notes: [
          "常见错误：学员不把方括号部分换成自己的区块名字和字段。",
          "45 分钟节点需要就在 WhatsApp 分享简化后备：\"Build Module 2 as a dashboard that READS from Module 1.\"",
        ],
      },
      {
        kind: "bullets",
        title: "Testing Checklist",
        bullets: [
          "在模块 1 加一条记录",
          "打开模块 2 → 出现了吗？",
          "在模块 1 改一个东西 → 模块 2 有更新吗？",
          "还是坏的？把错误贴进 Claude，说 \"fix this\"",
        ],
        notes: [
          "\"测试数据流：模块 1 动作 → 模块 2 看到结果。有更新吗？\"",
          "现在走动。预期举手比其他任何 session 都多。",
        ],
      },
      {
        kind: "title",
        title: "能用 > 完美",
        subtitle: "这是最难的部分。能用就发布。",
        notes: [
          "让挣扎常态化。\"一个读你数据的 dashboard 一样强大。我们追求能用，不是完美。\"",
        ],
      },
      {
        kind: "raw",
        title: "进度追踪",
        html: `<div style="display:flex;align-items:stretch;justify-content:center;gap:16px;width:100%;margin-top:32px">
          <div style="background:linear-gradient(135deg,#065f46,#059669);border-radius:20px;flex:1;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:18px;box-shadow:0 10px 40px -10px rgba(5,150,105,0.4)">
            <div style="font-size:22px;font-weight:800;color:white;letter-spacing:0.02em">模块 1</div>
            <div style="width:56px;height:56px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:900;color:#059669;line-height:1">✓</div>
          </div>
          <div style="background:linear-gradient(135deg,#065f46,#059669);border-radius:20px;flex:1;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:18px;box-shadow:0 10px 40px -10px rgba(5,150,105,0.4)">
            <div style="font-size:22px;font-weight:800;color:white;letter-spacing:0.02em">模块 2</div>
            <div style="width:56px;height:56px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:900;color:#059669;line-height:1">✓</div>
          </div>
          <div style="background:#1f2937;border:2px solid #374151;border-radius:20px;flex:1;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:18px">
            <div style="font-size:22px;font-weight:700;color:#9ca3af;letter-spacing:0.02em">模块 3</div>
            <div style="width:56px;height:56px;border:3px solid #4b5563;border-radius:50%"></div>
            <div style="font-size:13px;color:#6b7280;text-align:center;line-height:1.3">Dashboard<br>； 老板视角</div>
          </div>
        </div>`,
        notes: [
          "三分之二完成。能量大时刻 ； 他们快做完一个完整系统。",
          "现在 push → 部署。休息前两个模块都上线并互通。",
        ],
      },
    ],
  },
  {
    id: 14,
    day: 2,
    title: "休息",
    startTime: "15:15",
    endTime: "15:30",
    duration: "15 min",
    type: "break",
    schedule: [],
  },
  {
    id: 15,
    day: 2,
    title: "Dashboard + 润色（系统 #3)",
    subtitle: "SESSION 11",
    startTime: "15:30",
    endTime: "16:45",
    duration: "75 min",
    type: "session",
    schedule: [
      { time: "3:30-3:45", activity: "老板 dashboard", details: "\"每个老板都想一屏看全部。KPI、图表、最近活动、警报。\"展示 dashboard 例子。" },
      { time: "3:45-4:25", activity: "BUILD dashboard（模块 #3)", details: "Dashboard 从模块 1 + 2 拉数据。摘要统计、图表、最近活动、警报。用 dashboard prompt 模版。" },
      { time: "4:25-4:35", activity: "响应式设计 + 手机 app 预告", details: "\"Make this fully responsive and mobile-friendly.\"测不同尺寸。简短预告 PWA/Capacitor。" },
      { time: "4:35-4:45", activity: "最终部署", details: "Push → 部署。3 个模块都上线并互通。\"你的一站式生意系统 LIVE 了。\"进度追踪全绿。" },
    ],
    slideDeck: [
      {
        kind: "title",
        emoji: "📊",
        title: "老板 Dashboard",
        subtitle: "一屏看全部。数字。图表。警报。",
        notes: [
          "\"每个老板都想一屏看全部。\"先展示 dashboard 例子。",
          "就算模块 2 整合不完美，dashboard 视觉上仍然惊艳。重点让它好看。",
        ],
      },
      {
        kind: "bullets",
        title: "每个老板想要什么",
        bullets: [
          "今天的营收 ； 一个大数字",
          "显示走势的图表",
          "最近活动 ； 最后 10 件发生的事",
          "警报 ； 需要你注意的东西",
        ],
        notes: [
          "\"这是你会给团队、给伙伴、给投资人看的。\"",
          "营收数字用大字体 = 秒级 wow 效果。强调这个。",
        ],
      },
      {
        kind: "bullets",
        title: "Dashboard 组件",
        bullets: [
          "4 个数字卡片（顶部）",
          "1 个主图表（中间）",
          "最近活动清单（左边）",
          "警报框（右边）",
        ],
        notes: [
          "Dashboard prompt 包有 3 个现成贴的 prompt:(1) 摘要统计卡片，(2) recharts 柱状图，(3) 最近活动清单。",
          "学员按自己的生意自定义方括号部分。",
        ],
      },
      {
        kind: "prompt",
        label: "Dashboard prompt ； paste this, don't retype",
        code: "Use the Design skill.\n\nBuild me a dashboard page that pulls from Module 1 and Module 2.\n\nShow:\n- 4 KPI cards: revenue today, orders today, [metric 3], [metric 4]\n- A bar chart of the last 7 days\n- A recent activity list (10 items)\n- An alerts panel for anything needing attention",
        notes: [
          "Swap [metric 3] and [metric 4] for their industry's metrics. Don't let them paste brackets untouched.",
          "Students still stuck on Module 1/2 ； Assistants help them build a dashboard with SAMPLE data (hardcoded). A good-looking dashboard with fake data > a broken connection during showcase.",
        ],
      },
      {
        kind: "prompt",
        label: "Dashboard prompt ； 贴这个，不要重打（中文版）",
        code: "用 Design skill。\n\n帮我做一个 dashboard 页面，从模块 1 跟模块 2 拉数据。\n\n显示：\n- 4 个 KPI 卡片：今天营收、今天订单、[metric 3]、[metric 4]\n- 过去 7 天的柱状图\n- 最近活动清单（10 项）\n- 警报面板，显示需要注意的东西",
        notes: [
          "把 [metric 3] 和 [metric 4] 换成他们行业的指标。不要让他们把方括号原封不动贴上。",
          "还卡在模块 1/2 的学员，Assistants 帮他们做一个用 SAMPLE 数据（硬编码）的 dashboard。好看的 dashboard 配假数据 > showcase 时坏掉的连接。",
        ],
      },
      {
        kind: "prompt",
        label: "One prompt to make it chio",
        code: "Make this professional and clean with a dark blue theme. Rounded corners, proper spacing, light shadows. Use your best design instincts.",
        notes: [
          "\"Ask Claude: one prompt swaps the whole look.\" Demo before/after if time allows.",
          "This is the crowd-pleaser moment ； ugly prototype turns into a polished system in seconds.",
        ],
      },
      {
        kind: "prompt",
        label: "一个 prompt 让它变 chio（中文版）",
        code: "让这个变得专业又干净，用深蓝色 theme。圆角、好好排间距、淡阴影。用你最好的设计直觉。",
        notes: [
          "\"叫 Claude：一个 prompt 就换了外观。\"时间允许就 demo before/after。",
          "这是爽到全场的时刻 ； 丑原型秒变精致系统。",
        ],
      },
      {
        kind: "title",
        title: "从网页到手机",
        subtitle: "\"Make this work on phones too.\" 一个 prompt 搞定。",
        notes: [
          "每个人测不同屏幕尺寸。简短预告 PWA/Capacitor ； 为 workshop 之后的学习埋种子。",
          "响应式时刻：他们看到系统自适应。会有惊叹声。",
        ],
      },
      {
        kind: "prompt",
        label: "💡 Pro tip - phone check",
        code: "Open my app on a phone-sized screen and tell me if anything looks broken, is too small to tap, or overflows off screen. Fix any issues.",
        notes: [
          "Their customers and staff will use it on phones ； this catches issues before they do",
          "Quick win: usually just needs font size and button size tweaks",
        ],
      },
      {
        kind: "prompt",
        label: "💡 Pro tip - 手机检查（中文版）",
        code: "用手机尺寸的屏幕打开我的 app，告诉我有没有看起来坏掉的、按键太小点不到的、或者溢出屏幕的。有问题就修好。",
        notes: [
          "他们的客户和员工会在手机上用 ； 这会在他们之前抓出问题",
          "快赢：通常只需要调字体和按钮大小",
        ],
      },
      {
        kind: "raw",
        title: "🎉 3 个模块全 LIVE",
        html: `<div style="display:flex;align-items:stretch;justify-content:center;gap:16px;width:100%;margin-top:32px">
          <div style="background:linear-gradient(135deg,#065f46,#059669);border-radius:20px;flex:1;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:18px;box-shadow:0 10px 40px -10px rgba(5,150,105,0.4)">
            <div style="font-size:22px;font-weight:800;color:white;letter-spacing:0.02em">模块 1</div>
            <div style="width:56px;height:56px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:900;color:#059669;line-height:1">✓</div>
          </div>
          <div style="background:linear-gradient(135deg,#065f46,#059669);border-radius:20px;flex:1;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:18px;box-shadow:0 10px 40px -10px rgba(5,150,105,0.4)">
            <div style="font-size:22px;font-weight:800;color:white;letter-spacing:0.02em">模块 2</div>
            <div style="width:56px;height:56px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:900;color:#059669;line-height:1">✓</div>
          </div>
          <div style="background:linear-gradient(135deg,#065f46,#059669);border-radius:20px;flex:1;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:18px;box-shadow:0 10px 40px -10px rgba(5,150,105,0.4)">
            <div style="font-size:22px;font-weight:800;color:white;letter-spacing:0.02em">模块 3</div>
            <div style="width:56px;height:56px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:900;color:#059669;line-height:1">✓</div>
          </div>
        </div>`,
        notes: [
          "4:20（结束前 5 分钟），最后扫一遍：\"有谁需要帮忙让 ANYTHING 上屏？\"最后救援机会。",
          "4:45 前每个人必须有东西部署上去。Assistants 帮还在追的人。",
          "让 3 个绿框留在屏幕上 ； 纯粹的视觉多巴胺",
        ],
      },
      {
        kind: "title",
        title: "你的完整生意系统已上线",
        notes: [
          "让这一刻沉淀。掌声。他们一个周末做出完整的生意系统。",
          "过渡：\"来看看最好的那些在大屏幕上。\"",
        ],
      },
    ],
  },
  {
    id: 16,
    day: 2,
    title: "Showcase + 影片见证",
    subtitle: "SESSION 12",
    startTime: "16:45",
    endTime: "17:30",
    duration: "45 min",
    type: "session",
    schedule: [
      { time: "4:45-4:50", activity: "Setup", details: "Jay 介绍 showcase。\"我挑了 5 个最惊艳的系统来分享。\"录影机/三脚架架好。" },
      { time: "4:50-5:15", activity: "前 5-6 位学员 demo", details: "每位学员：2-3 分钟。做了什么、解决什么问题、现场走一遍。Jay 加评论。全场掌声。" },
      { time: "5:15-5:25", activity: "影片见证", details: "录快速见证。\"30 秒告诉我：这个周末你做了什么、感觉如何？\"" },
      { time: "5:25-5:30", activity: "全体致敬", details: "\"看看 40 个非技术老板 2 天做出什么。\"最后合影：每个人展示自己的 app。" },
    ],
    slideDeck: [
      {
        kind: "title",
        emoji: "🎤",
        title: "Showcase",
        subtitle: "5 个系统 - 每个 2 分钟",
        notes: [
          "录影机/三脚架已架好。这张 slide 前把第一位演讲者的屏幕投到大屏幕。",
          "Showcase 学员挑 DIVERSE 行业。不要挑 5 个餐饮。",
        ],
      },
      {
        kind: "bullets",
        title: "流程",
        bullets: [
          "每人 2 分钟",
          "你做了什么",
          "解决什么问题",
          "现场展示",
        ],
        notes: [
          "控紧 ； 每个 2-3 分钟。Jay 每个 demo 后加评论。",
          "Demo 也录下来（屏幕录或手机对投影仪）。营销用的黄金内容。",
        ],
      },
      {
        kind: "title",
        emoji: "📸",
        title: "We built this",
        subtitle: "40 个生意老板。2 天。每人 3 个上线系统。",
        notes: [
          "\"看看 40 个非技术老板 2 天做出什么。\"",
          "最后合影：每个人在屏幕上展示自己的 app。让大家站起来。",
        ],
      },
    ],
  },
  {
    id: 17,
    day: 2,
    title: "下一步 & 结尾",
    subtitle: "SESSION 13",
    startTime: "17:30",
    endTime: "18:00",
    duration: "30 min",
    type: "session",
    schedule: [
      { time: "5:30-5:40", activity: "你的工具包", details: "SME 自动化蓝图、100+ AI prompt、系统模版（CRM、HR、ERP）、带 10+ 教学影片的知识库、1 年免费重参加。\"这些永远是你的。\"" },
      { time: "5:40-5:50", activity: "接下来", details: "(1) 知识库，(2) 更多模块配 prompt 库，(3) 90 天社群，(4) 1 年免费重参加。\"Ayen 2 周内从第一个客户赚了 RM 3,000。\"" },
      { time: "5:50-5:55", activity: "反馈表单", details: "QR code 在屏幕上。\"2 分钟，麻烦填一下。\"" },
      { time: "5:55-6:00", activity: "结尾", details: "\"2 天前你会请人做这个。今晚你有 3 个上线系统。你自己做的。去换一种方式经营你的生意吧。\"掌声。最后合影。" },
    ],
    slideDeck: [
      {
        kind: "title",
        emoji: "🎁",
        title: "你的工具包",
        subtitle: "这些永远是你的。",
        notes: [
          "高能量 ； 这是最后的印象。让全场继续沸腾。",
          "\"这些永远是你的\" ； 让它落地。今天之后他们没失去访问权限。",
        ],
      },
      {
        kind: "bullets",
        title: "你带走的东西",
        bullets: [
          "SME 自动化蓝图 ； 一页计划",
          "100+ 现成 AI prompt",
          "系统模版（CRM、HR、ERP)",
          "教学影片 ； 10+ 支",
          "1 年免费重参加",
        ],
        notes: [
          "一个一个点过去。这是价值堆叠 ； 他们要 FEEL 到这份分量。",
          "1 年免费重参加是亮点。在这里停一下。",
        ],
      },
      {
        kind: "bullets",
        title: "接下来",
        bullets: [
          "教学影片 → 按自己节奏学更多",
          "Prompt 库 → 更多页面、更多行业",
          "90 天社群 → 跟另外 40 个人一起 build",
          "1 年重参加 → 随时回来",
        ],
        notes: [
          "社群让他们有责任感。\"90 天。跟另外 40 个人一起 ship。\"",
          "接下来过渡到成功故事 ； 证明 workshop 后行动会有回报。",
        ],
      },
      {
        kind: "title",
        emoji: "📝",
        title: "反馈表单",
        subtitle: "扫 QR。2 分钟。诚实回答。",
        notes: [
          "这一刻前 QR code 用 2 部不同手机测过。屏幕上大、后排看得见。",
          "给他们 2 分钟填。不要赶 ； 这些数据对下一届很宝贵。",
        ],
      },
      {
        kind: "title",
        title: "2 天前你会请人做这个",
        subtitle: "今晚你有 3 个上线系统。你自己做的。",
        notes: [
          "慢慢讲。这是情感高潮。让对比沉淀。",
          "老板思维 ； \"请人\" 是他们 2 天前用的词。现在他们 ARE 那个 builder。",
          "\"2 天前你会请人做这个。今晚你有 3 个上线系统。你自己做的。去换一种方式经营你的生意吧。\"",
        ],
      },
      {
        kind: "title",
        emoji: "🙏",
        title: "谢谢",
        subtitle: "去建造未来吧。",
        notes: [
          "掌声。最后合影。高能量结尾 ； 这是最后的印象。",
          "现在在 WhatsApp 分享社群链接和知识库登录凭据。",
        ],
      },
    ],
  },
];
