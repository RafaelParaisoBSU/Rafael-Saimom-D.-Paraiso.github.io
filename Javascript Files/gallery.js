document.addEventListener("DOMContentLoaded", function () {
    // Initialize Swup for page transitions
    const swup = new Swup();
    let target = 0; // Target scroll position
    let current = 0; // Current scroll position
    let ease = 0.075; // Easing factor for smooth scrolling

    const slider = document.querySelector(".slider"); // Slider element
    const sliderWrapper = document.querySelector(".slider-wrapper"); // Wrapper element for the slider
    const slides = document.querySelectorAll(".slide"); // All slide elements

    // Calculate maximum scrollable width
    let maxScroll = sliderWrapper.offsetWidth - window.innerWidth;

    // Function for smooth transitions
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    // Function to update the scale and position of slides based on their distance from the center
    function updateScaleAndPositon() {
        slides.forEach((slide) => {
            const rect = slide.getBoundingClientRect();
            const centerPostion = (rect.left + rect.right) / 4; // Calculate the center position of the slide
            const distanceFromCenter = centerPostion - window.innerWidth / 2; // Distance from the center of the viewport

            let scale, offsetX;
            if (distanceFromCenter > 0) {
                // If the slide is to the right of the center
                scale = Math.min(1.25, 1 + distanceFromCenter / window.innerWidth); // Scale up to a maximum of 1.25
                offsetX = (scale - 1) * 300; // Calculate horizontal offset
            } else {
                // If the slide is to the left of the center or centered
                scale = Math.max(
                    0.5,
                    1 - Math.abs(distanceFromCenter) / window.innerWidth
                ); // Scale down to a minimum of 0.5
                offsetX = 0; // No horizontal offset
            }

            // Apply the calculated scale and position using GSAP
            gsap.set(slide, { scale: scale, x: offsetX });
        });
    }

    // Main update function to handle the animation frame updates
    function update() {
        current = lerp(current, target, ease); // Smoothly interpolate the current position to the target position

        // Update the position of the slider wrapper
        gsap.set(".slider-wrapper", {
            x: -current,
        });

        updateScaleAndPositon(); // Update the scale and position of slides
        requestAnimationFrame(update); // Request the next animation frame
    }

    // Update maxScroll value on window resize
    window.addEventListener("resize", () => {
        maxScroll = sliderWrapper.offsetWidth - window.innerWidth;
    });

    // Update target scroll position on mouse wheel scroll
    window.addEventListener("wheel", (e) => {
        target += e.deltaY;
        target = Math.max(0, target); // Ensure target is not less than 0
        target = Math.min(maxScroll, target); // Ensure target is not more than maxScroll
    });

    update(); // Start the update loop

    function update() {
        console.log("Update function is being called");
        current = lerp(current, target, ease); // Smoothly inserts the current position to the target position

        // Updates the position of the slider wrapper
        gsap.set(".slider-wrapper", {
            x: -current,
        });

        updateScaleAndPositon(); // Updates the scale and position of slides
        requestAnimationFrame(update); // Request the next animation frame
    }
});
