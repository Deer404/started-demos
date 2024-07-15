import 'dart:math';

import 'package:flame_audio/flame_audio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_study_demo/pages/muyu/animate_text.dart';
import 'package:flutter_study_demo/pages/muyu/audio_option_panel.dart';
import 'package:flutter_study_demo/pages/muyu/count_panel.dart';
import 'package:flutter_study_demo/pages/muyu/image_option_panel.dart';
import 'package:flutter_study_demo/pages/muyu/models/image_option.dart';
import 'package:flutter_study_demo/pages/muyu/models/metrit_record.dart';
import 'package:flutter_study_demo/pages/muyu/muyu_assets_image.dart';
import 'package:flutter_study_demo/pages/muyu/options/audio_option.dart';
import 'package:flutter_study_demo/pages/muyu/record_history.dart';
import 'package:uuid/v4.dart';

class MuyuPage extends StatefulWidget {
  const MuyuPage({super.key});

  @override
  State<MuyuPage> createState() => _MuyuPageState();
}

class _MuyuPageState extends State<MuyuPage>
    with SingleTickerProviderStateMixin {
  late final AudioPool? pool;
  late final Random _random = Random();
  late final AnimationController _controller;
  int _counter = 0;
  int _cruValue = 0;

  final List<ImageOption> imageOptions = const [
    ImageOption('基础版', 'assets/images/muyu.png', 1, 3),
    ImageOption('尊享版', 'assets/images/muyu2.png', 3, 6),
  ];
  int _activeImageIndex = 0;
  final List<AudioOption> audioOptions = const [
    AudioOption('音效1', 'muyu_1.mp3'),
    AudioOption('音效2', 'muyu_2.mp3'),
    AudioOption('音效3', 'muyu_3.mp3'),
  ];

  final List<MeritRecord> _records = [];

  int _activeAudioIndex = 0;
  String get activeImage => imageOptions[_activeImageIndex].src;
  String get activeAudio => audioOptions[_activeAudioIndex].src;

// 敲击是增加值
  int get knockValue {
    int min = imageOptions[_activeImageIndex].min;
    int max = imageOptions[_activeImageIndex].max;
    return min + _random.nextInt(max + 1 - min);
  }

  void _toHistory() {
    Navigator.of(context).push(MaterialPageRoute(
        builder: (_) => RecordHistory(records: _records.reversed.toList())));
  }

  void _onTapSwitchAudio() {
    showCupertinoModalPopup(
      context: context,
      builder: (BuildContext context) {
        return AudioOptionPanel(
          audioOptions: audioOptions,
          activeIndex: _activeAudioIndex,
          onSelect: _onSelectAudio,
        );
      },
    );
  }

  void _onSelectAudio(int value) async {
    Navigator.of(context).pop();
    if (value == _activeAudioIndex) return;
    _activeAudioIndex = value;
    pool = await FlameAudio.createPool(
      activeAudio,
      maxPlayers: 1,
    );
  }

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
    _controller.forward(from: 0);
    setState(() {
      _cruValue = knockValue;
      _counter += _cruValue;
      String id = UuidV4().generate();
      _records.add(MeritRecord(
          id: id,
          timestamp: DateTime.now().millisecondsSinceEpoch,
          value: _cruValue,
          image: activeImage,
          audio: activeAudio));
    });
  }

  @override
  void initState() {
    super.initState();
    _initAudioPool();
    _controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
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
                child: Column(
              // alignment: Alignment.topCenter,
              children: [
                if (_counter != 0)
                  Positioned(
                      top: 0,
                      child: AnimateText(
                        text: "功德+$_cruValue",
                        controller: _controller,
                      )),
                const Spacer(),
                MuyuAssetsImage(
                  image: activeImage,
                  onTap: _onKnock,
                ),
              ],
            )),
          ],
        ));
  }
}
