import 'package:flutter/material.dart';

class AnimateText extends StatefulWidget {
  final String text;
  final AnimationController controller;

  const AnimateText({super.key, required this.text, required this.controller});

  @override
  _AnimateTextState createState() => _AnimateTextState();
}

class _AnimateTextState extends State<AnimateText>
    with SingleTickerProviderStateMixin {
  late Animation<double> opacity;
  late Animation<Offset> position;
  late Animation<double> scale;

  @override
  void initState() {
    super.initState();
    opacity = Tween<double>(begin: 1.0, end: 0.0).animate(widget.controller);
    position = Tween<Offset>(begin: const Offset(0, 2), end: Offset.zero)
        .animate(widget.controller);
    scale = Tween<double>(begin: 1.0, end: 0.9).animate(widget.controller);
  }

  @override
  void didUpdateWidget(covariant AnimateText oldWidget) {
    super.didUpdateWidget(oldWidget);
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ScaleTransition(
      scale: scale,
      child: SlideTransition(
        position: position,
        child: FadeTransition(
          opacity: opacity,
          child: Text(widget.text),
        ),
      ),
    );
  }
}
