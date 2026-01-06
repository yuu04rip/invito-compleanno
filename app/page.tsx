import AnimatedBackground from '@/components/AnimatedBackground';
import RSVPForm from '@/components/RSVPForm';

export default function Home() {
  return (
    <main className="min-h-screen gradient-bg relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12 animate-float">
          <div className="inline-block mb-6">
            <div className="text-8xl mb-4">🎂</div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg">
            Sei Invitato!
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 font-semibold drop-shadow">
            Vieni a festeggiare con noi!
          </p>
        </div>

        {/* Event Details Card */}
        <div className="max-w-2xl mx-auto mb-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 animate-float-slow">
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-pastel-purple mb-2">🎉 Festa di Compleanno 🎉</h3>
              <p className="text-gray-700 text-lg">
                Una celebrazione indimenticabile!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-pastel-pink/20 p-4 rounded-2xl">
                <div className="flex items-center mb-2">
                  <span className="text-3xl mr-3">📅</span>
                  <div>
                    <p className="font-semibold text-gray-800">Data</p>
                    <p className="text-gray-600">Da definire</p>
                  </div>
                </div>
              </div>

              <div className="bg-pastel-blue/20 p-4 rounded-2xl">
                <div className="flex items-center mb-2">
                  <span className="text-3xl mr-3">⏰</span>
                  <div>
                    <p className="font-semibold text-gray-800">Orario</p>
                    <p className="text-gray-600">Da definire</p>
                  </div>
                </div>
              </div>

              <div className="bg-pastel-mint/20 p-4 rounded-2xl md:col-span-2">
                <div className="flex items-center mb-2">
                  <span className="text-3xl mr-3">📍</span>
                  <div>
                    <p className="font-semibold text-gray-800">Luogo</p>
                    <p className="text-gray-600">Da definire</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-pastel-lavender/30">
              <p className="text-gray-600 italic">
                💝 La tua presenza è il regalo più grande!
              </p>
            </div>
          </div>
        </div>

        {/* RSVP Form */}
        <div className="animate-float-slower">
          <RSVPForm />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/80">
          <p className="text-sm">
            Non vediamo l'ora di festeggiare insieme! 🎊
          </p>
        </div>
      </div>
    </main>
  );
}
