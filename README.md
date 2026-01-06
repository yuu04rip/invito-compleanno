# Invito Compleanno 🎂

Un sito web moderno per inviti di compleanno con questionario RSVP integrato, stile pastello animato e connessione a Firebase.

## ✨ Caratteristiche

- 🎨 Design moderno con colori pastello
- 🎈 Sfondo animato con palloncini e coriandoli
- 📝 Modulo RSVP completo per confermare la presenza
- 🔥 Integrazione con Firebase Firestore per salvare le risposte
- 📱 Design responsive per mobile e desktop
- 🌈 Animazioni fluide e gradienti dinamici

## 🚀 Avvio Rapido

### Prerequisiti

- Node.js 18+ installato
- Un progetto Firebase (gratuito)

### Installazione

1. Clona il repository:
```bash
git clone https://github.com/yuu04rip/invito-compleanno.git
cd invito-compleanno
```

2. Installa le dipendenze:
```bash
npm install
```

3. Configura Firebase:
   - Vai su [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuovo progetto o usa uno esistente
   - Abilita Firestore Database nelle impostazioni del progetto
   - Ottieni le credenziali dalla sezione "Impostazioni progetto" > "Le tue app"

4. Configura le variabili d'ambiente:
```bash
cp .env.example .env.local
```

5. Modifica `.env.local` con le tue credenziali Firebase

6. Avvia il server di sviluppo:
```bash
npm run dev
```

7. Apri [http://localhost:3000](http://localhost:3000) nel browser

## 🔧 Configurazione Firebase

### Abilita Firestore

1. Nella Firebase Console, vai a "Firestore Database"
2. Clicca su "Crea database"
3. Scegli "Inizia in modalità test" per lo sviluppo
4. Seleziona una località

### Regole di Sicurezza (per produzione)

Aggiorna le regole di Firestore per la produzione:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvps/{document} {
      allow create: if request.auth == null;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## 📝 Personalizzazione

### Modifica i Dettagli dell'Evento

Modifica il file `app/page.tsx` per aggiornare:
- Data dell'evento
- Orario
- Luogo
- Messaggio personalizzato

### Modifica i Colori

I colori pastello sono configurati in `tailwind.config.ts`. Puoi personalizzarli modificando la sezione `colors.pastel`.

## 🎨 Tecnologie Utilizzate

- **Next.js 16** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling moderno
- **Firebase** - Backend e database
- **Canvas API** - Animazioni personalizzate

## 📱 Funzionalità del Modulo RSVP

Il modulo raccoglie:
- Nome dell'invitato
- Email di contatto
- Conferma presenza (Sì/No/Forse)
- Numero di ospiti
- Restrizioni alimentari
- Messaggio personalizzato

Tutte le risposte vengono salvate in Firebase Firestore per una facile gestione.

## 🌐 Deploy

### Vercel (Consigliato)

1. Fai push del codice su GitHub
2. Importa il progetto su [Vercel](https://vercel.com)
3. Aggiungi le variabili d'ambiente nella dashboard di Vercel
4. Deploy!

### Altre Piattaforme

Il progetto può essere deployato su qualsiasi piattaforma che supporta Next.js:
- Netlify
- Railway
- AWS Amplify
- Google Cloud

## 📄 Licenza

ISC

## 🤝 Contributi

I contributi sono benvenuti! Sentiti libero di aprire issue o pull request.

## 💝 Supporto

Per domande o assistenza, apri un issue su GitHub.

---

Creato con ❤️ per celebrazioni indimenticabili! 🎉
