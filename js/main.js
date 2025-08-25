let inputSearch = document.querySelector(".forecast-search");
let forecastContainer = [];
const DaysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

inputSearch.addEventListener("input", (e) => {
  getData(e.target.value);
});

async function getData(country) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=a931219456ce4702b7a10723250208&q=${
        country ? country : "alex"
      }&days=3`
    );
    let data = await response.json();
    display(data);
  } catch (error) {
    console.log(error);
  }
}
getData();

async function display(dataList) {
  let DayOne = new Date(dataList.forecast.forecastday[0].date);
  let DayTwo = new Date(dataList.forecast.forecastday[1].date);
  let DayThree = new Date(dataList.forecast.forecastday[2].date);

  let dayNameOne = DaysOfWeek[DayOne.getDay()];
  let dayNameTwo = DaysOfWeek[DayTwo.getDay()];
  let dayNameThree = DaysOfWeek[DayThree.getDay()];
  let MonthName = months[DayOne.getMonth()];
  let dayNum = DayOne.getDate();
  document.querySelector(".row").innerHTML = `
    <div class="col-lg-4">
              <div class="box text-white-50 h-100">
                <div class="forecast-header d-flex justify-content-between p-2">
                  <p class="mb-0">${dayNameOne}</p>
                  <p class="mb-0">${dayNum + MonthName}</p>
                </div>
                <div class="forecast-content p-4">
                  <span>${dataList.location.name}</span>
                  <div class="degree d-flex flex-wrap d-lg-block">
                    <div class="text me-3">
                      <p class="text-white fw-bold">${
                        dataList.current.temp_c
                      }<sup>o</sup>C</p>
                    </div>
                    <div class="img">
                    <img src="${dataList.current.condition.icon}" alt="" />
                    </div>
                  </div>
                  <p>${dataList.current.condition.text}</p>
                  <span class="me-3"
                    ><img
                      src="images/icon-umberella.png"
                      alt=""
                      class="me-2"
                    />20%</span
                  >
                  <span class="me-3"
                    ><img
                      src="images/icon-wind.png"
                      alt=""
                      class="me-2"
                    />18km/h</span
                  >
                  <span
                    ><img
                      src="images/icon-compass.png"
                      alt=""
                      class="me-2"
                    />East</span
                  >
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="box text-white h-100">
                <div class="forecast-header p-2 text-center">
                  <p class ="mb-0 text-white-50">${dayNameTwo}</p>
                </div>
                <div class="forecast-content p-4 text-center">
                  <img src="${
                    dataList.forecast.forecastday[1].day.condition.icon
                  }" alt="" class="mb-4"  />
                  <p class ="mb-0 fs-3 fw-bold">${
                    dataList.forecast.forecastday[1].day.maxtemp_c
                  }<sup>o</sup>c</p>
                  <small class=" d-block mb-3 text-white-50">${
                    dataList.forecast.forecastday[1].day.mintemp_c
                  }<sup>o</sup></small>
                  <p>${dataList.forecast.forecastday[1].day.condition.text}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="box text-white h-100">
                <div class="forecast-header p-2 text-center">
                  <p class ="mb-0 text-white-50">${dayNameThree}</p>
                </div>
                <div class="forecast-content p-4 text-center">
                  <img src="${
                    dataList.forecast.forecastday[2].day.condition.icon
                  }" alt="" class="mb-4" />
                  <p class ="mb-0 fs-3 fw-bold">${
                    dataList.forecast.forecastday[2].day.maxtemp_c
                  }<sup>o</sup>c</p>
                  <small class=" d-block mb-3 text-white-50">${
                    dataList.forecast.forecastday[2].day.mintemp_c
                  }<sup>o</sup></small>
                  <p>${dataList.forecast.forecastday[2].day.condition.text}</p>
                </div>
              </div>
            </div>
  `;
}
