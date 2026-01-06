import AnimatedBackground from '@/components/AnimatedBackground';
import RSVPForm from '@/components/RSVPForm';

export default function Home() {
  return (
      <main className="min-h-screen gradient-bg relative overflow-hidden">
        <AnimatedBackground />

        <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12 animate-float">
            <div className="text-8xl mb-6">🎂</div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              Sei Invitato!
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              Vieni a festeggiare un compleanno speciale! 🎉
            </p>
          </div>

          {/* Event Details Card */}
          <div className="question-card mb-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Dettagli della Festa
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <div className="bg-gradient-to-br from-pastel-pink/30 to-pastel-pink/10 p-6 rounded-2xl border border-pastel-pink/20 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">📅</span>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Data</p>
                    <p className="text-gray-700">Mercoledi 7 gennaio 2026</p>
                  </div>
                </div>
              </div>

              {/* Time */}
              <div className="bg-gradient-to-br from-pastel-blue/30 to-pastel-blue/10 p-6 rounded-2xl border border-pastel-blue/20 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">⏰</span>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Orario</p>
                    <p className="text-gray-700">19:30</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gradient-to-br from-pastel-mint/30 to-pastel-mint/10 p-6 rounded-2xl border border-pastel-mint/20 hover:shadow-lg transition-all md:col-span-2">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">📍</span>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Luogo</p>
                    <p className="text-gray-700">
                      <a
                          href="https://maps.app.goo.gl/4j8A1BPkbjn1SFeN6"
                          target="_blank"
                          className="underline hover:text-pastel-blue"
                      >
                        Via Ganda 9
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div> {/* <-- chiusura corretta del grid */}

          </div>

          {/* RSVP Form Card */}
          <div className="question-card">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
              Conferma la tua Presenza
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Compila il quiz qui sotto per confermare la tua partecipazione 🎈
            </p>

            <RSVPForm />
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-gray-600">
            <p className="mb-2">Creato con ❤️ per celebrazioni indimenticabili</p>
            <p className="text-sm">🎉 Invito Compleanno © 2026</p>
          </div>
        </div>
      </main>
  );
}
