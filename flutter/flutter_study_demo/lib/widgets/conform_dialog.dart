import 'package:flutter/material.dart';

class ConfirmDialog extends StatelessWidget {
  const ConfirmDialog(
      {super.key,
      required this.title,
      required this.msg,
      required this.onConfirm,
      this.confirmText = "确认",
      this.cancelText = "取消"});

  final String title;
  final String msg;
  final String confirmText;
  final String cancelText;
  final VoidCallback onConfirm;

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            _buildTitle(),
            _buildMessage(),
            _buildButtons(context),
          ],
        ),
      ),
    );
  }

  Widget _buildTitle() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(Icons.warning, color: Colors.yellow),
        const SizedBox(width: 10.0),
        Text(
          title,
          style: const TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
        ),
      ],
    );
  }

  Widget _buildMessage() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0),
      child: Text(msg),
    );
  }

  Widget _buildButtons(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: Text(cancelText),
        ),
        const SizedBox(width: 10.0), // Add some space (10 pixels
        TextButton(
          onPressed: () {
            onConfirm();
            Navigator.of(context).pop();
          },
          child: Text(confirmText),
        ),
      ],
    );
  }
}
