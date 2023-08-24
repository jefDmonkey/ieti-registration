 const toggler = document.getElementById('toggler');
        const navLinks = document.querySelector('.nav-links');
        
        toggler.addEventListener('change', () => {
            if (toggler.checked) {
                navLinks.classList.add('active');
            } else {
                navLinks.classList.remove('active');
            }
        });