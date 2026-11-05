/* 58同城 高仿演示 · 页面逻辑 */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const S = { tab: 'home', feedTab: '推荐', city: DB.city, login: false };

/* ---------- 通用组件 ---------- */
function cardHTML(it) {
  return `<div class="card" data-id="${it.id}">
    <div class="pic ${it.g}"><span>${it.e}</span><span class="num">${it.n}图</span></div>
    <div class="info">
      <div class="tt">${it.t}</div>
      <div class="tags">${it.tags.map((t, i) => `<i class="${i === 1 ? 'gray' : i === 2 ? 'green' : ''}">${t}</i>`).join('')}</div>
      <div class="meta">
        <div class="price">${it.price}<small>${it.unit}</small></div>
        <div class="loc">${it.loc} · ${it.time}</div>
      </div>
      <div class="seller"><span class="av">${it.user}</span>${it.uv} · 已认证</div>
    </div>
  </div>`;
}

/* ---------- 首页 ---------- */
function homeHTML() {
  const king = DB.king.map(k => `<div class="king-item" data-cat="${k.t}">
      <div class="kico" style="background:${k.bg}">${k.i}</div><span>${k.t}</span></div>`).join('');
  const banner = DB.banners.map(b => `<div class="banner-slide" style="background:${b.bg}">
      <div class="deco">${b.d}</div><h4>${b.h}</h4><p>${b.p}</p><span class="tag">${b.tag}</span></div>`).join('');
  const dots = DB.banners.map((b, i) => `<i class="${i ? '' : 'on'}"></i>`).join('');
  const hot = DB.hot.map((h, i) => `<div class="hg"><i>${i + 1}</i>${h}</div>`).join('');

  return `<div class="page active" id="p-home">
    <div class="hd">
      <div class="hd-row">
        <div class="hd-city" data-act="city">${S.city}<span class="arw">▼</span></div>
        <div class="hd-search" data-act="search"><span class="ic">🔍</span>
          <span class="sw">热搜</span>望京 一居室
        </div>
        <div class="hd-ico" data-act="msg">🔔<span class="badge">6</span></div>
      </div>
    </div>

    <div class="king">
      <div class="king-grid">${king}</div>
      <div class="king-more" data-act="more">更多分类 <span class="arw">▾</span></div>
    </div>

    <div class="quick">
      <div class="qb" data-act="more"><b>🔥</b><div>租房特惠<em>立减500</em></div></div>
      <div class="qb" data-act="more"><b>🧧</b><div>找工作<em>日结300</em></div></div>
    </div>

    <div class="banner">
      <div class="banner-track" id="bnTrack">${banner}</div>
      <div class="bn-dots">${dots}</div>
    </div>

    <div class="feedtab">
      ${['推荐', '租房', '二手房', '招聘', '二手车'].map(t =>
        `<div class="ft ${t === S.feedTab ? 'on' : ''}" data-ft="${t}">${t}</div>`).join('')}
    </div>
    <div id="feedList">${feedHTML()}</div>

    <div class="hotwrap">
      <div class="hottitle"><b>大家都在搜</b><span>换一批</span></div>
      <div class="hotgrid">${hot}</div>
    </div>
    <div style="text-align:center;color:#bbb;font-size:12px;padding:16px 0">— 已经到底啦，去发布看看 —</div>
  </div>`;
}

function feedHTML() {
  const list = S.feedTab === '推荐' ? DB.feed
    : DB.feed.filter(f => (S.feedTab === '招聘' ? f.cat === '招聘' : f.cat === S.feedTab));
  if (!list.length) return `<div class="empty"><span class="e-ico">📭</span>暂无相关内容</div>`;
  return list.map(cardHTML).join('');
}

/* ---------- 附近页 ---------- */
function nearHTML() {
  const rows = DB.near.map(n => `<div class="card" data-near="1">
      <div class="pic ${n.g}"><span>${n.e}</span></div>
      <div class="info">
        <div class="tt">${n.t}</div>
        <div class="tags"><i class="gray">${n.d}</i></div>
        <div class="meta"><div class="price">${n.p}</div><div class="loc">立即查看 ›</div></div>
      </div></div>`).join('');
  return `<div class="page" id="p-near">
    <div class="near-hd">
      <div class="ntitle" data-act="city">附近好店 · ${S.city}<span class="arw">▼</span></div>
      <div class="nsearch" data-act="search"><span>🔍</span>搜索附近的吃喝玩乐</div>
    </div>
    <div class="mapbox">
      <div class="mp-bg"></div><div class="road r1"></div><div class="road r2"></div><div class="road r3"></div>
      <div class="mcircle"></div>
      <div class="pin me"></div>
      <div class="pin p1"><i>🏠</i></div><div class="pin p2"><i>🍜</i></div>
      <div class="pin p3"><i>🧹</i></div><div class="pin p4"><i>🔧</i></div><div class="pin p5"><i>🚚</i></div>
      <div class="mbar">
        <div class="tx"><b>已为你找到 128 家附近好店</b>基于当前定位 · 朝阳区望京街道</div>
        <div class="go" data-act="search">查看更多</div>
      </div>
    </div>
    <div class="catbar">
      ${['全部', '租房', '美食', '家政', '维修', '搬家', '休闲'].map((c, i) =>
        `<div class="cb ${i ? '' : 'on'}">${c}</div>`).join('')}
    </div>
    <div class="near-list">
      <div class="nl-t"><b>附近推荐</b><span>按距离排序</span></div>
      ${rows}
    </div>
  </div>`;
}

/* ---------- 消息页 ---------- */
function messageHTML() {
  const rows = DB.msgs.map((m, i) => `<div class="msgrow" data-msg="${i}">
      <div class="av" style="background:${m.bg}">${m.i}</div>
      <div class="mc">
        <div class="r1"><span class="nm">${m.n}</span><span class="tm">${m.t}</span></div>
        <div class="r2">${m.m}</div>
      </div>
      ${m.b ? `<div class="ubadge">${m.b}</div>` : ''}
    </div>`).join('');
  return `<div class="page" id="p-message">
    <div class="msg-hd">
      <h3>消息</h3>
      <div class="m-sub">你有 ${DB.msgs.reduce((a, b) => a + b.b, 0)} 条未读消息</div>
    </div>
    <div class="msgtabs">
      <span class="on" data-mt="all">全部</span><span data-mt="unread">未读</span>
      <span data-mt="sys">系统通知</span><span data-mt="ask">咨询</span>
    </div>
    <div class="msglist" id="msgList">${rows}</div>
  </div>`;
}

/* ---------- 我的页 ---------- */
function mineHTML() {
  return `<div class="page" id="p-mine">
    <div class="mine-hd">
      <div class="mh-top"><span class="i" data-act="search">🔍</span>
        <span class="i" data-act="set">⚙️</span></div>
      <div class="mine-user" data-act="login">
        <div class="uav">${S.login ? '张' : '👤'}</div>
        <div>
          <div class="un">${S.login ? '张小淘' : '登录 / 注册'}</div>
          <div class="ut">${S.login ? '已认证 · 普通会员' : '登录后可同步收藏与发布'}</div>
        </div>
        <div class="set">${S.login ? '个人主页 ›' : '立即登录 ›'}</div>
      </div>
    </div>
    <div class="mine-nums">
      <div><b>12</b><span>我的发布</span></div>
      <div><b>36</b><span>我的收藏</span></div>
      <div><b>8</b><span>浏览记录</span></div>
      <div><b>128</b><span>优惠券</span></div>
    </div>
    <div class="mine-card">
      <div class="mc-t">我的订单 <span>全部订单 ›</span></div>
      <div class="mine-grid">
        ${['待付款,💰', '待接单,📝', '进行中,🚚', '待评价,⭐', '退款售后,↩️', '发票管理,🧾', '会员中心,👑', '我的钱包,💳']
          .map(x => { const a = x.split(','); return `<div class="mg"><em>${a[1]}</em><span>${a[0]}</span></div>`; }).join('')}
      </div>
    </div>
    <div class="mine-rows">
      ${['我的发布管理,📋', '我的收藏,⭐', '会员中心,👑', '58钱包,💳', '优惠券,🎫', '邀请好友得现金,🎁', '客服中心,🎧', '设置,⚙️']
        .map(x => { const a = x.split(',');
          return `<div class="mr" data-act="row"><em>${a[1]}</em>${a[0]}<span class="ar">›</span></div>`; }).join('')}
    </div>
    <div style="text-align:center;color:#c5c5c5;font-size:11px;padding:18px 0">58同城 · 版本 11.8.2</div>
  </div>`;
}

/* ---------- 二级页 ---------- */
function openSub(html) {
  $('#subWrap').innerHTML = html;
  const sp = $('#subWrap').firstElementChild;
  $('.statusbar').classList.remove('brand');
  requestAnimationFrame(() => sp && sp.classList.add('show'));
}
function closeSub() {
  const sp = $('#subWrap').firstElementChild;
  if (!sp) return;
  sp.classList.remove('show');
  $('.statusbar').classList.add('brand');
  setTimeout(() => { $('#subWrap').innerHTML = ''; }, 280);
}

function listPage(cat) {
  const list = cat === '全部' ? DB.feed : DB.feed.filter(f => f.cat === cat);
  openSub(`<div class="subpage">
    <div class="sub-hd"><div class="back" data-act="back">‹</div><div class="tit">${cat}</div></div>
    <div class="filter">
      <div class="on">区域 <span class="ar">▾</span></div><div>价格 <span class="ar">▾</span></div>
      <div>筛选 <span class="ar">▾</span></div><div>排序 <span class="ar">▾</span></div>
    </div>
    <div class="sub-body">
      <div style="padding:8px 0">${list.map(cardHTML).join('') || '<div class="empty"><span class="e-ico">📭</span>暂无数据</div>'}</div>
      <div style="text-align:center;color:#bbb;font-size:12px;padding:14px 0">— 没有更多了 —</div>
    </div>
  </div>`);
}

const ATTRS = {
  '租房': [['户型', '1室1厅'], ['面积', '58㎡'], ['楼层', '中层 / 共18层'], ['朝向', '朝南'], ['装修', '精装修'], ['付款', '押一付三']],
  '二手房': [['户型', '2室1厅'], ['面积', '89㎡'], ['楼层', '高层 / 共26层'], ['朝向', '南北通透'], ['房龄', '2015年建'], ['产权', '满五唯一']],
  '招聘': [['职位', '电商运营'], ['薪资', '6-9K'], ['经验', '1-3年'], ['学历', '大专'], ['福利', '五险一金'], ['性质', '全职']],
  '二手车': [['品牌', '大众 朗逸'], ['上牌', '2019年6月'], ['里程', '3.2万公里'], ['排量', '1.5L'], ['变速箱', '自动'], ['标准', '国六']],
  '家政': [['服务', '日常保洁'], ['时长', '2小时起'], ['范围', '全城上门'], ['人员', '持证上岗'], ['保障', '不满意重做'], ['支付', '服务后付款']]
};
const DEF_ATTRS = [['成色', '9成新'], ['数量', '1件'], ['交易', '当面交易'], ['区域', '同城自提'], ['保障', '平台担保'], ['发布', '个人']];

function detailPage(it) {
  const attrs = (ATTRS[it.cat] || DEF_ATTRS).map(a => `<div class="at">${a[0]}<b>${a[1]}</b></div>`).join('');
  const rec = DB.feed.filter(f => f.id !== it.id).slice(0, 3).map(cardHTML).join('');
  openSub(`<div class="subpage">
    <div class="sub-hd"><div class="back" data-act="back">‹</div><div class="tit">${it.cat}详情</div></div>
    <div class="sub-body">
      <div class="det-pic ${it.g}"><span>${it.e}</span><span class="cnt">1 / ${it.n}</span></div>
      <div class="det-box">
        <div class="det-price">${it.price}<small>${it.unit}</small></div>
        <div class="det-title">${it.t}</div>
        <div class="det-tags">${it.tags.map(x => `<i>${x}</i>`).join('')}
          <i>${S.city} · ${it.loc}</i></div>
        <div class="det-attrs">${attrs}
          <div class="at">发布时间<b>${it.time}</b></div>
          <div class="at">信息编号<b>1048${it.id}9923</b></div>
        </div>
      </div>
      <div class="det-sec">
        <h4>详细描述</h4>
        <div class="det-desc">${it.t}。房源/物品真实有效，图片均为实拍，已通过 58 同城平台审核认证。支持实地看样、当面交易，欢迎随时联系，非诚勿扰。如需了解更多细节或预约看样，请通过平台在线沟通，我们将第一时间回复您。</div>
      </div>
      <div class="det-sec">
        <h4>发布者</h4>
        <div class="det-user">
          <div class="av">${it.user}</div>
          <div><div class="un">${it.user}先生/女士</div>
            <div class="us">${it.uv} · 已实名认证 · 好评率 98%</div></div>
          <div class="btn" data-act="chat">在线咨询</div>
        </div>
      </div>
      <div class="det-sec" style="background:transparent;padding:0 8px">
        <h4 style="padding:6px 6px">猜你喜欢</h4>
        ${rec}
      </div>
    </div>
    <div class="det-bar">
      <div class="ib" data-act="fav"><em>⭐</em>收藏</div>
      <div class="ib" data-act="chat"><em>💬</em>聊一聊</div>
      <div class="b1" data-act="chat">在线咨询</div>
      <div class="b2" data-act="call">电话联系</div>
    </div>
  </div>`);
}

function loginPage() {
  openSub(`<div class="login">
    <div class="back" data-act="back" style="position:absolute;left:20px;top:56px;font-size:22px">‹</div>
    <div class="lg">欢迎来到 58 同城</div>
    <div class="ls">未注册的手机号将自动创建 58 账号</div>
    <div class="lin"><span class="pre">+86 ›</span><input placeholder="请输入手机号" value="138 0013 8000"></div>
    <div class="lin"><input placeholder="请输入验证码"><span class="get" data-act="code">获取验证码</span></div>
    <div class="lbtn" data-act="doLogin">登录 / 注册</div>
    <div class="agree">登录即代表同意 <a>《58同城用户协议》</a> 和 <a>《隐私政策》</a>，并授权 58 同城获取本机号码</div>
    <div class="other">
      <div class="ot">其他登录方式</div>
      <div class="oi"><span>💬</span><span>🍎</span><span>📮</span></div>
    </div>
  </div>`);
}

function cityPage() {
  const hot = DB.cityHot.map(c => `<div class="${c === S.city ? 'hot' : ''}" data-city="${c}">${c}</div>`).join('');
  const abc = DB.cityAll.map(s => s.v.map(c =>
    `<div class="row" data-city="${c}"><span class="lf">${s.l}</span>${c}</div>`).join('')).join('');
  openSub(`<div class="subpage">
    <div class="sub-hd"><div class="back" data-act="back">‹</div><div class="tit">选择城市</div></div>
    <div class="city-hd"><div class="cs">🔍 输入城市名或拼音</div></div>
    <div class="sub-body">
      <div class="city-sec">
        <div class="ct">当前定位</div>
        <div class="city-grid" style="grid-template-columns:1fr 1fr 1fr">
          <div class="hot">📍 ${S.city}（GPS定位）</div>
        </div>
      </div>
      <div class="city-sec"><div class="ct">热门城市</div><div class="city-grid">${hot}</div></div>
      <div class="city-sec" style="padding-bottom:0"><div class="ct">全部城市</div></div>
      <div class="city-abc">${abc}</div>
    </div>
  </div>`);
}

/* ---------- 交互 ---------- */
function toast(txt) {
  const t = $('#toast');
  t.textContent = txt;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 1500);
}

function switchTab(tab) {
  if (tab === 'post') { $('#postMask').classList.add('show'); return; }
  S.tab = tab;
  $$('.tab-item').forEach(el => el.classList.toggle('on', el.dataset.tab === tab));
  $$('.page').forEach(p => p.classList.toggle('active', p.id === 'p-' + tab));
  const wrap = $('#pageWrap');
  wrap.scrollTop = 0;
  $('.statusbar').classList.add('brand');
}

function rerenderHome() {
  const old = $('#p-home');
  old.outerHTML = homeHTML();
  bindFeedTab();
  startBanner();
}

function bindFeedTab() {
  $$('.feedtab .ft').forEach(el => el.addEventListener('click', () => {
    S.feedTab = el.dataset.ft;
    $$('.feedtab .ft').forEach(x => x.classList.toggle('on', x === el));
    $('#feedList').innerHTML = feedHTML();
  }));
}

let bnTimer = null, bnIdx = 0;
function startBanner() {
  clearInterval(bnTimer);
  const track = $('#bnTrack');
  if (!track) return;
  bnIdx = 0;
  bnTimer = setInterval(() => {
    bnIdx = (bnIdx + 1) % DB.banners.length;
    track.style.transform = `translateX(-${bnIdx * 100}%)`;
    $$('.bn-dots i').forEach((d, i) => d.classList.toggle('on', i === bnIdx));
  }, 3500);
}

/* 全局事件 */
document.addEventListener('click', e => {
  const tab = e.target.closest('.tab-item');
  if (tab) { switchTab(tab.dataset.tab); return; }

  const act = e.target.closest('[data-act]');
  if (act) {
    const a = act.dataset.act;
    if (a === 'city') cityPage();
    else if (a === 'search') toast('搜索功能演示中');
    else if (a === 'msg') switchTab('message');
    else if (a === 'more') listPage('全部');
    else if (a === 'login' && !S.login) loginPage();
    else if (a === 'login') toast('个人主页演示中');
    else if (a === 'set') toast('设置页演示中');
    else if (a === 'row') toast('功能演示中');
    else if (a === 'back') closeSub();
    else if (a === 'code') toast('验证码已发送（演示）');
    else if (a === 'doLogin') {
      S.login = true; closeSub();
      $('#p-mine').outerHTML = mineHTML();
      toast('登录成功');
    } else if (a === 'chat') toast('已打开在线沟通（演示）');
    else if (a === 'call') toast('正在呼叫 400-618-8000');
    else if (a === 'fav') toast('已加入收藏');
    return;
  }

  const cat = e.target.closest('.king-item');
  if (cat) { listPage(cat.dataset.cat); return; }

  const card = e.target.closest('.card[data-id]');
  if (card) {
    const it = DB.feed.find(f => f.id === +card.dataset.id);
    if (it) detailPage(it);
    return;
  }

  const city = e.target.closest('[data-city]');
  if (city) {
    S.city = city.dataset.city;
    closeSub();
    rerenderHome();
    $('#p-near').outerHTML = nearHTML();
    toast('已切换到' + S.city);
    return;
  }

  const ft = e.target.closest('[data-ft]');
  if (ft) return;

  const mt = e.target.closest('[data-mt]');
  if (mt) {
    $$('.msgtabs span').forEach(s => s.classList.toggle('on', s === mt));
    const list = mt.dataset.mt === 'unread' ? DB.msgs.filter(m => m.b)
      : mt.dataset.mt === 'sys' ? DB.msgs.filter(m => m.i === '🔔' || m.i === '📣')
        : mt.dataset.mt === 'ask' ? DB.msgs.filter(m => m.b && m.i !== '🔔' && m.i !== '📣')
          : DB.msgs;
    $('#msgList').innerHTML = list.map((m, i) => `<div class="msgrow" data-msg="${i}">
      <div class="av" style="background:${m.bg}">${m.i}</div>
      <div class="mc"><div class="r1"><span class="nm">${m.n}</span><span class="tm">${m.t}</span></div>
      <div class="r2">${m.m}</div></div>${m.b ? `<div class="ubadge">${m.b}</div>` : ''}</div>`).join('');
    return;
  }

  const msg = e.target.closest('[data-msg]');
  if (msg) toast('聊天窗口演示中');

  const cb = e.target.closest('.catbar .cb');
  if (cb) {
    $$('.catbar .cb').forEach(x => x.classList.toggle('on', x === cb));
    return;
  }

  if (e.target.closest('#postMask') && !e.target.closest('.post-sheet')) $('#postMask').classList.remove('show');
});

$('#psClose').addEventListener('click', () => $('#postMask').classList.remove('show'));
$$('.ps-item').forEach(el => el.addEventListener('click', () => {
  $('#postMask').classList.remove('show');
  toast('发布「' + el.textContent.trim() + '」演示中');
}));

/* 状态栏时间 */
function tick() {
  const d = new Date();
  $('#sbTime').textContent = d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
}
tick(); setInterval(tick, 30000);

/* 初始化 */
$('#pageWrap').innerHTML = homeHTML() + nearHTML() + messageHTML() + mineHTML();
bindFeedTab();
startBanner();
switchTab('home');
