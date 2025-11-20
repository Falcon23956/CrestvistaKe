
async function loadListings() {
  try{
    const res = await fetch('listings.json');
    const data = await res.json();
    const container = document.getElementById('listings');
    if(!container) return;
    container.innerHTML = data.map(item=>`
      <article class="card">
        <img src="${item.image}" alt="${item.title}" class="card-img"/>
        <div class="card-body">
          <h3>${item.title}</h3>
          <p class="meta">${item.location} · KES ${item.price.toLocaleString()}</p>
          <p>${item.description}</p>
          <p><strong>${item.beds} beds</strong></p>
        </div>
      </article>
    `).join('');
  }catch(e){
    console.error('Failed to load listings', e);
  }
}
document.addEventListener('DOMContentLoaded', loadListings);
