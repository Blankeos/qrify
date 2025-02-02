import StringToQRCode from "@/components/StringToQRCode";

export default function Home() {
  return (
    <>
      <div class="min-h-screen flex flex-col bg-gray-100">
        <nav class="grid place-items-center h-32 border-b">
          <div class="flex flex-col items-center gap-y-1">
            <h1 class="text-4xl font-black text-gray-900">Qrify</h1>
            <p class="text-gray-500">Dead-simple String to QR Code</p>
          </div>
        </nav>
        <main class="flex-grow">
          <div class="mt-10 mb-5 max-w-lg mx-auto w-full">
            <StringToQRCode />
          </div>
        </main>
        <footer class="text-center text-sm h-20 bg-gray-900 text-white grid place-items-center">
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
