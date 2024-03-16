// отправляем данные по SerialPort
import { io } from "socket.io-client"

document.addEventListener("DOMContentLoaded", () => {
    const socket = io("http://localhost:8000")

    const sendButton = document.querySelector('.sendBtn') as HTMLElement
    const radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="radio"]')
    const setpoint = document.querySelectorAll('.setpoint')
    const adjustmentSetpoint = document.querySelectorAll('.adjustment')
    const plus = document.querySelectorAll('.plus')
    const minus = document.querySelectorAll('.minus')

    let setTemp = 0
    let setP = 0
    let setI = 0
    let setD = 0

    type CoreCommand = {
        stand: number
        value: number | string
    }
    // Здесь можно задать разные значения для каждого светодиода
    const coreCommands: CoreCommand[] = [
        { stand: 0, value: 1 }, // pump 1
        { stand: 1, value: 1 }, // pump 2
        { stand: 2, value: 1 }, // solenoid valve
        { stand: 3, value: 18 }, // set temp
        { stand: 4, value: 11 }, // set P
        { stand: 5, value: 8 }, // set I
        { stand: 6, value: 1 }, // set D
        { stand: 7, value: 1}, // set work mode
    ];  
    sendButton?.addEventListener('click', () => {      
        // Отправляем команды на сервер
        // coreCommands.forEach(command => {
        //     socket.emit('LED_CONTROL', command)
        // });        
    })
    // Пишем функции для режимов работы устройства
    function auto() {
        coreCommands[5].value = 11
        sendButton.style.display = 'none'
        pickStyle(false, setpoint)
        pickStyle(false, adjustmentSetpoint)
        setMode(0, 7)

        setpoint.forEach(item => {
            item.removeEventListener('click', handleClick);
        });
    }

    function manual() {
        sendButton.style.display = 'block';
        pickStyle(true, setpoint);
        pickStyle(false, adjustmentSetpoint);
        setMode(2, 7);
    
        setpoint.forEach((item, i) => {
            if (i != 0 && i != setpoint.length - 1)
            item.addEventListener('click', handleClick);
        });
    }
    
    function adjustment() {
        sendButton.style.display = 'block'
        pickStyle(true, adjustmentSetpoint)
        pickStyle(false, setpoint)
        setMode(1, 7)

        setpoint.forEach(item => {
            item.removeEventListener('click', handleClick);
        });
        
        plus.forEach((item, i) => {            
            item.addEventListener('click', (e) => {
                if(e.target && i === 0) {      
                    // const target = e.target as HTMLElement;
                    console.log(++setTemp)                              
                    // const target = e.target as HTMLElement;
                    // const parent = target.parentNode as HTMLElement;
                    // let parentInnerText = parent.innerText;
                    // const regexp = /\d*.?\d/g
                    // let result: any = Array.from(parentInnerText.matchAll(regexp))
                    // let value: number | string = result;  
                    // value = +result[0][0] + 1;
                    // parentInnerText = parentInnerText.replace(regexp, value.toString())                    
                    // setMode(value, i + 3)
                }
            })
        })        
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
    // добавляем стили при изменении режима
    function pickStyle(act:boolean, selector: NodeListOf<Element>){
        selector.forEach((item, i) => {
            if (selector === setpoint) {
                if(act && i != 0 && i != setpoint.length - 1) {
                    item.classList.add('change')
                } else item.classList.remove('change')
            }else if (selector === adjustmentSetpoint) {
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
    // изменение данных в режими наладки
    function setAdjustmentValue(val: number, target: HTMLElement) {        
        const parent = target.parentNode as HTMLElement;
        let parentInnerText = parent.innerText;
        const regexp = /\d*.?\d/g
        let result: any = Array.from(parentInnerText.matchAll(regexp))
        let value: number | string = result;  
        value = +result[0][0] + 1;
        parentInnerText = parentInnerText.replace(regexp, value.toString())                    
    }
    auto()
    
});