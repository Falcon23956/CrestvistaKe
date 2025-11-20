
async function loadListings(){
  const res = await fetch("listings.json");
  const data = await res.json();
  return data;
}

function formatPrice(p){
  if(p>1000000) return "KES " + (p/1000000).toLocaleString() + "M";
  if(p>=1000) return "KES " + p.toLocaleString();
  return p;
}

async function renderCards(containerSelector){
  const data = await loadListings();
  const container = document.querySelector(containerSelector);
  container.innerHTML = "";
  data.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.images[0]}" alt="${p.title}">
      <div class="card-body">
        <h3>${p.title}</h3>
        <div class="meta">${p.location} · ${p.beds} beds · ${formatPrice(p.price)}</div>
        <p style="color:#444">${p.description.substring(0,120)}${p.description.length>120?"...":""}</p>
        <div style="margin-top:10px"><a class="btn" href="property.html?id=${p.id}">View property</a></div>
      </div>
    `;
    container.appendChild(card);
  });
}

// If on property.html, read id param and render gallery + details
async function renderPropertyDetail(){
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  if(!id) return;
  const data = await loadListings();
  const p = data.find(x=>x.id===id);
  if(!p) return;
  document.getElementById("prop-title").textContent = p.title;
  document.getElementById("prop-desc").textContent = p.description;
  document.getElementById("prop-meta").textContent = `${p.location} · ${p.beds} beds · ${formatPrice(p.price)}`;
  const gallery = document.getElementById("prop-gallery");
  gallery.innerHTML = "";
  p.images.forEach(src=>{
    const img = document.createElement("img");
    img.src = src;
    gallery.appendChild(img);
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  if(document.querySelector("#listings-grid")) renderCards("#listings-grid");
  if(document.getElementById("prop-title")) renderPropertyDetail();
});
