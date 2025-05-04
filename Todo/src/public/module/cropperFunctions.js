// Exportieren der globalen Variable für das zugeschnittene Bild
export let croppedImage;
let cropper; // Cropper-Instanz

// Funktion zum Öffnen des Cropper-Dialogs
export function openCropper(imageSrc) {
    const cropperContainer = document.getElementById('cropper-container'); // Container für Cropper
    const cropperImage = document.getElementById('cropper-image'); // Bild-Element für Cropper
    cropperImage.src = imageSrc; // Setzen der Bildquelle
    cropperContainer.style.display = 'block'; // Cropper-Container sichtbar machen

    // Erstellen einer Cropper-Instanz mit festgelegtem Seitenverhältnis
    cropper = new Cropper(cropperImage, {
        aspectRatio: 1, // Quadratisches Zuschneiden
        viewMode: 1 // Begrenzung innerhalb des Containers
    });
}

// Funktion zum Zuschneiden des Bildes
export function cropImage() {
    const imageFormat = document.getElementById('imageFormat').value; // Format des Bildes abrufen
    croppedImage = cropper.getCroppedCanvas().toDataURL(imageFormat); // Bild als DataURL speichern
    cropper.destroy(); // Cropper-Instanz zerstören
    document.getElementById('cropper-container').style.display = 'none'; // Cropper-Container ausblenden
    document.getElementById('camera').style.display = 'none'; // Kamera-Element ausblenden
}

// Funktion zur Anpassung des Bildes (Helligkeit, Kontrast, Größe)
export function adjustImage(property, value) {
    const cropperImage = document.getElementById('cropper-image'); // Bild-Element abrufen
    const ctx = cropper.getCroppedCanvas().getContext('2d'); // Canvas-Kontext für Bearbeitung
    const canvas = cropper.getCroppedCanvas(); // Canvas für das zugeschnittene Bild

    // Anpassungen je nach Eigenschaft durchführen
    if (property === 'brightness' || property === 'contrast') {
        ctx.filter = `${property}(${value}%)`; // Filter für Helligkeit oder Kontrast setzen
    } else if (property === 'resize') {
        canvas.width = canvas.width * value; // Breite des Bildes anpassen
        canvas.height = canvas.height * value; // Höhe des Bildes anpassen
    }

    // Bild nach der Anpassung neu zeichnen
    ctx.drawImage(cropperImage, 0, 0, canvas.width, canvas.height);
}

// Funktion zum Zurücksetzen aller Bildanpassungen
export function resetAdjustments() {
    const cropperImage = document.getElementById('cropper-image'); // Bild-Element abrufen
    cropperImage.style.filter = 'none'; // Alle Filter zurücksetzen
}
