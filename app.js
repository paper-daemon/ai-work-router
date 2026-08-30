function recordUsage(label){try{const k='amase_usage_ai_work_router';const d=JSON.parse(localStorage.getItem(k)||'{"total":0,"labels":{}}');d.total++;d.labels[label]=(d.labels[label]||0)+1;localStorage.setItem(k,JSON.stringify(d));}catch(e){}}
function escHtml(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function safeOfferUrl(value){try{const u=new URL(String(value||''),globalThis.location?.href||'https://example.invalid/');return ['http:','https:'].includes(u.protocol)?u.href:''}catch{return ''}}
const map={write:['文章生成','SEO支援','校正・要約'],meeting:['文字起こし','議事録','ナレッジ整理'],design:['画像生成','資料作成','デザイン'],agent:['AIエージェント','自動化','API連携'],learn:['講座','実践教材','学習コミュニティ']};
const hints={free:'無料枠で入力と出力の癖を確認してから課金候補を絞る。',small:'月額と使用量上限を比べて、毎月使う工程だけ有料化する。',pro:'権限管理・ログ・データ持ち出し条件も比較対象に入れる。'};
const priorityHints={easy:'初期設定の少なさを優先。',control:'API・エクスポート可否を優先。',team:'共有・権限・履歴を優先。'};
function routeFor(goal,budget,priority){
  if(!Object.prototype.hasOwnProperty.call(map,goal))throw new Error('unknown goal');
  if(!Object.prototype.hasOwnProperty.call(hints,budget))throw new Error('unknown budget');
  if(!Object.prototype.hasOwnProperty.call(priorityHints,priority))throw new Error('unknown priority');
  return {categories:[...map[goal]],budgetHint:hints[budget],priorityHint:priorityHints[priority]};
}
function affiliateOffersFor(goal){return (window.AFFILIATE_OFFERS||[]).filter(x=>x&&x.enabled&&Array.isArray(x.tags)&&x.tags.includes(goal)).map(x=>({...x,safeUrl:safeOfferUrl(x.url)})).filter(x=>x.safeUrl);}
if(typeof document!=='undefined'){
  const goalEl=document.querySelector('#goal'),budgetEl=document.querySelector('#budget'),priorityEl=document.querySelector('#priority');
  const adviceEl=document.querySelector('#advice'),offersEl=document.querySelector('#offers'),resultEl=document.querySelector('#result');
  document.querySelector('#run').onclick=()=>{const g=goalEl.value,b=budgetEl.value,p=priorityEl.value;const route=routeFor(g,b,p);recordUsage(g);adviceEl.innerHTML=`<p><b>${route.categories.join(' → ')}</b></p><p>${route.budgetHint}</p><p>${route.priorityHint}</p>`;const slots=affiliateOffersFor(g);offersEl.innerHTML=slots.length?'<h3>候補</h3>'+slots.map(x=>`<p><a target="_blank" rel="sponsored nofollow noopener" href="${escHtml(x.safeUrl)}">${escHtml(x.name)}</a> <small>広告</small></p>`).join(''):'';resultEl.hidden=false};
}
if(typeof module!=='undefined')module.exports={routeFor,affiliateOffersFor,escHtml,safeOfferUrl};
