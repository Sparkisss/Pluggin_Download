import Chart from 'chart.js/auto'

const placeForTable = document.querySelector('.device') as HTMLElement
let chart: Chart

export async function renderTable(tempForecast: Promise<number[]>, date: string) {
    try {
        placeForTable.innerHTML = ''

        const canvasElement = document.createElement('canvas')
        canvasElement.id = 'myCanvas'
        canvasElement.style.width = '95%'
        canvasElement.style.height = '95%'
        placeForTable.appendChild(canvasElement)
    
        let ctx = canvasElement.getContext('2d')
    
        if (ctx) {
            Chart.defaults.font.size = 14
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['00:00:00', '03:00:00', '06:00:00', '09:00:00', '12:00:00', '15:00:00', '18:00:00', '21:00:00'],
                    datasets: [{
                        label: `Forecast for ${date}`,
                        data: [0, 0, 0, 0, 0, 0, 0, 0],
                        fill: true,
                        backgroundColor: [
                            'grey'
                        ],
                        borderColor: 'green',
                        borderWidth: 4,                    
                    }]
                },
                options: {
                    animations: {
                        tension: {
                            duration: 1000,
                            easing: 'linear',
                            from: 0,
                            to: 0.3,
                            loop: false
                        }
                    },
                    plugins: {
                        legend: {                                
                            labels: {                                                        
                                color: '#000',
                                font: {
                                    size: 18
                                }
                            }
                        }
                    }
                }
            });
        }
        // Получение значения из промиса
        const tempForecasts = await tempForecast
        // Обновление данных в массиве
        chart.data.datasets[0].data = tempForecasts // Новые значения
        // Обновление графика с новыми данными
        chart.update()
    }catch (error) {
        console.error('Произошла ошибка при рендеринге графика:', error);        
    }
}

