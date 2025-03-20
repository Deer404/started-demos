import '../models/chat_message.dart';

/// 模拟数据生成工具
class MockDataGenerator {
  /// 生成模拟聊天数据
  static List<ChatMessage> generateMockMessages() {
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
    ];

    // 合并所有主题并按时间排序
    final allTopics = [
      ...techTopics,
      ...dailyTopics,
      ...workTopics,
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
}
