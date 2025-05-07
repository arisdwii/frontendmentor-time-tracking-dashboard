const links = document.querySelectorAll(".nav-link");
const trackingList = document.querySelector(".tracking-wrapper");

let currentIndex = 1;

fetch("data.json")
  .then((res) => res.json())
  .then((datas) => {
    // define the available time ranges
    const ranges = ["daily", "weekly", "monthly"];

    ranges.forEach((range) => {
      // find the section that matches the current range
      const section = document.querySelector(`#${range}`);
      // clear section content before appending new data
      section.innerHTML = "";

      datas.forEach((data) => {
        // get time data for the current range
        const { current, previous } = data.timeframes[range];
        // label for the previous period
        const label =
          range === "daily"
            ? "Yesterday"
            : range === "weekly"
            ? "Last Week"
            : "Last Month";

        // append a new tracking card to the section
        section.innerHTML += `
      <article class="tracking-card tracking-card-${data.title
        .toLowerCase()
        .replace(/\s+/g, "-")}">
        <header class="card-header">
          <h3 class="card-title">${data.title}</h3>
          <button class="card-menu-btn" aria-label="Options">
            <svg width="21" height="5" viewBox="0 0 21 5" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                fill="currentColor" fill-rule="evenodd" />
            </svg>
          </button>
        </header>

        <div class="card-body">
            <p class="card-time-current">${current}hrs</p>
            <p class="card-time-previous">${label} - ${previous}hrs</p>
        </div>
      </article>
      `;
      });
    });
  });

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((l) => l.classList.remove("selected"));
    link.classList.add("selected");
    currentIndex = Number(link.dataset.number);

    updateSlider();
  });
});

function updateSlider() {
  trackingList.style.transform = `translateX(${-currentIndex * 100}%)`;
}
