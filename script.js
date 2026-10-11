// PRISM company site — nav, menu, reveal animations, counters, contact form

(function(){
  'use strict';

  // Sticky nav background on scroll
  var nav = document.getElementById('nav');
  function onScroll(){ nav.classList.toggle('scrolled', window.scrollY > 30); }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Hamburger menu (mobile)
  var burger = document.getElementById('hamburger');
  var links = document.getElementById('navLinks');
  burger.addEventListener('click', function(){
    var open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.addEventListener('click', function(e){
    if(e.target.tagName === 'A'){
      links.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
    }
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // Animated stat counters
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting) return;
      cio.unobserve(en.target);
      var el = en.target, target = parseInt(el.dataset.count, 10), t0 = null;
      function step(ts){
        if(!t0) t0 = ts;
        var p = Math.min((ts - t0) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if(p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, {threshold: .5});
  document.querySelectorAll('.stat-num').forEach(function(el){ cio.observe(el); });

  // Deployment bars animate when visible
  var bio = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('visible'); bio.unobserve(en.target); }
    });
  }, {threshold: .25});
  var dl = document.querySelector('.deploy-list');
  if(dl) bio.observe(dl);

  // Contact form -> opens email client via mailto (no backend)
  document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('cfName').value.trim();
    var email = document.getElementById('cfEmail').value.trim();
    var msg = document.getElementById('cfMsg').value.trim();
    var subject = encodeURIComponent('Website inquiry from ' + name);
    var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + msg);
    window.location.href = 'mailto:info@prismxe.com?subject=' + subject + '&body=' + body;
  });
})();
