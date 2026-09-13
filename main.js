const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const XLSX = require('xlsx');

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    title: "Le Rocher Saint Pierre - Gestion"
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// Lecture du fichier Excel
ipcMain.handle('read-excel', async (event, filePath) => {
  const workbook = XLSX.readFile(filePath);
  return {
    sheets: workbook.SheetNames,
    calendrier: XLSX.utils.sheet_to_json(workbook.Sheets['CALENDRIER']),
    compta: XLSX.utils.sheet_to_json(workbook.Sheets['COMPTA']),
    tarifs: XLSX.utils.sheet_to_json(workbook.Sheets['LISTE PRIX LOC'])
  };
});
