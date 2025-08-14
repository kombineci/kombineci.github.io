// Yıl
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click", e=>{
    const id = a.getAttribute("href");
    if(id.length>1){
      e.preventDefault();
      document.querySelector(id).scrollIntoView({behavior:"smooth", block:"start"});
      // mobil menüyü kapat
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded","false");
    }
  });
});

// Back to top
const toTop = document.getElementById("toTop");
window.addEventListener("scroll",()=>{
  if(window.scrollY>600){toTop.classList.add("visible")}else{toTop.classList.remove("visible")}
});
toTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

// Kopyalama butonları (terms/privacy)
document.querySelectorAll(".copy-btn").forEach(btn=>{
  btn.addEventListener("click", async ()=>{
    const targetSel = btn.dataset.copyTarget;
    const el = document.querySelector(targetSel);
    if(!el) return;
    const text = el.innerText.trim();
    try{
      await navigator.clipboard.writeText(text);
      const original = btn.textContent;
      btn.textContent = "Kopyalandı ✓";
      setTimeout(()=>btn.textContent = original, 1600);
    }catch{
      alert("Kopyalama başarısız. Metni manuel seçip kopyalayabilirsiniz.");
    }
  });
});

// Bildirim formu (dummy)
document.getElementById("notifyForm").addEventListener("submit", (e)=>{
  e.preventDefault();
  const email = document.getElementById("emailInput").value.trim();
  if(!email) return;
  alert("Teşekkürler! Yayına girdiğimizde e-posta ile haber vereceğiz: " + email);
  e.target.reset();
});

// Mağaza linklerini burada ayarla
const androidLink = document.getElementById("androidLink");
const iosLink = document.getElementById("iosLink");
// Örnek: androidLink.href = "https://play.google.com/store/apps/details?id=paket.adiniz";
// Örnek: iosLink.href = "https://apps.apple.com/app/idXXXXXXXXX";

// Mobil menü
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", ()=>{
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
