import 'package:flutter/material.dart';

/// 输入区域组件
class InputArea extends StatelessWidget {
  final TextEditingController controller;
  final Function(String) onSubmitted;

  const InputArea({
    super.key,
    required this.controller,
    required this.onSubmitted,
  });

  @override
  Widget build(BuildContext context) {
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
              controller: controller,
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
              onSubmitted: onSubmitted,
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
            onPressed: () => onSubmitted(controller.text),
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
