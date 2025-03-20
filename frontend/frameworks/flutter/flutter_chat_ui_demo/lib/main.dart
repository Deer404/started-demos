import 'package:flutter/material.dart';
import 'screens/chat_screen.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: const Color(0xFF07C160), // 微信绿色
        scaffoldBackgroundColor: const Color(0xFFF6F6F6), // 微信背景色
      ),
      home: const ChatScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

// 聊天消息类
class ChatMessage {
  final String text;
  final bool isSentByMe;
  final DateTime time;

  ChatMessage({
    required this.text,
    required this.isSentByMe,
    required this.time,
  });
}

// 聊天界面
class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _textController = TextEditingController();
  final TextEditingController _searchController = TextEditingController();
  bool _isSearching = false;
  List<int> _searchResults = [];
  int _currentSearchIndex = -1;
  final ScrollController _scrollController = ScrollController();
  final ScrollController _searchScrollController = ScrollController();
  bool _shouldScrollToBottom = true;

  // 保存搜索时的消息列表快照
  List<ChatMessage> _searchMessagesSnapshot = [];
  // 当前高亮的消息ID
  int? _highlightedMessageIndex;

  final List<ChatMessage> _messages = _generateMockMessages();

  // 生成模拟聊天数据
  static List<ChatMessage> _generateMockMessages() {
    final List<ChatMessage> messages = [];
    final now = DateTime.now();

    // 技术讨论主题
    final techTopics = [
      {"text": "你好，最近怎么样？", "isSentByMe": false, "days": 7, "hours": 2},
      {
        "text": "挺好的，在学习Flutter开发，你呢？",
        "isSentByMe": true,
        "days": 7,
        "hours": 1,
        "minutes": 55
      },
      {
        "text": "我也在学习新技术，有空一起讨论吧！",
        "isSentByMe": false,
        "days": 7,
        "hours": 1,
        "minutes": 50
      },
      {
        "text": "最近在研究Flutter的状态管理，你有什么推荐吗？",
        "isSentByMe": true,
        "days": 7,
        "hours": 0,
        "minutes": 30
      },
      {
        "text": "我觉得Provider和Riverpod都不错，看你的项目复杂度",
        "isSentByMe": false,
        "days": 6,
        "hours": 23,
        "minutes": 30
      },
      {
        "text": "GetX也挺流行的，不过有人说它不够符合Flutter的设计理念",
        "isSentByMe": true,
        "days": 6,
        "hours": 23
      },
      {
        "text": "是的，我更倾向于使用官方推荐的方案",
        "isSentByMe": false,
        "days": 6,
        "hours": 22,
        "minutes": 40
      },
      {
        "text": "Flutter的热重载功能真的很方便开发",
        "isSentByMe": true,
        "days": 6,
        "hours": 22
      },
      {
        "text": "是的，大大提高了开发效率",
        "isSentByMe": false,
        "days": 6,
        "hours": 21,
        "minutes": 45
      },
      {
        "text": "你用过Flutter开发什么项目吗？",
        "isSentByMe": true,
        "days": 6,
        "hours": 21
      },
      {
        "text": "做过一个健康管理的App，UI体验很不错",
        "isSentByMe": false,
        "days": 6,
        "hours": 20,
        "minutes": 30
      },
      {
        "text": "Flutter的跨平台特性确实很强大",
        "isSentByMe": true,
        "days": 6,
        "hours": 20
      },
      {
        "text": "对，一套代码同时支持Android和iOS",
        "isSentByMe": false,
        "days": 6,
        "hours": 19,
        "minutes": 50
      },
      {
        "text": "你觉得Flutter和React Native相比怎么样？",
        "isSentByMe": true,
        "days": 6,
        "hours": 19
      },
      {
        "text": "我个人更喜欢Flutter的开发体验，Dart语言也很不错",
        "isSentByMe": false,
        "days": 6,
        "hours": 18,
        "minutes": 30
      },
      {
        "text": "Dart确实挺好上手的，类型安全也做得不错",
        "isSentByMe": true,
        "days": 6,
        "hours": 18
      },
      {
        "text": "你有尝试过Flutter的桌面和Web支持吗？",
        "isSentByMe": false,
        "days": 6,
        "hours": 17,
        "minutes": 30
      },
      {
        "text": "Web试过一点，性能还可以，不过有些API不太一样",
        "isSentByMe": true,
        "days": 6,
        "hours": 17
      },
      {
        "text": "桌面支持我觉得还不够成熟，但是发展很快",
        "isSentByMe": false,
        "days": 6,
        "hours": 16,
        "minutes": 45
      },
    ];

    // 日常生活主题
    final dailyTopics = [
      {"text": "今天天气真不错，你那边怎么样？", "isSentByMe": true, "days": 5, "hours": 10},
      {
        "text": "这边下雨了，有点冷",
        "isSentByMe": false,
        "days": 5,
        "hours": 9,
        "minutes": 50
      },
      {
        "text": "记得带伞出门",
        "isSentByMe": true,
        "days": 5,
        "hours": 9,
        "minutes": 45
      },
      {
        "text": "已经带了，谢谢关心",
        "isSentByMe": false,
        "days": 5,
        "hours": 9,
        "minutes": 40
      },
      {"text": "周末有什么计划吗？", "isSentByMe": true, "days": 5, "hours": 9},
      {
        "text": "打算去看电影，最近有部新片挺不错",
        "isSentByMe": false,
        "days": 5,
        "hours": 8,
        "minutes": 50
      },
      {
        "text": "哪部电影？我也想去看",
        "isSentByMe": true,
        "days": 5,
        "hours": 8,
        "minutes": 45
      },
      {
        "text": "《流浪地球2》，评价很高",
        "isSentByMe": false,
        "days": 5,
        "hours": 8,
        "minutes": 40
      },
      {
        "text": "听说特效做得很棒",
        "isSentByMe": true,
        "days": 5,
        "hours": 8,
        "minutes": 35
      },
      {
        "text": "是的，国产科幻电影的一大进步",
        "isSentByMe": false,
        "days": 5,
        "hours": 8,
        "minutes": 30
      },
      {
        "text": "要不要一起去看？",
        "isSentByMe": true,
        "days": 5,
        "hours": 8,
        "minutes": 25
      },
      {
        "text": "好啊，周六下午怎么样？",
        "isSentByMe": false,
        "days": 5,
        "hours": 8,
        "minutes": 20
      },
      {
        "text": "没问题，到时候我订票",
        "isSentByMe": true,
        "days": 5,
        "hours": 8,
        "minutes": 15
      },
    ];

    // 工作讨论主题
    final workTopics = [
      {"text": "项目进展如何？", "isSentByMe": false, "days": 4, "hours": 15},
      {
        "text": "基本按计划进行，不过遇到了一些技术难题",
        "isSentByMe": true,
        "days": 4,
        "hours": 14,
        "minutes": 55
      },
      {
        "text": "什么难题？需要帮忙吗？",
        "isSentByMe": false,
        "days": 4,
        "hours": 14,
        "minutes": 50
      },
      {
        "text": "主要是性能优化方面的，列表渲染太慢",
        "isSentByMe": true,
        "days": 4,
        "hours": 14,
        "minutes": 45
      },
      {
        "text": "试试用ListView.builder替代Column+SingleChildScrollView",
        "isSentByMe": false,
        "days": 4,
        "hours": 14,
        "minutes": 40
      },
      {
        "text": "已经用了，还是有点卡顿",
        "isSentByMe": true,
        "days": 4,
        "hours": 14,
        "minutes": 35
      },
      {
        "text": "那可能需要检查一下是否有不必要的重建",
        "isSentByMe": false,
        "days": 4,
        "hours": 14,
        "minutes": 30
      },
      {
        "text": "用Flutter DevTools分析了一下，确实有这个问题",
        "isSentByMe": true,
        "days": 4,
        "hours": 14,
        "minutes": 25
      },
      {
        "text": "试试const构造函数和缓存Widget",
        "isSentByMe": false,
        "days": 4,
        "hours": 14,
        "minutes": 20
      },
      {
        "text": "好的，我试试看",
        "isSentByMe": true,
        "days": 4,
        "hours": 14,
        "minutes": 15
      },
      {"text": "明天开会需要准备什么材料吗？", "isSentByMe": true, "days": 4, "hours": 13},
      {
        "text": "准备一下项目进度报告和遇到的问题",
        "isSentByMe": false,
        "days": 4,
        "hours": 12,
        "minutes": 55
      },
      {
        "text": "好的，我今晚整理一下",
        "isSentByMe": true,
        "days": 4,
        "hours": 12,
        "minutes": 50
      },
      {"text": "客户那边有什么新的需求吗？", "isSentByMe": true, "days": 4, "hours": 12},
      {
        "text": "他们想增加一个数据分析的功能",
        "isSentByMe": false,
        "days": 4,
        "hours": 11,
        "minutes": 55
      },
      {
        "text": "这个功能复杂吗？",
        "isSentByMe": true,
        "days": 4,
        "hours": 11,
        "minutes": 50
      },
      {
        "text": "不算太复杂，但需要额外的时间",
        "isSentByMe": false,
        "days": 4,
        "hours": 11,
        "minutes": 45
      },
    ];

    // 学习交流主题
    final learningTopics = [
      {"text": "你最近在学什么新技术？", "isSentByMe": true, "days": 3, "hours": 20},
      {
        "text": "在学习Swift和SwiftUI，想尝试一下iOS原生开发",
        "isSentByMe": false,
        "days": 3,
        "hours": 19,
        "minutes": 55
      },
      {
        "text": "Swift语言怎么样？和Dart比较像吗？",
        "isSentByMe": true,
        "days": 3,
        "hours": 19,
        "minutes": 50
      },
      {
        "text": "有些相似，都是现代语言，但Swift的语法更严格一些",
        "isSentByMe": false,
        "days": 3,
        "hours": 19,
        "minutes": 45
      },
      {
        "text": "SwiftUI和Flutter的声明式UI很像",
        "isSentByMe": false,
        "days": 3,
        "hours": 19,
        "minutes": 40
      },
      {
        "text": "听起来不错，我也想学学看",
        "isSentByMe": true,
        "days": 3,
        "hours": 19,
        "minutes": 35
      },
      {
        "text": "推荐一些学习资源给你吧",
        "isSentByMe": false,
        "days": 3,
        "hours": 19,
        "minutes": 30
      },
      {
        "text": "好啊，谢谢",
        "isSentByMe": true,
        "days": 3,
        "hours": 19,
        "minutes": 25
      },
      {
        "text": "Apple官方的Swift教程很不错，还有Stanford的iOS课程",
        "isSentByMe": false,
        "days": 3,
        "hours": 19,
        "minutes": 20
      },
      {
        "text": "我记下来了，有空就开始学",
        "isSentByMe": true,
        "days": 3,
        "hours": 19,
        "minutes": 15
      },
      {"text": "你对人工智能和机器学习有兴趣吗？", "isSentByMe": false, "days": 3, "hours": 18},
      {
        "text": "有啊，最近ChatGPT很火",
        "isSentByMe": true,
        "days": 3,
        "hours": 17,
        "minutes": 55
      },
      {
        "text": "是的，GPT模型的能力真的很惊人",
        "isSentByMe": false,
        "days": 3,
        "hours": 17,
        "minutes": 50
      },
      {
        "text": "你有尝试用它来辅助编程吗？",
        "isSentByMe": true,
        "days": 3,
        "hours": 17,
        "minutes": 45
      },
      {
        "text": "用过，对于生成样板代码和解决简单问题很有帮助",
        "isSentByMe": false,
        "days": 3,
        "hours": 17,
        "minutes": 40
      },
      {
        "text": "不过复杂的逻辑还是需要自己思考",
        "isSentByMe": false,
        "days": 3,
        "hours": 17,
        "minutes": 35
      },
    ];

    // 旅行讨论主题
    final travelTopics = [
      {"text": "你去过哪些地方旅行？", "isSentByMe": true, "days": 2, "hours": 16},
      {
        "text": "去过云南、西藏和新疆，风景都很美",
        "isSentByMe": false,
        "days": 2,
        "hours": 15,
        "minutes": 55
      },
      {
        "text": "西藏怎么样？我一直想去",
        "isSentByMe": true,
        "days": 2,
        "hours": 15,
        "minutes": 50
      },
      {
        "text": "非常震撼，布达拉宫和纳木错都很值得一去",
        "isSentByMe": false,
        "days": 2,
        "hours": 15,
        "minutes": 45
      },
      {
        "text": "高原反应严重吗？",
        "isSentByMe": true,
        "days": 2,
        "hours": 15,
        "minutes": 40
      },
      {
        "text": "因人而异，建议前几天不要剧烈运动",
        "isSentByMe": false,
        "days": 2,
        "hours": 15,
        "minutes": 35
      },
      {
        "text": "最好的旅行季节是什么时候？",
        "isSentByMe": true,
        "days": 2,
        "hours": 15,
        "minutes": 30
      },
      {
        "text": "夏季吧，5-9月，天气最好，景色也最美",
        "isSentByMe": false,
        "days": 2,
        "hours": 15,
        "minutes": 25
      },
      {
        "text": "需要准备什么特别的装备吗？",
        "isSentByMe": true,
        "days": 2,
        "hours": 15,
        "minutes": 20
      },
      {
        "text": "防晒霜、墨镜、氧气罐和感冒药都要带",
        "isSentByMe": false,
        "days": 2,
        "hours": 15,
        "minutes": 15
      },
      {
        "text": "你有推荐的住宿地点吗？",
        "isSentByMe": true,
        "days": 2,
        "hours": 15,
        "minutes": 10
      },
      {
        "text": "拉萨市区的青旅不错，干净又便宜",
        "isSentByMe": false,
        "days": 2,
        "hours": 15,
        "minutes": 5
      },
      {"text": "好的，谢谢建议，我打算今年夏天去", "isSentByMe": true, "days": 2, "hours": 15},
      {
        "text": "如果去的话记得提前适应高原环境",
        "isSentByMe": false,
        "days": 2,
        "hours": 14,
        "minutes": 55
      },
    ];

    // 美食讨论主题
    final foodTopics = [
      {"text": "你喜欢吃什么菜系？", "isSentByMe": false, "days": 1, "hours": 12},
      {
        "text": "我比较喜欢川菜和粤菜",
        "isSentByMe": true,
        "days": 1,
        "hours": 11,
        "minutes": 55
      },
      {
        "text": "川菜的麻辣很过瘾",
        "isSentByMe": false,
        "days": 1,
        "hours": 11,
        "minutes": 50
      },
      {
        "text": "是啊，特别是火锅，冬天吃最舒服了",
        "isSentByMe": true,
        "days": 1,
        "hours": 11,
        "minutes": 45
      },
      {
        "text": "你有什么推荐的火锅店吗？",
        "isSentByMe": false,
        "days": 1,
        "hours": 11,
        "minutes": 40
      },
      {
        "text": "海底捞服务很好，但有点贵",
        "isSentByMe": true,
        "days": 1,
        "hours": 11,
        "minutes": 35
      },
      {
        "text": "还有一家小店叫'蜀九香'，味道很正宗",
        "isSentByMe": true,
        "days": 1,
        "hours": 11,
        "minutes": 30
      },
      {
        "text": "好的，我记下来了，有机会去尝尝",
        "isSentByMe": false,
        "days": 1,
        "hours": 11,
        "minutes": 25
      },
      {
        "text": "你会做饭吗？",
        "isSentByMe": false,
        "days": 1,
        "hours": 11,
        "minutes": 20
      },
      {
        "text": "会一些简单的家常菜，水平一般",
        "isSentByMe": true,
        "days": 1,
        "hours": 11,
        "minutes": 15
      },
      {
        "text": "我最近在学做甜点，还挺有成就感的",
        "isSentByMe": false,
        "days": 1,
        "hours": 11,
        "minutes": 10
      },
      {
        "text": "甜点感觉很难，需要精确的配方",
        "isSentByMe": true,
        "days": 1,
        "hours": 11,
        "minutes": 5
      },
      {
        "text": "是的，特别是烘焙，温度和时间都很关键",
        "isSentByMe": false,
        "days": 1,
        "hours": 11
      },
      {
        "text": "改天可以分享一些简单的食谱给我吗？",
        "isSentByMe": true,
        "days": 1,
        "hours": 10,
        "minutes": 55
      },
      {
        "text": "没问题，我有几个适合新手的食谱",
        "isSentByMe": false,
        "days": 1,
        "hours": 10,
        "minutes": 50
      },
    ];

    // 最近的聊天
    final recentTopics = [
      {"text": "今天的会议几点开始？", "isSentByMe": true, "days": 0, "hours": 5},
      {
        "text": "下午2点，别忘了准备演示文稿",
        "isSentByMe": false,
        "days": 0,
        "hours": 4,
        "minutes": 55
      },
      {
        "text": "已经准备好了，发给你看看",
        "isSentByMe": true,
        "days": 0,
        "hours": 4,
        "minutes": 50
      },
      {
        "text": "收到，我看一下",
        "isSentByMe": false,
        "days": 0,
        "hours": 4,
        "minutes": 45
      },
      {
        "text": "内容很全面，不过第三页的数据可以再详细一点",
        "isSentByMe": false,
        "days": 0,
        "hours": 4,
        "minutes": 40
      },
      {
        "text": "好的，我再补充一下",
        "isSentByMe": true,
        "days": 0,
        "hours": 4,
        "minutes": 35
      },
      {
        "text": "客户对上次的方案有什么反馈吗？",
        "isSentByMe": true,
        "days": 0,
        "hours": 4,
        "minutes": 30
      },
      {
        "text": "总体满意，但希望我们能提供更多的定制选项",
        "isSentByMe": false,
        "days": 0,
        "hours": 4,
        "minutes": 25
      },
      {
        "text": "明白了，我会在今天的会议上提出新的方案",
        "isSentByMe": true,
        "days": 0,
        "hours": 4,
        "minutes": 20
      },
      {
        "text": "太好了，期待你的表现",
        "isSentByMe": false,
        "days": 0,
        "hours": 4,
        "minutes": 15
      },
      {"text": "对了，下周的培训你去吗？", "isSentByMe": true, "days": 0, "hours": 3},
      {
        "text": "去，听说这次请了行业专家",
        "isSentByMe": false,
        "days": 0,
        "hours": 2,
        "minutes": 55
      },
      {
        "text": "主题是什么？",
        "isSentByMe": true,
        "days": 0,
        "hours": 2,
        "minutes": 50
      },
      {
        "text": "Flutter 3.0新特性和最佳实践",
        "isSentByMe": false,
        "days": 0,
        "hours": 2,
        "minutes": 45
      },
      {
        "text": "正好我们项目要升级到3.0，很及时",
        "isSentByMe": true,
        "days": 0,
        "hours": 2,
        "minutes": 40
      },
      {
        "text": "是的，可以解决我们遇到的一些问题",
        "isSentByMe": false,
        "days": 0,
        "hours": 2,
        "minutes": 35
      },
      {"text": "午饭一起吃吗？", "isSentByMe": true, "days": 0, "hours": 1},
      {
        "text": "好啊，12点公司楼下见",
        "isSentByMe": false,
        "days": 0,
        "hours": 0,
        "minutes": 55
      },
      {
        "text": "想吃什么？",
        "isSentByMe": true,
        "days": 0,
        "hours": 0,
        "minutes": 50
      },
      {
        "text": "随便，你决定吧",
        "isSentByMe": false,
        "days": 0,
        "hours": 0,
        "minutes": 45
      },
      {
        "text": "那就吃新开的那家粤菜馆吧",
        "isSentByMe": true,
        "days": 0,
        "hours": 0,
        "minutes": 40
      },
      {
        "text": "好的，听说那里的烧鹅不错",
        "isSentByMe": false,
        "days": 0,
        "hours": 0,
        "minutes": 35
      },
      {
        "text": "对了，记得带上项目文档，午饭后我们可以讨论一下",
        "isSentByMe": true,
        "days": 0,
        "hours": 0,
        "minutes": 30
      },
      {
        "text": "没问题，我已经打印好了",
        "isSentByMe": false,
        "days": 0,
        "hours": 0,
        "minutes": 25
      },
    ];

    // 合并所有主题并按时间排序
    final allTopics = [
      ...techTopics,
      ...dailyTopics,
      ...workTopics,
      ...learningTopics,
      ...travelTopics,
      ...foodTopics,
      ...recentTopics,
    ];

    // 创建消息对象
    for (var topic in allTopics) {
      final time = now.subtract(Duration(
        days: topic["days"] as int,
        hours: topic["hours"] as int,
        minutes: topic["minutes"] != null ? topic["minutes"] as int : 0,
      ));

      messages.add(ChatMessage(
        text: topic["text"] as String,
        isSentByMe: topic["isSentByMe"] as bool,
        time: time,
      ));
    }

    // 按时间排序（从旧到新）
    messages.sort((a, b) => a.time.compareTo(b.time));

    return messages;
  }

  @override
  void initState() {
    super.initState();
    // 模拟每隔一段时间收到新消息
    Future.delayed(const Duration(seconds: 15), () {
      _simulateNewMessage();
    });
  }

  // 模拟接收新消息
  void _simulateNewMessage() {
    if (!mounted) return;

    setState(() {
      _messages.add(
        ChatMessage(
          text: "这是一条新收到的消息，测试搜索时的体验",
          isSentByMe: false,
          time: DateTime.now(),
        ),
      );
    });

    // 如果不在搜索模式，或者没有搜索结果，则滚动到底部
    if (!_isSearching || _searchResults.isEmpty) {
      _scrollToBottom();
    }
    // 搜索模式下不需要做任何滚动操作，保持当前位置

    // 继续模拟接收消息
    Future.delayed(const Duration(seconds: 20), () {
      _simulateNewMessage();
    });
  }

  // 滚动到底部
  void _scrollToBottom() {
    if (!_shouldScrollToBottom) return;

    Future.delayed(const Duration(milliseconds: 100), () {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          0.0,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  void dispose() {
    _textController.dispose();
    _searchController.dispose();
    _scrollController.dispose();
    _searchScrollController.dispose();
    super.dispose();
  }

  // 搜索聊天记录
  void _searchMessages(String keyword) {
    if (keyword.isEmpty) {
      setState(() {
        _searchResults = [];
        _currentSearchIndex = -1;
        _shouldScrollToBottom = true;
        _highlightedMessageIndex = null;
        _searchMessagesSnapshot = [];
      });
      return;
    }

    // 创建当前消息列表的快照
    final snapshot = List<ChatMessage>.from(_messages);

    final List<int> results = [];
    for (int i = 0; i < snapshot.length; i++) {
      if (snapshot[i].text.toLowerCase().contains(keyword.toLowerCase())) {
        results.add(i);
      }
    }

    setState(() {
      _searchMessagesSnapshot = snapshot;
      _searchResults = results;
      _currentSearchIndex = results.isNotEmpty ? 0 : -1;
      // 当有搜索结果时，禁用自动滚动到底部
      _shouldScrollToBottom = false;

      if (results.isNotEmpty) {
        _highlightedMessageIndex = results[0];
        _scrollToSearchMessage(results[0]);
      } else {
        _highlightedMessageIndex = null;
      }
    });
  }

  // 跳转到下一个搜索结果
  void _nextSearchResult() {
    if (_searchResults.isEmpty) return;
    setState(() {
      _currentSearchIndex = (_currentSearchIndex + 1) % _searchResults.length;
      _highlightedMessageIndex = _searchResults[_currentSearchIndex];
      _scrollToSearchMessage(_searchResults[_currentSearchIndex]);
    });
  }

  // 跳转到上一个搜索结果
  void _previousSearchResult() {
    if (_searchResults.isEmpty) return;
    setState(() {
      _currentSearchIndex = (_currentSearchIndex - 1 + _searchResults.length) %
          _searchResults.length;
      _highlightedMessageIndex = _searchResults[_currentSearchIndex];
      _scrollToSearchMessage(_searchResults[_currentSearchIndex]);
    });
  }

  // 滚动到指定消息 (用于正常模式)
  void _scrollToMessage(int index) {
    // 计算反转列表中的实际位置
    final actualIndex = _messages.length - 1 - index;

    // 延迟执行以确保列表已经构建完成
    Future.delayed(const Duration(milliseconds: 100), () {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          actualIndex * 100.0, // 估计每个消息的高度
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeInOut,
        );
      }
    });
  }

  // 滚动到搜索结果消息 (用于搜索模式)
  void _scrollToSearchMessage(int index) {
    // 计算反转列表中的实际位置
    final actualIndex = _searchMessagesSnapshot.length - 1 - index;

    // 延迟执行以确保列表已经构建完成
    Future.delayed(const Duration(milliseconds: 100), () {
      if (_searchScrollController.hasClients) {
        _searchScrollController.animateTo(
          actualIndex * 100.0, // 估计每个消息的高度
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeInOut,
        );
      }
    });
  }

  void _handleSubmitted(String text) {
    _textController.clear();
    if (text.trim().isEmpty) return;

    setState(() {
      _messages.add(
        ChatMessage(
          text: text,
          isSentByMe: true,
          time: DateTime.now(),
        ),
      );
    });

    // 如果不在搜索模式，或者用户主动发送消息，则滚动到底部
    if (!_isSearching) {
      _shouldScrollToBottom = true;
      _scrollToBottom();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: _isSearching ? _buildSearchField() : const Text('微信聊天'),
        backgroundColor: Theme.of(context).primaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(_isSearching ? Icons.close : Icons.search),
            onPressed: () {
              setState(() {
                _isSearching = !_isSearching;
                if (_isSearching) {
                  // 进入搜索模式时，创建消息列表快照
                  _searchMessagesSnapshot = List<ChatMessage>.from(_messages);
                } else {
                  _searchController.clear();
                  _searchResults = [];
                  _currentSearchIndex = -1;
                  _highlightedMessageIndex = null;
                  _searchMessagesSnapshot = [];
                  // 退出搜索模式时，恢复自动滚动到底部
                  _shouldScrollToBottom = true;
                  _scrollToBottom();
                }
              });
            },
          ),
          IconButton(
            icon: const Icon(Icons.more_horiz),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          if (_isSearching && _searchResults.isNotEmpty)
            _buildSearchResultsBar(),
          if (_isSearching &&
              _searchResults.isEmpty &&
              _searchController.text.isNotEmpty)
            _buildNoResultsMessage(),
          Expanded(
            child: IndexedStack(
              index: _isSearching ? 1 : 0,
              children: [
                // 正常聊天列表
                Stack(
                  children: [
                    ListView.builder(
                      controller: _scrollController,
                      padding: const EdgeInsets.all(8.0),
                      reverse: true, // 新消息显示在底部
                      itemCount: _messages.length,
                      itemBuilder: (context, index) {
                        final message = _messages[_messages.length - 1 - index];
                        return _buildMessageItem(message, false);
                      },
                    ),
                  ],
                ),
                // 搜索结果列表
                Stack(
                  children: [
                    ListView.builder(
                      controller: _searchScrollController,
                      padding: const EdgeInsets.all(8.0),
                      reverse: true, // 新消息显示在底部
                      itemCount: _searchMessagesSnapshot.length,
                      itemBuilder: (context, index) {
                        final messageIndex =
                            _searchMessagesSnapshot.length - 1 - index;
                        final message = _searchMessagesSnapshot[messageIndex];
                        final isHighlighted =
                            _highlightedMessageIndex == messageIndex;
                        return _buildMessageItem(message, isHighlighted);
                      },
                    ),
                    Positioned(
                      right: 16,
                      bottom: 16,
                      child: FloatingActionButton(
                        mini: true,
                        backgroundColor: Theme.of(context).primaryColor,
                        onPressed: () {
                          setState(() {
                            _isSearching = false;
                            _searchController.clear();
                            _searchResults = [];
                            _currentSearchIndex = -1;
                            _highlightedMessageIndex = null;
                            _searchMessagesSnapshot = [];
                            _shouldScrollToBottom = true;
                            _scrollToBottom();
                          });
                        },
                        child: const Icon(Icons.keyboard_arrow_down,
                            color: Colors.white),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const Divider(height: 1.0),
          _buildInputArea(),
        ],
      ),
    );
  }

  Widget _buildNoResultsMessage() {
    return Container(
      padding: const EdgeInsets.all(16.0),
      color: Colors.grey[200],
      child: const Center(
        child: Text(
          '没有找到匹配的消息',
          style: TextStyle(color: Colors.black54),
        ),
      ),
    );
  }

  Widget _buildSearchField() {
    return TextField(
      controller: _searchController,
      autofocus: true,
      decoration: const InputDecoration(
        hintText: '搜索聊天记录...',
        border: InputBorder.none,
        hintStyle: TextStyle(color: Colors.white70),
      ),
      style: const TextStyle(color: Colors.white),
      onChanged: _searchMessages,
    );
  }

  Widget _buildSearchResultsBar() {
    return Container(
      color: Colors.grey[200],
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      child: Row(
        children: [
          Text(
            '${_currentSearchIndex + 1}/${_searchResults.length}个结果',
            style: const TextStyle(color: Colors.black54),
          ),
          const Spacer(),
          IconButton(
            icon: const Icon(Icons.arrow_upward),
            onPressed: _previousSearchResult,
            color: Colors.black54,
          ),
          IconButton(
            icon: const Icon(Icons.arrow_downward),
            onPressed: _nextSearchResult,
            color: Colors.black54,
          ),
        ],
      ),
    );
  }

  Widget _buildMessageItem(ChatMessage message, bool isHighlighted) {
    final timeStr =
        '${message.time.hour}:${message.time.minute.toString().padLeft(2, '0')}';

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10.0),
      decoration: BoxDecoration(
        color: isHighlighted ? Colors.yellow[100] : Colors.transparent,
      ),
      child: Row(
        mainAxisAlignment: message.isSentByMe
            ? MainAxisAlignment.end
            : MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (!message.isSentByMe) _buildAvatar(false),
          if (!message.isSentByMe) const SizedBox(width: 10),
          Column(
            crossAxisAlignment: message.isSentByMe
                ? CrossAxisAlignment.end
                : CrossAxisAlignment.start,
            children: [
              Text(
                timeStr,
                style: const TextStyle(fontSize: 12, color: Colors.grey),
              ),
              const SizedBox(height: 4),
              Container(
                constraints: BoxConstraints(
                  maxWidth: MediaQuery.of(context).size.width * 0.7,
                ),
                padding: const EdgeInsets.symmetric(
                    horizontal: 16.0, vertical: 10.0),
                decoration: BoxDecoration(
                  color: message.isSentByMe
                      ? const Color(0xFF95EC69)
                      : Colors.white,
                  borderRadius: BorderRadius.circular(4.0),
                ),
                child: Text(
                  message.text,
                  style: TextStyle(
                    color: message.isSentByMe ? Colors.black : Colors.black,
                  ),
                ),
              ),
            ],
          ),
          if (message.isSentByMe) const SizedBox(width: 10),
          if (message.isSentByMe) _buildAvatar(true),
        ],
      ),
    );
  }

  Widget _buildAvatar(bool isSentByMe) {
    return CircleAvatar(
      backgroundColor: isSentByMe ? Colors.blue : Colors.grey,
      child: Text(
        isSentByMe ? '我' : '对',
        style: const TextStyle(color: Colors.white),
      ),
    );
  }

  Widget _buildInputArea() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      color: Colors.white,
      child: Row(
        children: [
          IconButton(
            icon: const Icon(Icons.mic),
            onPressed: () {},
          ),
          Expanded(
            child: TextField(
              controller: _textController,
              decoration: const InputDecoration(
                hintText: '输入消息...',
                contentPadding:
                    EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(4.0)),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: Color(0xFFF5F5F5),
              ),
              onSubmitted: _handleSubmitted,
            ),
          ),
          IconButton(
            icon: const Icon(Icons.face),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.add_circle_outline),
            onPressed: () {},
          ),
          TextButton(
            onPressed: () => _handleSubmitted(_textController.text),
            style: TextButton.styleFrom(
              backgroundColor: Theme.of(context).primaryColor,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(4.0),
              ),
              minimumSize: const Size(0, 36),
            ),
            child: const Text(
              '发送',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}
