/* NJ Cafe - Order Page Logic */

const menu = [
  // Minuman
  {id:1,  name:"Espresso", price:18000, cat:"Minuman", img:"https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1400&auto=format&fit=crop"},
  {id:2,  name:"Americano", price:22000, cat:"Minuman", img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1400&auto=format&fit=crop"},
  {id:3,  name:"Cappuccino", price:28000, cat:"Minuman", img:"https://images.unsplash.com/photo-1494314671902-399b18174975?q=80&w=1400&auto=format&fit=crop"},
  {id:4,  name:"Caffè Latte", price:28000, cat:"Minuman", img:"https://images.unsplash.com/photo-1503481766315-7a586b20f66d?q=80&w=1400&auto=format&fit=crop"},
  {id:5,  name:"Caramel Macchiato", price:32000, cat:"Minuman", img:"https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1400&auto=format&fit=crop"},
  {id:6,  name:"Mocha", price:32000, cat:"Minuman", img:"https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1400&auto=format&fit=crop"},
  {id:7,  name:"Matcha Latte", price:32000, cat:"Minuman", img:"https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=1400&auto=format&fit=crop"},
  {id:8,  name:"Chocolate", price:28000, cat:"Minuman", img:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1400&auto=format&fit=crop"},
  {id:9,  name:"Thai Tea", price:24000, cat:"Minuman", img:"https://images.unsplash.com/photo-1530373239216-42518e6b4066?q=80&w=1400&auto=format&fit=crop"},
  {id:10, name:"Lemon Tea", price:20000, cat:"Minuman", img:"https://images.unsplash.com/photo-1600275669439-f5919944a9aa?q=80&w=1400&auto=format&fit=crop"},
  {id:11, name:"Iced Lychee Tea", price:26000, cat:"Minuman", img:"https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1400&auto=format&fit=crop"},
  {id:12, name:"Strawberry Smoothie", price:30000, cat:"Minuman", img:"https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=1400&auto=format&fit=crop"},
  {id:13, name:"Mango Smoothie", price:30000, cat:"Minuman", img:"https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=1400&auto=format&fit=crop"},
  // Makanan
  {id:14, name:"Croissant", price:18000, cat:"Makanan", img:"https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1400&auto=format&fit=crop"},
  {id:15, name:"Donut Glaze", price:12000, cat:"Makanan", img:"https://images.unsplash.com/photo-1483691278019-cb7253bee49f?q=80&w=1400&auto=format&fit=crop"},
  {id:16, name:"French Fries", price:20000, cat:"Makanan", img:"https://images.unsplash.com/photo-1550450005-8707de31f9c4?q=80&w=1400&auto=format&fit=crop"},
  {id:17, name:"Chicken Wings (6pcs)", price:38000, cat:"Makanan", img:"https://images.unsplash.com/photo-1625944525501-276044f5c225?q=80&w=1400&auto=format&fit=crop"},
  {id:18, name:"Spaghetti Bolognese", price:38000, cat:"Makanan", img:"https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1400&auto=format&fit=crop"},
  {id:19, name:"Spaghetti Aglio e Olio", price:34000, cat:"Makanan", img:"https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1400&auto=format&fit=crop"},
  {id:20, name:"Chicken Katsu Rice Bowl", price:38000, cat:"Makanan", img:"https://images.unsplash.com/photo-1625944525146-5ae746cf9673?q=80&w=1400&auto=format&fit=crop"},
  {id:21, name:"Beef Teriyaki Rice Bowl", price:42000, cat:"Makanan", img:"https://images.unsplash.com/photo-1625944525079-3b85a3f844cc?q=80&w=1400&auto=format&fit=crop"},
  {id:22, name:"Caesar Salad", price:32000, cat:"Makanan", img:"https://images.unsplash.com/photo-1551892374-ecf8754cf8f2?q=80&w=1400&auto=format&fit=crop"},
  {id:23, name:"Club Sandwich", price:34000, cat:"Makanan", img:"https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=1400&auto=format&fit=crop"},
  {id:24, name:"Waffle Maple", price:28000, cat:"Makanan", img:"https://images.unsplash.com/photo-1481931715705-36f5f79f1d7b?q=80&w=1400&auto=format&fit=crop"},
  {id:25, name:"Brownies", price:22000, cat:"Makanan", img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476e?q=80&w=1400&auto=format&fit=crop"},
];

const fmtIDR = n => new Intl.NumberFormat('id-ID', {style:'currency', currency:'IDR', maximumFractionDigits:0}).format(n).replace(",00","");
const elGrid = document.getElementById('itemsGrid');
const elSearch = document.getElementById('search');
const elCat = document.getElementById('filterCat');
const elSort = document.getElementById('sort');
const elCart = document.getElementById('cartItems');
const elSub = document.getElementById('subtotal');
const elTax = document.getElementById('tax');
const elTot = document.getElementById('total');
const elCount = document.getElementById('cartCount');

const TAX = 0.10; // 10% pajak, bisa diubah

let cart = []; // {key, id, name, price, qty, note}

function keyOf(itemId, note){ return itemId + '|' + (note||''); }

function renderItems(){
  const q = (elSearch.value||'').toLowerCase();
  const cat = elCat.value;
  const sorted = [...menu].filter(m=>{
    const matchQ = m.name.toLowerCase().includes(q);
    const matchC = !cat || m.cat === cat;
    return matchQ && matchC;
  });
  if(elSort.value === 'price-asc') sorted.sort((a,b)=>a.price-b.price);
  if(elSort.value === 'price-desc') sorted.sort((a,b)=>b.price-a.price);
  if(elSort.value === 'name-asc') sorted.sort((a,b)=>a.name.localeCompare(b.name));
  if(elSort.value === 'name-desc') sorted.sort((a,b)=>b.name.localeCompare(a.name));

  elGrid.innerHTML = '';
  for(const it of sorted){
    const card = document.createElement('article');
    card.className = 'card item-card reveal';
    card.innerHTML = `
      <div class="thumb"><img alt="${it.name}" src="${it.img}"></div>
      <div class="body">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
          <div>
            <h3 style="margin:0">${it.name}</h3>
            <div class="badge">${it.cat}</div>
          </div>
          <div class="price">${fmtIDR(it.price)}</div>
        </div>
        <div class="note">Tulis catatan khusus untuk item ini (opsional)</div>
        <textarea rows="2" class="item-note" placeholder='contoh: "tidak pedas ya"'></textarea>
        <div class="qty">
          <button class="btn ghost ripple minus">−</button>
          <input type="number" class="input item-qty" value="1" min="1" style="width:80px;text-align:center">
          <button class="btn ghost ripple plus">+</button>
          <button class="btn ripple add" style="margin-left:auto">Tambah</button>
        </div>
      </div>`;
    elGrid.appendChild(card);

    const qtyInput = card.querySelector('.item-qty');
    card.querySelector('.minus').addEventListener('click', ()=>{
      qtyInput.value = Math.max(1, (parseInt(qtyInput.value||'1',10)-1));
    });
    card.querySelector('.plus').addEventListener('click', ()=>{
      qtyInput.value = Math.max(1, (parseInt(qtyInput.value||'1',10)+1));
    });
    card.querySelector('.add').addEventListener('click', ()=>{
      const qty = Math.max(1, parseInt(qtyInput.value||'1',10));
      const note = card.querySelector('.item-note').value.trim();
      addToCart(it, qty, note);
    });
  }
  // Re-attach ripple for dynamic buttons
  if(window.attachRipple) attachRipple(document);
  // reveal observer
  if(window.IntersectionObserver){
    const ob = new IntersectionObserver((en)=>{
      en.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ob.unobserve(e.target);}});
    },{threshold:.1});
    document.querySelectorAll('.item-card.reveal').forEach(el=>ob.observe(el));
  }
}

function addToCart(it, qty, note){
  const k = keyOf(it.id, note);
  const found = cart.find(c=>c.key===k);
  if(found){ found.qty += qty; }
  else { cart.push({key:k, id:it.id, name:it.name, price:it.price, qty, note}); }
  renderCart();
  // Mobile bounce count
  document.getElementById('cartCountBadge').classList.add('visible');
  setTimeout(()=>document.getElementById('cartCountBadge').classList.remove('visible'), 700);
}

function removeFromCart(k){ cart = cart.filter(c=>c.key!==k); renderCart(); }
function changeQty(k, delta){
  const f = cart.find(c=>c.key===k);
  if(!f) return;
  f.qty = Math.max(1, f.qty + delta);
  renderCart();
}

function renderCart(){
  elCart.innerHTML = '';
  let sub=0, count=0;
  for(const c of cart){
    sub += c.price * c.qty; count += c.qty;
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
      <div style="flex:1;min-width:0">
        <div style="font-weight:700">${c.name} × ${c.qty} <span class="meta">• ${fmtIDR(c.price)}</span></div>
        ${c.note?`<div class="note">Catatan: ${c.note}</div>`:''}
      </div>
      <div style="display:flex;gap:6px;align-items:center">
        <button title="Kurangi" class="btn ghost ripple" onclick='changeQty("${c.key}",-1)'>−</button>
        <button title="Tambah" class="btn ghost ripple" onclick='changeQty("${c.key}",1)'>+</button>
        <button title="Hapus" class="btn ghost ripple" onclick='removeFromCart("${c.key}")'>✕</button>
      </div>`;
    elCart.appendChild(row);
  }
  const tax = Math.round(sub * TAX);
  const tot = sub + tax;
  elSub.textContent = fmtIDR(sub);
  elTax.textContent = fmtIDR(tax);
  elTot.textContent = fmtIDR(tot);
  elCount.textContent = count;
  document.getElementById('cartCountBadge').textContent = count;
}

function requireOrder(){
  if(cart.length===0){ alert('Keranjang masih kosong. Tambahkan item terlebih dahulu.'); return false; }
  const name = document.getElementById('custName').value.trim();
  const phone= document.getElementById('custPhone').value.trim();
  if(!name || !phone){ alert('Isi nama & nomor HP terlebih dahulu.'); return false; }
  return true;
}

function buildMessage(method){
  const name = document.getElementById('custName').value.trim();
  const phone= document.getElementById('custPhone').value.trim();
  const type = document.getElementById('orderType').value;
  const note = document.getElementById('orderNote').value.trim();
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
  const sub = document.getElementById('subtotal').textContent;
  const tax = document.getElementById('tax').textContent;
  const tot = document.getElementById('total').textContent;
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

// WhatsApp
function sendWhatsApp(){
  if(!requireOrder()) return;
  const msg = buildMessage('WhatsApp');
  const phone = '6281282460257'; // target NJ Cafe
  const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
  // Fallback for some devices
  const alt = 'https://api.whatsapp.com/send?phone=' + phone + '&text=' + encodeURIComponent(msg);
  window.open(url, '_blank') || window.open(alt,'_blank');
}

// Email (mailto fallback)
function sendEmail(){
  if(!requireOrder()) return;
  const subject = encodeURIComponent('Pesanan NJ Cafe — ' + document.getElementById('custName').value.trim());
  const body = encodeURIComponent(buildMessage('Email'));
  const to = 'narenskii@gmail.com';
  const url = `mailto:${to}?subject=${subject}&body=${body}`;
  window.location.href = url; // opens mail client
}

/* Optional: EmailJS support (uncomment & fill in your keys to send without opening email app)
   1) Sign up at https://www.emailjs.com/
   2) Create a service and a template.
   3) Fill SERVICE_ID, TEMPLATE_ID, and PUBLIC_KEY below, then call sendEmailJS() instead of sendEmail().

function sendEmailJS(){
  if(!requireOrder()) return;
  const SERVICE_ID = 'YOUR_SERVICE_ID';
  const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  const PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
  const name  = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const message = buildMessage('Email');
  emailjs.init(PUBLIC_KEY);
  emailjs.send(SERVICE_ID, TEMPLATE_ID, { name, phone, message })
    .then(()=> alert('Pesanan terkirim via EmailJS!'))
    .catch((err)=> alert('Gagal mengirim via EmailJS: ' + err?.text || err));
}
*/

// Drawer (mobile)
const drawer = document.getElementById('drawer');
function openDrawer(){ drawer.classList.add('open'); }
function closeDrawer(){ drawer.classList.remove('open'); }

// Init
renderItems();
renderCart();

// Filters
elSearch.addEventListener('input', renderItems);
elCat.addEventListener('change', renderItems);
elSort.addEventListener('change', renderItems);

// Expose for inline handlers
window.changeQty = changeQty;
window.removeFromCart = removeFromCart;
window.sendWhatsApp = sendWhatsApp;
window.sendEmail = sendEmail;
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;
