// ============================================
// IQCOL 2026 — Navbar Component JS
// ============================================

(function () {
    // ── Inject Navbar HTML ──
    function getNavbarHTML() {
        return `
        <nav id="main-navbar">
            <div class="nav-inner">
                <!-- Logo -->
                <a href="index.html" class="nav-logo">
                    <img src="https://cdn.kb.institute/eto-2026/IQCOL/Logo/Square_Dark_Background_2026_500.png" alt="IQCOL Logo" onerror="this.style.display='none'">
                    <span class="nav-logo-text">IQCOL
                        <span class="nav-logo-sub">2026 Olympiad</span>
                    </span>
                </a>

                <!-- Desktop Links -->
                <ul class="nav-links" id="nav-links">
                    <li>
                        <a href="index.html" data-page="index">Home</a>
                    </li>
                    <li>
                        <a href="about.html" data-page="about">About Us</a>
                    </li>
                    <li>
                        <span class="nav-parent" id="comp-parent">
                            Competition
                            <svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </span>
                        <ul class="nav-dropdown" id="comp-dropdown">
                            <li><a href="competition.html" data-page="competition">Overview</a></li>
                            <li><a href="eligibility.html" data-page="eligibility">Eligibility</a></li>
                            <li><a href="timeline.html" data-page="timeline">Timeline</a></li>
                            <li><a href="submission.html" data-page="submission">Submission</a></li>
                            <li><a href="accolades.html" data-page="accolades">Accolades</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="registration.html" data-page="registration">Registration</a>
                    </li>
                    <li>
                        <a href="contact.html" data-page="contact">Contact</a>
                    </li>
                </ul>

                <!-- CTA -->
                <a href="registration.html" class="nav-cta">
                    Register Now
                </a>

                <!-- Hamburger -->
                <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>

        <!-- Mobile Menu -->
        <div id="mobile-menu">
            <ul class="mobile-nav-list">
                <li>
                    <a href="index.html" data-page="index">Home</a>
                </li>
                <li>
                    <a href="about.html" data-page="about">About Us</a>
                </li>
                <li class="has-sub" id="mobile-comp-li">
                    <button class="mobile-parent" id="mobile-comp-btn">
                        Competition
                        <svg class="mobile-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"/>
                        </svg>
                    </button>
                    <ul class="mobile-sub-list">
                        <li><a href="competition.html" data-page="competition">Overview</a></li>
                        <li><a href="eligibility.html" data-page="eligibility">Eligibility</a></li>
                        <li><a href="timeline.html" data-page="timeline">Timeline</a></li>
                        <li><a href="submission.html" data-page="submission">Submission</a></li>
                        <li><a href="accolades.html" data-page="accolades">Accolades</a></li>
                    </ul>
                </li>
                <li>
                    <a href="registration.html" data-page="registration">Registration</a>
                </li>
                <li>
                    <a href="contact.html" data-page="contact">Contact</a>
                </li>
            </ul>
            <a href="registration.html" class="mobile-cta">Register Now →</a>
        </div>
        `;
    }

    // ── Inject into body ──
    document.body.insertAdjacentHTML('afterbegin', getNavbarHTML());

    // ── Active page highlighting ──
    const currentPage = document.body.dataset.page || '';
    document.querySelectorAll('[data-page]').forEach(el => {
        if (el.dataset.page === currentPage) {
            el.classList.add('active-page');
        }
    });

    // ── Scroll effect ──
    const navbar = document.getElementById('main-navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // ── Hamburger toggle ──
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        if (isOpen) {
            mobileMenu.style.display = 'block';
            requestAnimationFrame(() => mobileMenu.classList.add('open'));
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('open');
            setTimeout(() => { mobileMenu.style.display = 'none'; }, 350);
            document.body.style.overflow = '';
        }
    });

    // ── Mobile competition dropdown ──
    const mobileCompBtn = document.getElementById('mobile-comp-btn');
    const mobileCompLi = document.getElementById('mobile-comp-li');
    if (mobileCompBtn) {
        mobileCompBtn.addEventListener('click', () => {
            mobileCompLi.classList.toggle('open');
        });
    }

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            setTimeout(() => { mobileMenu.style.display = 'none'; }, 350);
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
            if (hamburger.classList.contains('open')) {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                setTimeout(() => { mobileMenu.style.display = 'none'; }, 350);
                document.body.style.overflow = '';
            }
        }
    });

})();
