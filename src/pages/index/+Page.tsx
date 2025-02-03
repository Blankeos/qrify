import { IconScan } from "@/assets";
import StringToQRCode from "@/components/string-to-qr-code";
import decodeQR from "@paulmillr/qr/decode.js";

export default function Home() {
  return (
    <>
      <div class="flex min-h-screen flex-col bg-gray-100">
        <nav class="grid h-32 place-items-center border-b border-gray-300">
          <div class="flex flex-col items-center gap-y-1">
            <h1 class="text-4xl font-black text-gray-900">Qrify</h1>
            <p class="text-gray-500">Dead-simple String to QR Code</p>
            <QRScanner />
          </div>
        </nav>
        <main class="flex-grow">
          <div class="mx-auto mt-10 mb-5 w-full max-w-lg">
            <StringToQRCode />
          </div>
        </main>
        <footer class="grid h-20 place-items-center bg-gray-900 text-center text-sm text-white">
          <p>
            Made with 💙 by{" "}
            <a class="hover:text-sky-400" href="https://carlo.vercel.app">
              Carlo
            </a>{" "}
            for Meh-meh 💖
          </p>
        </footer>
      </div>
    </>
  );
}

function QRScanner() {
  return (
    <button
      onClick={() => {
        if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
          navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" } })
            .then(function (stream) {
              const video = document.createElement("video");
              video.srcObject = stream;
              video.style.position = "fixed";
              video.style.top = "0";
              video.style.left = "0";
              video.style.width = "100%";
              video.style.height = "100%";
              video.style.zIndex = "9999";
              document.body.appendChild(video);
              video.play();

              // Process video frames
              const canvas = document.createElement("canvas");
              const context = canvas.getContext("2d");
              let animationFrameId: number;
              const processFrame = () => {
                if (video.videoWidth && video.videoHeight) {
                  canvas.width = video.videoWidth;
                  canvas.height = video.videoHeight;
                  context!.drawImage(video, 0, 0, canvas.width, canvas.height);
                  const imageData = context!.getImageData(0, 0, canvas.width, canvas.height);
                  try {
                    const decoded = decodeQR(imageData);
                    if (decoded) {
                      // Stop scanning if QR code is found
                      cancelAnimationFrame(animationFrameId);
                      stream.getTracks().forEach((track) => track.stop());
                      video.remove();
                      closeBtn.remove();
                      window.open(decoded);
                    }
                  } catch (e) {
                    // No QR code found in this frame
                  }
                }
                animationFrameId = requestAnimationFrame(processFrame);
              };

              animationFrameId = requestAnimationFrame(processFrame);

              console.log("meep.");

              // Add close button
              const closeBtn = document.createElement("button");
              closeBtn.innerText = "Close";
              closeBtn.style.position = "fixed";
              closeBtn.style.top = "20px";
              closeBtn.style.right = "20px";
              closeBtn.style.zIndex = "10000";
              closeBtn.onclick = () => {
                cancelAnimationFrame(animationFrameId);
                stream.getTracks().forEach((track) => track.stop());
                video.remove();
                closeBtn.remove();
              };
              document.body.appendChild(closeBtn);
            });
        }
      }}
      class="flex items-center gap-x-2 rounded-md border border-gray-500 px-2 py-0 text-sm transition active:scale-95"
    >
      <IconScan class="h-3 w-3" />
      Scan a QR
    </button>
  );
}
