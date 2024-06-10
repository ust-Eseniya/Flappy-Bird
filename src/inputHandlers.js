class inputHandler {
    eventHandlerMap = {}

    constructor(eventHandlerConfig){
        this._eventHandlerConfig = eventHandlerConfig
    }
    subscribe(){
        Object.entries(this.eventHandlerMap).forEach(([name, hander]) => {
            document.addEventListener(name, hamdler)
        })
    }
}

class MouseInputHandler extends inputHandler {
    buttonIndexNameMap = {
        0: 'left',
        1: 'middle',
        2: 'right',
    }

    eventHandlerMap = {
        click: (event) => {
            const buttonName = this.buttonIndexNameMap[event.button]
            const handler = this._eventHandlerConfig[buttonName]
            if (handler){
                handler(event)
            }
        }
    }
}