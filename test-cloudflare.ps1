#!/usr/bin/env pwsh
# Script de Teste e Validação da Configuração Cloudflare
# Uso: .\test-cloudflare.ps1 -Domain novasyn.com.br

param(
    [Parameter(Mandatory=$true)]
    [string]$Domain
)

Write-Host "🔍 Testando configuração Cloudflare para: $Domain`n" -ForegroundColor Cyan

# Cores para output
$Green = "Green"
$Red = "Red"
$Yellow = "Yellow"
$Cyan = "Cyan"

# Contador de testes
$TotalTests = 0
$PassedTests = 0
$FailedTests = 0

function Test-Result {
    param(
        [string]$TestName,
        [bool]$Result,
        [string]$Message = ""
    )
    
    $script:TotalTests++
    
    if ($Result) {
        $script:PassedTests++
        Write-Host "✅ $TestName" -ForegroundColor $Green
        if ($Message) { Write-Host "   $Message" -ForegroundColor Gray }
    } else {
        $script:FailedTests++
        Write-Host "❌ $TestName" -ForegroundColor $Red
        if ($Message) { Write-Host "   $Message" -ForegroundColor Yellow }
    }
}

# Teste 1: DNS Resolution
Write-Host "`n📡 Teste 1: DNS Resolution" -ForegroundColor $Cyan
try {
    $DnsResult = Resolve-DnsName -Name $Domain -ErrorAction Stop
    $IpAddress = $DnsResult.IP4Address
    
    # Verificar se é IP do Cloudflare
    $CloudflareRanges = @(
        "173.245.", "103.21.", "103.22.", "103.31.", "141.101.",
        "108.162.", "190.93.", "188.114.", "197.234.", "198.41.",
        "162.158.", "104.16.", "104.24.", "172.64.", "131.0."
    )
    
    $IsCloudflare = $false
    foreach ($Range in $CloudflareRanges) {
        if ($IpAddress -like "$Range*") {
            $IsCloudflare = $true
            break
        }
    }
    
    Test-Result "DNS resolve para $IpAddress" $true ""
    Test-Result "IP é do Cloudflare" $IsCloudflare "IP: $IpAddress"
} catch {
    Test-Result "DNS Resolution" $false "Erro: $_"
}

# Teste 2: HTTPS e SSL
Write-Host "`n🔒 Teste 2: HTTPS e SSL" -ForegroundColor $Cyan
try {
    $Response = Invoke-WebRequest -Uri "https://$Domain" -UseBasicParsing -ErrorAction Stop
    Test-Result "HTTPS acessível (Status $($Response.StatusCode))" ($Response.StatusCode -eq 200) ""
    
    # Verificar headers do Cloudflare
    $CfRay = $Response.Headers["cf-ray"]
    $CfCache = $Response.Headers["cf-cache-status"]
    
    Test-Result "Header cf-ray presente" ($null -ne $CfRay) "cf-ray: $CfRay"
    Test-Result "Header cf-cache-status presente" ($null -ne $CfCache) "Status: $CfCache"
} catch {
    Test-Result "HTTPS acessível" $false "Erro: $_"
}

# Teste 3: Security Headers
Write-Host "`n🛡️ Teste 3: Security Headers" -ForegroundColor $Cyan
try {
    $Response = Invoke-WebRequest -Uri "https://$Domain" -UseBasicParsing -ErrorAction Stop
    
    $SecurityHeaders = @{
        "strict-transport-security" = "HSTS"
        "x-content-type-options" = "X-Content-Type-Options"
        "x-frame-options" = "X-Frame-Options"
        "content-security-policy" = "CSP"
    }
    
    foreach ($Header in $SecurityHeaders.GetEnumerator()) {
        $Present = $Response.Headers.ContainsKey($Header.Key)
        $Value = if ($Present) { $Response.Headers[$Header.Key] } else { "Ausente" }
        Test-Result "$($Header.Value) presente" $Present "$Value"
    }
} catch {
    Test-Result "Security Headers" $false "Erro: $_"
}

# Teste 4: Compression
Write-Host "`n📦 Teste 4: Compression (Brotli/Gzip)" -ForegroundColor $Cyan
try {
    $Headers = @{
        "Accept-Encoding" = "br, gzip, deflate"
    }
    $Response = Invoke-WebRequest -Uri "https://$Domain" -Headers $Headers -UseBasicParsing -ErrorAction Stop
    
    $Encoding = $Response.Headers["content-encoding"]
    $IsBrotli = $Encoding -eq "br"
    $IsGzip = $Encoding -eq "gzip"
    
    Test-Result "Compressão ativa" ($IsBrotli -or $IsGzip) "Encoding: $Encoding"
    Test-Result "Brotli ativo (melhor)" $IsBrotli "Melhor compressão"
} catch {
    Test-Result "Compression" $false "Erro: $_"
}

# Teste 5: Cache Headers
Write-Host "`n⚡ Teste 5: Cache Configuration" -ForegroundColor $Cyan
try {
    $Response = Invoke-WebRequest -Uri "https://$Domain" -UseBasicParsing -ErrorAction Stop
    
    $CacheControl = $Response.Headers["cache-control"]
    $CfCacheStatus = $Response.Headers["cf-cache-status"]
    
    Test-Result "Cache-Control presente" ($null -ne $CacheControl) "$CacheControl"
    Test-Result "Cloudflare Cache Status" ($null -ne $CfCacheStatus) "$CfCacheStatus"
    
    # Testar assets estáticos
    $AssetUrl = "https://$Domain/assets/index.css"
    $AssetResponse = Invoke-WebRequest -Uri $AssetUrl -UseBasicParsing -ErrorAction SilentlyContinue
    if ($AssetResponse) {
        $AssetCache = $AssetResponse.Headers["cf-cache-status"]
        Test-Result "Assets com cache" ($AssetCache -eq "HIT" -or $AssetCache -eq "MISS") "Status: $AssetCache"
    }
} catch {
    Test-Result "Cache Headers" $false "Erro: $_"
}

# Teste 6: Performance
Write-Host "`n🚀 Teste 6: Performance Metrics" -ForegroundColor $Cyan
try {
    $Stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    $Response = Invoke-WebRequest -Uri "https://$Domain" -UseBasicParsing -ErrorAction Stop
    $Stopwatch.Stop()
    
    $Ttfb = $Stopwatch.ElapsedMilliseconds
    $ContentLength = $Response.RawContentLength / 1KB
    
    Test-Result "TTFB < 500ms" ($Ttfb -lt 500) "TTFB: ${Ttfb}ms"
    Test-Result "TTFB < 200ms (excelente)" ($Ttfb -lt 200) "TTFB: ${Ttfb}ms"
    Write-Host "   📊 Tamanho da página: $([math]::Round($ContentLength, 2)) KB" -ForegroundColor Gray
} catch {
    Test-Result "Performance Metrics" $false "Erro: $_"
}

# Teste 7: Bot Protection
Write-Host "`n🤖 Teste 7: Bot Protection" -ForegroundColor $Cyan
try {
    # Simular user agent de bot malicioso
    $BotHeaders = @{
        "User-Agent" = "sqlmap/1.0"
    }
    
    try {
        $BotResponse = Invoke-WebRequest -Uri "https://$Domain" -Headers $BotHeaders -UseBasicParsing -ErrorAction Stop
        Test-Result "Bot bloqueado" $false "Bot malicioso não foi bloqueado (Status: $($BotResponse.StatusCode))"
    } catch {
        $StatusCode = $_.Exception.Response.StatusCode.value__
        $IsBlocked = ($StatusCode -eq 403) -or ($StatusCode -eq 503)
        Test-Result "Bot bloqueado" $IsBlocked "Status Code: $StatusCode"
    }
} catch {
    Test-Result "Bot Protection" $false "Erro: $_"
}

# Teste 8: HTTP -> HTTPS Redirect
Write-Host "`n🔄 Teste 8: HTTP to HTTPS Redirect" -ForegroundColor $Cyan
try {
    $HttpResponse = Invoke-WebRequest -Uri "http://$Domain" -MaximumRedirection 0 -ErrorAction SilentlyContinue
    $StatusCode = $HttpResponse.StatusCode
    $Location = $HttpResponse.Headers["Location"]
    
    $IsRedirect = ($StatusCode -eq 301) -or ($StatusCode -eq 302) -or ($StatusCode -eq 307) -or ($StatusCode -eq 308)
    $RedirectsToHttps = $Location -like "https://*"
    
    Test-Result "HTTP redirect ativo" $IsRedirect "Status: $StatusCode"
    Test-Result "Redireciona para HTTPS" $RedirectsToHttps "Location: $Location"
} catch {
    # Erro esperado se não houver redirect configurado
    Test-Result "HTTP to HTTPS Redirect" $false "Sem redirect configurado"
}

# Teste 9: WWW Redirect
Write-Host "`n🌐 Teste 9: WWW Configuration" -ForegroundColor $Cyan
try {
    $WwwUrl = "https://www.$Domain"
    $WwwResponse = Invoke-WebRequest -Uri $WwwUrl -UseBasicParsing -ErrorAction Stop
    
    Test-Result "WWW acessível" ($WwwResponse.StatusCode -eq 200) ""
    
    # Verificar se www usa Cloudflare
    $WwwCfRay = $WwwResponse.Headers["cf-ray"]
    Test-Result "WWW usa Cloudflare" ($null -ne $WwwCfRay) "cf-ray: $WwwCfRay"
} catch {
    Test-Result "WWW Configuration" $false "www.$Domain não acessível"
}

# Teste 10: Email DNS Records
Write-Host "`n📧 Teste 10: Email DNS (SPF, DKIM, DMARC)" -ForegroundColor $Cyan
try {
    # SPF Record
    $SpfRecord = Resolve-DnsName -Name $Domain -Type TXT -ErrorAction SilentlyContinue | 
        Where-Object { $_.Strings -like "v=spf1*" }
    Test-Result "SPF Record presente" ($null -ne $SpfRecord) "$($SpfRecord.Strings)"
    
    # DMARC Record
    $DmarcRecord = Resolve-DnsName -Name "_dmarc.$Domain" -Type TXT -ErrorAction SilentlyContinue | 
        Where-Object { $_.Strings -like "v=DMARC1*" }
    Test-Result "DMARC Record presente" ($null -ne $DmarcRecord) "$($DmarcRecord.Strings)"
    
    # MX Record (Brevo)
    $MxRecord = Resolve-DnsName -Name $Domain -Type MX -ErrorAction SilentlyContinue
    $HasBrevo = $MxRecord.NameExchange -like "*brevo.com*"
    Test-Result "MX Record Brevo presente" $HasBrevo "$($MxRecord.NameExchange)"
} catch {
    Test-Result "Email DNS Records" $false "Erro ao verificar records DNS"
}

# Resumo Final
Write-Host "`n" + ("="*60) -ForegroundColor $Cyan
Write-Host "📊 RESUMO DOS TESTES" -ForegroundColor $Cyan
Write-Host ("="*60) -ForegroundColor $Cyan

$PassRate = if ($TotalTests -gt 0) { [math]::Round(($PassedTests / $TotalTests) * 100, 1) } else { 0 }

Write-Host "`nTotal de Testes: $TotalTests" -ForegroundColor White
Write-Host "Aprovados: $PassedTests" -ForegroundColor $Green
Write-Host "Falharam: $FailedTests" -ForegroundColor $Red
Write-Host "Taxa de Aprovação: $PassRate%" -ForegroundColor $(if ($PassRate -ge 80) { $Green } elseif ($PassRate -ge 60) { $Yellow } else { $Red })

# Recomendações
Write-Host "`n💡 RECOMENDAÇÕES:" -ForegroundColor $Cyan

if ($PassRate -lt 50) {
    Write-Host "⚠️  CRÍTICO: Menos de 50% dos testes passaram!" -ForegroundColor $Red
    Write-Host "   Verifique se o Cloudflare está ativo e configurado corretamente." -ForegroundColor Yellow
    Write-Host "   Consulte: cloudflare.md para instruções de configuração." -ForegroundColor Yellow
} elseif ($PassRate -lt 80) {
    Write-Host "⚠️  ATENÇÃO: Algumas configurações precisam ser ajustadas." -ForegroundColor $Yellow
    Write-Host "   Revise os testes que falharam e consulte cloudflare.md." -ForegroundColor Yellow
} else {
    Write-Host "✅ EXCELENTE: Configuração Cloudflare funcionando bem!" -ForegroundColor $Green
    Write-Host "   Continue monitorando no Dashboard: https://dash.cloudflare.com" -ForegroundColor Gray
}

# Próximos Passos
Write-Host "`n🎯 PRÓXIMOS PASSOS:" -ForegroundColor $Cyan

if ($FailedTests -gt 0) {
    Write-Host "1. Corrigir testes falhados (verificar acima)" -ForegroundColor Yellow
    Write-Host "2. Consultar cloudflare.md seção 'Troubleshooting'" -ForegroundColor Yellow
    Write-Host "3. Executar script novamente após correções" -ForegroundColor Yellow
} else {
    Write-Host "1. ✅ Monitorar Cache Hit Ratio no Dashboard Cloudflare" -ForegroundColor Gray
    Write-Host "2. ✅ Configurar alertas de downtime" -ForegroundColor Gray
    Write-Host "3. ✅ Testar performance com GTmetrix/PageSpeed" -ForegroundColor Gray
    Write-Host "4. ✅ Revisar analytics semanalmente" -ForegroundColor Gray
}

Write-Host "`n" + ("="*60) + "`n" -ForegroundColor $Cyan

# Exit code baseado na taxa de aprovação
if ($PassRate -ge 80) {
    exit 0
} elseif ($PassRate -ge 50) {
    exit 1
} else {
    exit 2
}
