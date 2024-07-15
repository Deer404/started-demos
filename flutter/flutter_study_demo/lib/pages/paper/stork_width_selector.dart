import 'package:flutter/material.dart';

class StorkWidthSelector extends StatelessWidget {
  const StorkWidthSelector(
      {super.key,
      required this.supportStrokeWidths,
      required this.activeIndex,
      required this.color,
      required this.onSelect});

  final List<double> supportStrokeWidths;
  final int activeIndex;
  final Color color;
  final ValueChanged<int> onSelect;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: List.generate(supportStrokeWidths.length, _buildByIndex),
      ),
    );
  }

  Widget _buildByIndex(int index) {
    bool isActive = index == activeIndex;
    return GestureDetector(
        onTap: () => onSelect(index),
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 2),
          width: 70,
          height: 18,
          alignment: Alignment.center,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              border: isActive ? Border.all(color: Colors.blue) : null),
          child: Container(
            width: 50,
            color: color,
            height: supportStrokeWidths[index],
          ),
        ));
  }
}
