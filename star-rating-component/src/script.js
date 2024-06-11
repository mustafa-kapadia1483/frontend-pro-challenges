const starsCountInput = document.querySelector("#stars-count");
const starsContainer = document.querySelector(".stars-container");

createStars(starsCountInput.value);

function updateMessage() {
  const rating = starsContainer.querySelectorAll(
    'svg[data-selected="true"]'
  ).length;
  let message = `You have rated us ${rating}. `;
  if (rating < Math.round(starsContainer.querySelectorAll("svg").length / 2)) {
    message += "We sorry for such a bad experience, we aim to do better";
  } else {
    message += "We are pleased to know that you liked us so much";
  }

  document.querySelector("#rating-message").textContent = message;
}

function createStars(count) {
  function createStar(index) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xlink",
      "http://www.w3.org/1999/xlink"
    );
    svg.setAttribute("viewBox", "0 0 260 245");
    svg.dataset.index = index;
    svg.dataset.selected = "true";

    const starPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    starPath.setAttributeNS(null, "d", "m56,237 74-228 74,228L10,96h240");

    svg.append(starPath);

    svg.addEventListener("click", e => {
      const svg = e.target.closest("svg");
      let currentToggleValue = svg.dataset.selected;
      const { index: starIndex } = svg.dataset;

      console.log({ currentToggleValue, svg, starIndex });

      if (currentToggleValue == "true") {
        for (let i = starIndex; i <= count; i++) {
          starsContainer.querySelector(
            `svg[data-index="${i}"]`
          ).dataset.selected = "false";
        }
        svg.dataset.selected = "true";
      } else {
        for (let i = 1; i <= starIndex; i++) {
          starsContainer.querySelector(
            `svg[data-index="${i}"]`
          ).dataset.selected = "true";
        }
      }

      updateMessage();
    });

    return svg;
  }

  // clear stars
  [...starsContainer.children].forEach(star => star.remove());
  for (let i = 1; i <= count; i++) {
    const star = createStar(i);
    starsContainer.append(star);
  }
}

starsCountInput.addEventListener("input", () => {
  createStars(starsCountInput.value);
});
