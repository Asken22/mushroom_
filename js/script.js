document.addEventListener('DOMContentLoaded', () => {
    
    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500); // Small delay to ensure smooth transition
    });

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    // Only enable custom cursor on desktop
    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Add smooth delay to outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effect for interactive elements
        const interactives = document.querySelectorAll('a, button, .hover-tilt, .hover-lift, .accordion-btn');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // --- Magnetic Buttons ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });
        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- 3D Hover Tilt Effect ---
    const tiltElements = document.querySelectorAll('.hover-tilt');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // --- Parallax Background on Mouse Move ---
    const heroBg = document.querySelector('.parallax-bg');
    const heroSection = document.querySelector('.hero');
    if (heroSection && heroBg) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 90;
            const y = (window.innerHeight - e.pageY * 2) / 90;
            heroBg.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }

    // --- Sticky Navbar ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Animate hamburger to X (simple implementation)
        const bars = hamburger.querySelectorAll('.bar');
        if (mobileMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // --- Scroll Reveal with Intersection Observer ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                // Don't unobserve if you want it to happen every time, 
                // but usually one-time is better for performance.
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        
                        // Increment speed based on target
                        const inc = target / 100;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
                countersAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // --- Testimonial Slider ---
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Make function globally available for onclick handlers in HTML
    window.currentSlide = (index) => {
        currentSlideIndex = index;
        updateSlider();
    };

    function updateSlider() {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active');
    }

    // Auto slide
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlider();
    }, 5000);

    // --- FAQ Accordion ---
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Close all others
            accordionBtns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.classList.remove('active');
                    otherBtn.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Handle demo buttons clicks (for non-product demo buttons)
    document.querySelectorAll('.demo-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Demo interaction triggered');
        });
    });

    // --- Static Shopping Cart Logic ---
    let cart = [];
    const cartBadge = document.querySelector('.cart-badge');
    const openCartBtn = document.getElementById('open-cart');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutForm = document.getElementById('checkout-form');

    // Product Quick View Logic
    const productModal = document.getElementById('product-modal');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const closeBtns = document.querySelectorAll('.modal-close');
    
    let currentSelectedProduct = null;

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.product-card');
            currentSelectedProduct = {
                id: card.dataset.id,
                name: card.dataset.name,
                price: parseFloat(card.dataset.price),
                img: card.dataset.img,
                desc: card.dataset.desc
            };

            // Populate Modal
            document.getElementById('modal-title').innerText = currentSelectedProduct.name;
            document.getElementById('modal-price').innerText = `$${currentSelectedProduct.price.toFixed(2)}`;
            document.getElementById('modal-desc').innerText = currentSelectedProduct.desc;
            document.getElementById('qty-input').value = 1;
            
            if (currentSelectedProduct.img === 'placeholder') {
                document.getElementById('modal-img').style.backgroundImage = 'none';
                document.getElementById('modal-img').innerHTML = '<i class="fa-solid fa-leaf text-white" style="font-size:4rem;"></i>';
            } else {
                document.getElementById('modal-img').style.backgroundImage = `url(${currentSelectedProduct.img})`;
                document.getElementById('modal-img').innerHTML = '';
            }

            productModal.classList.add('active');
        });
    });

    // Close Modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            productModal.classList.remove('active');
            cartModal.classList.remove('active');
        });
    });

    // Close on outside click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Quantity selector logic
    document.getElementById('qty-minus').addEventListener('click', () => {
        const input = document.getElementById('qty-input');
        if (input.value > 1) input.value = parseInt(input.value) - 1;
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
        const input = document.getElementById('qty-input');
        input.value = parseInt(input.value) + 1;
    });

    // Add to Cart Logic
    const addToCart = (product, quantity) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }
        updateCartUI();
        
        // Show subtle visual feedback
        cartBadge.style.transform = 'scale(1.5)';
        setTimeout(() => cartBadge.style.transform = 'scale(1)', 300);
    };

    // Quick add from card
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.product-card');
            const product = {
                id: card.dataset.id,
                name: card.dataset.name,
                price: parseFloat(card.dataset.price)
            };
            addToCart(product, 1);
        });
    });

    // Add from modal
    document.getElementById('modal-add-to-cart').addEventListener('click', () => {
        const qty = parseInt(document.getElementById('qty-input').value);
        if (currentSelectedProduct && qty > 0) {
            addToCart(currentSelectedProduct, qty);
            productModal.classList.remove('active');
        }
    });

    // Open Cart
    openCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.classList.add('active');
    });

    // Update Cart UI
    const updateCartUI = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.innerText = totalItems;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your order list is empty.</p>';
            cartTotalPrice.innerText = '$0.00';
            checkoutForm.classList.remove('active');
            return;
        }

        let html = '';
        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.quantity} x $${item.price.toFixed(2)}</p>
                    </div>
                    <div style="display:flex; align-items:center; gap:15px;">
                        <strong>$${itemTotal.toFixed(2)}</strong>
                        <button class="remove-item" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = html;
        cartTotalPrice.innerText = `$${total.toFixed(2)}`;
        checkoutForm.classList.add('active');

        // Add remove event listeners
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                cart = cart.filter(item => item.id !== id);
                updateCartUI();
            });
        });
    };

    // Checkout Flow Simulation
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = checkoutForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Processing...';
        
        setTimeout(() => {
            cart = [];
            updateCartUI();
            checkoutForm.reset();
            cartItemsContainer.innerHTML = `
                <div style="text-align:center; padding: 40px 0;">
                    <i class="fa-solid fa-circle-check" style="font-size: 3rem; color: var(--primary-green); margin-bottom: 15px;"></i>
                    <h3 style="margin-bottom:10px;">Order Received!</h3>
                    <p class="text-muted">Thank you for your business. An account manager will contact you shortly to finalize shipping details.</p>
                </div>
            `;
            btn.innerText = originalText;
            checkoutForm.classList.remove('active');
        }, 1500);
    });

});
