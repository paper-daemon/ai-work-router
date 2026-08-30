# Routing contract

AI Work Routerの診断カテゴリは、広告候補から独立した固定ルールです。

## 入力

- 目的: `write / meeting / design / agent / learn`
- 予算: `free / small / pro`
- 重視点: `easy / control / team`

`routeFor(goal, budget, priority)` は、この3入力だけからカテゴリ順・予算ヒント・運用ヒントを返します。affiliate configはこの関数へ入りません。

## 回帰確認

```bash
node tests/test_routing.js
```

5目的 × 3予算 × 3優先度の45組を確認し、カテゴリ順とヒントが空にならないことを固定します。未知のgoal / budget / priorityは明示エラーにします。

このテストは特定AIサービスの性能や成果を保証するものではなく、現在公開しているルーティング規則の再現性だけを確認します。
