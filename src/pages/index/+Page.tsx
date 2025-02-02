import StringToQRCode from "@/components/string-to-qr-code";

export default function Home() {
  return (
    <>
      <div class="flex min-h-screen flex-col bg-gray-100">
        <nav class="grid h-32 place-items-center border-b">
          <div class="flex flex-col items-center gap-y-1">
            <h1 class="text-4xl font-black text-gray-900">Qrify</h1>
            <p class="text-gray-500">Dead-simple String to QR Code</p>
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
