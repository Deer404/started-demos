import 'dart:math';

import 'package:flame_audio/flame_audio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_study_demo/pages/muyu/animate_text.dart';
import 'package:flutter_study_demo/pages/muyu/count_panel.dart';
import 'package:flutter_study_demo/pages/muyu/models/image_option.dart';
import 'package:flutter_study_demo/pages/muyu/muyu_assets_image.dart';
import 'package:flutter_study_demo/pages/muyu/options/select_image.dart';

class MeritRecord {
  final String id;
  final int timestamp;
  final int value;
  final String image;
  final String audio;

  MeritRecord(
      {required this.id,
      required this.timestamp,
      required this.value,
      required this.image,
      required this.audio});
  Map<String, dynamic> toJson() => {
        'id': id,
        'timestamp': timestamp,
        'value': value,
        'image': image,
        'audio': audio
      };
}

class AudioOption {
  final String name;
  final String src;

  const AudioOption(this.name, this.src);
}

class ImageOptions {
  final String name;
  final String src;
  final int min;
  final int max;

  const ImageOptions(this.name, this.src, this.min, this.max);
}

class MuyuPage extends StatefulWidget {
  const MuyuPage({super.key});

  @override
  State<MuyuPage> createState() => _MuyuPageState();
}

class _MuyuPageState extends State<MuyuPage> {
  late final AudioPool? pool;
  late final Random _random = Random();
  int _counter = 0;
  int _cruValue = 0;

  final List<ImageOption> imageOptions = const [
    ImageOption('基础版', 'assets/images/muyu.png', 1, 3),
    ImageOption('尊享版', 'assets/images/muyu2.png', 3, 6),
  ];
  int _activeImageIndex = 0;
  String get activeImage => imageOptions[_activeImageIndex].src;

// 敲击是增加值
  int get knockValue {
    int min = imageOptions[_activeImageIndex].min;
    int max = imageOptions[_activeImageIndex].max;
    return min + _random.nextInt(max + 1 - min);
  }

  void _toHistory() {}

  void _onTapSwitchAudio() {}

  void _onTapSwitchImage() {
    showCupertinoModalPopup(
        context: context,
        builder: (BuildContext context) {
          return ImageOptionPanel(
              imageOptions: imageOptions,
              activeIndex: _activeImageIndex,
              onSelect: _onSelectImage);
        });
  }

  void _onSelectImage(int value) {
    Navigator.of(context).pop();
    if (value == _activeImageIndex) return;
    setState(() {
      _activeImageIndex = value;
    });
  }

  void _onKnock() {
    pool?.start();
    setState(() {
      _cruValue = knockValue;
      _counter += _cruValue;
    });
  }

  @override
  void initState() {
    super.initState();
    _initAudioPool();
  }

  void _initAudioPool() async {
    pool = await FlameAudio.createPool(
      'muyu_1.mp3',
      maxPlayers: 4,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          elevation: 0,
          backgroundColor: Colors.white,
          titleTextStyle: const TextStyle(
              color: Colors.black, fontSize: 16, fontWeight: FontWeight.bold),
          iconTheme: const IconThemeData(color: Colors.black),
          title: const Text("电子木鱼"),
          actions: [
            IconButton(onPressed: _toHistory, icon: const Icon(Icons.history))
          ],
        ),
        body: Column(
          children: [
            Expanded(
                child: CountPanel(
                    count: _counter,
                    onTapSwitchAudio: _onTapSwitchAudio,
                    onTapSwitchImage: _onTapSwitchImage)),
            Expanded(
                child: Stack(
              alignment: Alignment.topCenter,
              children: [
                MuyuAssetsImage(
                  image: activeImage,
                  onTap: _onKnock,
                ),
                if (_counter != 0)
                  Positioned(top: 0, child: AnimateText(text: "功德+$_cruValue"))
              ],
            )),
          ],
        ));
  }
}

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
