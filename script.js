/* =================================================
   JAVASCRIPT TABLE OF CONTENTS
   =================================================
   1. Dark / Light Mode Toggle
   2. Current Year
   3. Animated Skill Bars (Intersection Observer)
   4. Skeleton Loading Helper
   5. Services Section (Dynamic Rendering)
   6. Portfolio & Case Studies (Dynamic Rendering)
   7. Blog Posts Fetch (RSS to JSON)
   8. Contact Form Handling
   9. Modal Logic
   10. Active Navigation Highlight
   11. Mobile Navigation
   12. Back to Top Button
   13. Initialization
   ================================================= */

/* =================================================
   1. DARK / LIGHT MODE TOGGLE
   ================================================= */
(function initDarkMode() {
  const darkToggle = document.getElementById('darkModeToggle');
  if (!darkToggle) return;

  function updateDarkModeIcon(isDark) {
    darkToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
  }

  darkToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    updateDarkModeIcon(isDark);
  });

  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    updateDarkModeIcon(true);
  }
})();

/* =================================================
   2. CURRENT YEAR
   ================================================= */
(function initCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

/* =================================================
   3. ANIMATED SKILL BARS
   ================================================= */
(function initSkillBars() {
  const skillBars = document.querySelectorAll('.bar span');
  if (!skillBars.length) return;

  const observerSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const parent = bar.closest('.skill');
        if (!parent) return;

        const percentText = parent.querySelector('.skill-head span:last-child');
        if (!percentText) return;

        const percent = parseInt(percentText.textContent, 10);
        if (!isNaN(percent)) {
          bar.style.width = percent + '%';
        }
        observerSkills.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => observerSkills.observe(bar));
})();

/* =================================================
   4. SKELETON LOADING HELPER
   ================================================= */
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

/* =================================================
   5. SERVICES SECTION
   ================================================= */
(function initServices() {
  const serviceDetails = [
    {
      name: "SEO & Content Architecture",
      iconClass: "fa-solid fa-magnifying-glass-chart",
      overview: "Comprehensive Search Engine Optimization and keyword hierarchies designed to rank your brand on Google's first page sustainably.",
      bullets: [
        "<b>Technical SEO Audits:</b> Fixing crawl errors, core web vitals, and schema markup.",
        "<b>Content Clustering:</b> Building pillar-and-cluster taxonomies for maximum topical authority.",
        "<b>AdSense & Compliance:</b> Ensuring strict adherence to search engine quality guidelines."
      ]
    },
    {
      name: "Paid Ads (Google, Meta & TikTok)",
      iconClass: "fa-solid fa-bullhorn",
      overview: "High-ROI multi-channel ad campaigns engineered to lower your Cost-Per-Lead (CPL) and scale customer acquisition.",
      bullets: [
        "<b>Multi-Platform Management:</b> Google Search/PPC, Meta (FB/IG), and TikTok Ads setup.",
        "<b>Funnel Optimization:</b> Audience targeting, creative testing, and retargeting sequences.",
        "<b>ROI Tracking:</b> Rigorous attribution setup to ensure positive return on ad spend."
      ]
    },
    {
      name: "Shopify Store Setup & Optimization",
      iconClass: "fa-solid fa-cart-shopping",
      overview: "Custom e-commerce storefronts built for high conversions, lightning-fast speed, and seamless user experiences.",
      bullets: [
        "<b>Storefront Design:</b> Clean, mobile-first UX layout customized for your niche.",
        "<b>Catalog Architecture:</b> Structured collections, variants, and inventory tracking.",
        "<b>Social Integrations:</b> Seamless connection with Facebook, Instagram, and TikTok shops."
      ]
    },
    {
      name: "Google Merchant Center (GMC) Approval",
      iconClass: "fa-solid fa-triangle-exclamation",
      overview: "Expert troubleshooting to resolve account suspensions, policy violations, and feed errors to unlock Google Shopping.",
      bullets: [
        "<b>Policy Audit:</b> Identifying and fixing misrepresentation and policy warnings.",
        "<b>Feed Optimization:</b> Error-free product data feed synchronization.",
        "<b>Fast-Track Reinstatement:</b> Direct compliance alignment for quick Google review approval."
      ]
    },
    {
      name: "GA4 & Conversion Tracking",
      iconClass: "fa-solid fa-chart-pie",
      overview: "Advanced Google Analytics 4 (GA4) configuration and custom event tracking so you never miss a data point.",
      bullets: [
        "<b>Event Tracking:</b> Setup for button clicks, form submissions, and purchases.",
        "<b>E-commerce Attribution:</b> Accurate revenue and funnel drop-off reporting.",
        "<b>Data Reliability:</b> Clean, privacy-compliant tracking pipelines."
      ]
    },
    {
      name: "Social Media Marketing",
      iconClass: "fa-solid fa-share-nodes",
      overview: "Strategy-driven organic content and community management that builds a trusted brand people love to buy from.",
      bullets: [
        "<b>Content Calendars:</b> Engaging post strategies tailored to your target audience.",
        "<b>Community Growth:</b> Active engagement and follower retention tactics.",
        "<b>Brand Authority:</b> Positioning your business as an industry leader."
      ]
    },
    {
      name: "Marketing Automation (`n8n` & AI)",
      iconClass: "fa-solid fa-gears",
      overview: "Next-gen operational scaling using workflow engines and AI prompt engineering to automate repetitive tasks.",
      bullets: [
        "<b>n8n Workflows:</b> Automated data pipelines and lead-nurturing sequences.",
        "<b>AI Integration:</b> Prompt-engineered AI systems for content and marketing scaling.",
        "<b>Operational Efficiency:</b> Eliminating manual bottlenecks to cut acquisition costs."
      ]
    },
    {
      name: "Email Marketing Funnels",
      iconClass: "fa-solid fa-envelope-open-text",
      overview: "Automated email sequences that nurture leads, build deep relationships, and drive repeat revenue on autopilot.",
      bullets: [
        "<b>Welcome & Nurture Flows:</b> Automated sequences for new subscribers and leads.",
        "<b>Abandoned Cart Recovery:</b> Re-engaging lost e-commerce shoppers.",
        "<b>Segmentation:</b> Targeted campaigns based on user behavior and purchase history."
      ]
    },
    {
      name: "Conversion Rate Optimization (CRO)",
      iconClass: "fa-solid fa-chart-line",
      overview: "Turning more of your existing website traffic into paying customers with data-backed UX and copywriting psychology.",
      bullets: [
        "<b>Landing Page Reviews:</b> Identifying friction points and conversion blockers.",
        "<b>Copywriting Psychology:</b> High-intent Call-to-Actions (CTAs) and value propositions.",
        "<b>UX Alignment:</b> Streamlining user journeys to boost conversion rates."
      ]
    },
    {
      name: "Growth Strategy & Consulting",
      iconClass: "fa-solid fa-lightbulb",
      overview: "A custom, data-driven roadmap combining traditional growth marketing with technical execution to scale predictably.",
      bullets: [
        "<b>Market Analysis:</b> Deep dive into competitor positioning and customer intent.",
        "<b>Actionable Roadmaps:</b> Step-by-step growth blueprints tailored to your budget.",
        "<b>Consultative Guidance:</b> Direct advisory on scaling your digital footprint."
      ]
    }
  ];

  const servicesGridEl = document.getElementById('servicesGrid');
  if (!servicesGridEl) return;

  servicesGridEl.innerHTML = serviceDetails.map((service, index) => `
    <div class="card">
      <div class="icon"><i class="${service.iconClass}" aria-hidden="true"></i></div>
      <h3>${service.name}</h3>
      <p>${service.overview.substring(0, 100)}...</p>
      <button class="learn" data-service-index="${index}" type="button">Learn More &rarr;</button>
    </div>
  `).join('');

  servicesGridEl.addEventListener('click', function(e) {
    const btn = e.target.closest('.learn[data-service-index]');
    if (!btn) return;

    const idx = parseInt(btn.getAttribute('data-service-index'), 10);
    const service = serviceDetails[idx];
    if (!service) return;

    const existingModal = document.getElementById('tempServiceModal');
    if (existingModal) existingModal.remove();

    const modalHtml = `
      <div id="tempServiceModal" class="modal" role="dialog" aria-modal="true" aria-labelledby="serviceModalTitle">
        <div class="modal-content">
          <button class="close-modal" aria-label="Close service details">&times;</button>
          <div class="modal-body" style="text-align: left;">
            <div style="text-align: center; margin-bottom: 16px;">
              <i class="${service.iconClass} modal-icon" aria-hidden="true" style="font-size: 2.5rem; color: var(--gold);"></i>
              <h2 id="serviceModalTitle" style="margin-top: 8px;">${service.name}</h2>
            </div>
            <p style="margin-bottom: 16px; color: var(--text-dark); font-weight: 500;">${service.overview}</p>
            <ul style="margin: 0 0 20px 20px; color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
              ${service.bullets.map(bullet => `<li style="margin-bottom: 8px;">${bullet}</li>`).join('')}
            </ul>
            <h4 style="margin: 20px 0 10px; text-align: center; color: var(--text-dark);">Ready to take action?</h4>
            <div class="booking-buttons">
              <a href="https://wa.me/8801522104711?text=Hello%20Ashraful,%20I'm%20interested%20in%20your%20${encodeURIComponent(service.name)}%20service.%20Let's%20discuss%20my%20needs!"
                 class="btn btn-primary" style="flex:1;" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Discuss on WhatsApp
              </a>
              <a href="#contact" class="btn btn-gold" onclick="document.getElementById('tempServiceModal').style.display='none'">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const tempModal = document.getElementById('tempServiceModal');
    tempModal.style.display = 'flex';
    tempModal.setAttribute('aria-hidden', 'false');

    tempModal.querySelector('.close-modal').addEventListener('click', () => {
      tempModal.style.display = 'none';
      tempModal.setAttribute('aria-hidden', 'true');
    });

    tempModal.addEventListener('click', (e) => {
      if (e.target === tempModal) {
        tempModal.style.display = 'none';
        tempModal.setAttribute('aria-hidden', 'true');
      }
    });
  });
})();

/* =================================================
   6. PORTFOLIO & CASE STUDIES
   ================================================= */
(function initPortfolio() {
  const portfolioData = [
    {
      category: "seo",
      title: "UrbanThreads Fashion",
      challenge: "Stuck on page 3 with no organic sales.",
      solution: "Technical SEO + content cluster strategy.",
      result: "+187% organic sales",
      icon: "fa-magnifying-glass-chart"
    },
    {
      category: "ads",
      title: "CloudDesk Software",
      challenge: "High ad spend, poor lead quality.",
      solution: "Restructured campaigns & landing pages.",
      result: "-42% cost per lead",
      icon: "fa-bullhorn"
    },
    {
      category: "social",
      title: "Bistro Verde",
      challenge: "Low local awareness & footfall.",
      solution: "Instagram & Meta ad content engine.",
      result: "+5.2x reservations",
      icon: "fa-share-nodes"
    },
    {
      category: "ads",
      title: "PeakForm Gym",
      challenge: "Empty membership pipeline.",
      solution: "Lead-gen funnel with retargeting.",
      result: "320 new members / quarter",
      icon: "fa-bullhorn"
    },
    {
      category: "seo",
      title: "LedgerPro Accounting",
      challenge: "Zero inbound leads from search.",
      solution: "Authority content + local SEO.",
      result: "+240% organic traffic",
      icon: "fa-chart-line"
    },
    {
      category: "social",
      title: "Glow Skincare",
      challenge: "Stagnant brand engagement.",
      solution: "Influencer + UGC content strategy.",
      result: "+98K followers in 6 mo",
      icon: "fa-hashtag"
    }
  ];

  const caseGrid = document.getElementById('caseGrid');
  if (!caseGrid) return;

  showSkeleton('caseGrid', 6);

  setTimeout(() => {
    caseGrid.innerHTML = portfolioData.map(item => `
      <div class="card" data-cat="${item.category}">
        <div class="case-thumb"><i class="fa-solid ${item.icon}" aria-hidden="true"></i></div>
        <p class="case-meta">${item.category === 'seo' ? 'SEO Strategy' : (item.category === 'ads' ? 'Paid Ads Campaign' : 'Social Media Growth')}</p>
        <h3>${item.title}</h3>
        <p class="case-row"><b>Challenge:</b> ${item.challenge}</p>
        <p class="case-row"><b>Solution:</b> ${item.solution}</p>
        <span class="badge-gold"><i class="fa-solid fa-arrow-trend-up" aria-hidden="true"></i> ${item.result}</span>
      </div>
    `).join('');

    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('#caseGrid .card');

    function applyFilter(val) {
      portfolioCards.forEach(card => {
        card.style.display = (val === 'all' || card.dataset.cat === val) ? 'block' : 'none';
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        applyFilter(this.dataset.filter);
      });
    });

    applyFilter('all');
  }, 300);
})();

/* =================================================
   7. BLOG POSTS FETCH (RSS to JSON)
   ================================================= */
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
          ? `<img src="${imageUrl}" alt="${post.title}" class="blog-image" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23F9F7F2\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%23D4A373\' font-size=\'14\'%3E&#128247;%3C/text%3E%3C/svg%3E';">`
          : `<div class="case-thumb"><i class="fa-solid fa-blog" aria-hidden="true"></i></div>`;

        return `
          <div class="card">
            ${imageHtml}
            <p class="blog-date">${new Date(post.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <h3>${post.title}</h3>
            <p>${post.description.replace(/<[^>]*>/g, '').substring(0, 120)}...</p>
            <a href="${post.link}" rel="noopener noreferrer" class="learn">Read More &rarr;</a>
          </div>
        `;
      }).join('');
    } else {
      blogGrid.innerHTML = '<p style="text-align:center; grid-column: span 3;">Unable to load posts. Please check back later.</p>';
    }
  } catch (error) {
    blogGrid.innerHTML = '<p style="text-align:center; grid-column: span 3;">Could not load blog posts. Visit <a href="https://ashrafulislampersonal.blogspot.com" target="_blank" rel="noopener noreferrer" style="color:var(--gold);">my blog</a> directly.</p>';
  }
}

fetchBlogPosts();

/* =================================================
   8. CONTACT FORM HANDLING
   ================================================= */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsgDiv = document.getElementById('successMsg');
  const errorMsgDiv = document.getElementById('formErrorMsg');

  if (!form) return;

  function isValidPhone(phone) {
    const cleaned = phone.replace(/\s/g, '');
    const bdRegex = /^(01\d{9})$|^(\+8801\d{9})$/;
    return bdRegex.test(cleaned);
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    return re.test(email);
  }

  function showError(message) {
    errorMsgDiv.textContent = message;
    errorMsgDiv.style.display = 'block';
    successMsgDiv.style.display = 'none';
  }

  function showSuccess() {
    successMsgDiv.style.display = 'block';
    errorMsgDiv.style.display = 'none';
  }

  function clearMessages() {
    errorMsgDiv.style.display = 'none';
    successMsgDiv.style.display = 'none';
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    clearMessages();

    const honeypot = document.getElementById('honeypot').value;
    if (honeypot !== "") {
      showError('Spam detected. Your message was not sent.');
      return;
    }

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !phone || !service || !message) {
      showError('Please fill all required fields.');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    if (!isValidPhone(phone)) {
      showError('Please enter a valid Bangladesh mobile number (01XXXXXXXXX or +8801XXXXXXXXX).');
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
        showSuccess();
        form.reset();
        setTimeout(() => {
          successMsgDiv.style.display = 'none';
        }, 6000);
      } else {
        showError('Server error. Please try again later.');
      }
    } catch (err) {
      showError('Network error. Please check your connection.');
    }
  });
})();

/* =================================================
   9. MODAL LOGIC
   ================================================= */
(function initModal() {
  const modalElem = document.getElementById('strategyModal');
  const openModalBtn = document.getElementById('openStrategyModalBtn');
  const closeModalSpan = modalElem ? modalElem.querySelector('.close-modal') : null;

  if (!modalElem) return;

  function openModal(e) {
    if (e) e.preventDefault();
    modalElem.style.display = 'flex';
    modalElem.setAttribute('aria-hidden', 'false');
    if (closeModalSpan) closeModalSpan.focus();
  }

  function closeModal() {
    modalElem.style.display = 'none';
    modalElem.setAttribute('aria-hidden', 'true');
  }

  if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
  }

  if (closeModalSpan) {
    closeModalSpan.addEventListener('click', closeModal);
  }

  window.addEventListener('click', (event) => {
    if (event.target === modalElem) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalElem.style.display === 'flex') {
      closeModal();
    }
  });
})();

/* =================================================
   10. ACTIVE NAVIGATION HIGHLIGHT
   ================================================= */
(function initActiveNav() {
  const navLinks = document.querySelectorAll('#navLinks a');
  const navMap = {};

  navLinks.forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      navMap[href.slice(1)] = a;
    }
  });

  const watched = Object.keys(navMap)
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(a => a.classList.remove('active'));
    if (navMap[id]) {
      navMap[id].classList.add('active');
    }
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    rootMargin: '-64px 0px -65% 0px',
    threshold: 0
  });

  watched.forEach(s => obs.observe(s));
})();

/* =================================================
   11. MOBILE NAVIGATION
   ================================================= */
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  function toggleMenu() {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href && href.startsWith('#')) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);

        if (targetEl) {
          closeMenu();

          const headerOffset = 64;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          history.pushState(null, null, href);
        }
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
      closeMenu();
    }
  });
})();

/* =================================================
   12. BACK TO TOP BUTTON
   ================================================= */
(function initBackToTop() {
  const toTopBtn = document.getElementById('toTop');
  if (!toTopBtn) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        toTopBtn.classList.toggle('show', window.scrollY > 400);
        ticking = false;
      });
      ticking = true;
    }
  });

  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
