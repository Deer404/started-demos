import 'package:flutter/material.dart';

class AppNavigation extends StatefulWidget {
  final List<Widget> pages;
  final PageController ctrl;
  final ScrollPhysics physic;
  const AppNavigation(
      {super.key,
      required this.pages,
      required this.ctrl,
      this.physic = const NeverScrollableScrollPhysics()});

  @override
  State<AppNavigation> createState() => _AppNavigationState();
}

class _AppNavigationState extends State<AppNavigation> {
  Widget _buildContent() {
    return PageView(
      physics: widget.physic,
      controller: widget.ctrl,
      children: widget.pages,
    );
  }

  @override
  Widget build(BuildContext context) {
    return _buildContent();
  }
}
