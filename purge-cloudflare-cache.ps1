#!/usr/bin/env pwsh
# Script para Purge de Cache no Cloudflare
# Uso: .\purge-cloudflare-cache.ps1 -ZoneId "your_zone_id" -ApiToken "your_token" [-Files "file1,file2"]

param(
    [Parameter(Mandatory=$false)]
    [string]$ZoneId = $env:CLOUDFLARE_ZONE_ID,
    
    [Parameter(Mandatory=$false)]
    [string]$ApiToken = $env:CLOUDFLARE_API_TOKEN,
    
    [Parameter(Mandatory=$false)]
    [string]$Files = "",
    
    [Parameter(Mandatory=$false)]
    [switch]$PurgeAll
)

# Validação
if ([string]::IsNullOrEmpty($ZoneId)) {
    Write-Host "❌ Erro: CLOUDFLARE_ZONE_ID não configurado!" -ForegroundColor Red
    Write-Host "   Use: -ZoneId 'seu_zone_id' ou configure variável de ambiente CLOUDFLARE_ZONE_ID" -ForegroundColor Yellow
    exit 1
}

if ([string]::IsNullOrEmpty($ApiToken)) {
    Write-Host "❌ Erro: CLOUDFLARE_API_TOKEN não configurado!" -ForegroundColor Red
    Write-Host "   Use: -ApiToken 'seu_token' ou configure variável de ambiente CLOUDFLARE_API_TOKEN" -ForegroundColor Yellow
    exit 1
}

# API Endpoint
$ApiUrl = "https://api.cloudflare.com/v4/zones/$ZoneId/purge_cache"

# Headers
$Headers = @{
    "Authorization" = "Bearer $ApiToken"
    "Content-Type" = "application/json"
}

# Body
if ($PurgeAll) {
    Write-Host "🧹 Limpando TODOS os caches do Cloudflare..." -ForegroundColor Cyan
    $Body = @{
        purge_everything = $true
    } | ConvertTo-Json
} elseif (![string]::IsNullOrEmpty($Files)) {
    $FileList = $Files -split ","
    Write-Host "🧹 Limpando cache dos seguintes arquivos:" -ForegroundColor Cyan
    foreach ($File in $FileList) {
        Write-Host "   - $File" -ForegroundColor Gray
    }
    $Body = @{
        files = $FileList
    } | ConvertTo-Json
} else {
    Write-Host "❌ Erro: Especifique -PurgeAll ou -Files" -ForegroundColor Red
    Write-Host "`nExemplos:" -ForegroundColor Yellow
    Write-Host "  .\purge-cloudflare-cache.ps1 -PurgeAll" -ForegroundColor Gray
    Write-Host "  .\purge-cloudflare-cache.ps1 -Files 'https://novasyn.com.br/index.html,https://novasyn.com.br/assets/style.css'" -ForegroundColor Gray
    exit 1
}

# Fazer requisição
try {
    Write-Host "`n⏳ Enviando requisição para Cloudflare API..." -ForegroundColor Yellow
    
    $Response = Invoke-RestMethod -Uri $ApiUrl -Method Post -Headers $Headers -Body $Body -ErrorAction Stop
    
    if ($Response.success) {
        Write-Host "✅ Cache limpo com sucesso!" -ForegroundColor Green
        Write-Host "`n📊 Detalhes:" -ForegroundColor Cyan
        Write-Host "   Request ID: $($Response.result.id)" -ForegroundColor Gray
        
        if ($PurgeAll) {
            Write-Host "   Tipo: Purge Everything" -ForegroundColor Gray
            Write-Host "   ⚠️  Pode levar 30-60 segundos para propagar" -ForegroundColor Yellow
        } else {
            Write-Host "   Tipo: Purge Files" -ForegroundColor Gray
            Write-Host "   Arquivos: $($FileList.Count)" -ForegroundColor Gray
            Write-Host "   ⚠️  Pode levar 5-10 segundos para propagar" -ForegroundColor Yellow
        }
        
        Write-Host "`n💡 Dica: Teste em modo anônimo/incógnito para confirmar." -ForegroundColor Cyan
        exit 0
    } else {
        Write-Host "❌ Erro ao limpar cache:" -ForegroundColor Red
        Write-Host "   $($Response.errors | ConvertTo-Json -Depth 3)" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "❌ Erro ao conectar com Cloudflare API:" -ForegroundColor Red
    Write-Host "   $($_.Exception.Message)" -ForegroundColor Yellow
    
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "`n💡 Erro 401: Token inválido ou expirado" -ForegroundColor Cyan
        Write-Host "   Gere novo token em: https://dash.cloudflare.com/profile/api-tokens" -ForegroundColor Gray
    } elseif ($_.Exception.Response.StatusCode -eq 403) {
        Write-Host "`n💡 Erro 403: Token sem permissão de 'Cache Purge'" -ForegroundColor Cyan
        Write-Host "   Crie token com permissão 'Zone - Cache Purge - Purge'" -ForegroundColor Gray
    }
    
    exit 1
}
