import 'package:flutter/material.dart';
import '../models/chat_message.dart';

/// 消息项组件
class MessageItem extends StatelessWidget {
  final ChatMessage message;
  final bool isHighlighted;

  const MessageItem({
    super.key,
    required this.message,
    this.isHighlighted = false,
  });

  @override
  Widget build(BuildContext context) {
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
}
