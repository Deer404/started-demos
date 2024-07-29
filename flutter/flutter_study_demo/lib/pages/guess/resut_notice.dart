import 'package:flutter/material.dart';

class ResultNotice extends StatelessWidget {
  final Color color;
  final String info;
  final AnimationController controller;
  const ResultNotice({
    super.key,
    required this.color,
    required this.info,
    required this.controller,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
        child: Container(
      alignment: Alignment.center,
      color: color,
      child: AnimatedBuilder(
          animation: controller,
          builder: (context, child) {
            return Text(
              info,
              style: TextStyle(
                  fontSize: 12 + (42 * controller.value),
                  color: Colors.white,
                  fontWeight: FontWeight.bold),
            );
          }),
    ));
  }
}
