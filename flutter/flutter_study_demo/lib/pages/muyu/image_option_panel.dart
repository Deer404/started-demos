import 'package:flutter/material.dart';
import 'package:flutter_study_demo/pages/muyu/models/image_option.dart';
import 'package:flutter_study_demo/pages/muyu/options/select_image.dart';

class ImageOptionPanel extends StatelessWidget {
  final List<ImageOption> imageOptions;
  final ValueChanged<int> onSelect;
  final int activeIndex;

  const ImageOptionPanel({
    super.key,
    required this.imageOptions,
    required this.activeIndex,
    required this.onSelect,
  });

  Widget _buildByIndex(int index) {
    bool active = index == activeIndex;
    return GestureDetector(
      onTap: () => onSelect(index),
      child: ImageOptionItem(
        option: imageOptions[index],
        active: active,
      ),
    );
  }

  @override
  Widget build(Object context) {
    const TextStyle labelStyle =
        TextStyle(fontSize: 16, fontWeight: FontWeight.bold);
    const EdgeInsets padding =
        EdgeInsets.symmetric(horizontal: 8.0, vertical: 16);
    return Material(
      child: SizedBox(
        height: 300,
        child: Column(
          children: [
            Container(
              height: 46,
              alignment: Alignment.center,
              child: const Text(
                "选择木鱼",
                style: labelStyle,
              ),
            ),
            Expanded(
                child: Padding(
              padding: padding,
              child: Row(
                children: [
                  Expanded(child: _buildByIndex(0)),
                  const SizedBox(width: 10),
                  Expanded(child: _buildByIndex(1)),
                ],
              ),
            ))
          ],
        ),
      ),
    );
  }
}
