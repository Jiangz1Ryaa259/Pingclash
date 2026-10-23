$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$goExecutable = Join-Path $projectRoot '.tools\go\bin\go.exe'
if (-not (Test-Path -LiteralPath $goExecutable)) { $goExecutable = (Get-Command go -ErrorAction Stop).Source }
$env:GOPATH = Join-Path $projectRoot '.tools\gopath'
$env:GOMODCACHE = Join-Path $projectRoot '.tools\go-mod'
$env:GOCACHE = Join-Path $projectRoot '.tools\go-cache'
$env:GOTOOLCHAIN = 'local'
Push-Location (Join-Path $projectRoot 'core')
try {
    & $goExecutable test -p=2 -mod=readonly ./mobile -count=1 -timeout=90s
    if ($LASTEXITCODE -ne 0) { throw 'Native core verification failed.' }
} finally { Pop-Location }
