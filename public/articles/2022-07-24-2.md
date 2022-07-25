# Flutter触ってみる

## 環境構築
https://docs.flutter.dev/get-started/install/macos
このサイトを参考に環境構築した。
PATHは永続的なものを設定した。

## プロジェクト作成
`flutter create proj_name`
ケバブケースは使用できなそう。

## Hello Worldやる
`lib/main.dart`にコードがある。
初期のコードを全部けし、
```
import 'package:flutter/material.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('title'),
        ),
        body: Center(
          child: Text("Hello, Flutter"),
        ),
      ),
    );
  }
}
```
と書いた。