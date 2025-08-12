# Video compression script using FFmpeg
# This will create compressed versions of all videos in the public folder

$publicPath = ".\public"
$compressedPath = ".\public\compressed"

# Create compressed folder if it doesn't exist
if (!(Test-Path $compressedPath)) {
    New-Item -ItemType Directory -Path $compressedPath
    Write-Host "Created compressed folder" -ForegroundColor Green
}

# Get all video files
$videos = Get-ChildItem -Path $publicPath -Filter "*.mp4" | Where-Object { $_.Directory.Name -ne "compressed" }

Write-Host "Found $($videos.Count) videos to compress" -ForegroundColor Cyan

foreach ($video in $videos) {
    $inputPath = $video.FullName
    $outputPath = Join-Path $compressedPath $video.Name
    $outputWebmPath = Join-Path $compressedPath ($video.BaseName + ".webm")
    
    Write-Host "Processing: $($video.Name)" -ForegroundColor Yellow
    
    # Compress to H.264 MP4 (smaller size, good compatibility)
    Write-Host "  Creating compressed MP4..." -ForegroundColor Gray
    ffmpeg -i $inputPath `
        -c:v libx264 `
        -crf 28 `
        -preset fast `
        -c:a aac `
        -b:a 128k `
        -movflags +faststart `
        -vf "scale='min(1280,iw)':min'(720,ih)':force_original_aspect_ratio=decrease" `
        -y $outputPath 2>$null
    
    # Also create WebM version for better browser support
    Write-Host "  Creating WebM version..." -ForegroundColor Gray
    ffmpeg -i $inputPath `
        -c:v libvpx-vp9 `
        -crf 35 `
        -b:v 0 `
        -vf "scale='min(1280,iw)':min'(720,ih)':force_original_aspect_ratio=decrease" `
        -y $outputWebmPath 2>$null
    
    # Get file sizes
    $originalSize = [math]::Round(($video.Length / 1MB), 2)
    $compressedSize = [math]::Round(((Get-Item $outputPath).Length / 1MB), 2)
    $webmSize = [math]::Round(((Get-Item $outputWebmPath).Length / 1MB), 2)
    $savings = [math]::Round((($originalSize - $compressedSize) / $originalSize * 100), 1)
    
    Write-Host "  Original: ${originalSize}MB" -ForegroundColor Red
    Write-Host "  Compressed MP4: ${compressedSize}MB (${savings}% smaller)" -ForegroundColor Green
    Write-Host "  WebM: ${webmSize}MB" -ForegroundColor Green
    Write-Host ""
}

Write-Host "Compression complete! Files saved in: $compressedPath" -ForegroundColor Green
Write-Host "Update your code to use videos from the /compressed/ folder" -ForegroundColor Yellow
