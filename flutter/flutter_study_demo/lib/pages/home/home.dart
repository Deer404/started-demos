import 'package:flutter/material.dart';
import 'package:flutter_study_demo/pages/guess/guess.dart';
import 'package:flutter_study_demo/pages/muyu/muyu_page.dart';
import 'package:flutter_study_demo/pages/paper/paper.dart';
import 'package:flutter_study_demo/widgets/app_bottom_bar.dart';
import 'package:flutter_study_demo/widgets/app_navigation.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _currentIndex = 2;
  final pageController = PageController();
  final pageList = <Widget>[const GuessPage(), const MuyuPage(), const Paper()];
  final List<MenuData> menus = [
    const MenuData(icon: Icons.home, label: 'Guess'),
    const MenuData(icon: Icons.mood, label: 'Muyu'),
    const MenuData(icon: Icons.color_lens, label: 'Paper'),
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
