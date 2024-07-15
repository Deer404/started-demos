import 'package:flutter/material.dart';

class MuyuAssetsImage extends StatefulWidget {
  final String image;
  final VoidCallback onTap;
  const MuyuAssetsImage({
    super.key,
    required this.image,
    required this.onTap,
  });

  @override
  State<MuyuAssetsImage> createState() => _MuyuAssetsImageState();
}

class _MuyuAssetsImageState extends State<MuyuAssetsImage>
    with SingleTickerProviderStateMixin {
  late AnimationController controller;
  late Animation<double> scale;
  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    scale = Tween<double>(begin: 1.0, end: 1.1).animate(controller);
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: GestureDetector(
        onTap: () async {
          widget.onTap();
          await controller.forward();
          controller.reverse();
        },
        child: ScaleTransition(
            scale: scale,
            child: Container(
              height: 200,
              width: 200,
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage(widget.image),
                  fit: BoxFit.cover,
                ),
              ),
            )),
      ),
    );
  }
}
