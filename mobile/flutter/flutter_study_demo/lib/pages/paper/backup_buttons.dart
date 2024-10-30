import 'package:flutter/material.dart';

class BackupButtons extends StatelessWidget {
  const BackupButtons(
      {super.key, required this.onBack, required this.onRevocation});

  final VoidCallback? onBack;
  final VoidCallback? onRevocation;

  @override
  Widget build(BuildContext context) {
    const BoxConstraints cts = BoxConstraints(minHeight: 32, minWidth: 32);
    Color backColor = onBack == null ? Colors.grey : Colors.black;
    Color revocationColor = onRevocation == null ? Colors.grey : Colors.black;
    return Center(
      child: Wrap(
        children: [
          Transform.scale(
            scaleX: -1,
            child: IconButton(
              splashRadius: 20,
              constraints: cts,
              onPressed: onBack,
              icon: Icon(
                Icons.next_plan_outlined,
                color: backColor,
              ),
            ),
          ),
          IconButton(
            splashRadius: 20,
            constraints: cts,
            onPressed: onRevocation,
            icon: Icon(
              Icons.next_plan_outlined,
              color: revocationColor,
            ),
          ),
        ],
      ),
    );
  }
}
