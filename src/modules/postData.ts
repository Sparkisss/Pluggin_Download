// список установленного оборудования и девайсов из базы данных 
const hostEquipment = "http://localhost:3000/Equipment"
const hostDeviceStatus = "http://localhost:3000/DeviceStatus"

interface Equipment {
    product_name: string;
    Mark: string;
    State: string;
}

interface DeviceStatus {
    Device: string;
    Value: string;
    Setpoint: string;
}
//получаем данные с сервера и отбражаем их на странице
export function fetchDataFromServer() {
    // отправка get запроса на сервер
    fetch("http://localhost:3000/Equipment")
        .then(response => response.json())
        .then(data => {
            // обновляем данные на странице
            updatePageWithEquipment(data);     
        })
        .catch(error => console.error('data response error'))
}
// отображение данных на странице
function updatePageWithEquipment(data: Equipment[]) {
    const test = document.querySelector('.listOfEquipments')
    data.forEach((item) => {
        const tr = document.createElement('tr')

        if(tr) {
            tr.innerHTML = `                
                <td>${item.product_name}</td>
                <td>${item.Mark}</td>
                <td>${item.State}</td>                  
            `
        }
        if(test) {
            test.appendChild(tr)
        }       
    })
}





