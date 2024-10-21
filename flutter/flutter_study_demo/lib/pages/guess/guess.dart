import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_study_demo/pages/guess/guess_app_bar.dart';
import 'package:flutter_study_demo/pages/guess/resut_notice.dart';

class GuessPage extends StatefulWidget {
  const GuessPage({super.key});

  @override
  State<GuessPage> createState() => _GuessPageState();
}

class _GuessPageState extends State<GuessPage>
    with SingleTickerProviderStateMixin {
  bool _guessing = false;
  int _value = 0;
  bool? _isBig;

  late final TextEditingController _guessCtrl = TextEditingController();
  late final Random _random = Random();
  late final AnimationController _animatedContainer = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 200),
  );
  void _generateRandomValue() {
    setState(() {
      _guessing = true; // 点击按钮时，表示游戏开始
      _value = _random.nextInt(100);
      print(_value);
    });
  }

  void _onCheck() {
    print("=====Check:目标数值:$_value=====${_guessCtrl.text}============");

    int? guessValue = int.tryParse(_guessCtrl.text);
    // 游戏未开始，或者输入非整数，无视
    // if (!_guessing || guessValue == null) {

    // }
    if (!_guessing) {
      const snackBar = SnackBar(
        content: Text('请先点击生成随机数值'),
        duration: Duration(seconds: 1),
      );
      ScaffoldMessenger.of(context).showSnackBar(snackBar);
      return;
    }

    if (guessValue == null) {
      const snackBar = SnackBar(
        content: Text('请输入整数'),
        duration: Duration(seconds: 1),
      );
      ScaffoldMessenger.of(context).showSnackBar(snackBar);
      return;
    }

    //猜对了
    if (guessValue == _value) {
      setState(() {
        _isBig = null;
        _guessing = false;
      });
      return;
    }

    // 猜错了
    setState(() {
      _isBig = guessValue > _value;
    });

    _animatedContainer.forward(from: 0);
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    _guessCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    var floatingActionButton = FloatingActionButton(
      onPressed: _guessing ? null : _generateRandomValue,
      backgroundColor: _guessing ? Colors.grey : Colors.blue,
      tooltip: 'Increment',
      child: const Icon(Icons.generating_tokens_outlined),
    );
    return Scaffold(
      floatingActionButton: floatingActionButton,
      body: Stack(
        children: [
          if (_isBig != null)
            Column(
              children: [
                if (_isBig!)
                  ResultNotice(
                    color: Colors.redAccent,
                    info: "大了",
                    controller: _animatedContainer,
                  ),
                const Spacer(),
                if (!_isBig!)
                  ResultNotice(
                    color: Colors.blueAccent,
                    info: "小了",
                    controller: _animatedContainer,
                  )
              ],
            ),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                if (!_guessing)
                  const Text(
                    '点击生成随机数值',
                  ),
                Text(
                  _guessing ? '**' : '$_value',
                  style: const TextStyle(
                      fontSize: 68, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
        ],
      ),
      appBar: GuessAppBar(
        onCheck: _onCheck,
        controller: _guessCtrl,
      ),
    );
  }
}
