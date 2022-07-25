# GitでpushとかするときにSSHのパスワードを省略する
2022-07-25
```
ssh-add <ssh鍵の場所>
```
```
Enter passphrase for SSH鍵名:
```
でパスワードを打つ

```
ssh-add -l
```
で登録されているか確認

`~/.ssh/config` にSSH keyのパスワードを記憶するよう設定できる

```
# common
Host *
 UseKeychain yes
 AddKeysToAgent yes
```

共通で全てのHostに適応できる
