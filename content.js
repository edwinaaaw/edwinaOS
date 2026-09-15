(() => {
function approved(value) {
  return { value, status: "approved" };
}

function draft(value) {
  return { value, status: "draft" };
}

const COPY = {
  "app.title": approved("EDWINA OS"),
  "boot.title": approved("EDWINA OS"),
  "boot.loading": approved("正在读取个人档案"),
  "boot.ready": approved("档案已就绪"),
  "desktop.start": approved("Start"),
  "desktop.mail": approved("MAIL"),
  "desktop.beforeAi": approved("BEFORE_AI"),
  "desktop.aiLab": approved("AI_LAB"),
  "desktop.observations": approved("OBSERVATIONS"),
  "desktop.ready": approved("当前任务：打开 BEFORE_AI"),
  "desktop.beforeAiOpen": approved("当前任务：调查 2026 年以前的 EDWINA"),
  "desktop.locked": approved("完成 3 条线索后开放"),
  "desktop.observationsLocked": approved("观察记录将在后续章节开放"),
  "desktop.guide": approved("2026年之前的资料已经整理在这边。"),
  "guide.mailIntro": approved("你有一封新邮件。"),
  "window.memoryFiles": approved("MEMORY_FILES"),
  "window.close": approved("关闭窗口"),
  "window.minimize": draft("最小化窗口"),
  "window.maximize": draft("最大化窗口"),
  "start.beforeAi": approved("打开 BEFORE_AI"),
  "start.aiLab": approved("打开 AI_LAB"),
  "start.quick": approved("快速浏览"),
  "mail.title": approved("EDWINA MAIL / 1 NEW"),
  "mail.meta": approved("FROM: archive@edwina.os  /  SUBJECT: ACCESS APPROVED"),
  "mail.heading": approved("hello world"),
  "mail.body": approved("欢迎进入Edwina的个人档案。你可以从 BEFORE_AI 开始，也可以直接使用快速浏览。"),
  "mail.contact": approved("联系 Edwina"),
  "mail.email": approved("guoyinfan@126.com"),
  "mail.phone": approved("17859751023"),
  "mail.openBefore": approved("打开 BEFORE_AI"),
  "nav.back": draft("返回线索墙"),
  "nav.skip": approved("跳到线索墙"),
  "nav.quickBrowse": approved("快速浏览"),
  "nav.reset": approved("重新调查"),
  "nav.close": draft("关闭"),
  "reset.prompt": approved("确定清除本机的线索查看进度吗？"),
  "wall.kicker": approved("BEFORE 2026\u0020"),
  "wall.title": approved("在AI出现之前Edwina在忙什么"),
  "wall.intro": approved("这是一面关于Edwina的线索墙。你发现了五件物证。"),
  "wall.progress": approved("调查进度"),
  "wall.instruction": approved("查看任意 3 条线索，开放 AI_NATIVE。查看全部 5 条，解锁完整结论。"),
  "wall.aiLocked": approved("AI_NATIVE 尚未开放"),
  "wall.aiUnlocked": approved("进入 AI_NATIVE"),
  "wall.conclusionLocked": approved("完整结论暂未解锁"),
  "wall.conclusionUnlocked": approved("打开完整结论"),
  "wall.evidence": draft("原始证据"),
  "wall.art": draft("艺术档案"),
  "wall.viewed": approved("已查看"),
  "wall.unseen": approved("待调查"),
  "guide.start": approved("every step counts.\u0020"),
  "guide.moving": approved("正在接近物证。"),
  "guide.viewed": approved("这条线索已经连上了。你可以继续查看细节，或寻找下一件物证。"),
  "guide.three": approved("恭喜你已经收集到三条线索。AI_NATIVE 入口开放了。"),
  "guide.complete": approved("五条线索全部连接。完整档案文件已开放权限。"),
  "quick.title": approved("快速浏览"),
  "quick.intro": approved("跳过调查路线，直接查看五个案件调查结果和下一章节。本入口不会改变调查进度。"),
  "quick.ai": approved("查看 AI_NATIVE"),
  "case.tabArt": approved("艺术档案"),
  "case.tabEvidence": approved("查看原始证据"),
  "case.decision": approved("当时的我在想什么"),
  "case.result": approved("结果与复盘"),
  "case.pending": approved("素材待补充"),
  "case.pendingBody": approved("这里不会用生成内容代替真实项目。收到截图后，再完成筛选、裁切、脱敏和策展。"),
  "case.evidencePrivacy": draft("公开前将默认遮挡联系方式、内部群聊、报价、预算与未公开数据。"),
  "media.toggleOriginal": approved("切换像素视图与原图"),
  "media.pixelView": approved("像素视图"),
  "media.originalView": approved("原图视图"),
  "media.hint": draft("悬停、聚焦或点击查看原图"),
  "taiwan.node": approved("台湾支线"),
  "taiwan.title": approved("把交换生活变成一档每周双更的美食栏目"),
  "taiwan.summary": approved("在台湾交换时，她作为微视签约创作者，独立完成选店、脚本、拍摄、出镜、剪辑与发布，这一路的鲜香麻辣只有自己和8w粉丝知道。"),
  "taiwan.decision": approved("好吃好吃刚好剪视频消化一下"),
  "taiwan.result": approved("账号做到约 8.4 万粉丝、6.7 万获赞。更重要的是，她第一次完整拥有了一个从寻找选题到面对观众的内容系统。"),
  "taiwan.fact1": approved("每周两更"),
  "taiwan.fact2": approved("约 8.4 万粉丝"),
  "taiwan.fact3": approved("6.7 万获赞"),
  "taiwan.evidence1": approved("账号主页截图"),
  "taiwan.evidence2": approved("代表视频截图"),
  "taiwan.evidence3": approved(""),
  "taiwan.media.profile.alt": approved("台湾美食账号 UP 的主页截图"),
  "taiwan.media.profile.caption": approved("账号主页：约 8.4 万粉丝、6.7 万获赞"),
  "taiwan.media.feedA.alt": approved("台湾美食账号第一组作品截图"),
  "taiwan.media.feedA.caption": approved("持续更新的在地早餐、小吃与餐厅内容"),
  "taiwan.media.feedB.alt": approved("台湾美食账号第二组作品截图"),
  "taiwan.media.feedB.caption": approved("多条作品获得数万播放，内容覆盖台北与台湾各地饮食"),
  "ondine.node": approved("内容批量制作"),
  "ondine.title": approved("先找使用场景，再找能够代表它的人"),
  "ondine.summary": approved("在小奥汀，她把达人seeding拆成色彩型、功效型、IP 与送礼场景，不只按美妆垂类找人。"),
  "ondine.decision": approved("达人要是能听我的我都不敢想这数据会有多好"),
  "ondine.result": approved("奶酪腮红与猫和老鼠联名依靠好玩和送礼场景获得更好的销售反馈。卧蚕笔则通过妆教建立功效理解。"),
  "ondine.evidence1": approved("等待联名内容截图"),
  "ondine.evidence2": approved("等待达人合作截图"),
  "ondine.evidence3": approved("等待公开传播结果"),
  "director.node": approved("导演放映室"),
  "director.title": approved("在生活方式里找到wanna be，在实测里找到购买决策力"),
  "director.summary": approved("广告片导演阶段以生活方式项目为主，功效型项目则通过百人实测建立表达依据。"),
  "director.decision": approved("这才是真正的艺术"),
  "director.result": approved("这段经历让她熟悉品牌叙事、现场协作，以及创意和可信度之间的平衡。"),
  "director.evidence1": approved("等待生活方式成片截图"),
  "director.evidence2": approved("等待分镜或现场素材"),
  "director.evidence3": approved("等待百人实测公开素材"),
  "keycaps.node": approved("键帽工坊"),
  "keycaps.title": approved("让投稿不只停留在屏幕里"),
  "keycaps.summary": approved("AI 键帽活动把用户创作、社区讨论和实体化机会连成一条参与路径。"),
  "keycaps.decision": approved("重点圈层击破起来很快"),
  "keycaps.result": approved("活动累计约 2.4 万个作品，并推动 390 个商品进入实体化路径。创作行为因为社区反馈和实体化想象而更容易持续。"),
  "keycaps.fact1": approved("约 2.4 万个作品"),
  "keycaps.fact2": approved("390 个商品"),
  "keycaps.fact3": approved("创作到实体"),
  "keycaps.evidence1": approved("等待活动页截图"),
  "keycaps.evidence2": approved("等待用户投稿截图"),
  "keycaps.evidence3": approved("等待实体键帽或讨论截图"),
  "keycaps.media.summary.alt": approved("键帽造物挑战活动结果截图"),
  "keycaps.media.summary.caption": approved("活动结果：约 2.4 万个作品，390 个商品"),
  "keycaps.media.flow.alt": approved("键帽造物挑战完整活动页面截图"),
  "keycaps.media.flow.caption": approved("参与路径：设计并发布、获得想要、创意成真"),
  "miaoya.node": approved("未闭合实验"),
  "miaoya.title": approved("一个有人愿意拉朋友来玩，但传播线路没有闭合的实验"),
  "miaoya.summary": approved("妙呀人格测试验证了拉人参与有效，但视觉结果与文案结果没有形成足够强的社交传播价值。"),
  "miaoya.decision": approved("我可是测试老炮儿（毕业论文写的巴纳姆效应）"),
  "miaoya.result": approved("MVP 证明线下展会和高校任务能带来参与，也暴露了传播缺口。下一次要优先验证结果页是否值得被发出去。"),
  "miaoya.evidence1": approved("等待人格测试页面截图"),
  "miaoya.evidence2": approved("等待线下展会或高校任务素材"),
  "miaoya.evidence3": approved("等待复盘记录"),
  "ai.back": approved("返回项目列表"),
  "ai.network": approved("在此窗口体验，内容需要联网加载。若长时间空白，可返回列表后重新打开。"),
  "ai.source": approved("项目资料"),
  "ai.brainIntro": approved("Brain Starter 是一个在 Codex 中运行的技能。你可以先在这里了解它怎么用，再把自己的真实任务带进 Codex。"),
  "ai.brainStep1": approved("1. 安装技能：从项目仓库获取 Brain Starter，按 README 中的 Install 说明安装到 Codex。"),
  "ai.brainStep2": approved("2. 说出眼前的卡点，例如：“用 Brain Starter 帮我开始写周报，材料很散，我不想动。”"),
  "ai.brainStep3": approved("3. 它会识别阻力、处理能代劳的准备，并给出一个十分钟内可观察到结果的行动。你保留事实核对、判断和最终表达。"),
  "ai.play": approved("在这里体验"),
  "ai.guide": approved("查看使用方法"),
  "ai.repo": approved("查看仓库"),
  "ai.sheownstheworld.title": approved("她主天下"),
  "ai.sheownstheworld.kind": approved("分支剧情游戏"),
  "ai.sheownstheworld.summary": approved("六段人生，每段五轮选择。在不同处境里作出决定，留下遗物，把一种新的可能带进下一段人生。"),
  "ai.brain-starter.title": approved("Brain Starter"),
  "ai.brain-starter.kind": approved("Codex 技能"),
  "ai.brain-starter.summary": approved("知道要做什么，却迟迟开始不了。识别眼前的阻力，让 AI 接手机械准备，帮人完成一次看得见的十分钟开工。"),
  "ai.field-life-lab.title": approved("Field Life Lab"),
  "ai.field-life-lab.kind": approved("3D 创作工具"),
  "ai.field-life-lab.summary": approved("拖动身体，让小怪物长出新的部位。为它挑选颜色、材质、表情和性格，再导出一份属于它的调查档案。"),
  "ai.title": approved("AI_NATIVE"),
  "ai.preview": approved("找到这个特别的场景，然后把它做出来。这里是我的三个 AI Lab 项目。"),
  "ai.locked": approved("再查看 {count} 条线索即可开放。"),
  "conclusion.title": approved("结论文件"),
  "conclusion.body": approved("找到这个特别的场景"),
  "conclusion.note": approved(""),
};

const AI_PROJECTS = [
  {
    "id": "sheownstheworld",
    "copyIds": {
      "title": "ai.sheownstheworld.title",
      "kind": "ai.sheownstheworld.kind",
      "summary": "ai.sheownstheworld.summary"
    },
    "url": "https://edwinaaaw.github.io/she-owns-the-world/",
    "actionId": "ai.play",
    "repoUrl": "https://github.com/edwinaaaw/she-owns-the-world"
  },
  {
    "id": "brain-starter",
    "copyIds": {
      "title": "ai.brain-starter.title",
      "kind": "ai.brain-starter.kind",
      "summary": "ai.brain-starter.summary"
    },
    "url": "https://github.com/edwinaaaw/brain-starter#install",
    "actionId": "ai.guide",
    "repoUrl": "https://github.com/edwinaaaw/brain-starter"
  },
  {
    "id": "field-life-lab",
    "copyIds": {
      "title": "ai.field-life-lab.title",
      "kind": "ai.field-life-lab.kind",
      "summary": "ai.field-life-lab.summary"
    },
    "url": "https://edwinaaaw.github.io/field-life-lab/",
    "actionId": "ai.play",
    "repoUrl": "https://github.com/edwinaaaw/field-life-lab"
  }
];

const CASES = [
  {
    id: "taiwan",
    theme: "life",
    artWorld: "dv-travel-file",
    status: "sample-complete",
    copyIds: {
      node: "taiwan.node",
      title: "taiwan.title",
      summary: "taiwan.summary",
      decision: "taiwan.decision",
      result: "taiwan.result",
      facts: ["taiwan.fact1", "taiwan.fact2", "taiwan.fact3"],
    },
    evidence: ["taiwan.evidence1", "taiwan.evidence2", "taiwan.evidence3"],
    media: [
      {
        originalSrc: "./taiwan-profile-original.png",
        pixelSrc: "./taiwan-profile-pixel.png",
        altId: "taiwan.media.profile.alt",
        captionId: "taiwan.media.profile.caption",
        width: 1290,
        height: 2796,
        orientation: "portrait",
      },
      {
        originalSrc: "./taiwan-feed-a-original.png",
        pixelSrc: "./taiwan-feed-a-pixel.png",
        altId: "taiwan.media.feedA.alt",
        captionId: "taiwan.media.feedA.caption",
        width: 1290,
        height: 2796,
        orientation: "portrait",
      },
      {
        originalSrc: "./taiwan-feed-b-original.png",
        pixelSrc: "./taiwan-feed-b-pixel.png",
        altId: "taiwan.media.feedB.alt",
        captionId: "taiwan.media.feedB.caption",
        width: 1290,
        height: 2796,
        orientation: "portrait",
      },
    ],
  },
  {
    id: "little-ondine",
    theme: "communication",
    artWorld: "color-matching-machine",
    status: "structured-placeholder",
    copyIds: {
      node: "ondine.node",
      title: "ondine.title",
      summary: "ondine.summary",
      decision: "ondine.decision",
      result: "ondine.result",
      facts: [],
    },
    evidence: ["ondine.evidence1", "ondine.evidence2", "ondine.evidence3"],
  },
  {
    id: "director",
    theme: "brand",
    artWorld: "tvc-screening-room",
    status: "structured-placeholder",
    copyIds: {
      node: "director.node",
      title: "director.title",
      summary: "director.summary",
      decision: "director.decision",
      result: "director.result",
      facts: [],
    },
    evidence: ["director.evidence1", "director.evidence2", "director.evidence3"],
  },
  {
    id: "keycaps",
    theme: "participation",
    artWorld: "pixel-keycap-workshop",
    status: "sample-complete",
    copyIds: {
      node: "keycaps.node",
      title: "keycaps.title",
      summary: "keycaps.summary",
      decision: "keycaps.decision",
      result: "keycaps.result",
      facts: ["keycaps.fact1", "keycaps.fact2", "keycaps.fact3"],
    },
    evidence: ["keycaps.evidence1", "keycaps.evidence2", "keycaps.evidence3"],
    media: [
      {
        originalSrc: "./keycaps-summary-original.png",
        pixelSrc: "./keycaps-summary-pixel.png",
        altId: "keycaps.media.summary.alt",
        captionId: "keycaps.media.summary.caption",
        width: 1256,
        height: 626,
        orientation: "landscape",
      },
      {
        originalSrc: "./keycaps-flow-original.png",
        pixelSrc: "./keycaps-flow-pixel.png",
        altId: "keycaps.media.flow.alt",
        captionId: "keycaps.media.flow.caption",
        width: 2940,
        height: 1458,
        orientation: "landscape",
      },
    ],
  },
  {
    id: "miaoya",
    theme: "distribution",
    artWorld: "personality-test-lab",
    status: "structured-placeholder",
    copyIds: {
      node: "miaoya.node",
      title: "miaoya.title",
      summary: "miaoya.summary",
      decision: "miaoya.decision",
      result: "miaoya.result",
      facts: [],
    },
    evidence: ["miaoya.evidence1", "miaoya.evidence2", "miaoya.evidence3"],
  },
];

function getCopy(id) {
  const entry = COPY[id];
  if (!entry) return "";
  return entry.value;
}

function getCopyStatus(id) {
  return COPY[id]?.status ?? "missing";
}

function auditContent() {
  const missingStatus = [];
  const invalidIds = [];
  const forbiddenDashes = [];

  for (const [id, entry] of Object.entries(COPY)) {
    if (!id.includes(".")) invalidIds.push(id);
    if (!entry || !["draft", "approved"].includes(entry.status)) {
      missingStatus.push(id);
    }
    if (/[\u2014\u2013]/u.test(entry?.value ?? "")) forbiddenDashes.push(id);
  }

  return { missingStatus, invalidIds, forbiddenDashes };
}

globalThis.EDWINA_CONTENT = Object.freeze({
  COPY,
  CASES,
  AI_PROJECTS,
  getCopy,
  getCopyStatus,
  auditContent,
});
})();
