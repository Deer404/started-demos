import 'package:flutter/material.dart';

class AppNavigation extends StatefulWidget {
  const AppNavigation(
      {super.key,
      required this.pages,
      required this.ctrl,
      this.physic = const NeverScrollableScrollPhysics(),
      this.initialIndex = 0});

  final List<Widget> pages;
  final PageController ctrl;
  final ScrollPhysics physic;
  final int initialIndex;

  @override
  State<AppNavigation> createState() => _AppNavigationState();
}

class _AppNavigationState extends State<AppNavigation> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      widget.ctrl.jumpToPage(widget.initialIndex);
    });
  }

  @override
  Widget build(BuildContext context) {
    return _buildContent();
  }

  Widget _buildContent() {
    return PageView(
      physics: widget.physic,
      controller: widget.ctrl,
      children: widget.pages,
    );
  }
}
