class InputHandler {
    eventHandlerMap = {};
  
    constructor(eventHandlerConfig) {
      this._eventHandlerConfig = eventHandlerConfig;
    }
    subscribe() {
      Object.entries(this.eventHandlerMap).forEach(([name, handler]) => {
        document.addEventListener(name, handler);
      });
    }
  }
  
  class MouseInputHandler extends InputHandler {
    buttomIndexNameMap = {
      0: "left",
      1: "middle",
      2: "right",
    };
  
    eventHandlerMap = {
      click: (event) => {
        const buttonName = this.buttomIndexNameMap[event.button];
        const handler = this._eventHandlerConfig[buttonName];
        if (handler) {
          handler(event);
        }
      },
    };
  }
  
  class KeyboardInputHandler extends InputHandler {
    buttomIndexNameMap = {
      ArrowUp: "ArrowUp",
      Space: "Space",
      KeyW: "KeyW",
      KeyC: "KeyC",
      KeyR: "KeyR",
    };
  
    eventHandlerMap = {
      keydown: (event) => {
        const buttonName = this.buttomIndexNameMap[event.code];
        const handler = this._eventHandlerConfig[buttonName];
        if (handler) {
          handler(event);
        }
      },
    };
  }
