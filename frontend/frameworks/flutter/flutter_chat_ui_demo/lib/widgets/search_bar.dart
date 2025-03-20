import 'package:flutter/material.dart';

/// 搜索结果导航栏
class SearchResultsBar extends StatelessWidget {
  final int currentIndex;
  final int totalResults;
  final VoidCallback onPrevious;
  final VoidCallback onNext;

  const SearchResultsBar({
    super.key,
    required this.currentIndex,
    required this.totalResults,
    required this.onPrevious,
    required this.onNext,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.grey[200],
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      child: Row(
        children: [
          Text(
            '${currentIndex + 1}/$totalResults个结果',
            style: const TextStyle(color: Colors.black54),
          ),
          const Spacer(),
          IconButton(
            icon: const Icon(Icons.arrow_upward),
            onPressed: onPrevious,
            color: Colors.black54,
          ),
          IconButton(
            icon: const Icon(Icons.arrow_downward),
            onPressed: onNext,
            color: Colors.black54,
          ),
        ],
      ),
    );
  }
}

/// 无搜索结果提示
class NoResultsMessage extends StatelessWidget {
  const NoResultsMessage({super.key});

  @override
  Widget build(BuildContext context) {
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
}

/// 搜索输入框
class SearchField extends StatelessWidget {
  final TextEditingController controller;
  final Function(String) onChanged;

  const SearchField({
    super.key,
    required this.controller,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      autofocus: true,
      decoration: const InputDecoration(
        hintText: '搜索聊天记录...',
        border: InputBorder.none,
        hintStyle: TextStyle(color: Colors.white70),
      ),
      style: const TextStyle(color: Colors.white),
      onChanged: onChanged,
    );
  }
}
