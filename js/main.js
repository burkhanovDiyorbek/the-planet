async function getPlantsFacts() {
  let result = await fetch("./js/planets-fact.json");
  return await result.json();
}
getPlantsFacts()
  .then((data) => forNavTabs(data))
  .catch((error) => console.log(error));

function forNavTabs(data) {
  let navTabs = document.querySelectorAll(".nav > ul > li");

  navTabs.forEach((item) => {
    item.addEventListener("click", (e) => {
      let index = e.currentTarget.id;
      document.body.classList.add("loading");
      setTimeout(() => {
        document.body.classList.remove("loading");
        changeContent(data[index]);
      }, 500);
    });
  });

  let changeDivELements = document.querySelectorAll(".nav-tabs_mob > div");

  changeDivELements.forEach((item) => {
    item.addEventListener("click", (e) => {
      changeContent(data[e.currentTarget.id]);
      document.querySelector(".planet-container").classList.remove("hide");
    });
  });
}

function changeContent(array) {
  let { title, fact, tabs } = array;
  document.body.classList = "";
  document.body.classList.add(title.toLowerCase());

  let container = document.querySelector(".planet-container");

  container.innerHTML = `
    <div class="change-content_mob">
      <div>
        <div class="change_btn change_btn--clicked" id="1">OVERVIEW</div>
        <div class="change_btn" id="2">Structure</div>
        <div class="change_btn" id="3">Geology</div>    
      </div>
    </div>
    <div class="planet-con_top">
      <div class="planet-pic">
        <img src="./img/${title.toLowerCase()}-1.png" alt="mercury">
      </div>
      <div class="planet-content">
      <div>
        <h2 class="planet-title">${title.toUpperCase()}</h2>
        <p class="planet-content_dsc">${tabs[1]}</p>
        <p class='source'>Source : <a href="https://ru.wikipedia.org/wiki/${title.toLowerCase()}" target="_blank">Wikepedia </a><img src="./img/icons/source.svg" alt="source icon svg"/></p>
      </div>
        <div class="change-content">
          <div class="change_btn change_btn--clicked" id="1">
            <span>01</span>
            <p>OVERVIEW</p>
          </div>
          <div class="change_btn" id="2">
            <span>02</span>
            <p>Internal Structure</p>
          </div>
          <div class="change_btn" id="3">
            <span>03</span>
            <p>Surface Geology</p>
          </div>
        </div>
      </div>
      </div>
    <div class="planet-facts">
      <div class="fact-div">
        <p>ROTATION TIME</p>
        <h2>${fact["rotation-time"]}</h2>
      </div>
      <div class="fact-div">
        <p>REVOLUTION TIME</p>
        <h2>${fact["revolution-time"]}</h2>
      </div>
      <div class="fact-div">
        <p>RADIUS</p>
        <h2>${fact["radius"]} km</h2>
      </div>
      <div class="fact-div">
        <p>AVERAGE TEMP.</p>
        <h2>${fact["average-temp"]}°C</h2>
      </div>
    </div>
 `;

  let changeBtn = document.querySelectorAll(".change-content > .change_btn");
  let changeBtnMob = document.querySelectorAll(
    ".change-content_mob > div > .change_btn"
  );
  let planetPicElement = document.querySelector(".planet-pic > img");
  let planetName = document.querySelector(".planet-title").textContent;
  let planetDsc = document.querySelector(".planet-content_dsc");

  function changeBtnFunc(changeBtn, planetPicElement, planetName, planetDsc) {
    changeBtn.forEach((button) => {
      button.addEventListener("click", (e) => {
        planetPicElement.src = `./img/${planetName.toLowerCase()}-${
          e.currentTarget.id
        }.png`;
        planetDsc.textContent = tabs[e.currentTarget.id];
        changeBtn.forEach((item, index) => {
          item.classList.remove("change_btn--clicked");
          if (e.currentTarget.id == index + 1) {
            item.classList.add("change_btn--clicked");
          }
        });
      });
    });
  }
  changeBtnFunc(changeBtn, planetPicElement, planetName, planetDsc);
  changeBtnFunc(changeBtnMob, planetPicElement, planetName, planetDsc);
}

let navTabChangeColors = [
  "#419EBB",
  "#EDA249",
  "#6D2ED5",
  "#D14C32",
  "#D83A34",
  "#CD5120",
  "#1EC1A2",
  "#2D68F0",
];

let navLiItems = document.querySelectorAll(".nav > ul > li");

navLiItems.forEach((item) => {
  item.classList.add(item.textContent.toLowerCase());
  item.addEventListener("mousemove", (e) => {
    e.target.classList.add("li-moused");
    e.target.style = `--clr : ${navTabChangeColors[e.target.id]}`;
  });
  item.addEventListener("mouseleave", (e) => {
    e.target.classList.remove("li-moused");
  });
  item.addEventListener("click", () => {
    document.body.classList.remove("show-menu");
  });
});

let menuIcon = document.querySelector(".menu");

menuIcon.addEventListener("click", () => {
  document.body.classList.toggle("show-menu");
  document.querySelector(".planet-container").classList.add("hide");
});

let planetCircle = document.querySelectorAll(".planet-circle");

planetCircle.forEach((item, index) => {
  item.style.background = navTabChangeColors[index];
});
