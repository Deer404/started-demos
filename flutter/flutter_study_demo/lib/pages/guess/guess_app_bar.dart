import 'package:flutter/material.dart';

class GuessAppBar extends StatelessWidget implements PreferredSizeWidget {
  final VoidCallback onCheck;
  final TextEditingController controller;
  const GuessAppBar({
    super.key,
    required this.onCheck,
    required this.controller,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      leading: IconButton(
        icon: const Icon(Icons.menu),
        onPressed: () {},
      ),
      title: TextField(
        controller: controller,
        keyboardType: TextInputType.text,
        decoration: const InputDecoration(
          filled: true,
          fillColor: Color(0xffF3F6F9),
          constraints: BoxConstraints(maxHeight: 35),
          hintText: 'Search',
        ),
      ),
      actions: [
        IconButton(
            splashRadius: 20,
            onPressed: onCheck,
            icon: const Icon(
              Icons.run_circle_outlined,
              color: Colors.blue,
            ))
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
