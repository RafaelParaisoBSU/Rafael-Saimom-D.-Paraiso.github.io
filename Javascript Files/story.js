document.addEventListener("DOMContentLoaded", function () {
    // Initialize Swup for page transitions
    const swup = new Swup();
    // Select the "next" and "prev" buttons and the slider element
    let next = document.querySelector('.next');
    let prev = document.querySelector('.prev');
    let slider = document.querySelector('.slider');

    // Add a click event listener to the "next" button
    next.addEventListener('click', function () {
        // Select all elements with the class "slides"
        let slides = document.querySelectorAll('.slides');
        // Move the first slide to the end of the slider
        slider.appendChild(slides[0]);
    });

    // Add a click event listener to the "prev" button
    prev.addEventListener('click', function () {
        // Select all elements with the class "slides"
        let slides = document.querySelectorAll('.slides');
        // Move the last slide to the beginning of the slider
        slider.prepend(slides[slides.length - 1]);
    });

})
