---
# 「运营与策划」卡片点开后的页面
# 左侧两张小卡片（short），点击切换右侧项目；第一个默认显示
# 照片：放进 src/assets/ 后填 photo / image；还没有时写 file，网站上显示占位框

tabs:
  - short: 山姆拼单
    keywords: 校内创业 · 社群运营 · 用户分层 · 团队管理
    # 标题右边的小 logo（只保留中间紫色部分）
    logo: ../../assets/sams/logo-mark.png
    # 文字在上，照片集中放在最下面横排
    photosBelow: true
    title: 山姆拼单
    subtitle: 是个芋泥的山姆拼单铺
    period: 2023.09 – 2026.05
    tags: 团队成员 → 负责人
    lede: 2023 年 9 月，我受学姐邀请加入「是个芋泥的山姆拼单铺」。2025 年 1 月，我主动提出接手，2 月起担任负责人，统筹策略、宣传、运营、分装和配送全流程，带领 8 人团队。
    # 醒目的数字条：每一项单独显示，合起来就是原句
    stats:
      items:
        - 累计服务 2,000+ 用户
        - 学期营业额 25,000+ 元
        - 复购率约 78%
      sep: " · "
    # 小节：文字依次排列；照片在最下面横排，caption 是照片下面的小字
    # 正文里以"· "开头的行单独一行显示
    sections:
      - photo: ../../assets/sams/groups.jpg
        photoAlt: 十个客户群（头像已打码）
        caption: 十个客户群
        title: 配送：先试点，再外包
        body: 将一半宿舍的配送交给校内配送平台，另一半维持自营，对比两组的平均送达时间和用户反馈。验证外包效率更高后全面切换，平均配送时间缩短约 30%。根据用户反馈，配送时段由周六下午调整至周日晚饭时间，周订单量提升约 30%。
      - photo: ../../assets/sams/coffee.jpg
        photoAlt: 免费咖啡兑换券
        caption: 校内奶茶店联合宣传：在拼单铺下单可获得兑换券
        title: 拉新：三个层次的宣传
        body: |
          · 线下物料建立品牌印象
          · 老带新活动带来新用户
          · 校内奶茶店联合宣传带来新用户
          与接手前一学期相比，新进群 600+ 人，学期营业额提升超 10%。
      - photo: ../../assets/sams/packed.jpg
        photoAlt: 分装过程
        caption: 分装过程
        title: 分层：为高频用户设计早餐套餐
        body: 按下单频次对用户分层，为高频用户推出一周早餐套餐，每周未售出的剩余库存减少约一半。
      - photo: ../../assets/sams/orders.jpg
        photoAlt: 分装完成的订单
        caption: 分装完成的订单
        title: 团队：把经验写成 SOP
        body: 重写分装 SOP，新成员阅读后即可跟随老成员上手，不再需要单独培训。

  - short: 反方向的钟
    keywords: 活动策划 · 团队管理 · 共创
    # 标题下面的通栏大图
    hero: ../../assets/clock/hero.jpg
    heroAlt: 反方向的钟展览
    # 电脑上：左栏引入，右栏职责和成果
    twoCol: true
    title: "\"反方向的钟\"主题展览"
    period: "2023.12"
    tags: 学生健康辅导中心「友思」｜总负责人
    sections:
      - title: 引入
        poem: true
        # 每行一句；空一行表示单独成段
        body: |
          8岁拿到满分成绩单，
          18岁考上重点大学，
          毕业后找到好工作，
          结婚、生子……
          不经意间，我们习惯了"什么年纪就该做什么事"的说辞，
          追逐着"社会时钟"的刻度前行，
          害怕落后，不敢掉队。
          你也许曾怀疑过：
          "从来如此，便对吗？"
          我们有各自不同的人生节奏，
          人生的时钟不止唯一解。

          在属于你的时区，一切都准时。
      - title: 我的职责｜总负责人
        body: 带领 14 人团队，主持累计 7 小时的脑暴策划会，确定展览主题与形式；制定各阶段交付时间线，统筹执行落地，负责关键节点决策。
    stats:
      title: 成果
      after: true
      # 每条单独一行
      stack: true
      items:
        - 吸引 1,500+ 参观者
        - 50+ 条朋友圈、小红书自发好评分享
        - 获校媒报道
        - 所在学生组织「友思」获评年度优秀学生组织一等奖
      sep: ""
    # 共创留言墙：横向滑动，照片按原始比例、高度一致
    gallery:
      title: 共创留言墙
      items:
        - image: ../../assets/clock/wall-05.jpg
          alt: 共创
        - image: ../../assets/clock/wall-06.jpg
          alt: 共创
        - image: ../../assets/clock/wall-07.jpg
          alt: 共创
        - image: ../../assets/clock/wall-08.jpg
          alt: 共创
        - image: ../../assets/clock/wall-09.jpg
          alt: 参观者留言
        - image: ../../assets/clock/wall-10.jpg
          alt: 参观者留言
        - image: ../../assets/clock/wall-11.jpg
          alt: 参观者留言
        - image: ../../assets/clock/wall-12.jpg
          alt: 参观者留言
        - image: ../../assets/clock/wall-13.jpg
          alt: 参观者留言（署名已打码）
        - image: ../../assets/clock/wall-14.jpg
          alt: 参观者留言
---
