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
      el.innerHTML = '<img src="assets/images/cintya_nunes_logo.svg" alt="Cintya Nunes Makeup Artist & Hairstyles" style="width:100%;height:100%;object-fit:contain;">';
    });

    const footerLogos = document.querySelectorAll('.sie-footer_16, [data-sid="footer_16"]');
    footerLogos.forEach(el => {
      el.innerHTML = '<img src="assets/images/cintya_nunes_logo.svg" alt="Cintya Nunes Logo" style="width:100%;height:100%;object-fit:contain;">';
    });

    // Replace founder portrait in meet section with Cintya's photo
    const meetPhotos = document.querySelectorAll('.sie-meet_1, [data-sid="meet_1"], .sie-bio_0, [data-sid="bio_0"]');
    meetPhotos.forEach(el => {
      const imgDiv = el.querySelector('.se-img') || el;
      imgDiv.style.backgroundImage = 'url("assets/images/cintya_avatar_hq.png")';
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
  function setupMarquee(gallerySelector, reverse, speed) {
    const gallery = document.querySelector(gallerySelector);
    if (!gallery) return;

    const noscripts = gallery.querySelectorAll('noscript');
    if (!noscripts.length) return;

    const imgSources = [];
    noscripts.forEach(ns => {
      const match = ns.innerHTML.match(/src="([^"]+)"/);
      if (match && match[1]) {
        imgSources.push(match[1]);
      }
    });

    if (!imgSources.length) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'lookbook-marquee-wrapper';

    const track = document.createElement('div');
    track.className = reverse ? 'lookbook-marquee-track-reverse' : 'lookbook-marquee-track';
    if (speed) track.style.animationDuration = speed + 's';

    const fullList = [...imgSources, ...imgSources, ...imgSources];
    fullList.forEach(src => {
      const item = document.createElement('div');
      item.className = 'lookbook-item';
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Cintya Nunes Noivas e Penteados';
      img.loading = 'lazy';
      item.appendChild(img);
      track.appendChild(item);
    });

    wrapper.appendChild(track);
    gallery.innerHTML = '';
    gallery.appendChild(wrapper);
  }

  setupMarquee('.sie-portfolio-2_0, [data-sid="portfolio-2_0"]', false, 40);
  setupMarquee('.sie-portfolio-2_1, [data-sid="portfolio-2_1"]', true, 35);

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
});

