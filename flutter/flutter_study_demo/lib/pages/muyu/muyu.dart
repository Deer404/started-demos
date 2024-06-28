import 'dart:math';

import 'package:flame_audio/flame_audio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_study_demo/pages/muyu/animate_text.dart';
import 'package:flutter_study_demo/pages/muyu/count_panel.dart';
import 'package:flutter_study_demo/pages/muyu/muyu_assets_image.dart';

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
  int _counter = 0;
  int _cruValue = 0;
  late final Random _random = Random();
  late final AudioPool? pool;

  void _toHistory() {}

  void _onTapSwitchAudio() {}

  void _onTapSwitchImage() {}

  void _onKnock() {
    pool?.start();
    setState(() {
      _cruValue = 1 + _random.nextInt(3);
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
                  image: "assets/images/muyu.png",
                  onTap: _onKnock,
                ),
                if (_counter != 0) AnimateText(text: "功德+$_cruValue")
              ],
            )),
          ],
        ));
  }
}
