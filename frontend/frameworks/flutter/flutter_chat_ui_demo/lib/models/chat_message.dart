/// 聊天消息模型
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
