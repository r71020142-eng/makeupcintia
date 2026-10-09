document.addEventListener('DOMContentLoaded', function () {
  // 1. Dynamic Responsive Switcher
  function updateResponsive() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      document.documentElement.classList.add('m');
      document.documentElement.classList.remove('d');
    } else {
      document.documentElement.classList.add('d');
      document.documentElement.classList.remove('m');
    }
  }
  window.addEventListener('resize', updateResponsive);
  updateResponsive();

  // 2. Inject Cintya Nunes Logo in Nav & Footer
  function injectLogos() {
    const logoContainers = document.querySelectorAll('.sie-menu_1, [data-sid="menu_1"], .sie-mobile-nav_11, [data-sid="mobile-nav_11"]');
    logoContainers.forEach(el => {
      el.innerHTML = '<img src="/assets/images/cintya_nunes_logo.svg" alt="Cintya Nunes Makeup Artist & Hairstyles" style="width:100%;height:100%;object-fit:contain;">';
    });

    const footerLogos = document.querySelectorAll('.sie-footer_16, [data-sid="footer_16"]');
    footerLogos.forEach(el => {
      el.innerHTML = '<img src="/assets/images/cintya_nunes_logo.svg" alt="Cintya Nunes Logo" style="width:100%;height:100%;object-fit:contain;">';
    });

    // Replace founder portrait in meet section with Cintya's photo
    const meetPhotos = document.querySelectorAll('.sie-meet_1, [data-sid="meet_1"], .sie-bio_0, [data-sid="bio_0"]');
    meetPhotos.forEach(el => {
      const imgDiv = el.querySelector('.se-img') || el;
      imgDiv.style.backgroundImage = 'url("/assets/images/cintya_avatar_hq.png")';
      imgDiv.style.backgroundSize = 'cover';
      imgDiv.style.backgroundPosition = 'center 15%';
    });
  }
  injectLogos();

  // 3. Floating WhatsApp Button handled cleanly in index.html & custom.css

  // 4. Mobile Menu Toggle
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) {
    document.addEventListener('click', function (e) {
      const openTrigger = e.target.closest('.sie-menu_0, [data-sid="menu_0"]');
      if (openTrigger) {
        e.preventDefault();
        mobileNav.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }

      const closeTrigger = e.target.closest('.sie-mobile-nav_12, [data-sid="mobile-nav_12"], #mobile-nav a');
      if (closeTrigger) {
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  // 5. Back to Top Smooth Scrolling
  document.querySelectorAll('a[href="#si-sp"], .sie-footer_0, .sie-footer_1').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // 6. Lookbook Continuous Sliding Marquee
  const LOOKBOOK_FALLBACK_IMAGES = [
    'assets/images/cintya/IMG_4381.jpg',
    'assets/images/cintya/IMG_4653.jpg',
    'assets/images/cintya/IMG_3541.jpg',
    'assets/images/cintya/IMG_3004.jpg',
    'assets/images/cintya/IMG_2356.jpg',
    'assets/images/cintya/IMG_0661.jpg',
    'assets/images/cintya/IMG_4338.jpg',
    'assets/images/cintya/IMG_6470.jpg',
    'assets/images/cintya/IMG_7555.jpg',
    'assets/images/cintya/IMG_7680.jpg',
    'assets/images/cintya/IMG_0230.jpg',
    'assets/images/cintya/IMG_4501.jpg',
    'assets/images/cintya/IMG_7017.jpg'
  ];

  function setupMarquee(gallerySelector, reverse, speed) {
    const galleries = document.querySelectorAll(gallerySelector);
    if (!galleries || !galleries.length) return;

    galleries.forEach(gallery => {
      let imgSources = [];
      const noscripts = gallery.querySelectorAll('noscript');
      if (noscripts.length) {
        noscripts.forEach(ns => {
          const match = ns.innerHTML.match(/src="([^"]+)"/);
          if (match && match[1]) {
            imgSources.push(match[1]);
          }
        });
      }

      if (!imgSources.length) {
        imgSources = [...LOOKBOOK_FALLBACK_IMAGES];
      }

      // If reverse track, reverse array for visual variety between the 2 tracks
      if (reverse) {
        imgSources = [...imgSources].reverse();
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'lookbook-marquee-wrapper';

      const track = document.createElement('div');
      track.className = reverse ? 'lookbook-marquee-track-reverse' : 'lookbook-marquee-track';
      if (speed) track.style.animationDuration = speed + 's';

      // Exactly 2 identical sets so translateX(-50%) loops with 100% mathematical precision
      const loopList = [...imgSources, ...imgSources];
      loopList.forEach(src => {
        const item = document.createElement('div');
        item.className = 'lookbook-item';
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Cintya Nunes Makeup Artistry - Noivas e Penteados';
        img.loading = 'eager';
        img.decoding = 'async';
        item.appendChild(img);
        track.appendChild(item);
      });

      wrapper.appendChild(track);
      gallery.innerHTML = '';
      gallery.appendChild(wrapper);
    });
  }

  // Top track (moving left)
  setupMarquee('.sie-portfolio-2_0, [data-sid="portfolio-2_0"]', false, 36);
  // Bottom track (moving right in reverse)
  setupMarquee('.sie-portfolio-2_1, [data-sid="portfolio-2_1"]', true, 32);

  // 7. Services Slideshow
  function setupSlideshow(selector, intervalTime) {
    const container = document.querySelector(selector);
    if (!container) return;

    const noscripts = container.querySelectorAll('noscript');
    if (!noscripts.length) return;

    const imgSources = [];
    noscripts.forEach(ns => {
      const match = ns.innerHTML.match(/src="([^"]+)"/);
      if (match && match[1]) imgSources.push(match[1]);
    });

    if (imgSources.length <= 1) return;

    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.innerHTML = '';

    const slideElements = imgSources.map((src, index) => {
      const slide = document.createElement('div');
      slide.style.position = 'absolute';
      slide.style.top = '0';
      slide.style.left = '0';
      slide.style.width = '100%';
      slide.style.height = '100%';
      slide.style.backgroundImage = `url('${src}')`;
      slide.style.backgroundSize = 'cover';
      slide.style.backgroundPosition = 'center';
      slide.style.opacity = index === 0 ? '1' : '0';
      slide.style.transition = 'opacity 1.2s ease-in-out';
      container.appendChild(slide);
      return slide;
    });

    let currentIndex = 0;
    setInterval(() => {
      const nextIndex = (currentIndex + 1) % slideElements.length;
      slideElements[currentIndex].style.opacity = '0';
      slideElements[nextIndex].style.opacity = '1';
      currentIndex = nextIndex;
    }, intervalTime || 3200);
  }

  setupSlideshow('.sie-services_3, [data-sid="services_3"]', 3200);
  setupSlideshow('.sie-gallery_0, [data-sid="gallery_0"]', 3500);

  // 8. Formulário de Orçamento com Envio para WhatsApp
  const embedContainer = document.querySelector('.si-embed');
  if (embedContainer) {
    embedContainer.innerHTML = `
      <form class="galya-custom-form" id="cintyaBookingForm">
        <h3>Solicitar Orçamento Exclusivo</h3>
        <p class="sub">Preencha seus dados para receber um atendimento personalizado da equipe Cintya Nunes</p>
        
        <div class="galya-form-row">
          <div class="galya-form-group">
            <label>Seu Nome *</label>
            <input type="text" name="nome" required placeholder="Digite seu nome completo">
          </div>
          <div class="galya-form-group">
            <label>WhatsApp com DDD *</label>
            <input type="tel" name="telefone" required placeholder="(00) 90000-0000">
          </div>
        </div>

        <div class="galya-form-row">
          <div class="galya-form-group">
            <label>Data do Evento / Casamento *</label>
            <input type="date" name="dataEvento" required>
          </div>
          <div class="galya-form-group">
            <label>Cidade / Local do Evento *</label>
            <input type="text" name="local" required placeholder="Ex: Charleston, Savannah, etc.">
          </div>
        </div>

        <div class="galya-form-group">
          <label>Tipo de Serviço Desejado *</label>
          <select name="servico" required>
            <option value="">Selecione o serviço</option>
            <option value="Dia da Noiva Completo (Make + Penteado)">Dia da Noiva Completo (Make + Penteado)</option>
            <option value="Maquiagem Social & Penteado (Madrinha / Formanda)">Maquiagem Social & Penteado (Madrinha / Formanda)</option>
            <option value="Apenas Maquiagem Social">Apenas Maquiagem Social</option>
            <option value="Apenas Penteado">Apenas Penteado</option>
            <option value="Extensão de Cílios / Lash Lifting">Extensão de Cílios / Lash Lifting</option>
            <option value="Design de Sobrancelhas">Design de Sobrancelhas</option>
            <option value="Curso de Automaquiagem VIP">Curso de Automaquiagem VIP</option>
            <option value="Curso Profissional de Maquiagem">Curso Profissional de Maquiagem</option>
          </select>
        </div>

        <div class="galya-form-group">
          <label>Detalhes ou Mensagem Adicional</label>
          <textarea name="mensagem" rows="3" placeholder="Conte-nos sobre o seu evento, horário previsto, etc..."></textarea>
        </div>

        <button type="submit" class="galya-form-submit">Enviar e Conversar no WhatsApp</button>
        
        <div class="galya-form-success" id="cintyaSuccessMsg">
          <h4>Obrigada pelo contato, <span id="clientNameSpan"></span>!</h4>
          <p>Redirecionando para o WhatsApp oficial de Cintya Nunes...</p>
        </div>
      </form>
    `;

    const form = document.getElementById('cintyaBookingForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const nome = form.querySelector('[name="nome"]').value;
        const data = form.querySelector('[name="dataEvento"]').value;
        const local = form.querySelector('[name="local"]').value;
        const servico = form.querySelector('[name="servico"]').value;
        const msgExtra = form.querySelector('[name="mensagem"]').value;

        document.getElementById('clientNameSpan').textContent = nome;
        form.querySelectorAll('.galya-form-group, .galya-form-row, .galya-form-submit, p.sub').forEach(el => el.style.display = 'none');
        document.getElementById('cintyaSuccessMsg').style.display = 'block';

        const textMsg = `Olá Cintya Nunes! Meu nome é *${nome}* e gostaria de um orçamento para *${servico}* na data *${data}* em *${local}*. ${msgExtra ? 'Detalhes: ' + msgExtra : ''}`;
        const waUrl = `https://wa.me/message/JPA7IZW4D3R5G1?text=${encodeURIComponent(textMsg)}`;
        
        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 1200);
      });
    }
  }

  // 9. Sticky Split-Scroll retired in favor of full horizontal fold photo


  // 10. Update all Instagram links to Cintya's official profile
  document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
    link.href = 'https://www.instagram.com/cintya_nsmakeup/';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  // 11. Bridal Lookbook Lightbox Modal & Gallery Link Interceptor
  (function initBridalModal() {
    const LOOKS_DATA = {
      'gallery-1': {
        title: 'Timeless Soft Glam',
        location: 'Lowndes Grove, Charleston SC',
        desc: 'Um visual clássico, romântico e atemporal. Pele aveludada com acabamento acetinado de longa duração, olhar iluminado e lábios nude rosados com brilho delicado.',
        photos: [
          '/assets/images/cintya/IMG_4501.jpg',
          '/assets/images/cintya/IMG_4381.jpg',
          '/assets/images/cintya/IMG_0661.jpg',
          '/assets/images/cintya/IMG_0230.jpg'
        ]
      },
      'gallery-2': {
        title: 'Velvet Glam',
        location: 'Lowndes Grove, Charleston SC',
        desc: 'Intenso, sofisticado e marcante. Cobertura impecável com acabamento matte aveludado, contorno esculpido e olhos marcantes para noivas que desejam destaque deslumbrante nas fotos.',
        photos: [
          '/assets/images/cintya/IMG_4338.jpg',
          '/assets/images/cintya/IMG_7555.jpg',
          '/assets/images/cintya/IMG_6470.jpg',
          '/assets/images/cintya/IMG_4653.jpg'
        ]
      },
      'gallery-3': {
        title: 'Old World Allure Glam',
        location: 'Historic Downtown Charleston, SC',
        desc: 'Inspirado na elegância vintage e do cinema clássico. Ondas Hollywood perfeitamente polidas, olhar esfumado elegante e boca marcante com presença inesquecível.',
        photos: [
          '/assets/images/cintya/IMG_7680.jpg',
          '/assets/images/cintya/IMG_3541.jpg',
          '/assets/images/cintya/IMG_2356.jpg',
          '/assets/images/cintya/IMG_7017.jpg'
        ]
      },
      'gallery-4': {
        title: 'Rosé Romance Glam',
        location: 'Rose Hill Mansion, SC',
        desc: 'Romantismo e frescor com toques rosados e champagne. Iluminação orvalhada natural, pálpebras com brilho suave e cabelos com movimento orgânico dos sonhos.',
        photos: [
          '/assets/images/cintya/IMG_2356.jpg',
          '/assets/images/cintya/IMG_3004.jpg',
          '/assets/images/cintya/IMG_7017.jpg',
          '/assets/images/cintya/IMG_4381.jpg'
        ]
      }
    };

    // Create modal HTML container if not present
    let modal = document.getElementById('cintya-gallery-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'cintya-gallery-modal';
      modal.innerHTML = `
        <div class="cgm-container" role="dialog" aria-modal="true" aria-label="Galeria da Noiva">
          <div class="cgm-header">
            <div>
              <div class="cgm-badge">Cintya Nunes Bridal Artistry • Lookbook</div>
              <h2 class="cgm-title" id="cgmTitle">Timeless Soft Glam</h2>
              <div class="cgm-location" id="cgmLocation">Lowndes Grove, Charleston SC</div>
            </div>
            <button type="button" class="cgm-close-btn" id="cgmClose" aria-label="Fechar Galeria">&times;</button>
          </div>
          <div class="cgm-body">
            <div class="cgm-main-viewer">
              <button type="button" class="cgm-nav-btn cgm-nav-prev" id="cgmPrev" aria-label="Foto Anterior">&#10094;</button>
              <img src="" alt="Cintya Nunes Noiva" class="cgm-main-img" id="cgmMainImg">
              <button type="button" class="cgm-nav-btn cgm-nav-next" id="cgmNext" aria-label="Próxima Foto">&#10095;</button>
              <div class="cgm-counter" id="cgmCounter">1 / 4</div>
            </div>
            <div class="cgm-thumbs" id="cgmThumbs"></div>
          </div>
          <div class="cgm-footer">
            <p class="cgm-desc" id="cgmDesc"></p>
            <a href="#" target="_blank" class="cgm-cta-btn" id="cgmCta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              Quero Este Look no Meu Casamento
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    let currentLookKey = 'gallery-1';
    let currentPhotoIdx = 0;

    function renderPhoto(idx) {
      const data = LOOKS_DATA[currentLookKey];
      if (!data || !data.photos.length) return;
      currentPhotoIdx = (idx + data.photos.length) % data.photos.length;
      const img = document.getElementById('cgmMainImg');
      img.style.opacity = '0';
      setTimeout(() => {
        img.src = data.photos[currentPhotoIdx];
        img.style.opacity = '1';
      }, 150);
      document.getElementById('cgmCounter').textContent = `${currentPhotoIdx + 1} / ${data.photos.length}`;
      
      const thumbs = document.querySelectorAll('.cgm-thumb');
      thumbs.forEach((th, i) => {
        th.classList.toggle('is-active', i === currentPhotoIdx);
      });
    }

    function openModal(lookKey) {
      if (!LOOKS_DATA[lookKey]) lookKey = 'gallery-1';
      currentLookKey = lookKey;
      currentPhotoIdx = 0;
      const data = LOOKS_DATA[lookKey];

      document.getElementById('cgmTitle').textContent = data.title;
      document.getElementById('cgmLocation').textContent = data.location;
      document.getElementById('cgmDesc').textContent = data.desc;

      const waMsg = `Olá Cintya! Amei o visual *${data.title}* do seu lookbook e gostaria de verificar disponibilidade para o meu casamento!`;
      document.getElementById('cgmCta').href = `https://wa.me/message/JPA7IZW4D3R5G1?text=${encodeURIComponent(waMsg)}`;

      const thumbsContainer = document.getElementById('cgmThumbs');
      thumbsContainer.innerHTML = '';
      data.photos.forEach((src, i) => {
        const th = document.createElement('img');
        th.src = src;
        th.className = 'cgm-thumb' + (i === 0 ? ' is-active' : '');
        th.alt = `${data.title} foto ${i+1}`;
        th.addEventListener('click', () => renderPhoto(i));
        thumbsContainer.appendChild(th);
      });

      renderPhoto(0);
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    document.getElementById('cgmClose').addEventListener('click', closeModal);
    document.getElementById('cgmPrev').addEventListener('click', () => renderPhoto(currentPhotoIdx - 1));
    document.getElementById('cgmNext').addEventListener('click', () => renderPhoto(currentPhotoIdx + 1));

    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
      if (!modal.classList.contains('is-active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') renderPhoto(currentPhotoIdx - 1);
      if (e.key === 'ArrowRight') renderPhoto(currentPhotoIdx + 1);
    });

    // Intercept all clicks on look gallery triggers
    function bindTriggers() {
      const selectors = [
        'a[href*="gallery-1"]', 'a[href*="gallery-2"]', 'a[href*="gallery-3"]', 'a[href*="gallery-4"]',
        '[data-link*="gallery-1"]', '[data-link*="gallery-2"]', '[data-link*="gallery-3"]', '[data-link*="gallery-4"]',
        '.sib-gallery-1 [data-sid$="_0"]', '.sib-gallery-1 [data-sid$="_4"]', '.sib-gallery-1 [data-sid$="_6"]',
        '.sib-gallery-2 [data-sid$="_0"]', '.sib-gallery-2 [data-sid$="_4"]', '.sib-gallery-2 [data-sid$="_6"]',
        '.sib-gallery-3 [data-sid$="_0"]', '.sib-gallery-3 [data-sid$="_4"]', '.sib-gallery-3 [data-sid$="_6"]',
        '.sib-gallery-4 [data-sid$="_0"]', '.sib-gallery-4 [data-sid$="_4"]', '.sib-gallery-4 [data-sid$="_6"]'
      ];

      document.querySelectorAll(selectors.join(', ')).forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();

          // Find look ID
          let lookId = 'gallery-1';
          const href = this.getAttribute('href') || '';
          const dataLink = this.getAttribute('data-link') || '';
          const parentCanvas = this.closest('.sb');

          if (href.includes('gallery-2') || dataLink.includes('gallery-2') || (parentCanvas && parentCanvas.id === 'gallery-2')) {
            lookId = 'gallery-2';
          } else if (href.includes('gallery-3') || dataLink.includes('gallery-3') || (parentCanvas && parentCanvas.id === 'gallery-3')) {
            lookId = 'gallery-3';
          } else if (href.includes('gallery-4') || dataLink.includes('gallery-4') || (parentCanvas && parentCanvas.id === 'gallery-4')) {
            lookId = 'gallery-4';
          }

          openModal(lookId);
        });
      });
    }

    bindTriggers();

    // Check URL parameters / hash on page load
    const urlParams = new URLSearchParams(window.location.search);
    const lookParam = urlParams.get('look');
    const hash = window.location.hash.replace('#', '');
    if (lookParam && LOOKS_DATA[lookParam]) {
      setTimeout(() => openModal(lookParam), 400);
    } else if (hash && LOOKS_DATA[hash]) {
      setTimeout(() => openModal(hash), 400);
    }

    // Expose globally for testing
    window.cintyaOpenGallery = openModal;
    window.cintyaCloseGallery = closeModal;
  })();

});

