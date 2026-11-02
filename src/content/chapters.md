---
# 示意版首页的五张卡片，按这里的顺序排列（菜单顺序也跟着这里）
# label：卡片标题；text：标题下的一句话（和标题一样时不重复显示）
# ratio：卡片宽高比（宽 ÷ 高），高度五张一致、宽度按比例微调，不写默认 0.8
# figure：卡片右上角的大数字；note：数字下面的小字说明；不写 figure 就不显示数字
# cover：卡片右侧的照片；还没有图时写 coverFile，网站上显示占位框
# parts：点开后用到的项目（ref 对应项目内容，不要改）
items:
  - id: cidi
    label: 此地
    text: 独立设计城市记忆产品 · 从0到1
    figure: "96%"
    note: AI 问答准确率
    card: ../assets/cidi/poster.jpg
    parts:
      - ref: cidi
        name: 此地 · 城市记忆共创产品
        figure: "96%"
        note: RAG 史料问答准确率（50 题人工评测）
  - id: analysis
    label: 洞察与分析项目
    text: 洞察与分析项目
    figure: "51% → 93%"
    note: 重建方法后的情感判断准确率
    cover: ../assets/projects/game-cover.png
    parts:
      - ref: game-reviews
        name: 两款武侠游戏的玩家口碑对比
        figure: "19,811"
        note: 条玩家评论 · 情感判断准确率 93%
      - ref: olist
        name: 电商物流与满意度分析
        figure: "6.7×"
        note: 延误订单差评率是准时订单的 6.7 倍
      - ref: watsons
        name: 屈臣氏用户流失诊断
        figure: "51%"
        note: 流失首因：产品或价格不如线上
  - id: venture
    label: 运营与策划
    text: 运营与策划
    figure: "2,000+"
    note: 拼单累计服务用户
    cover: ../assets/projects/sams-delivery.jpg
    parts:
      - ref: sams
        name: 山姆拼单
        figure: "2,000+"
        note: 校园拼单服务用户 · 复购率 78%
      - ref: exhibition
        name: 「反方向的钟」展览
        figure: "1,500+"
        note: 展览参观者 · 带领 14 人团队
  - id: intern
    label: 实习经历
    text: 实习经历
    figure: "1,800"
    note: 条大模型训练数据标注与质检
    coverFile: 实习经历卡片图（待补）
    parts:
      - ref: zhipu
        name: 智谱 AI
        figure: "1,800"
        note: 条 SFT / RLHF 数据标注与质检
      - ref: jiuqian
        name: 久谦咨询
        figure: "70+"
        note: 份中英文专家会议纪要
      - ref: grant-thornton
        name: 致同会计师事务所
        figure: "20+"
        note: 份 IPO 审计与年审底稿
---
