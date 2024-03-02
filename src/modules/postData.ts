interface Equipment {
    product_name: string;
    Mark: string;
    State: string;
}

function fetchDataFromServer() {
    // отправка get запроса на сервер
    fetch("http://localhost:3000/Equipment")
        .then(response => response.json())
        .then(data => {
            // обновляем данные на странице
            updatePageWithData(data);     
            console.log(data[0])
        })
        .catch(error => console.error('data response error'))
}

function updatePageWithData(data: Equipment[]) {
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

fetchDataFromServer()



