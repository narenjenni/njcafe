/* NJ Cafe - Order Page (Fixed & Improved) */

const menu = [
  // Minuman
  {id:1,  name:"Espresso", price:18000, cat:"Minuman", img:"assets/menu-01.svg", ingredients:["Arabika single shot"]},
  {id:2,  name:"Americano", price:22000, cat:"Minuman", img:"assets/menu-02.svg", ingredients:["Espresso","Air panas"]},
  {id:3,  name:"Cappuccino", price:28000, cat:"Minuman", img:"assets/menu-03.svg", ingredients:["Espresso","Susu steamed","Foam"]},
  {id:4,  name:"Caffè Latte", price:28000, cat:"Minuman", img:"assets/menu-04.svg", ingredients:["Espresso","Susu steamed"]},
  {id:5,  name:"Caramel Macchiato", price:32000, cat:"Minuman", img:"assets/menu-05.svg", ingredients:["Espresso","Susu","Saus karamel"]},
  {id:6,  name:"Mocha", price:32000, cat:"Minuman", img:"assets/menu-06.svg", ingredients:["Espresso","Susu","Cokelat bubuk"]},
  {id:7,  name:"Matcha Latte", price:32000, cat:"Minuman", img:"assets/menu-07.svg", ingredients:["Matcha","Susu"]},
  {id:8,  name:"Chocolate", price:28000, cat:"Minuman", img:"assets/menu-08.svg", ingredients:["Cokelat bubuk","Susu"]},
  {id:9,  name:"Thai Tea", price:24000, cat:"Minuman", img:"assets/menu-09.svg", ingredients:["Teh Thailand","Susu kental"]},
  {id:10, name:"Lemon Tea", price:20000, cat:"Minuman", img:"assets/menu-10.svg", ingredients:["Teh","Lemon segar"]},
  {id:11, name:"Iced Lychee Tea", price:26000, cat:"Minuman", img:"assets/menu-11.svg", ingredients:["Teh","Leci","Es batu"]},
  {id:12, name:"Strawberry Smoothie", price:30000, cat:"Minuman", img:"assets/menu-12.svg", ingredients:["Stroberi","Yogurt/susu","Es"]},
  {id:13, name:"Mango Smoothie", price:30000, cat:"Minuman", img:"assets/menu-13.svg", ingredients:["Mangga","Yogurt/susu","Es"]},
  // Makanan
  {id:14, name:"Croissant", price:18000, cat:"Makanan", img:"assets/menu-14.svg", ingredients:["Adonan butter berlapis"]},
  {id:15, name:"Donut Glaze", price:12000, cat:"Makanan", img:"assets/menu-15.svg", ingredients:["Donat kentang","Glaze gula"]},
  {id:16, name:"French Fries", price:20000, cat:"Makanan", img:"assets/menu-16.svg", ingredients:["Kentang","Garam","Minyak"]},
  {id:17, name:"Chicken Wings (6pcs)", price:38000, cat:"Makanan", img:"assets/menu-17.svg", ingredients:["Sayap ayam","Marinade pedas"]},
  {id:18, name:"Spaghetti Bolognese", price:38000, cat:"Makanan", img:"assets/menu-18.svg", ingredients:["Tomat","Daging sapi cincang","Herbs"]},
  {id:19, name:"Spaghetti Aglio e Olio", price:34000, cat:"Makanan", img:"assets/menu-19.svg", ingredients:["Bawang putih","Cabai","Olive oil","Peterseli"]},
  {id:20, name:"Chicken Katsu Rice Bowl", price:38000, cat:"Makanan", img:"assets/menu-20.svg", ingredients:["Ayam fillet","Tepung roti","Nasi","Saus"]},
  {id:21, name:"Beef Teriyaki Rice Bowl", price:42000, cat:"Makanan", img:"assets/menu-21.svg", ingredients:["Daging sapi","Saus teriyaki","Nasi","Bawang bombay"]},
  {id:22, name:"Caesar Salad", price:32000, cat:"Makanan", img:"assets/menu-22.svg", ingredients:["Lettuce","Crouton","Parmesan","Dressing"]},
  {id:23, name:"Club Sandwich", price:34000, cat:"Makanan", img:"assets/menu-23.svg", ingredients:["Roti panggang","Dada ayam","Telur","Lettuce","Tomat"]},
  {id:24, name:"Waffle Maple", price:28000, cat:"Makanan", img:"assets/menu-24.svg", ingredients:["Adonan waffle","Maple syrup"]},
  {id:25, name:"Brownies", price:22000, cat:"Makanan", img:"assets/menu-25.svg", ingredients:["Cokelat","Mentega","Telur","Tepung"]},
];

const fmtIDR = n => new Intl.NumberFormat('id-ID', {style:'currency', currency:'IDR', maximumFractionDigits:0}).format(n).replace(",00","");
const TAX = 0.10;

const elGrid = document.getElementById('itemsGrid');
const elSearch = document.getElementById('search');
const elCat = document.getElementById('filterCat');
const elSort = document.getElementById('sort');

// Cart slots (sidebar + drawer)
const slots = {
  side: {
    items: document.getElementById('cartItemsSide'),
    sub: document.getElementById('subtotalSide'),
    tax: document.getElementById('taxSide'),
    tot: document.getElementById('totalSide'),
    count: document.getElementById('cartCountSide'),
    name: document.getElementById('custNameSide'),
    phone: document.getElementById('custPhoneSide'),
    type: document.getElementById('orderTypeSide'),
    note: document.getElementById('orderNoteSide'),
  },
  drawer: {
    items: document.getElementById('cartItemsDrawer'),
    sub: document.getElementById('subtotalDrawer'),
    tax: document.getElementById('taxDrawer'),
    tot: document.getElementById('totalDrawer'),
    count: document.getElementById('cartCountDrawer'),
    name: document.getElementById('custNameDrawer'),
    phone: document.getElementById('custPhoneDrawer'),
    type: document.getElementById('orderTypeDrawer'),
    note: document.getElementById('orderNoteDrawer'),
  }
};

let cart = []; // {key, id, name, price, qty, note}
const keyOf = (id, note) => id + '|' + (note||'');

function renderItems(){
  const q = (elSearch.value||'').toLowerCase();
  const cat = elCat.value;
  const arr = menu.filter(m=> (!q || m.name.toLowerCase().includes(q)) && (!cat || m.cat===cat));
  switch(elSort.value){
    case 'price-asc': arr.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': arr.sort((a,b)=>b.price-a.price); break;
    case 'name-asc': arr.sort((a,b)=>a.name.localeCompare(b.name)); break;
    case 'name-desc': arr.sort((a,b)=>b.name.localeCompare(a.name)); break;
  }
  elGrid.innerHTML = '';
  for(const it of arr){
    const el = document.createElement('article');
    el.className = 'card item-card reveal';
    el.innerHTML = `
      <div class="thumb"><img alt="${it.name}" src="${it.img}"></div>
      <div class="body">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
          <div>
            <h3 style="margin:0">${it.name}</h3>
            <div class="badge">${it.cat}</div>
          </div>
          <div class="price">${fmtIDR(it.price)}</div>
        </div>
        <div class="note">Bahan: ${it.ingredients.join(', ')}</div>
        <textarea rows="2" class="item-note" placeholder='contoh: "tidak pedas ya"'></textarea>
        <div class="qty">
          <button class="btn ghost ripple minus" type="button">−</button>
          <input type="number" class="input item-qty" value="1" min="1" style="width:90px;text-align:center">
          <button class="btn ghost ripple plus" type="button">+</button>
          <button class="btn ripple add" type="button" style="margin-left:auto">Tambah</button>
        </div>
      </div>`;
    elGrid.appendChild(el);

    const qtyInput = el.querySelector('.item-qty');
    el.querySelector('.minus').addEventListener('click', ()=> qtyInput.value = Math.max(1, (parseInt(qtyInput.value||'1',10)-1)));
    el.querySelector('.plus').addEventListener('click', ()=> qtyInput.value = Math.max(1, (parseInt(qtyInput.value||'1',10)+1)));
    el.querySelector('.add').addEventListener('click', ()=>{
      const qty = Math.max(1, parseInt(qtyInput.value||'1',10));
      const note = el.querySelector('.item-note').value.trim();
      addToCart(it, qty, note);
    });
  }
  if(window.attachRipple) attachRipple(document);
  if(window.IntersectionObserver){
    const ob = new IntersectionObserver((en)=>{ en.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); ob.unobserve(e.target); } }); },{threshold:.1});
    document.querySelectorAll('.item-card.reveal').forEach(el=>ob.observe(el));
  }
}

function addToCart(it, qty, note){
  const k = keyOf(it.id, note);
  const found = cart.find(c=>c.key===k);
  if(found) found.qty += qty;
  else cart.push({key:k, id:it.id, name:it.name, price:it.price, qty, note});
  renderCart();
  const badge = document.getElementById('cartCountBadge');
  if(badge){ badge.textContent = (parseInt(badge.textContent||'0',10)+qty); }
}

function removeFromCart(k){ cart = cart.filter(c=>c.key!==k); renderCart(); }
function changeQty(k, delta){
  const f = cart.find(c=>c.key===k);
  if(!f) return;
  f.qty = Math.max(1, f.qty + delta);
  renderCart();
}

function renderCart(){
  let sub=0, count=0;
  const rows = cart.map(c=>{
    sub += c.price * c.qty; count += c.qty;
    return `<div class="row">
      <div style="flex:1;min-width:0">
        <div style="font-weight:700">${c.name} × ${c.qty} <span class="meta">• ${fmtIDR(c.price)}</span></div>
        ${c.note?`<div class="note">Catatan: ${c.note}</div>`:''}
      </div>
      <div style="display:flex;gap:6px;align-items:center">
        <button title="Kurangi" class="btn ghost ripple" onclick='changeQty("${c.key}",-1)'>−</button>
        <button title="Tambah" class="btn ghost ripple" onclick='changeQty("${c.key}",1)'>+</button>
        <button title="Hapus" class="btn ghost ripple" onclick='removeFromCart("${c.key}")'>✕</button>
      </div>
    </div>`;
  }).join('');

  const tax = Math.round(sub * TAX);
  const tot = sub + tax;

  const side = slots.side, dw = slots.drawer;

  side.items.innerHTML = rows || '<div class="note">Belum ada item.</div>';
  side.sub.textContent = fmtIDR(sub);
  side.tax.textContent = fmtIDR(tax);
  side.tot.textContent = fmtIDR(tot);
  side.count.textContent = count;

  dw.items.innerHTML = rows || '<div class="note">Belum ada item.</div>';
  dw.sub.textContent = fmtIDR(sub);
  dw.tax.textContent = fmtIDR(tax);
  dw.tot.textContent = fmtIDR(tot);
  dw.count.textContent = count;

  document.getElementById('cartCountBadge').textContent = count;
}

function readField(name){
  const a = slots.side[name]?.value?.trim?.() || '';
  const b = slots.drawer[name]?.value?.trim?.() || '';
  return b || a;
}

function requireOrder(){
  if(cart.length===0){ alert('Keranjang masih kosong. Tambahkan item terlebih dahulu.'); return false; }
  const name = readField('name');
  const phone= readField('phone');
  if(!name || !phone){ alert('Isi nama & nomor HP terlebih dahulu.'); return false; }
  return true;
}

function buildMessage(method){
  const name = readField('name');
  const phone= readField('phone');
  const type = readField('type') || 'Dine-in';
  const note = readField('note');
  const lines = [];
  lines.push('NJ Cafe — Pesanan Baru');
  lines.push('========================');
  lines.push('Pelanggan : ' + name);
  lines.push('No. HP    : ' + phone);
  lines.push('Tipe      : ' + type);
  if(note) lines.push('Catatan   : ' + note);
  lines.push('');
  lines.push('Item:');
  cart.forEach((c,i)=>{
    const line1 = `${i+1}. ${c.name} × ${c.qty} — ${fmtIDR(c.price * c.qty)}`;
    lines.push(line1);
    if(c.note) lines.push(`   • Catatan: ${c.note}`);
  });
  lines.push('');
  const sub = slots.side.sub.textContent;
  const tax = slots.side.tax.textContent;
  const tot = slots.side.tot.textContent;
  lines.push('Subtotal : ' + sub);
  lines.push('Pajak 10%: ' + tax);
  lines.push('TOTAL    : ' + tot);
  lines.push('');
  const ts = new Date().toLocaleString('id-ID');
  lines.push('Waktu    : ' + ts);
  lines.push('Metode   : ' + method);
  lines.push('========================');
  return lines.join('\n');
}

function sendWhatsApp(){
  if(!requireOrder()) return;
  const msg = buildMessage('WhatsApp');
  const phone = '6281282460257';
  const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
  const alt = 'https://api.whatsapp.com/send?phone=' + phone + '&text=' + encodeURIComponent(msg);
  window.open(url, '_blank') || window.open(alt,'_blank');
}

function sendEmail(){
  if(!requireOrder()) return;
  const subject = encodeURIComponent('Pesanan NJ Cafe — ' + readField('name'));
  const body = encodeURIComponent(buildMessage('Email'));
  const to = 'narenskii@gmail.com';
  const url = `mailto:${to}?subject=${subject}&body=${body}`;
  window.location.href = url;
}

// Drawer controls
const drawer = document.getElementById('drawer');
function openDrawer(){ drawer.classList.add('open'); }
function closeDrawer(){ drawer.classList.remove('open'); }

// Expose for inline handlers
window.changeQty = changeQty;
window.removeFromCart = removeFromCart;
window.sendWhatsApp = sendWhatsApp;
window.sendEmail = sendEmail;
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;

// Render initial
renderItems();
renderCart();

// Filters
elSearch.addEventListener('input', renderItems);
elCat.addEventListener('change', renderItems);
elSort.addEventListener('change', renderItems);
