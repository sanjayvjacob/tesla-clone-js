let lastScrollPosition = 0;
let lastCentered = 0;
let onWayTo = null;

document.addEventListener("scroll", () => {
  // Determine the direction of the scroll (up or down)
  const direction = window.pageYOffset - lastScrollPosition > 0 ? "down" : "up";

  // Select all section elements on the page
  const sections = document.querySelectorAll("section");

  // If the page is not currently scrolling to a specific section
  if (onWayTo === null) {
    // Calculate the index of the destination section based on the direction of the scroll
    const destIndex = direction === "up" ? lastCentered - 1 : lastCentered + 1;

    // Check if the destination index is within the valid range of sections
    if (destIndex >= 0 && destIndex < sections.length) {
      // Set onWayTo to the destination index and scroll the window to the offset top of that section
      onWayTo = destIndex;
      window.scroll(0, sections[destIndex].offsetTop);
    }
  }

  // Iterate over each section
  sections.forEach((section, index) => {
    // Check if the current section is centered on the screen
    if (window.pageYOffset === section.offsetTop) {
      // Update lastCentered with the index of the centered section
      lastCentered = index;

      // Add the "active" class to the centered section
      section.classList.add("active");

      // If the section is the one the page is currently scrolling towards, set onWayTo to null
      if (onWayTo === index) {
        onWayTo = null;
      }
    } else {
      // Remove the "active" class from sections that are not centered
      section.classList.remove("active");
    }
  });

  // Update lastScrollPosition with the current scroll position
  lastScrollPosition = window.pageYOffset;
});
