import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_study_demo/pages/paper/models/line.dart';

class PaperPainter extends CustomPainter {
  PaperPainter({super.repaint, required this.lines}) {
    _paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;
  }

  final List<Line> lines;
  late Paint _paint;

  @override
  void paint(Canvas canvas, Size size) {
    for (final line in lines) {
      drawLine(canvas, line);
    }
  }

  void drawLine(Canvas canvas, Line line) {
    _paint.color = line.color;
    _paint.strokeWidth = line.strokeWidth;
    canvas.drawPoints(PointMode.polygon, line.points, _paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
