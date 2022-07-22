# Dartをやる
Dartは、元々JavaScriptの代替を意識して作られていたらしい。だからjsに似ている。最高
そしてDartはコンパイル言語である。これもイイ。

## finalとconstの違い
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
