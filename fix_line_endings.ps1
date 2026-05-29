$filepath = "c:\feel-high-echoes-main\src\components\sections\Atmosphere.tsx"
$content = [System.IO.File]::ReadAllText($filepath)
$content = $content -replace "`r`n", "`n"
[System.IO.File]::WriteAllText($filepath, $content)
Write-Host "Fixed line endings in Atmosphere.tsx"
