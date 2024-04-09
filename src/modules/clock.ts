    // // формируем дату
    export function formatDate(date: Date, format: 'full' | 'dayOfWeek'): string {
        const pad = (num: number) => num < 10 ? `0${num}` : num.toString();
        const day = pad(date.getDate());
        const month = pad(date.getMonth() + 1); // Месяцы начинаются с 0
        const year = date.getFullYear();
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()]; // Получаем день недели
    
        if (format === 'full') {
            return `${day}.${month}.${year} ${hours}:${minutes}`;
        } else {
            return `${year}-${month}-${day} ${dayOfWeek}`;
        }
    }
    //обновляем дату
    export function updateDateTime(newDiv: HTMLElement): void {
        const now = new Date();
        newDiv.textContent = formatDate(now, 'full');
    }
    