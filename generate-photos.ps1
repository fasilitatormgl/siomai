# generate-photos.ps1
$folder = "assets/images/dokumentasi"
$output = "_data/photos.yml"

# Cek apakah folder ada
if (-not (Test-Path $folder)) {
    Write-Host "Folder $folder tidak ditemukan." -ForegroundColor Red
    exit 1
}

# Ambil semua file gambar
$files = Get-ChildItem $folder -Include *.jpg, *.jpeg, *.png, *.gif, *.webp | Select-Object -ExpandProperty Name

if ($files.Count -eq 0) {
    Write-Host "Tidak ada file gambar di $folder." -ForegroundColor Yellow
    exit 0
}

# Buat konten YAML
$yaml = @()
foreach ($file in $files) {
    $name = [System.IO.Path]::GetFileNameWithoutExtension($file)
    $caption = $name -replace '[_-]', ' ' -replace '(^| )(\w)', { $args[0].Value.ToUpper() }
    $yaml += "- file: `"$file`"`n  caption: `"$caption`""
}

# Tulis ke file
$yaml -join "`n" | Out-File $output -Encoding utf8
Write-Host "✅ Berhasil membuat $output dengan $($files.Count) entri." -ForegroundColor Green
