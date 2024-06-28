import 'package:flutter/material.dart';
import 'package:flutter_study_demo/pages/guess/guess.dart';
import 'package:flutter_study_demo/pages/muyu/muyu.dart';
import 'package:flutter_study_demo/widgets/app_bottom_bar.dart';
import 'package:flutter_study_demo/widgets/app_navigation.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _currentIndex = 0;
  final pageController = PageController();
  final pageList = <Widget>[const GuessPage(), const MuyuPage()];
  final List<MenuData> menus = [
    const MenuData(icon: Icons.home, label: 'Home'),
    const MenuData(icon: Icons.settings, label: 'Settings'),
  ];

  void _onMenuTap(int index) {
    if (index > pageList.length - 1) return;
    pageController.jumpToPage(index);
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  void dispose() {
    pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AppNavigation(pages: pageList, ctrl: pageController),
      bottomNavigationBar: AppBottomBar(
          menus: menus, onItemTap: _onMenuTap, currentIndex: _currentIndex),
    );
  }
}
