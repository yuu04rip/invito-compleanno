import AnimatedBackground from '@/components/AnimatedBackground';
import RSVPForm from '@/components/RSVPForm';

export default function Home() {
  return (
      <main className="min-h-screen gradient-bg relative overflow-hidden pb-16">
        <AnimatedBackground />

        <div className="relative z-10 container mx-auto px-6 py-8 max-w-3xl">
          {/* Top header (similar to screenshots) */}
          <div className="mb-6">
            <div className="event-tabs">
              <div className="event-tab">Ospiti</div>
              <div className="event-tab">RSVP</div>
              <div className="event-tab active">Questionario</div>
              <div className="event-tab">Privacy</div>
            </div>
          </div>

          {/* Main area */}
          <div className="question-card">
            <div className="text-2xl font-bold mb-2">Impostazioni evento</div>
            <p className="text-sm text-gray-700 mb-6">Visualizza le risposte e crea domande personalizzate</p>

            {/* Question builder / RSVP form */}
            <RSVPForm />
          </div>

          <div className="text-center mt-8 text-sm text-gray-700">
            © Invito — personalizza il tuo questionario
          </div>
        </div>
      </main>
  );
}