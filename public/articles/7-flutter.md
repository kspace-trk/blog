# Flutterの基礎知識
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

## よく使われるウィジェット
### Text
```
Text("hello World", style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold,));
```
`style`に`TextStyle`を渡すことで文字スタイルを適用できる。

### Container
```
Container(
  child: Text("Hello World"),
  height: 20,
  width: 40,
)
```
`child`で指定した子要素のウィジェットにデザインやサイズを与えることができる。

### Column
`children` に複数のウィジェットを渡すと、縦方向に並べてくれるウィジェット。

### Row
`children` に複数のウィジェットを渡すと、横方向に並べてくれるウィジェット。

### image
画像を表示するウィジェット
```
const Image(
  image: NetworkImage('http://placekitten.com/g/200/300'),
)
```

### Icon
アイコンを表示できる
```
Icon(
  Icons.arrow_drop_down,
),
```
使用可能なアイコンは、こちらから
https://api.flutter.dev/flutter/material/Icons-class.html

### Scaffold
マテリアルデザインな見た目の画面を簡単に作れるウィジェット。
1枚の画面を作るときに `Scaffold`ウィジェットを最上位のウィジェットとして用いることがとても多い。

```
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Sample Page"),),
      body: Center(
        child: Text("Hello World"),
      ),
    );
  }
}
```
`appBar`と`body`が大事。

## HelloWorldする
Xcodeある環境で、`flutter run`すると、表示をSimulatorかChromeかの2択がでてくる。


## ページ遷移
```
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('title'),
      ),
      body: Center(
        child: ElevatedButton(
          child: Text("tap me"),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => NextPage(),
              ),
            );
          },
        ),
      ),
    );
  }
}
```
Scaffoldのなかのbodyにbuttonを埋め込んでいる。
`onPressed`というものでクリックイベントを呼べるらしい。
その中で`Navigator.push()`することでページ遷移ができるっぽい。

このHomePageクラスは、以下のコードで呼ばれている。
```
class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomePage(),
    );
  }
}
```
`MaterialApp()`というもので呼び出しをされている。その際、ページ遷移アニメーションに`MaterialPageRoute`を使用することができる。
`ElevatedButton`はマテリアルデザインに準拠したボタン。

## 前の画面に戻る方法
```
children: [
  Text("this is next page"),
  ElevatedButton(
      onPressed: () {
        Navigator.pop(context);
      },
      child: Text("back to previous page")),
],
```
`Navigator.pop()`で前の画面に戻れるらしい。

## ウィジェット紹介動画
- Stack；https://www.youtube.com/watch?v=liEGSeD3Zt8&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG&index=80

- HeroMode：https://www.youtube.com/watch?v=AaIASk2u1C0&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG&index=24

- SizedBox：https://www.youtube.com/watch?v=EHPu_DzRfqA&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG&index=100

- Flexible：https://www.youtube.com/watch?v=CI7x0mAZiY0&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG&index=96

- MediaQuery：https://www.youtube.com/watch?v=A3WrA4zAaPw&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG&index=95

- ListView：https://www.youtube.com/watch?v=KJpkjHGiI5A&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG&index=77

- GridView：https://www.youtube.com/watch?v=bLOtZDTm4H8&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG&index=41


## Stack
Stackは重なったウィジェットを作れる。

大きさや中の配置なども設定できる。

Positioned使うと特定の位置に配置できる。

overflow使える。

## HeroMode
Hero
2画面間にアニメーションを追加できる。
Heroの有効化無効化にHeroModeが使用できる

HeroをHeroModeでwrapする。
`enabled: false`みたいな

Nacogatorと共同してルート間でウィジェットがすべきことを追跡する。


## SizedBox
200pxなどのように、サイズを数値指定したい時に使用。
widthとheightできる
子に同じサイズを指示する。

infiniteを指示した場合、親要素の100%にとどまる。

spacerみたいな使い方もできる

## Flexible
相対的なサイズ指定
親サイズが変わった時にいい感じに追従
サイズ指定はcss gridに近い感覚かも

## MediaQUery
iPhoneやiPadでもいい感じにみたいよね

使用しているデバイスのサイズ、ユーザー設定(フォントサイズなど)に応じてレイアウトを構築できる。

`MediaQuery.of(context);`で呼び出せる

```
MediaQuery.of(context).orientation;
```
でデバイスの向きを確認することができる

```
MediaQuery.of(context).textScaleFactor;
```
でデフォルトのフォントサイズを変更したかどうかわかる

## ListView
スクロール可能なリストで項目を一覧表示させたいときに使用。
```
ListView(
  children: [item1, item2, item3]
);
```

水平か垂直かも選べる
スクロール禁止も可

リストが動的に作成される場合、
```
ListView.builder(
  itemBuilder: () => {
    Text('Item $index)
  };
)
```
`ListView.builder`を使用する。

項目間の調整 `ListView.separated`
この場合、リスト内の項目を明示する


## GridView
Grid作る時に使用。

`mainAxisSpacing`でgapが作れる

スクロールできるのがイイ




