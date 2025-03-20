import 'package:flutter/material.dart';
import '../models/chat_message.dart';
import '../utils/mock_data.dart';
import '../widgets/message_item.dart';
import '../widgets/input_area.dart';
import 'search_screen.dart';

/// 聊天界面
class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _textController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  bool _shouldScrollToBottom = true;

  // 消息列表
  final List<ChatMessage> _messages = MockDataGenerator.generateMockMessages();

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

    // 滚动到底部
    _scrollToBottom();

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
    _scrollController.dispose();
    super.dispose();
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

    // 滚动到底部
    _shouldScrollToBottom = true;
    _scrollToBottom();
  }

  // 打开搜索页面
  void _openSearchScreen() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => SearchScreen(messages: _messages),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('微信聊天'),
        backgroundColor: Theme.of(context).primaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: _openSearchScreen,
          ),
          IconButton(
            icon: const Icon(Icons.more_horiz),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(8.0),
              reverse: true, // 新消息显示在底部
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final message = _messages[_messages.length - 1 - index];
                return MessageItem(message: message);
              },
            ),
          ),
          const Divider(height: 1.0),
          InputArea(
            controller: _textController,
            onSubmitted: _handleSubmitted,
          ),
        ],
      ),
    );
  }
}
