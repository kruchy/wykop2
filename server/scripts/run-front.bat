:: Run a local node instance if it exists, otherwise a global node instance
:: %~dp0 is the directory where this file is located, similar to node's __dirname

:: Open App in Chrome or another application
@IF EXIST "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --app=http://localhost:8080 --use-data-dir=%APPDATA%\Wykop2\
) ELSE (
  start %~dp0\msie-app-secure.hta
)