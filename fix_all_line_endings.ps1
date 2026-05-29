$extensions = @("*.tsx", "*.ts", "*.jsx", "*.js")
$srcDir = "c:\feel-high-echoes-main\src"

foreach ($ext in $extensions) {
    $files = Get-ChildItem -Path $srcDir -Filter $ext -Recurse
    foreach ($file in $files) {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        $newContent = $content -replace "`r`n", "`n"
        if ($content -ne $newContent) {
            [System.IO.File]::WriteAllText($file.FullName, $newContent)
            Write-Host "Fixed: $($file.Name)"
        }
    }
}

Write-Host "All files fixed!"
