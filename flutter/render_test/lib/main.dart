import 'package:flutter/material.dart';

void main() {
  // debugPrintBeginFrameBanner = true;
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    print("MyApp is built");
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const Center(
        child: SizedBox(
          child: MyHomePage(title: 'Flutter Demo Home Page'),
        ),
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    print("MyHomePage is built");
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('$_counter'),
            RepaintBoundary(child: NumberChild(count: _counter)),
            const RepaintBoundary(child: Child()),
            ElevatedButton(
                onPressed: _incrementCounter, child: Text("Increment")),
          ],
        ),
      ),
    );
  }
}

class Child extends StatefulWidget {
  const Child({super.key});

  @override
  State<Child> createState() => _ChildState();
}

class _ChildState extends State<Child> with WidgetsBindingObserver {
  @override
  Widget build(BuildContext context) {
    print("child widget is built");
    return Text("i is a child widget");
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance!.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance!.removeObserver(this);
    print("child widget is disposed");
    super.dispose();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print("child widget is changed");
  }

  @override
  void didUpdateWidget(covariant Child oldWidget) {
    super.didUpdateWidget(oldWidget);
    print("child widget is updated");
  }
}

class NumberChild extends StatelessWidget {
  final int count;
  const NumberChild({super.key, required this.count});

  @override
  StatelessElement createElement() {
    print("NumberChild element is created");
    return super.createElement();
  }

  @override
  Widget build(BuildContext context) {
    return Text("i is a child widget with number $count");
  }
}
