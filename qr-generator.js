// QR Code Generator with Logo Overlay
let currentQRCanvas = null;
let userLogoImage = null;

// DOM Elements
const textInput = document.getElementById('textInput');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const formatSelect = document.getElementById('formatSelect');
const logoInput = document.getElementById('logoInput');
const logoPreview = document.getElementById('logoPreview');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrCodeContainer = document.getElementById('qrCodeContainer');

// Handle logo file upload
logoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                userLogoImage = img;
                // Show preview
                logoPreview.innerHTML = `<img src="${event.target.result}" alt="Logo preview">`;
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        userLogoImage = null;
        logoPreview.innerHTML = '';
    }
});

// Generate QR Code
generateBtn.addEventListener('click', async function() {
    const text = textInput.value.trim();

    if (!text) {
        alert('Please enter text or URL to generate QR code');
        return;
    }

    const width = parseInt(widthInput.value) || 400;
    const height = parseInt(heightInput.value) || 400;

    try {
        // Clear previous QR code
        qrCodeContainer.innerHTML = '';

        // Create a temporary container for QRCode.js
        const tempDiv = document.createElement('div');
        tempDiv.style.display = 'none';
        document.body.appendChild(tempDiv);

        // Generate QR code using QRCode.js
        const qr = new QRCode(tempDiv, {
            text: text,
            width: width,
            height: height,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H // High error correction for logo overlay
        });

        // Wait a bit for QR code to be generated
        await new Promise(resolve => setTimeout(resolve, 100));

        // Get the canvas from the generated QR code
        const qrCanvas = tempDiv.querySelector('canvas');

        if (!qrCanvas) {
            throw new Error('Failed to generate QR code');
        }

        // Create our own canvas with the exact dimensions
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = width;
        finalCanvas.height = height;
        const ctx = finalCanvas.getContext('2d');

        // Draw the QR code
        ctx.drawImage(qrCanvas, 0, 0, width, height);

        // Add logo overlay if provided
        if (userLogoImage) {
            await addLogoToCanvas(ctx, finalCanvas, userLogoImage);
        }

        // Display the final canvas
        qrCodeContainer.innerHTML = '';
        qrCodeContainer.appendChild(finalCanvas);
        currentQRCanvas = finalCanvas;

        // Show download button
        downloadBtn.style.display = 'block';

        // Clean up temp div
        document.body.removeChild(tempDiv);

    } catch (error) {
        console.error('Error generating QR code:', error);
        alert('Error generating QR code. Please try again.');
    }
});

// Add logo to canvas
async function addLogoToCanvas(ctx, canvas, logoImg) {
    // Calculate logo size (about 20% of QR code size)
    const logoSize = Math.min(canvas.width, canvas.height) * 0.2;

    // Calculate center position
    const x = (canvas.width - logoSize) / 2;
    const y = (canvas.height - logoSize) / 2;

    // Add white background circle for better visibility
    const padding = 10;
    const bgSize = logoSize + (padding * 2);

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        bgSize / 2,
        0,
        2 * Math.PI
    );
    ctx.fill();

    // Draw the logo
    ctx.save();

    // Create circular clipping path for logo
    ctx.beginPath();
    ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        logoSize / 2,
        0,
        2 * Math.PI
    );
    ctx.clip();

    // Draw the logo image
    ctx.drawImage(logoImg, x, y, logoSize, logoSize);

    ctx.restore();
}

// Download QR Code
downloadBtn.addEventListener('click', function() {
    if (!currentQRCanvas) {
        alert('Please generate a QR code first');
        return;
    }

    const format = formatSelect.value;
    const fileName = `qrcode.${format}`;

    if (format === 'svg') {
        downloadAsSVG(fileName);
    } else {
        downloadAsImage(format, fileName);
    }
});

// Download as raster image (PNG, JPG, WebP)
function downloadAsImage(format, fileName) {
    let mimeType;
    let quality = 1.0;

    switch(format) {
        case 'png':
            mimeType = 'image/png';
            break;
        case 'jpg':
            mimeType = 'image/jpeg';
            quality = 0.95;
            break;
        case 'webp':
            mimeType = 'image/webp';
            quality = 0.95;
            break;
        default:
            mimeType = 'image/png';
    }

    currentQRCanvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = fileName;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }, mimeType, quality);
}

// Download as SVG
function downloadAsSVG(fileName) {
    // Convert canvas to SVG
    const width = currentQRCanvas.width;
    const height = currentQRCanvas.height;

    // Get image data from canvas
    const imageData = currentQRCanvas.toDataURL('image/png');

    // Create SVG with embedded image
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <image width="${width}" height="${height}" xlink:href="${imageData}"/>
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

// Allow Enter key to generate QR code
textInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        generateBtn.click();
    }
});
