document.addEventListener("DOMContentLoaded", () => {
  let lastScrollPosition = 0;
  let lastCentered = 0;
  let onWayTo = null;

  function updateActiveSection() {
    const sections = document.querySelectorAll("section");
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    let closestSection = sections[0];
    let minDistance = Math.abs(sections[0].getBoundingClientRect().top);

    sections.forEach((section) => {
      const distance = Math.abs(section.getBoundingClientRect().top);
      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    });

    sections.forEach((section, index) => {
      if (section === closestSection) {
        section.classList.add("active");
        lastCentered = index;
      } else {
        section.classList.remove("active");
      }
    });
  }

  function scrollToSection(index) {
    const sections = document.querySelectorAll("section");
    if (index >= 0 && index < sections.length) {
      const section = sections[index];
      const offsetTop = section.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  document.addEventListener("scroll", () => {
    const direction = window.scrollY - lastScrollPosition > 0 ? "down" : "up";
    const sections = document.querySelectorAll("section");

    if (onWayTo === null) {
      const destIndex =
        direction === "up" ? lastCentered - 1 : lastCentered + 1;
      if (destIndex >= 0 && destIndex < sections.length) {
        onWayTo = destIndex;
        scrollToSection(destIndex);
      }
    }

    updateActiveSection();

    lastScrollPosition = window.scrollY;
  });

  // Initial call to update active section when the page loads
  updateActiveSection();
});
