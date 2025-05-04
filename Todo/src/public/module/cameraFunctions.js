// Importiere die Funktion zum Öffnen des Croppers aus der separaten Datei
import { openCropper } from './cropperFunctions.js';

// Funktion zum Aktivieren der Kamera
export function openCamera() {
    const camera = document.getElementById('camera'); // Das Kamera-Container-Element abrufen
    const video = document.getElementById('video'); // Video-Element abrufen
    camera.style.display = 'block'; // Kamera-Container sichtbar machen

    // Zugriff auf die Kamera mit `getUserMedia`
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream; // Video-Stream mit der Kamera verbinden
        })
        .catch(err => {
            console.error('Fehler beim Zugriff auf die Kamera:', err); // Fehlerbehandlung
            alert('Fehler beim Zugriff auf die Kamera: ' + err.message); // Benutzer informieren
        });
}

// Funktion zum Aufnehmen eines Bildes
export function takePicture() {
    const video = document.getElementById('video'); // Video-Element abrufen
    const canvas = document.getElementById('canvas'); // Canvas-Element abrufen
    const context = canvas.getContext('2d'); // 2D-Zeichenkontext abrufen

    // Größe des Canvas anpassen an die Videoauflösung
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Das aktuelle Bild des Videos auf das Canvas zeichnen
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Bild aus dem Canvas als DataURL im PNG-Format speichern
    const dataUrl = canvas.toDataURL('image/png');

    // Das aufgenommene Bild zur Bearbeitung an den Cropper weitergeben
    openCropper(dataUrl);
}
