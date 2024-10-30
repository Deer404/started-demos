import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class ColorSelector extends StatelessWidget {
  const ColorSelector(
      {super.key,
      required this.supportColors,
      required this.onSelect,
      required this.activeIndex});

  final List<Color> supportColors;
  final ValueChanged<int> onSelect;
  final int activeIndex;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Wrap(
        children: List.generate(supportColors.length, _buildByIndex),
      ),
    );
  }

  Widget _buildByIndex(int index) {
    bool isActive = index == activeIndex;
    return GestureDetector(
      onTap: () => onSelect(index),
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 2),
        padding: const EdgeInsets.all(2),
        width: 24,
        height: 24,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: isActive ? Border.all(color: Colors.blue) : null,
        ),
        child: Container(
          decoration: BoxDecoration(
              shape: BoxShape.circle, color: supportColors[index]),
        ),
      ),
    );
  }
}
