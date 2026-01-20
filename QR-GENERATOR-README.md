# QR Code Generator

A modern, feature-rich QR code generator with logo overlay support and multiple export formats.

## Features

- **Custom QR Code Generation**: Generate QR codes from any text or URL
- **Customizable Dimensions**: Set custom width and height (100-2000 pixels)
- **Logo Overlay**: Add a centered logo/image to your QR code
- **Multiple Export Formats**: Download as PNG, JPG, WebP, or SVG
- **High Error Correction**: Uses the highest error correction level to ensure QR codes remain scannable even with logo overlay
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Preview**: See your QR code before downloading

## How to Use

1. **Open the Generator**: Open `qr-generator.html` in your web browser

2. **Enter Your Content**:
   - Type or paste the text/URL you want to encode in the text area

3. **Customize Dimensions** (Optional):
   - Width: Default is 400px (range: 100-2000px)
   - Height: Default is 400px (range: 100-2000px)

4. **Select Download Format**:
   - PNG: Best for web and general use (transparent background support)
   - JPG: Smaller file size, good for photos
   - WebP: Modern format with excellent compression
   - SVG: Vector format, scalable to any size

5. **Add Logo** (Optional):
   - Click "Choose File" under "Center Logo"
   - Select an image file (PNG, JPG, etc.)
   - The logo will be scaled and placed in the center of the QR code
   - A preview will appear below the file input

6. **Generate**:
   - Click the "Generate QR Code" button
   - Your QR code will appear in the preview area

7. **Download**:
   - Click the "Download QR Code" button to save your QR code in the selected format

## Technical Details

### QR Code Specifications
- **Error Correction Level**: H (High) - 30% of codewords can be restored
- **Logo Size**: Approximately 20% of the QR code dimensions
- **Logo Background**: White circular background with padding for better readability

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- HTML5 Canvas support required

### Files
- `qr-generator.html` - Main HTML file
- `qr-generator.css` - Styling
- `qr-generator.js` - JavaScript functionality
- Uses CDN-hosted QRCode.js library

## Usage Tips

1. **For best results with logos**:
   - Use square or circular logos
   - Use high-contrast images
   - Keep logos simple for better scannability
   - Test the QR code after adding a logo to ensure it scans correctly

2. **Choosing dimensions**:
   - Larger sizes (800px+) are better for print
   - Smaller sizes (200-400px) are suitable for web use
   - Maintain aspect ratio (use same width and height) for best results

3. **Format selection**:
   - Use PNG for web with transparency needs
   - Use JPG for smaller file sizes when transparency isn't needed
   - Use SVG when you need to scale the QR code to different sizes
   - Use WebP for modern web applications with best compression

## Examples

### Simple URL QR Code
```
Text/URL: https://example.com
Width: 400px
Height: 400px
Format: PNG
Logo: None
```

### QR Code with Company Logo
```
Text/URL: https://mycompany.com/contact
Width: 600px
Height: 600px
Format: PNG
Logo: company-logo.png
```

### High-Resolution Print QR Code
```
Text/URL: https://event.com/register
Width: 1200px
Height: 1200px
Format: PNG or SVG
Logo: event-logo.png
```

## License

This QR code generator is provided as-is for personal and commercial use.

## Credits

- Uses [QRCode.js](https://github.com/davidshimjs/qrcodejs) library for QR code generation
- Built with vanilla JavaScript, HTML5 Canvas, and CSS3
