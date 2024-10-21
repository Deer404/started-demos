import 'package:flutter/material.dart';
import 'package:flutter_study_demo/pages/muyu/models/image_option.dart';

class ImageOptionItem extends StatelessWidget {
  final ImageOption option;
  final bool active;

  const ImageOptionItem(
      {super.key, required this.option, required this.active});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    Border activeBorder = Border.fromBorderSide(BorderSide(
      color: theme.primaryColor,
    ));
    return Container(
        padding: const EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(
          border: active ? activeBorder : null,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          children: [
            Text(option.name,
                style: const TextStyle(fontWeight: FontWeight.bold)),
            Expanded(
                child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8),
                    child: Image.asset(option.src))),
            Text('每次功德 +${option.min} ~ +${option.max}')
          ],
        ));
  }
}
