// отправляем данные по SerialPort
import { io } from "socket.io-client"

document.addEventListener("DOMContentLoaded", () => {
    const socket = io("http://localhost:8000")

    const sendButton = document.querySelector('.sendBtn') as HTMLElement
    const radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="radio"]')
    const adjustmentSetpoint = document.querySelectorAll('.adjustment')
    const plus = document.querySelectorAll('.plus')
    const minus = document.querySelectorAll('.minus')
    const modeItem = document.querySelectorAll('.mode_item') as NodeListOf<Element>
    let value: number | string = 0;
    let count = 0

    type CoreCommand = {
        stand: number
        value: number | string
    }
    // Здесь можно задать разные значения для управления прибором
    const coreCommands: CoreCommand[] = [
        { stand: 0, value: 0 }, // pump 1
        { stand: 1, value: 0 }, // pump 2
        { stand: 2, value: 0 }, // solenoid valve
        { stand: 3, value: 0 }, // set temp
        { stand: 4, value: 0 }, // set P
        { stand: 5, value: 0 }, // set I
        { stand: 6, value: 0 }, // set D
        { stand: 7, value: 0}, // set work mode
    ];

    sendButton?.addEventListener('click', () => {   
        count = 0     
        // Отправляем команды на сервер
        coreCommands.forEach((command) => {
            if (typeof command.value === 'number' && command.value != 0) socket.emit('LED_CONTROL', command)            
            command.value = 0
        });                 
    })
    // функция рендер
    function render(selector: HTMLSpanElement, sign: string, index: number) {
        if (selector){
            if (typeof value === 'number' && value < 0) value = 0
            else if (typeof value === 'number' && value > 100) value = 100

            selector.innerHTML = `${value.toString()}${sign}`            
            coreCommands.forEach((command, i) => {
                if (i === index + 3 && i === 3) {
                    command.value = value
                } else if (i === index + 3 && i > 3 && i <= 6) {
                    command.value = count
                }
            });              
        }        
    }
    //обработка нажатия кнопки
    function dataProcessing(e: Event, i: number, operation: string) {
        const target = e.target as HTMLElement;                    
        const parent = target.parentNode as HTMLElement;
        const insideSpan = parent.querySelector("span");
        let parentInnerText = parent.innerText;                    
        const regexp = /\d*.?\d/g                    
        let result: any = Array.from(parentInnerText.matchAll(regexp))
        if (e.target && i === 0 && operation === '+') {               
            value = +result[0][0] + 1            
            if (insideSpan){
                render(insideSpan, '&#8451', i) 
            }                                  
        }
        else if (e.target && operation === '+') {
            value = ((+result[0][0] * 10) + 1) / 10
            count++
            if (insideSpan){
                render(insideSpan, '', i)
            }                
        }
        else if (e.target && i === 0 && operation === '-') {
            value = +result[0][0] - 1
            if (insideSpan){
                render(insideSpan, '&#8451', i)
            } 
        }
        else if (e.target && operation === '-') {
            value = ((+result[0][0] * 10) - 1) / 10
            count--
            if (insideSpan){
                render(insideSpan, '', i)
            } 
        }
    }
    // вешаем событие на кнопку + и -
    plus.forEach((btn, i) => {
        btn.addEventListener('click',(e)=> {
            dataProcessing(e, i, '+')
        } )        
    })
    
    minus.forEach((btn, i) => {
        btn.addEventListener('click',(e)=> {
            dataProcessing(e, i, '-')
        } )
    }) 
    //стили выбора режима
    function setStyleOfMode(num: number, selector: NodeListOf<Element>) {
        selector.forEach((item, i) => {
            if (i === num) item.classList.add('checked')
            else item.classList.remove('checked')
        })
    }
    // Пишем функции для режимов работы устройства
    function auto() {
        sendButton.style.display = 'none'
        setStyleOfMode(0, modeItem)
        pickStyle(false, adjustmentSetpoint)
        setMode(0, 7)
        setStyleManual (false)
    }

    function manual() {
        sendButton.style.display = 'none'
        setStyleOfMode(1, modeItem)
        pickStyle(false, adjustmentSetpoint);
        setMode(2, 7);    
        setStyleManual (true)
    }
    
    function adjustment() {
        setStyleManual (false)
        sendButton.style.display = 'block'
        setStyleOfMode(2, modeItem)
        pickStyle(true, adjustmentSetpoint)
        setMode(1, 7)
    }

    radioButtons.forEach((radioButton: HTMLInputElement) => {
        radioButton.addEventListener('change', function(this: HTMLInputElement) {
            if(this.checked) {
                switch (this.value) {
                    case 'auto': auto(); break;
                    case 'manual': manual(); break;
                    case 'adjustment': adjustment(); break;
                }
            }
        })
    })
    // вспомогательные функции
    // новая функция изменения режима работы 
    function setStyleManual (status: boolean) {
        const setpoint = document.querySelectorAll('.setpoint')
        if (status) {
            setpoint.forEach((item: Element, i) => {
                if(i != 0 && i != setpoint.length - 1) {
                    item.classList.add('change')
                }
                if (i != 0 && i != setpoint.length - 1)
                    item.addEventListener('click', handleClick);
            }) 
        } else {
            setpoint.forEach((item: Element, i) => {
                if(i != 0 && i != setpoint.length - 1) {
                    item.classList.remove('change')
                }
                item.removeEventListener('click', handleClick);
            });
        }

    }
    // добавляем стили при изменении режима
    function pickStyle(act:boolean, selector: NodeListOf<Element>){
        selector.forEach((item, i) => {
            if(act) {
                item.classList.add('change')

                selector.forEach((item: Element) => {
                    if (item instanceof HTMLElement) {
                        item.style.border = "3px solid #000"
                    }
                });

                plus.forEach((item: Element) => {
                    if (item instanceof HTMLElement) {
                        item.style.display = "block"
                    }
                })

                minus.forEach((item: Element) => {
                    if (item instanceof HTMLElement) {
                        item.style.display = "block"
                    }
                })              
            }else {
                item.classList.remove('change')

                selector.forEach((item: Element) => {
                    if (item instanceof HTMLElement) {
                        item.style.border = "1px solid #000";
                    }
                });

                plus.forEach((item: Element) => {
                    if (item instanceof HTMLElement) {
                        item.style.display = "none"
                    }
                })

                minus.forEach((item: Element) => {
                    if (item instanceof HTMLElement) {
                        item.style.display = "none"
                    }
                })
            }            
       })
    }
    // отправляем данные об изменении режима работы устройства
    function setMode(num:number, index: number) {
        coreCommands[index].value = num
        coreCommands.forEach((command, i) => {
            if (i === index) {
                socket.emit('LED_CONTROL', command)
            }            
        });
    }
    // изменение данных в ручном режиме   
    function setChangeManualSetpoint(event: any) {
        const idValue = event.target.id;
        if (event.target.innerText === 'On') {
            event.target.innerText = 'Off'
            setMode(0, +idValue)            
        } else if (event.target.innerText === 'Off') {
            event.target.innerText = 'On'
            setMode(1, +idValue)
        } else {
            event.target.innerText = 'No value'
        }
    }
    // храним ссылку на функцию для удаления обработчика событий
    const handleClick = (item:any) => {
        setChangeManualSetpoint(item);
    };
    auto()    
});