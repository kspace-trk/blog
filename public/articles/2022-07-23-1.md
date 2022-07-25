# Dartをやる
Dartは、元々JavaScriptの代替を意識して作られていたらしい。だからjsに似ている。最高
そしてDartはコンパイル言語である。これもイイ。

## finalとconstの違い
2022-07-22
Dartには、constとfinalというものがある。両者は再代入不可という部分では非常によく似ている。
しかし、異なる点がある。
例えばこのコード
const datetime = DateTime.now();
これは、コードを実行した時刻をdatetimeに記録したいという意図。したがってコンパイル時には定数を格納することができない。
constは、コンパイル時に値を決定するため、上記のコードはエラーとなる
しかし、
final datetime = DateTime.now();
これならいける。
finalは、1度格納した変数には上書きできないというもので、必ずしもコンパイル時に決定する必要はない。

## コンストラクタ
```
class Hoge {
  String name = "";
  Hoge(String name) {
    this.name = name;
  }
}
```
こんなコンストラクタがあったとする

これは以下のように省略することができる
```
class Hoge {
  String name;
  Hoge(String name);
}
```

## forEach
DartのforEachはこうらしい
```
forEach((elem) {
  hoge();
})
```

## 文字列の中に変数をいれて出力
```
'結果：${hoge}'
```

```
"結果：$hoge"
```
ふつうにダブルクォートとかシングルクォートでいけるらしい。
そして波括弧{}もなくてもいけるらしい

しかし、
```
'結果：$hoge(num)'
```
と言った場合は、

```
'結果：${hoge(num)}'
```
波括弧ないとアカンらしい


## 名前付き引数
名前付き引数って？
```
hoge(name: 'keigo');
```
こんな感じで、プロパティ名を指定して引数をわたすこと。

これの受け取り側の書き方は、
```
hoge ({ required String name }) {
  print(name);
}
```
これで受け取ることができる。
必須ではなくoptionalにする場合は、

```
hoge ({ String? name }) {
  print('こんにちは$name');
}
```
みたいにできる。
nameがnullになってもいいようなコードかかなければいけんけどな
