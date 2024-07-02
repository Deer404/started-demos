import 'package:flutter/material.dart';
import 'package:flutter_study_demo/pages/muyu/options/audio_option.dart';

class AudioOptionPanel extends StatelessWidget {
  final List<AudioOption> audioOptions;
  final ValueChanged<int> onSelect;
  final int activeIndex;
  const AudioOptionPanel(
      {super.key,
      required this.audioOptions,
      required this.onSelect,
      required this.activeIndex});

  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
