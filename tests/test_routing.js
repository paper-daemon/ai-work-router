const assert=require('assert');
global.location={href:'https://paper-daemon.github.io/ai-work-router/'};
global.window={AFFILIATE_OFFERS:[
  {enabled:true,tags:['write'],name:'Safe <Tool>',url:'https://example.com/?a=1&b=2'},
  {enabled:true,tags:['write'],name:'Unsafe Tool',url:'javascript:alert(1)'},
  {enabled:false,tags:['write'],name:'Disabled Tool',url:'https://disabled.example/'}
]};
const {routeFor,affiliateOffersFor,escHtml,safeOfferUrl}=require('../app.js');
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
const offers=affiliateOffersFor('write');
assert.equal(offers.length,1);
assert.equal(offers[0].name,'Safe <Tool>');
assert.equal(safeOfferUrl('javascript:alert(1)'),'');
assert.equal(escHtml('<b>x</b>'),'&lt;b&gt;x&lt;/b&gt;');
assert.match(offers[0].safeUrl,/^https:\/\/example\.com\//);
console.log(`${routes} routes PASS + affiliate safety guards`);
