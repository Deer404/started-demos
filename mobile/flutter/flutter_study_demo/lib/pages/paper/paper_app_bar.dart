import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_study_demo/pages/paper/backup_buttons.dart';

class PaperAppBar extends StatelessWidget implements PreferredSizeWidget {
  final VoidCallback onClear;
  final VoidCallback? onBack;
  final VoidCallback? onRevocation;
  const PaperAppBar({
    super.key,
    required this.onClear,
    required this.onBack,
    required this.onRevocation,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      centerTitle: true,
      elevation: 0,
      systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarIconBrightness: Brightness.dark,
          statusBarColor: Colors.transparent),
      backgroundColor: Colors.white,
      title: const Text(
        '画板绘制',
        style: TextStyle(color: Colors.black, fontSize: 16),
      ),
      leadingWidth: 100,
      leading: BackupButtons(onBack: onBack, onRevocation: onRevocation),
      actions: [
        IconButton(
            splashRadius: 20,
            onPressed: onClear,
            icon: const Icon(
              CupertinoIcons.delete,
              color: Colors.black,
              size: 20,
            ))
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
