const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value.trim();

    if (cityVal === "") {
        city_name.innerText = `Please write the name before search`;
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=f59f177b322ad0126b4d4f8410620ab0`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('City not found');
            }

            const data = await response.json();
            const arrData = [data];
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

            temp_real_val.innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;

            if (tempMood === "Clear") {
                temp_status.innerHTML =
                    "<i class='fa fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood === "Clouds") {
                temp_status.innerHTML = 
                    "<i class='fa fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood === "Rain") {
                temp_status.innerHTML = 
                    "<i class='fa fa-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = 
                    "<i class='fa fa-sun' style='color: #eccc68;'></i>";
            }

            datahide.classList.remove('data_hide');

        } catch (error) {
            city_name.innerText = `Please enter the city name properly`;
            datahide.classList.add('data_hide');
            temp.innerText = "";
            temp_status.innerText = "";
        }
    }
}

submitBtn.addEventListener('click', getInfo);
