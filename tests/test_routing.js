const assert=require('assert');
const {routeFor}=require('../app.js');
const expected={
  write:['文章生成','SEO支援','校正・要約'],
  meeting:['文字起こし','議事録','ナレッジ整理'],
  design:['画像生成','資料作成','デザイン'],
  agent:['AIエージェント','自動化','API連携'],
  learn:['講座','実践教材','学習コミュニティ']
};
const budgets=['free','small','pro'];
const priorities=['easy','control','team'];
let routes=0;
for(const [goal,categories] of Object.entries(expected)){
  for(const budget of budgets){
    for(const priority of priorities){
      const r=routeFor(goal,budget,priority);
      assert.deepStrictEqual(r.categories,categories);
      assert.ok(r.budgetHint.length>0);
      assert.ok(r.priorityHint.length>0);
      routes++;
    }
  }
}
assert.throws(()=>routeFor('unknown','free','easy'),/unknown goal/);
assert.throws(()=>routeFor('write','unknown','easy'),/unknown budget/);
assert.throws(()=>routeFor('write','free','unknown'),/unknown priority/);
console.log(`${routes} routes PASS + 3 invalid-input guards`);
