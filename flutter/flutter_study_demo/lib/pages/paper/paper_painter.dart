import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_study_demo/pages/paper/models/line.dart';

class PaperPainter extends CustomPainter {
  PaperPainter(
      {super.repaint,
      required this.lines,
      this.pointMode = PointMode.polygon}) {
    _paint = Paint()
      // 线框类型 stroke 才可以设置storkeWidth
      ..style = PaintingStyle.stroke
      // strokeCap 画笔笔触类型
      ..strokeCap = StrokeCap.round;
  }

  final List<Line> lines;
  late Paint _paint;
  final PointMode pointMode;

  @override
  void paint(Canvas canvas, Size size) {
    for (final line in lines) {
      drawLine(canvas, line);
    }
  }

  void drawLine(Canvas canvas, Line line) {
    _paint.color = line.color;
    _paint.strokeWidth = line.strokeWidth;
    canvas.drawPoints(pointMode, line.points, _paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
