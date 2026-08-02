$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$BackendPath = Join-Path $ProjectRoot "backend"
$FrontendPath = Join-Path $ProjectRoot "frontend"

$PythonPath = Join-Path $BackendPath "venv\Scripts\python.exe"
$NpmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
$NpmPath = $null

if ($NpmCommand) {
    $NpmPath = $NpmCommand.Source
}

$LogsPath = Join-Path $ProjectRoot "runtime_logs"
$BackendLog = Join-Path $LogsPath "backend.log"
$BackendErrorLog = Join-Path $LogsPath "backend-error.log"
$FrontendLog = Join-Path $LogsPath "frontend.log"
$FrontendErrorLog = Join-Path $LogsPath "frontend-error.log"

$BackendUrl = "http://127.0.0.1:8000/"
$FrontendUrl = "http://127.0.0.1:5173/"

function Show-LauncherError {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Message
    )

    Add-Type -AssemblyName PresentationFramework

    [System.Windows.MessageBox]::Show(
        $Message,
        "TradePilot Pro",
        "OK",
        "Error"
    ) | Out-Null
}

function Test-HttpEndpoint {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Url
    )

    try {
        $response = Invoke-WebRequest `
            -Uri $Url `
            -UseBasicParsing `
            -TimeoutSec 2

        return $response.StatusCode -ge 200
    }
    catch {
        return $false
    }
}

function Wait-ForEndpoint {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Url,

        [Parameter(Mandatory = $true)]
        [int]$TimeoutSeconds
    )

    $deadline = (Get-Date).AddSeconds($TimeoutSeconds)

    while ((Get-Date) -lt $deadline) {
        if (Test-HttpEndpoint -Url $Url) {
            return $true
        }

        Start-Sleep -Milliseconds 700
    }

    return $false
}

try {
    if (-not (Test-Path $BackendPath)) {
        throw "Backend folder was not found: $BackendPath"
    }

    if (-not (Test-Path $FrontendPath)) {
        throw "Frontend folder was not found: $FrontendPath"
    }

    if (-not (Test-Path $PythonPath)) {
        throw "Backend virtual environment was not found: $PythonPath"
    }

    if (-not $NpmPath) {
        throw "npm.cmd was not found. Check that Node.js is installed."
    }

    if (-not (Test-Path $LogsPath)) {
        New-Item `
            -ItemType Directory `
            -Path $LogsPath | Out-Null
    }

    if (-not (Test-HttpEndpoint -Url $BackendUrl)) {
        Start-Process `
            -FilePath $PythonPath `
            -ArgumentList @(
                "-m",
                "uvicorn",
                "app.main:app",
                "--host",
                "127.0.0.1",
                "--port",
                "8000"
            ) `
            -WorkingDirectory $BackendPath `
            -WindowStyle Hidden `
            -RedirectStandardOutput $BackendLog `
            -RedirectStandardError $BackendErrorLog

        $backendReady = Wait-ForEndpoint `
            -Url $BackendUrl `
            -TimeoutSeconds 35

        if (-not $backendReady) {
            throw "Backend did not start. Check: $BackendErrorLog"
        }
    }

    if (-not (Test-HttpEndpoint -Url $FrontendUrl)) {
        Start-Process `
            -FilePath $NpmPath `
            -ArgumentList @(
                "run",
                "dev",
                "--",
                "--host",
                "127.0.0.1",
                "--port",
                "5173"
            ) `
            -WorkingDirectory $FrontendPath `
            -WindowStyle Hidden `
            -RedirectStandardOutput $FrontendLog `
            -RedirectStandardError $FrontendErrorLog

        $frontendReady = Wait-ForEndpoint `
            -Url $FrontendUrl `
            -TimeoutSeconds 45

        if (-not $frontendReady) {
            throw "Frontend did not start. Check: $FrontendErrorLog"
        }
    }

    Start-Process $FrontendUrl
}
catch {
    Show-LauncherError -Message $_.Exception.Message
    exit 1
}