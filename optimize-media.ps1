<#
.SYNOPSIS
  Vyom Yoga Life - media optimization for Windows / PowerShell.

.DESCRIPTION
  Converts source video and photos into web-ready assets using ffmpeg.
  Video originals are moved to .\media-src\.
  Photo originals are copied to .\media-src\.
  Optimized output is written to .\src\assets\.

.EXAMPLE
  .\optimize-media.ps1 -Mode video -InputPath .\src\assets\video_2.mp4

.EXAMPLE
  .\optimize-media.ps1 -Mode photo -InputPath "$HOME\Downloads\studio.jpg" -Name gallery-01
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("video", "photo")]
    [string]$Mode,

    [Parameter(Mandatory = $true)]
    [string]$InputPath,

    [string]$Name,

    [int]$Width
)

$ErrorActionPreference = "Stop"

# ------------------------------------------------------------
# Checks
# ------------------------------------------------------------

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host ""
    Write-Host "ERROR: ffmpeg was not found on PATH." -ForegroundColor Red
    Write-Host "Install it with:" -ForegroundColor Yellow
    Write-Host "  winget install Gyan.FFmpeg" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

if (-not (Test-Path -LiteralPath $InputPath)) {
    Write-Host ""
    Write-Host "ERROR: Input file was not found:" -ForegroundColor Red
    Write-Host "  $InputPath" -ForegroundColor Red
    Write-Host ""
    exit 1
}

$InputItem = Get-Item -LiteralPath $InputPath

if (-not $Name) {
    $Name = $InputItem.BaseName
}

$ProjectRoot = Get-Location
$AssetDir = Join-Path $ProjectRoot "src\assets"
$BackupDir = Join-Path $ProjectRoot "media-src"

New-Item -ItemType Directory -Force -Path $AssetDir | Out-Null
New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null

# ------------------------------------------------------------
# Helper: print file size
# ------------------------------------------------------------

function Show-Size {
    param(
        [string]$Path,
        [string]$Label
    )

    if (Test-Path -LiteralPath $Path) {
        $File = Get-Item -LiteralPath $Path
        $KB = [math]::Round($File.Length / 1KB, 1)
        $MB = [math]::Round($File.Length / 1MB, 2)

        if ($MB -ge 1) {
            $Size = "$MB MB"
        }
        else {
            $Size = "$KB KB"
        }

        Write-Host ("  {0,-34} {1,10}" -f $Label, $Size)
    }
}

# ============================================================
# VIDEO
# ============================================================

if ($Mode -eq "video") {

    if (-not $Width) {
        $Width = 1280
    }

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host " VIDEO OPTIMIZATION" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""

    Write-Host "Input:" -ForegroundColor Gray
    Write-Host "  $($InputItem.FullName)" -ForegroundColor Gray
    Write-Host "Width: $Width px" -ForegroundColor Gray
    Write-Host ""

    # --------------------------------------------------------
    # Backup original
    # --------------------------------------------------------

    $Extension = $InputItem.Extension
    $Source = Join-Path $BackupDir "$Name.original$Extension"

    if ($InputItem.FullName -eq $Source) {
        Write-Host "Using existing backup:" -ForegroundColor DarkGray
        Write-Host "  $Source" -ForegroundColor DarkGray
    }
    elseif (Test-Path -LiteralPath $Source) {
        Write-Host "Backup already exists." -ForegroundColor Yellow
        Write-Host "Using existing backup:" -ForegroundColor DarkGray
        Write-Host "  $Source" -ForegroundColor DarkGray
    }
    else {
        Write-Host "Backing up original video..." -ForegroundColor Cyan
        Move-Item -LiteralPath $InputItem.FullName -Destination $Source
        Write-Host "Original moved to:" -ForegroundColor Green
        Write-Host "  $Source" -ForegroundColor Green
    }

    $OriginalSize = (Get-Item -LiteralPath $Source).Length

    # --------------------------------------------------------
    # Remove stale generated files
    # --------------------------------------------------------

    $PosterJpg = Join-Path $AssetDir "hero-poster.jpg"
    $PosterWebp = Join-Path $AssetDir "hero-poster.webp"
    $OutputMp4 = Join-Path $AssetDir "$Name.mp4"
    $OutputWebm = Join-Path $AssetDir "$Name.webm"

    Write-Host ""
    Write-Host "[1/4] Creating poster image..." -ForegroundColor Cyan

    # Extract a frame at 1 second.
    # q:v 4 gives a good-quality JPEG without being unnecessarily large.
    & ffmpeg `
        -hide_banner `
        -loglevel error `
        -y `
        -ss 1 `
        -i $Source `
        -vf "scale=1600:-2" `
        -frames:v 1 `
        -q:v 4 `
        $PosterJpg

    if ($LASTEXITCODE -ne 0) {
        throw "FFmpeg failed while creating hero-poster.jpg."
    }

    Write-Host "Creating WebP poster..." -ForegroundColor Cyan

    & ffmpeg `
        -hide_banner `
        -loglevel error `
        -y `
        -i $PosterJpg `
        -c:v libwebp `
        -quality 72 `
        $PosterWebp

    if ($LASTEXITCODE -ne 0) {
        throw "FFmpeg failed while creating hero-poster.webp."
    }

    # --------------------------------------------------------
    # MP4
    # --------------------------------------------------------

    Write-Host ""
    Write-Host "[2/4] Encoding MP4 / H.264..." -ForegroundColor Cyan

    & ffmpeg `
        -hide_banner `
        -loglevel error `
        -y `
        -i $Source `
        -vf "scale=$($Width):-2,fps=24" `
        -c:v libx264 `
        -crf 30 `
        -preset slow `
        -pix_fmt yuv420p `
        -an `
        -movflags +faststart `
        $OutputMp4

    if ($LASTEXITCODE -ne 0) {
        throw "FFmpeg failed while creating the MP4."
    }

    # --------------------------------------------------------
    # WebM
    # --------------------------------------------------------

    Write-Host ""
    Write-Host "[3/4] Encoding WebM / VP9..." -ForegroundColor Cyan

    & ffmpeg `
        -hide_banner `
        -loglevel error `
        -y `
        -i $Source `
        -vf "scale=$($Width):-2,fps=24" `
        -c:v libvpx-vp9 `
        -crf 38 `
        -b:v 0 `
        -row-mt 1 `
        -an `
        $OutputWebm

    if ($LASTEXITCODE -ne 0) {
        throw "FFmpeg failed while creating the WebM."
    }

    # --------------------------------------------------------
    # Results
    # --------------------------------------------------------

    Write-Host ""
    Write-Host "[4/4] Results" -ForegroundColor Cyan
    Write-Host ""

    $OriginalMB = [math]::Round($OriginalSize / 1MB, 2)

    Write-Host ("  {0,-34} {1,10}" -f "original", "$OriginalMB MB")

    Show-Size -Path $OutputMp4 -Label "$Name.mp4"
    Show-Size -Path $OutputWebm -Label "$Name.webm"
    Show-Size -Path $PosterJpg -Label "hero-poster.jpg"
    Show-Size -Path $PosterWebp -Label "hero-poster.webp"

    # --------------------------------------------------------
    # WebM comparison
    # --------------------------------------------------------

    if ((Test-Path -LiteralPath $OutputWebm) -and
        (Test-Path -LiteralPath $OutputMp4)) {

        $Mp4Size = (Get-Item -LiteralPath $OutputMp4).Length
        $WebmSize = (Get-Item -LiteralPath $OutputWebm).Length

        if ($WebmSize -ge $Mp4Size) {
            Write-Host ""
            Write-Host "WARNING: WebM is larger than or equal to MP4." -ForegroundColor Yellow
            Write-Host "You may want to remove:" -ForegroundColor Yellow
            Write-Host "  $OutputWebm" -ForegroundColor Yellow
            Write-Host "and remove its <source> from Hero.tsx." -ForegroundColor Yellow
        }
        else {
            Write-Host ""
            Write-Host "WebM is smaller than MP4." -ForegroundColor Green
        }
    }

    # --------------------------------------------------------
    # MP4 target size
    # --------------------------------------------------------

    $FinalMB = [math]::Round(
        (Get-Item -LiteralPath $OutputMp4).Length / 1MB,
        2
    )

    if ($FinalMB -gt 1.5) {
        Write-Host ""
        Write-Host "WARNING: MP4 is still above the 1.5 MB target." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Try encoding at 960px:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host ".\optimize-media.ps1 -Mode video -InputPath .\media-src\$Name.original$Extension -Width 960" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "If it is still too large, trimming the video will have a larger effect than reducing resolution further." -ForegroundColor Yellow
    }
    else {
        Write-Host ""
        Write-Host "MP4 is under the 1.5 MB target." -ForegroundColor Green
    }

    Write-Host ""
    Write-Host "Generated files:" -ForegroundColor Green
    Write-Host "  $OutputMp4"
    Write-Host "  $OutputWebm"
    Write-Host "  $PosterJpg"
    Write-Host "  $PosterWebp"
    Write-Host ""
}

# ============================================================
# PHOTO
# ============================================================

if ($Mode -eq "photo") {

    if (-not $Width) {
        $Width = 1600
    }

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host " PHOTO OPTIMIZATION" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""

    Write-Host "Input:" -ForegroundColor Gray
    Write-Host "  $($InputItem.FullName)" -ForegroundColor Gray
    Write-Host "Width: $Width px" -ForegroundColor Gray
    Write-Host ""

    # --------------------------------------------------------
    # Backup original
    # --------------------------------------------------------

    $PhotoSource = Join-Path $BackupDir $InputItem.Name

    if ($InputItem.FullName -eq $PhotoSource) {
        Write-Host "Photo is already in media-src." -ForegroundColor DarkGray
    }
    else {
        Copy-Item `
            -LiteralPath $InputItem.FullName `
            -Destination $PhotoSource `
            -Force

        Write-Host "Original copied to:" -ForegroundColor Green
        Write-Host "  $PhotoSource" -ForegroundColor Green
    }

    # --------------------------------------------------------
    # Generate 1600px and 800px versions
    # --------------------------------------------------------

    foreach ($W in @($Width, 800)) {

        Write-Host ""
        Write-Host "Encoding $W px wide..." -ForegroundColor Cyan

        $Jpg = Join-Path $AssetDir "$Name-$W.jpg"
        $Webp = Join-Path $AssetDir "$Name-$W.webp"
        $Avif = Join-Path $AssetDir "$Name-$W.avif"

        # JPEG
        & ffmpeg `
            -hide_banner `
            -loglevel error `
            -y `
            -i $PhotoSource `
            -vf "scale=$($W):-2:flags=lanczos" `
            -q:v 3 `
            $Jpg

        if ($LASTEXITCODE -ne 0) {
            throw "FFmpeg failed while creating $Jpg."
        }

        # WebP
        & ffmpeg `
            -hide_banner `
            -loglevel error `
            -y `
            -i $Jpg `
            -c:v libwebp `
            -quality 72 `
            $Webp

        if ($LASTEXITCODE -ne 0) {
            throw "FFmpeg failed while creating $Webp."
        }

        # AVIF
        & ffmpeg `
            -hide_banner `
            -loglevel error `
            -y `
            -i $Jpg `
            -c:v libaom-av1 `
            -crf 30 `
            -still-picture 1 `
            -pix_fmt yuv420p `
            $Avif

        if ($LASTEXITCODE -ne 0) {
            throw "FFmpeg failed while creating $Avif."
        }

        Show-Size -Path $Jpg -Label "$Name-$W.jpg"
        Show-Size -Path $Webp -Label "$Name-$W.webp"
        Show-Size -Path $Avif -Label "$Name-$W.avif"
    }

    # --------------------------------------------------------
    # Usage example
    # --------------------------------------------------------

    Write-Host ""
    Write-Host "Use the generated assets like this:" -ForegroundColor Green
    Write-Host ""
    Write-Host "import img1600 from '../../assets/$Name-$Width.jpg'"
    Write-Host "import img1600Webp from '../../assets/$Name-$Width.webp'"
    Write-Host "import img1600Avif from '../../assets/$Name-$Width.avif'"
    Write-Host "import img800 from '../../assets/$Name-800.jpg'"
    Write-Host ""
    Write-Host "<ResponsiveImage"
    Write-Host "  src={img1600}"
    Write-Host "  webp={img1600Webp}"
    Write-Host "  avif={img1600Avif}"
    Write-Host "  srcSmall={img800}"
    Write-Host '  alt="Describe the photo for screen readers"'
    Write-Host '  aspect="4/3"'
    Write-Host "/>"
    Write-Host ""
}

Write-Host "Done." -ForegroundColor Green
Write-Host ""