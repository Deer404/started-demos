class MeritRecord {
  final String id;
  final int timestamp;
  final int value;
  final String image;
  final String audio;

  MeritRecord(
      {required this.id,
      required this.timestamp,
      required this.value,
      required this.image,
      required this.audio});
  Map<String, dynamic> toJson() => {
        'id': id,
        'timestamp': timestamp,
        'value': value,
        'image': image,
        'audio': audio
      };
}
