// список установленного оборудования и девайсов из базы данных 
interface Equipment {
    product_name: string;
    Mark: string;
    State: string;
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
    const equipmentList = document.querySelector('.listOfEquipments')
    if (equipmentList) {
        const fragment = document.createDocumentFragment()
        data.forEach((item) => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${item.product_name}</td>
                <td>${item.Mark}</td>
                <td>${item.State}</td>
            `;
            fragment.appendChild(tr);
        })
        equipmentList.appendChild(fragment);
    } else {
        console.error('Элемент .listOfEquipments не найден');
    }
}





