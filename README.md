# Invito Compleanno 🎂

Un sito web moderno ed elegante per inviti di compleanno con modulo RSVP integrato, design festivo con animazioni e connessione a Firebase.

## ✨ Caratteristiche

- 🎨 **Design moderno e festivo** - Interfaccia elegante con colori pastello e tema compleanno
- 🎈 **Animazioni coinvolgenti** - Palloncini fluttuanti e coriandoli animati sullo sfondo
- 📝 **Modulo RSVP intelligente** - Form intuitivo che si adatta alle risposte dell'utente
- 🔥 **Firebase Firestore** - Salvataggio sicuro delle risposte in tempo reale
- 📱 **Completamente responsive** - Ottimizzato per mobile, tablet e desktop
- 🌈 **Effetti visivi premium** - Gradienti animati, hover effects e transizioni fluide
- ⚡ **Prestazioni ottimali** - Build veloce con Next.js 16 e Turbopack

## 🚀 Avvio Rapido

### Prerequisiti

- Node.js 18+ installato sul tuo computer
- Un account Google per Firebase (gratuito)

### Installazione in 5 Minuti

1. **Clona il repository:**
   ```bash
   git clone https://github.com/yuu04rip/invito-compleanno.git
   cd invito-compleanno
   ```

2. **Installa le dipendenze:**
   ```bash
   npm install
   ```

3. **Configura Firebase:**
   
   Le variabili Firebase sono già configurate nel file `.env.example`. Devi solo:
   
   - Seguire la **[Guida Completa Firebase](FIREBASE_SETUP.md)** (in italiano, passo per passo)
   - Oppure, se hai già un progetto Firebase, copia `.env.example` in `.env.local` e inserisci le tue credenziali

4. **Avvia l'applicazione:**
   ```bash
   npm run dev
   ```

5. **Apri il browser:**
   
   Vai su [http://localhost:3000](http://localhost:3000) - il tuo invito è pronto! 🎉

### 📖 Guida Dettagliata Firebase

Non hai mai usato Firebase? Nessun problema! 

Abbiamo creato una **[guida completa in italiano](FIREBASE_SETUP.md)** che ti spiega:
- Come creare un progetto Firebase (gratuito)
- Come configurare Firestore Database
- Come ottenere le credenziali
- Come mettere il sito online
- Come vedere le risposte RSVP

**Tempo necessario:** 10-15 minuti la prima volta!

## 🔧 Personalizzazione

Vuoi personalizzare l'invito per il tuo evento? È facilissimo!

### 🗓️ Modificare Data, Ora e Luogo

Apri il file `app/page.tsx` e modifica questi dettagli (circa linea 30-50):

```typescript
// Data dell'evento
<p className="text-gray-700">Sabato 15 Marzo 2026</p>

// Orario
<p className="text-gray-700">18:00 - 23:00</p>

// Luogo
<p className="text-gray-700">Via Roma 123, Milano, MI 20121</p>
```

### 🎨 Cambiare i Colori

Apri `tailwind.config.ts` e modifica i colori pastello:

```typescript
colors: {
  pastel: {
    pink: '#FFB6D9',      // Rosa dolce
    purple: '#D5AAFF',    // Viola lavanda
    blue: '#A8D8FF',      // Azzurro cielo
    mint: '#A8FFE5',      // Verde menta
    peach: '#FFD4B2',     // Pesca
    lavender: '#E7C6FF',  // Lavanda chiara
    yellow: '#FFF8B8',    // Giallo pallido
  }
}
```

### 🎈 Modificare le Animazioni

In `components/AnimatedBackground.tsx` puoi:
- Cambiare il numero di palloncini (linea 30): da `20` a qualsiasi numero
- Cambiare il numero di coriandoli (linea 48): da `50` a qualsiasi numero
- Modificare la velocità delle animazioni

### 📖 Guida Completa Personalizzazione

Per modifiche avanzate, consulta il file **[CUSTOMIZATION.md](CUSTOMIZATION.md)** che include:
- Come aggiungere un countdown timer
- Come cambiare emoji e icone
- Come modificare i campi del form
- Come aggiungere una mappa di Google Maps
- Come integrare condivisione social
- E molto altro!

## 🔒 Configurazione Regole di Sicurezza Firebase

Per proteggere il tuo database, configura le regole di sicurezza in Firebase:

1. Vai su Firebase Console > Firestore Database > Regole
2. Usa queste regole consigliate:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvps/{document} {
      // Chiunque può creare una risposta RSVP
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'attendance']);
      
      // Solo utenti autenticati possono leggere
      allow read: if request.auth != null;
      
      // Nessuno può modificare o eliminare
      allow update, delete: if false;
    }
  }
}
```

Vedi la [guida Firebase](FIREBASE_SETUP.md) per tutti i dettagli!

## 🎨 Tecnologie Utilizzate

- **Next.js 16** - Framework React con Turbopack per build velocissime
- **TypeScript** - Type safety e sviluppo più sicuro
- **Tailwind CSS** - Styling moderno e responsive
- **Firebase Firestore** - Database real-time per salvare le risposte RSVP
- **Canvas API** - Animazioni personalizzate di palloncini e coriandoli

## 📝 Cosa Raccoglie il Modulo RSVP

Il modulo intelligente raccoglie:
- ✅ Nome dell'invitato
- ✅ Email di contatto
- ✅ Conferma presenza (Sì/No/Forse)
- ✅ Numero di ospiti (se partecipa)
- ✅ Restrizioni alimentari (se partecipa)
- ✅ Messaggio personalizzato (opzionale)

Il form si adatta dinamicamente: se selezioni "Sì" o "Forse", appaiono i campi aggiuntivi!

Tutte le risposte vengono salvate in Firebase Firestore in tempo reale.

## 🌐 Mettere il Sito Online (Deploy)

### Opzione 1: Vercel (Consigliato - Gratuito)

Vercel è la piattaforma ufficiale per Next.js ed è **completamente gratuita** per progetti personali!

1. **Crea account Vercel:**
   - Vai su [https://vercel.com](https://vercel.com)
   - Registrati con GitHub (gratuito)

2. **Carica il progetto su GitHub:**
   - Crea un repository su GitHub
   - Carica il tuo codice (NON includere il file `.env.local`!)

3. **Importa su Vercel:**
   - In Vercel, clicca "New Project"
   - Seleziona il repository GitHub
   - Clicca "Import"

4. **Aggiungi le variabili d'ambiente:**
   - Nella sezione "Environment Variables"
   - Copia TUTTE le variabili dal tuo `.env.local`
   - Incollale una per una su Vercel

5. **Deploy automatico:**
   - Clicca "Deploy"
   - Aspetta 2-3 minuti
   - Il tuo sito sarà online! 🚀
   - Riceverai un URL tipo: `https://tuo-invito.vercel.app`

Ogni volta che modifichi il codice su GitHub, Vercel aggiornerà automaticamente il sito!

### Opzione 2: Altre Piattaforme

Il progetto funziona anche su:
- **Netlify** - Simile a Vercel, gratuito
- **Railway** - Ottimo per progetti più complessi
- **Google Cloud** - Se hai già esperienza con Google Cloud
- **AWS Amplify** - Per chi usa già AWS

Vedi la [guida Firebase](FIREBASE_SETUP.md) per i dettagli completi sul deploy.

## 📄 Licenza

ISC

## 🤝 Contributi

I contributi sono benvenuti! Sentiti libero di aprire issue o pull request.

## 💝 Supporto

Per domande o assistenza, apri un issue su GitHub.

---

Creato con ❤️ per celebrazioni indimenticabili! 🎉
