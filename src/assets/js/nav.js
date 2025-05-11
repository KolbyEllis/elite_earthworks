// Function to initialize event listeners for video interactions
function initializeVideoInteractions() {
    const videoWrappers = document.querySelectorAll('#hero-2154 .cs-video-wrapper');
    const playButtons = document.querySelectorAll('#hero-2154 .cs-play');
    const video = document.querySelector('#hero-2154 video');

    videoWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            playButtons.forEach(button => button.classList.toggle('cs-hide'));
            video.paused ? video.play() : video.pause();
        });
    });

    if (video) {
        video.addEventListener('click', () => {
            video.paused ? video.play() : video.pause();
        });
    }
}
initializeVideoInteractions();

// FAQ toggling logic
const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
faqItems.forEach(item => {
    const button = item.querySelector('.cs-button');
    if (button) {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            item.classList.toggle('active');
        });
    }
});

// FAQFilter class definition
class FAQFilter {
    constructor() {
        this.filtersSelector = '.cs-option';
        this.FAQselector = '.cs-faq-group';
        this.activeClass = 'cs-active';
        this.hiddenClass = 'cs-hidden';

        const filters = document.querySelectorAll(this.filtersSelector);
        this.activeFilter = filters[0];
        this.faqGroups = document.querySelectorAll(this.FAQselector);

        if (this.activeFilter) {
            this.activeFilter.classList.add(this.activeClass);
        }

        filters.forEach(filter => {
            filter.addEventListener('click', () => this.onClick(filter));
        });
    }

    onClick(filter) {
        this.closeAllOpenFAQs(); // Close all active FAQ items
        this.filterContent(filter.dataset.filter);

        if (this.activeFilter) {
            this.activeFilter.classList.remove(this.activeClass);
        }
        filter.classList.add(this.activeClass);
        this.activeFilter = filter;
    }

    filterContent(filter) {
        const showAll = filter === 'all';
        this.faqGroups.forEach(group => {
            const show = showAll || group.dataset.category === filter;
            group.classList.toggle(this.hiddenClass, !show);
        });
    }

    closeAllOpenFAQs() {
        document.querySelectorAll('.cs-faq-item.active').forEach(item => {
            item.classList.remove('active');
        });
    }
}
new FAQFilter();

// Mobile navigation functionality
const body = document.querySelector('body');
const navbarMenu = document.querySelector('#cs-navigation');
const hamburgerMenu = document.querySelector('#cs-navigation .cs-toggle');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('cs-active');
    navbarMenu.classList.toggle('cs-active');
    body.classList.toggle('cs-open');
    toggleAriaExpanded();
});

function toggleAriaExpanded() {
    const expandedElement = document.querySelector('#cs-expanded');
    const isExpanded = expandedElement.getAttribute('aria-expanded') === 'true';
    expandedElement.setAttribute('aria-expanded', !isExpanded);
}

// Mobile nav dropdown toggle
const dropdowns = document.querySelectorAll('#cs-navigation .cs-dropdown');
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', () => {
        dropdown.classList.toggle('cs-active');
    });
});

// Scroll header effect
document.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const navigation = document.querySelector('#cs-navigation');
    navigation.classList.toggle('scroll', scrollTop >= 100);
});
