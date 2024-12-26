// FAQ functionality
const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
for (const item of faqItems) {
    const onClick = () => {
        item.classList.toggle('active');
    };
    item.addEventListener('click', onClick);
}

class FAQFilter {
    filtersSelector = '.cs-option';
    FAQselector = '.cs-faq-group';
    activeClass = 'cs-active';
    hiddenClass = 'cs-hidden';

    constructor() {
        const $filters = document.querySelectorAll(this.filtersSelector);
        this.$activeFilter = $filters[0];
        this.$images = document.querySelectorAll(this.FAQselector);

        this.$activeFilter.classList.add(this.activeClass);

        for (const $filter of $filters) {
            $filter.addEventListener('click', () => this.onClick($filter));
        }
    }

    onClick($filter) {
        this.filter($filter.dataset.filter);

        const { activeClass } = this;

        this.$activeFilter.classList.remove(activeClass);
        $filter.classList.add(activeClass);

        this.$activeFilter = $filter;
    }

    filter(filter) {
        const showAll = filter === 'all';
        const { hiddenClass } = this;

        for (const $image of this.$images) {
            const show = showAll || $image.dataset.category === filter;
            $image.classList.toggle(hiddenClass, !show);
        }
    }
}

new FAQFilter();

// Mobile navigation functionality
var CSbody = document.querySelector('body');
const CSnavbarMenu = document.querySelector('#cs-navigation');
const CShamburgerMenu = document.querySelector('#cs-navigation .cs-toggle');

CShamburgerMenu.addEventListener('click', function () {
    CShamburgerMenu.classList.toggle('cs-active');
    CSnavbarMenu.classList.toggle('cs-active');
    CSbody.classList.toggle('cs-open');
    // Run the function to check the aria-expanded value
    ariaExpanded();
});

// Checks the value of aria-expanded on the #cs-expanded element and toggles it
function ariaExpanded() {
    const csUL = document.querySelector('#cs-expanded');
    const csExpanded = csUL.getAttribute('aria-expanded');

    if (csExpanded === 'false') {
        csUL.setAttribute('aria-expanded', 'true');
    } else {
        csUL.setAttribute('aria-expanded', 'false');
    }
}

// Mobile navigation dropdown toggle
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
for (const item of dropDowns) {
    const onClick = () => {
        item.classList.toggle('cs-active');
    };
    item.addEventListener('click', onClick);
}

// Add .scroll class to #cs-navigation after scrolling down 100px
document.addEventListener('scroll', () => {
    const scroll = document.documentElement.scrollTop;
    if (scroll >= 100) {
        document.querySelector('#cs-navigation').classList.add('scroll');
    } else {
        document.querySelector('#cs-navigation').classList.remove('scroll');
    }
});
