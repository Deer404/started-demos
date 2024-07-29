import 'package:flutter/material.dart';
import 'package:flutter_study_demo/pages/muyu/models/metrit_record.dart';
import 'package:intl/intl.dart';

class RecordHistory extends StatelessWidget {
  final List<MeritRecord> records;
  RecordHistory({super.key, required this.records});
  final DateFormat format = DateFormat('yyyy年MM月dd日 HH:mm:ss');
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: records.isNotEmpty
          ? ListView.builder(
              itemBuilder: _buildItem,
              itemCount: records.length,
            )
          : const Center(child: Text('暂无记录')),
    );
  }

  Widget? _buildItem(BuildContext context, int index) {
    MeritRecord merit = records[index];
    String date =
        format.format(DateTime.fromMillisecondsSinceEpoch(merit.timestamp));
    return ListTile(
        leading: CircleAvatar(
          backgroundColor: Colors.blue,
          backgroundImage: AssetImage(merit.image),
        ),
        title: Text('功德 +${merit.value}'),
        subtitle: Text(merit.audio),
        trailing: Text(
          date,
          style: const TextStyle(fontSize: 12, color: Colors.grey),
        ));
  }

  PreferredSizeWidget _buildAppBar() => AppBar(
        iconTheme: const IconThemeData(color: Colors.black),
        centerTitle: true,
        title: const Text('功德记录',
            style: TextStyle(color: Colors.black, fontSize: 16)),
        elevation: 0,
        backgroundColor: Colors.white,
      );
}
