const {
    app,
    BrowserWindow
} = require('electron')



function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {

            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            //devTools:true


        },

    })

    win.loadFile("index.html")
    win.removeMenu()
}


app.whenReady().then(() => {
    createWindow()

})