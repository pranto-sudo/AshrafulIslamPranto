// Dark/Light toggle
const darkToggle = document.getElementById('darkModeToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
  darkToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  darkToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

document.getElementById('currentYear').innerText = new Date().getFullYear();

// Animated Skill Bars
const skillBars = document.querySelectorAll('.bar span');
const observerSkills = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetWidth = entry.target.style.width;
      if (targetWidth === '0%' || targetWidth === '') {
        const parent = entry.target.closest('.skill');
        const percentText = parent.querySelector('.skill-head span:last-child').innerText;
        const percent = parseInt(percentText);
        entry.target.style.width = percent + '%';
      }
      observerSkills.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
skillBars.forEach(bar => observerSkills.observe(bar));

// Skeleton helper
function showSkeleton(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let skeletonHtml = '';
  for (let i = 0; i < count; i++) {
    skeletonHtml += `
      <div class="skeleton-card">
        <div class="skeleton skeleton-icon" style="width:50px; height:50px; border-radius:12px;"></div>
        <div class="skeleton skeleton-title" style="height:22px; width:70%; margin-bottom:10px;"></div>
        <div class="skeleton skeleton-text" style="height:14px; width:100%; margin-bottom:6px;"></div>
        <div class="skeleton skeleton-text short" style="height:14px; width:60%;"></div>
      </div>
    `;
  }
  container.innerHTML = skeletonHtml;
}

// Services data
const serviceDetails = [
  { name: "SEO", iconClass: "fa-solid fa-magnifying-glass-chart", desc: "Comprehensive Search Engine Optimization to rank on first page, drive organic traffic, and increase conversions sustainably." },
  { name: "Google Ads (PPC)", iconClass: "fa-brands fa-google", desc: "High-ROI Google Ads management. From keyword research to conversion tracking, I maximize your ad spend efficiency." },
  { name: "Meta Ads", iconClass: "fa-brands fa-meta", desc: "Facebook & Instagram ad campaigns engineered to target your ideal audience and generate real business results." },
  { name: "Social Media Marketing", iconClass: "fa-solid fa-share-nodes", desc: "Build a loyal community and a brand people trust. Strategy-driven content, engagement, and paid social." },
  { name: "Email Marketing", iconClass: "fa-solid fa-envelope-open-text", desc: "Automated email funnels that nurture leads, build relationships, and drive repeat revenue." },
  { name: "Content Marketing", iconClass: "fa-solid fa-pen-nib", desc: "Strategic content that builds authority, educates your audience, and attracts the right buyers." },
  { name: "E-commerce Marketing", iconClass: "fa-solid fa-cart-shopping", desc: "Boost online store sales with optimized funnels, targeted ads, and conversion strategies." },
  { name: "Conversion Rate Optimization", iconClass: "fa-solid fa-chart-line", desc: "Turn more of your existing traffic into paying customers with data-backed CRO techniques." },
  { name: "Influencer Marketing", iconClass: "fa-solid fa-handshake-angle", desc: "Partner with the right creators to amplify your brand reach and build trust fast." },
  { name: "Marketing Strategy", iconClass: "fa-solid fa-lightbulb", desc: "A clear, custom roadmap to scale your business predictably. Comprehensive market analysis and execution plan." }
];

const servicesGridEl = document.getElementById('servicesGrid');
if (servicesGridEl) {
  servicesGridEl.innerHTML = serviceDetails.map((service, index) => `
    <div class="card">
      <div class="icon"><i class="${service.iconClass}"></i></div>
      <h3>${service.name}</h3>
      <p>${service.desc.substring(0, 100)}...</p>
      <span class="learn" data-service-index="${index}">Learn More →</span>
    </div>
  `).join('');
  document.querySelectorAll('.learn[data-service-index]').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = parseInt(this.getAttribute('data-service-index'));
      const service = serviceDetails[idx];
      if (service) {
        const modalHtml = `
          <div id="tempServiceModal" class="modal" style="display:flex;">
            <div class="modal-content">
              <span class="close-modal" onclick="this.closest('.modal').style.display='none'">&times;</span>
              <div style="text-align:center;">
                <i class="${service.iconClass}" style="font-size:2.8rem; color:var(--gold); margin-bottom:12px;"></i>
                <h2>${service.name}</h2>
                <p style="margin:16px 0; text-align:left;">${service.desc}</p>
                <h4 style="margin:20px 0 8px;">Ready to take action?</h4>
                <div class="booking-buttons">
                  <a href="https://wa.me/8801522104711?text=Hello%20Ashraful,%20I'm%20interested%20in%20your%20${encodeURIComponent(service.name)}%20service.%20Let's%20discuss%20my%20needs!" class="btn btn-primary" style="flex:1;" target="_blank"><i class="fa-brands fa-whatsapp"></i> Discuss on WhatsApp</a>
                  <a href="#contact" class="btn btn-outline" style="background:var(--gold); color:#fff; border:none; flex:1;" onclick="document.getElementById('tempServiceModal').style.display='none'">Get a Quote</a>
                </div>
              </div>
            </div>
          </div>
        `;
        if (document.getElementById('tempServiceModal')) document.getElementById('tempServiceModal').remove();
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const tempModal = document.getElementById('tempServiceModal');
        tempModal.querySelector('.close-modal').addEventListener('click', () => tempModal.style.display = 'none');
        tempModal.addEventListener('click', (e) => { if(e.target === tempModal) tempModal.style.display = 'none'; });
      }
    });
  });
}

// Portfolio data
const portfolioData = [
  { category: "seo", title: "UrbanThreads Fashion", challenge: "Stuck on page 3 with no organic sales.", solution: "Technical SEO + content cluster strategy.", result: "+187% organic sales", icon: "fa-magnifying-glass-chart" },
  { category: "ads", title: "CloudDesk Software", challenge: "High ad spend, poor lead quality.", solution: "Restructured campaigns & landing pages.", result: "-42% cost per lead", icon: "fa-bullhorn" },
  { category: "social", title: "Bistro Verde", challenge: "Low local awareness & footfall.", solution: "Instagram & Meta ad content engine.", result: "+5.2x reservations", icon: "fa-share-nodes" },
  { category: "ads", title: "PeakForm Gym", challenge: "Empty membership pipeline.", solution: "Lead-gen funnel with retargeting.", result: "320 new members / quarter", icon: "fa-bullhorn" },
  { category: "seo", title: "LedgerPro Accounting", challenge: "Zero inbound leads from search.", solution: "Authority content + local SEO.", result: "+240% organic traffic", icon: "fa-chart-line" },
  { category: "social", title: "Glow Skincare", challenge: "Stagnant brand engagement.", solution: "Influencer + UGC content strategy.", result: "+98K followers in 6 mo", icon: "fa-hashtag" }
];

const caseGrid = document.getElementById('caseGrid');
if (caseGrid) {
  showSkeleton('caseGrid', 6);
  setTimeout(() => {
    caseGrid.innerHTML = portfolioData.map(item => `
      <div class="card" data-cat="${item.category}">
        <div class="case-thumb"><i class="fa-solid ${item.icon}"></i></div>
        <p class="case-meta">${item.category === 'seo' ? 'SEO Strategy' : (item.category === 'ads' ? 'Paid Ads Campaign' : 'Social Media Growth')}</p>
        <h3>${item.title}</h3>
        <p class="case-row"><b>Challenge:</b> ${item.challenge}</p>
        <p class="case-row"><b>Solution:</b> ${item.solution}</p>
        <span class="badge-gold"><i class="fa-solid fa-arrow-trend-up"></i> ${item.result}</span>
      </div>
    `).join('');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('#caseGrid .card');
    const applyFilter = (val) => portfolioCards.forEach(card => card.style.display = (val === 'all' || card.dataset.cat === val) ? 'block' : 'none');
    filterBtns.forEach(btn => btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      applyFilter(this.dataset.filter);
    }));
    applyFilter('all');
  }, 300);
}

// Blog fetch
async function fetchBlogPosts() {
  const blogGrid = document.getElementById('blogGrid');
  if (!blogGrid) return;
  showSkeleton('blogGrid', 3);
  try {
    const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://ashrafulislampersonal.blogspot.com/feeds/posts/default';
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    if (data.status === 'ok' && data.items && data.items.length) {
      const posts = data.items.slice(0, 6);
      blogGrid.innerHTML = posts.map(post => {
        let imageUrl = null;
        const description = post.description || post.content || '';
        const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch && imgMatch[1]) imageUrl = imgMatch[1];
        if (!imageUrl && post.thumbnail) imageUrl = post.thumbnail;
        const imageHtml = imageUrl 
          ? `<img src="${imageUrl}" alt="${post.title}" class="blog-image" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23F9F7F2\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%23D4A373\' font-size=\'14\'%3E📷%3C/text%3E%3C/svg%3E';">`
          : `<div class="case-thumb"><i class="fa-solid fa-blog"></i></div>`;
        return `
          <div class="card">
            ${imageHtml}
            <p class="blog-date">${new Date(post.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <h3>${post.title}</h3>
            <p>${post.description.replace(/<[^>]*>/g, '').substring(0, 120)}...</p>
            <a href="${post.link}" target="_blank" class="learn">Read More →</a>
          </div>
        `;
      }).join('');
    } else {
      blogGrid.innerHTML = '<p style="text-align:center; grid-column: span 3;">Unable to load posts. Please check back later.</p>';
    }
  } catch (error) {
    blogGrid.innerHTML = '<p style="text-align:center; grid-column: span 3;">Could not load blog posts. Visit <a href="https://ashrafulislampersonal.blogspot.com" target="_blank" style="color:var(--gold);">my blog</a> directly.</p>';
  }
}
fetchBlogPosts();

// Form handling
const form = document.getElementById('contactForm');
const successMsgDiv = document.getElementById('successMsg');
const errorMsgDiv = document.getElementById('formErrorMsg');

function isValidPhone(phone) {
  const cleaned = phone.replace(/\s/g, '');
  const bdRegex = /^(01\d{9})$|^(\+8801\d{9})$/;
  return bdRegex.test(cleaned);
}
function isValidEmail(email) {
  const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
  return re.test(email);
}

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  errorMsgDiv.style.display = 'none';
  successMsgDiv.style.display = 'none';
  
  const honeypot = document.getElementById('honeypot').value;
  if (honeypot !== "") {
    errorMsgDiv.innerText = 'Spam detected. Your message was not sent.';
    errorMsgDiv.style.display = 'block';
    return;
  }

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !phone || !service || !message) {
    errorMsgDiv.innerText = 'Please fill all required fields.';
    errorMsgDiv.style.display = 'block';
    return;
  }
  if (!isValidEmail(email)) {
    errorMsgDiv.innerText = 'Please enter a valid email address.';
    errorMsgDiv.style.display = 'block';
    return;
  }
  if (!isValidPhone(phone)) {
    errorMsgDiv.innerText = 'Please enter a valid Bangladesh mobile number (01XXXXXXXXX or +8801XXXXXXXXX).';
    errorMsgDiv.style.display = 'block';
    return;
  }

  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('service', service);
  formData.append('message', message);
  formData.append('_subject', `New Contact from ${name} - ${service}`);
  formData.append('_captcha', 'false');

  try {
    const response = await fetch('https://formsubmit.co/ajax/ashraful.islam.marketing@gmail.com', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      successMsgDiv.style.display = 'block';
      form.reset();
      setTimeout(() => successMsgDiv.style.display = 'none', 6000);
    } else {
      errorMsgDiv.innerText = 'Server error. Please try again later.';
      errorMsgDiv.style.display = 'block';
    }
  } catch (err) {
    errorMsgDiv.innerText = 'Network error. Please check your connection.';
    errorMsgDiv.style.display = 'block';
  }
});

// Modal logic
const modalElem = document.getElementById('strategyModal');
const openModalBtn = document.getElementById('openStrategyModalBtn');
const closeModalSpan = document.querySelector('#strategyModal .close-modal');
if (openModalBtn) openModalBtn.addEventListener('click', (e) => { e.preventDefault(); modalElem.style.display = 'flex'; });
if (closeModalSpan) closeModalSpan.onclick = () => modalElem.style.display = 'none';
window.onclick = (event) => { if (event.target == modalElem) modalElem.style.display = 'none'; };

// Nav active highlight
const navMap = {};
document.querySelectorAll('#navLinks a').forEach(a => navMap[a.getAttribute('href').slice(1)] = a);
const watched = Object.keys(navMap).map(id => document.getElementById(id)).filter(Boolean);
function setActive(id) {
  document.querySelectorAll('#navLinks a').forEach(a => a.classList.remove('active'));
  if (navMap[id]) navMap[id].classList.add('active');
}
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
}, { rootMargin: `-64px 0px -65% 0px`, threshold: 0 });
watched.forEach(s => obs.observe(s));

document.getElementById('hamburger').addEventListener('click', () => document.getElementById('navLinks').classList.toggle('open'));
document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open')));

const toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', () => toTopBtn.classList.toggle('show', window.scrollY > 400));
toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));