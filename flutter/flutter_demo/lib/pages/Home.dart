import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;

  void _onItemTapped(int index) {
    if (index == _selectedIndex) return;
    setState(() {
      _selectedIndex = index;
    });
  }

  final List<Widget> _bottomNavPages = [
    Container(
      color: Colors.red,
      child: const Center(
        child: Text("Page 1"),
      ),
    ),
    Container(
      color: Colors.green,
      child: const Center(
        child: Text("Page 2"),
      ),
    ),
    Container(
      color: Colors.blue,
      child: const Center(
        child: Text("Page 3"),
      ),
    ),
  ];

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // TRY THIS: Try changing the color here to a specific color (to
        // Colors.amber, perhaps?) and trigger a hot reload to see the AppBar
        // change color while the other colors stay the same.
        backgroundColor: Colors.blueGrey,
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: const Text("Demo App"),
      ),
      body: _bottomNavPages[_selectedIndex],
      bottomNavigationBar: Theme(
        data: ThemeData(useMaterial3: false),
        child:BottomAppBar(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          height: 60,
          notchMargin: 5,
          shape: const CircularNotchedRectangle(),
          color: Colors.white,
          child: Row(
            // crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              IconButton(
                icon: const Icon(Icons.search),
                onPressed: () {
                  _onItemTapped(1);
                },
              ),
              const SizedBox(), //中间位置空出
              IconButton(
                icon: const Icon(Icons.account_circle),
                onPressed: () {
                  _onItemTapped(2);
                },
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: SizedBox(
        height: 60.0,
        width: 60.0,
        child: FloatingActionButton(
          onPressed: () {},
          shape: const CircleBorder(),
          child: const Icon(Icons.add),
        ),
      ),
      // 设置 floatingActionButton 在底部导航栏中间
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}
