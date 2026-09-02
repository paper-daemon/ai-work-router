# AI Work Router

仕事の目的・予算・運用重視点から、先に比較すべきAIツールのカテゴリを整理する静的Webアプリです。

- 広告なしでも診断機能が成立します。
- `affiliate-config.js` は承認済みプログラムのみ有効化します。
- 提携済み・掲載可能な広告だけ、明示付きで追加する前提です。
- 有効化された広告URLも `http` / `https` 以外は表示せず、名称・URL属性はHTMLエスケープします。
- 特定サービスの性能や成果を保証しません。
- [ルーティング規則と回帰テスト](docs/routing-contract.md)

## Local validation

```bash
node --check app.js
node tests/test_routing.js
```

現在の回帰suiteはルーティング45ケースに加えて、affiliate URLのscheme制限とHTML escape境界も確認します。

## Affiliate rendering boundary

`affiliate-config.js` は内部設定ですが、公開HTMLへ描画する時にもfail-closedにします。`javascript:` 等の非HTTP(S) URLは候補から除外し、広告名と `href` はHTMLとして解釈されないようescapeします。広告の有無や設定値はルーティング判定そのものには影響しません。

## 収益化ポリシー

共通スロット仕様 v1.0。提携承認済みリンクだけを有効化し、広告表記を付けます。診断本体は広告なしでも動作します。

## 現在有効な広告候補

- AIエージェント・自動化: Doraverse
- 画像・デザイン: ConoHa AI Canvas

どちらも診断結果の用途が一致した場合だけ表示します。広告の有無は診断カテゴリ自体の判定には影響しません。

## Affiliate policy
The tool stays useful without affiliate links. Only approved programs may be enabled, with clear disclosure. Unapproved services use normal official links or no link.

## Current monetization
承認済みプログラムだけを広告表記付きで有効化します。診断・チェック機能は広告リンクなしでも利用できます。
