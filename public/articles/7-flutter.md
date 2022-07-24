# Flutter触った
2022-07-24
流し読み防止のために、学んだことをメモしていく。

## ウィジェット
Flutterでは、ウィジェットを組み合わせてUIを作る。
Flutterにはベースとなる4つのウィジェットがある。

## 1. StatelessWidget
状態を持たないウィジェット。
使い方
```
class MyWidget extends StatelessWidget
```
StatelessWidgetを継承したウィジェットは、フィールドが全てfinalで宣言されてなければならないらしい。
```
class MyWidget extends StatelessWidget {
  final String title;
  // count は final で宣言されていないため、警告が表示される
  int count;

  MyWidget(this.title, {this.count = 0});
}
```
あとWidget build()をoverrideして実行。

## Widget build()
```
class MyWidget extends StatelessWidget {
  // メソッドをオーバーライドする際は @override アノテーションを付与する
  @override
  Widget build(BuildContext context) {
    return Text("This is StatelessWidget.");
  }
}
```
Widget buildでは、必ずWidget型をreturnする必要がある。
上記の例だと、Textを返している。

### @override
@overrideはアノテーションの一種。アノテーションとは、ここでは「overrideやで」ということを伝えるための注釈？みたいなもの
役割
```
class MyWidget extends StatelessWidget {
  // メソッドをオーバーライドする際は @override アノテーションを付与する
  @override
  Widget build(BuildContext context) {
    return Text("This is StatelessWidget.");
  }
}
```
こちらのコードの場合、`StatelessWidget`を継承しているから`Widget`が使えている。
そのWidgetをMyWidget側から書き換えをし、`Text("This is StatelessWidget.")`というウィジェットを増やしている。書き換えをしているので、`@override`を使用する。みたいな認識でいる(あってるかわからん)

## 2. StatefulWidget
StatelessWidghetは、静的なウィジェットなのにたいして、StatefulWidgetは、動的な値を保持するウィジェットである。という認識。

## 3. InheritedWidget
ウィジェットツリー配下のウィジェットに、自身が持っている情報を伝達できるウィジェット。
propsみたいな感じ？
自作する機会は少ないらしい。

## 4. RenderObjectWidget
要は描画をするものらしい。
描画を行うWidgetは、RenderObjectWidgetを継承した何かしらのウィジェットを生成している。