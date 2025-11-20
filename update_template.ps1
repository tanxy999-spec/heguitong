$mainContent = (Get-Content -Path "h:\hugo-site-copy\back2025\index.html" -Encoding UTF8)[397..1355] -join "`n"
$templateStart = '{{ define "main" }}'
$templateEnd = '{{ end }}'
$newContent = $templateStart + "`n" + $mainContent + "`n" + $templateEnd
$newContent | Set-Content -Path "h:\hugo-site-copy\layouts\compliance_tool.html" -Encoding UTF8