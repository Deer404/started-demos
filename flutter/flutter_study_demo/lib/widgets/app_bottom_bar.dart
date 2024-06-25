import 'package:flutter/material.dart';

class MenuData {
  // 标签
  final String label;

  // 图标数据
  final IconData icon;

  const MenuData({
    required this.label,
    required this.icon,
  });
}

class AppBottomBar extends StatelessWidget {
  final int currentIndex;
  final List<MenuData> menus;
  final ValueChanged<int>? onItemTap;
  final NotchedShape shape;
  const AppBottomBar({
    super.key,
    this.onItemTap,
    this.currentIndex = 0,
    this.shape = const CircularNotchedRectangle(),
    required this.menus,
  });

  @override
  Widget build(BuildContext context) {
    return BottomAppBar(
      elevation: 0.0,
      shape: shape,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          for (var (index, menu) in menus.indexed)
            _buildItemByMenuMeta(menu, index),
        ],
      ),
    );
  }

  IconButton _buildItemByMenuMeta(MenuData menu, int index) {
    return IconButton(
      icon: Icon(menu.icon),
      onPressed: () {
        if (onItemTap != null) {
          onItemTap!(index);
        }
      },
    );
  }
}
