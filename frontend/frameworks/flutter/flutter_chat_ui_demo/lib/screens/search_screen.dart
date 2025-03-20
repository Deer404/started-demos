import 'package:flutter/material.dart';
import '../models/chat_message.dart';
import '../widgets/message_item.dart';
import '../widgets/search_bar.dart';

/// 搜索页面
class SearchScreen extends StatefulWidget {
  final List<ChatMessage> messages;

  const SearchScreen({
    super.key,
    required this.messages,
  });

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final TextEditingController _searchController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  // 搜索结果
  List<int> _searchResults = [];
  int _currentSearchIndex = -1;

  // 消息列表快照
  late List<ChatMessage> _messagesSnapshot;

  // 当前高亮的消息索引
  int? _highlightedMessageIndex;

  @override
  void initState() {
    super.initState();
    // 创建消息列表快照
    _messagesSnapshot = List<ChatMessage>.from(widget.messages);
  }

  @override
  void dispose() {
    _searchController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  // 搜索消息
  void _searchMessages(String keyword) {
    if (keyword.isEmpty) {
      setState(() {
        _searchResults = [];
        _currentSearchIndex = -1;
        _highlightedMessageIndex = null;
      });
      return;
    }

    final List<int> results = [];
    for (int i = 0; i < _messagesSnapshot.length; i++) {
      if (_messagesSnapshot[i]
          .text
          .toLowerCase()
          .contains(keyword.toLowerCase())) {
        results.add(i);
      }
    }

    setState(() {
      _searchResults = results;
      _currentSearchIndex = results.isNotEmpty ? 0 : -1;

      if (results.isNotEmpty) {
        _highlightedMessageIndex = results[0];
        _scrollToMessage(results[0]);
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
      _scrollToMessage(_searchResults[_currentSearchIndex]);
    });
  }

  // 跳转到上一个搜索结果
  void _previousSearchResult() {
    if (_searchResults.isEmpty) return;
    setState(() {
      _currentSearchIndex = (_currentSearchIndex - 1 + _searchResults.length) %
          _searchResults.length;
      _highlightedMessageIndex = _searchResults[_currentSearchIndex];
      _scrollToMessage(_searchResults[_currentSearchIndex]);
    });
  }

  // 滚动到指定消息
  void _scrollToMessage(int index) {
    // 计算反转列表中的实际位置
    final actualIndex = _messagesSnapshot.length - 1 - index;

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: SearchField(
          controller: _searchController,
          onChanged: _searchMessages,
        ),
        backgroundColor: Theme.of(context).primaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          if (_searchResults.isNotEmpty)
            SearchResultsBar(
              currentIndex: _currentSearchIndex,
              totalResults: _searchResults.length,
              onPrevious: _previousSearchResult,
              onNext: _nextSearchResult,
            ),
          if (_searchResults.isEmpty && _searchController.text.isNotEmpty)
            const NoResultsMessage(),
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(8.0),
              reverse: true, // 新消息显示在底部
              itemCount: _messagesSnapshot.length,
              itemBuilder: (context, index) {
                final messageIndex = _messagesSnapshot.length - 1 - index;
                final message = _messagesSnapshot[messageIndex];
                final isHighlighted = _highlightedMessageIndex == messageIndex;
                return MessageItem(
                  message: message,
                  isHighlighted: isHighlighted,
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        mini: true,
        backgroundColor: Theme.of(context).primaryColor,
        onPressed: () => Navigator.pop(context),
        child: const Icon(Icons.keyboard_arrow_down, color: Colors.white),
      ),
    );
  }
}
