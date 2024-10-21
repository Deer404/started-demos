import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_study_demo/pages/paper/color_selector.dart';
import 'package:flutter_study_demo/pages/paper/models/line.dart';
import 'package:flutter_study_demo/pages/paper/paper_painter.dart';
import 'package:flutter_study_demo/pages/paper/stork_width_selector.dart';
import 'package:flutter_study_demo/widgets/conform_dialog.dart';

import 'paper_app_bar.dart';

class Paper extends StatefulWidget {
  const Paper({Key? key}) : super(key: key);

  @override
  State<Paper> createState() => _PaperState();
}

class _PaperState extends State<Paper> {
  final List<Line> _lines = [];
  final List<Line> _historyLines = [];
  int _activeColorIndex = 0;
  int _activeStorkWidthIndex = 0;

  final List<Color> supportColors = [
    Colors.black,
    Colors.red,
    Colors.green,
    Colors.blue,
    Colors.yellow,
    Colors.purple,
  ];

  final List<double> supportStrokeWidths = [1, 2, 4, 6, 8, 10];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PaperAppBar(
        onClear: _showClearDiglog,
        onBack: _lines.isEmpty ? null : _back,
        onRevocation: _historyLines.isEmpty ? null : _revocation,
      ),
      body: Stack(
        children: [
          GestureDetector(
            onPanStart: _onPanStart,
            onPanUpdate: _onPanUpdate,
            child: CustomPaint(
              painter:
                  PaperPainter(lines: _lines, pointMode: PointMode.polygon),
              child: ConstrainedBox(constraints: const BoxConstraints.expand()),
            ),
          ),
          Positioned(
              bottom: 0,
              right: 10,
              child: StorkWidthSelector(
                supportStrokeWidths: supportStrokeWidths,
                color: Colors.black,
                activeIndex: _activeStorkWidthIndex,
                onSelect: _onSelectStorkWidth,
              )),
          Positioned(
              bottom: 40,
              width: 240,
              child: ColorSelector(
                  supportColors: supportColors,
                  onSelect: _onSelectColor,
                  activeIndex: _activeColorIndex))
        ],
      ),
    );
  }

  void _showClearDiglog() {
    String msg = "您的当前操作会清空绘制内容，是否确定删除!";
    showDialog(
        context: context,
        builder: (ctx) => ConfirmDialog(
              msg: msg,
              confirmText: "确定",
              title: "清空提示",
              onConfirm: _clear,
            ));
  }

  void _clear() {
    _lines.clear();
    setState(() {});
  }

  void _onPanStart(DragStartDetails details) {
    _lines.add(Line(
        points: [details.localPosition],
        strokeWidth: supportStrokeWidths[_activeStorkWidthIndex],
        color: supportColors[_activeColorIndex]));
  }

  void _onPanUpdate(DragUpdateDetails details) {
    print("====details:${details.localPosition}====");
    Offset point = details.localPosition;
    double distrance = (point - _lines.last.points.last).distance;
    if (distrance > 5) {
      _lines.last.points.add(details.localPosition);
      setState(() {});
    }
  }

  void _onSelectStorkWidth(int index) {
    if (index != _activeStorkWidthIndex) {
      setState(() {
        _activeStorkWidthIndex = index;
      });
    }
  }

  void _onSelectColor(int index) {
    if (index != _activeColorIndex) {
      setState(() {
        _activeColorIndex = index;
      });
    }
  }

  void _back() {
    Line line = _lines.removeLast();
    _historyLines.add(line);
    setState(() {});
  }

  void _revocation() {
    Line line = _historyLines.removeLast();
    _lines.add(line);
    setState(() {});
  }
}
