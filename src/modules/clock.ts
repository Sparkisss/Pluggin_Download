    // формируем дату
    export function formatDate(date: any, flag: boolean) {
        let day = date.getDate();
        let month = date.getMonth() + 1; // Месяцы начинаются с 0
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()]; // Получаем день недели
        let result =''
        // Добавляем ноль перед числами меньше 10
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        if (flag) {
            result = `${day}.${month}.${year} ${hours}:${minutes}`;
        }else if (!flag){
            result = `${year}-${month}-${day} ${dayOfWeek}`
        }
        return result
    }  
    
    export function updateDateTime(newDiv: HTMLElement) {
        // Создаем объект даты
        const now = new Date();
        return newDiv.textContent = formatDate(now, true)    
    }
