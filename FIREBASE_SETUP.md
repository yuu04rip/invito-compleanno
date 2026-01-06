# Guida Configurazione Firebase

Questa guida ti aiuterà a configurare Firebase per l'invito compleanno in modo che funzioni online.

## 📋 Prerequisiti

- Account Google (gratuito)
- Node.js 18+ installato sul tuo computer
- Il codice del progetto già scaricato

## 🚀 Passo 1: Creare un Progetto Firebase

1. **Vai alla Firebase Console**
   - Apri il browser e vai su [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Accedi con il tuo account Google

2. **Crea un nuovo progetto**
   - Clicca su "Aggiungi progetto" o "Create a project"
   - Inserisci un nome per il progetto (esempio: "compleanno-mario")
   - Clicca "Continua"

3. **Google Analytics (Facoltativo)**
   - Puoi abilitare Google Analytics se vuoi statistiche dei visitatori
   - Per un invito semplice, puoi disabilitarlo
   - Clicca "Crea progetto"

4. **Attendi la creazione**
   - Firebase impiegherà alcuni secondi per creare il progetto
   - Quando finisce, clicca "Continua"

## 🔥 Passo 2: Attivare Firestore Database

1. **Apri Firestore Database**
   - Nel menu laterale sinistro, clicca su "Firestore Database"
   - Clicca sul pulsante "Crea database"

2. **Scegli la modalità di sicurezza**
   - Seleziona "Inizia in modalità test" (per sviluppo)
   - ⚠️ IMPORTANTE: Cambieremo le regole di sicurezza dopo!
   - Clicca "Avanti"

3. **Scegli la località**
   - Seleziona la località più vicina a te (esempio: "europe-west1" per l'Europa)
   - Clicca "Abilita"

4. **Attendi l'attivazione**
   - Firebase impiegherà alcuni secondi per creare il database
   - Quando finisce, vedrai la schermata del database

## 🔑 Passo 3: Ottenere le Credenziali Firebase

1. **Vai alle impostazioni del progetto**
   - Clicca sull'icona dell'ingranaggio ⚙️ accanto a "Panoramica del progetto"
   - Seleziona "Impostazioni progetto"

2. **Aggiungi un'app Web**
   - Scorri verso il basso fino alla sezione "Le tue app"
   - Clicca sull'icona Web `</>`
   - Inserisci un nickname per l'app (esempio: "Invito Web")
   - ✅ NON selezionare "Configura anche Firebase Hosting"
   - Clicca "Registra app"

3. **Copia le credenziali**
   - Vedrai un blocco di codice con la configurazione Firebase
   - **IMPORTANTE**: Copia questi valori, ti serviranno!
   - Dovrebbe apparire così:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "tuo-progetto.firebaseapp.com",
     projectId: "tuo-progetto",
     storageBucket: "tuo-progetto.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:..."
   };
   ```
   - Clicca "Continua alla console"

## 💻 Passo 4: Configurare le Variabili d'Ambiente

1. **Apri il progetto sul tuo computer**
   - Apri la cartella del progetto nel tuo editor di codice

2. **Crea il file .env.local**
   - Nella cartella principale del progetto, crea un nuovo file chiamato `.env.local`
   - Oppure copia il file `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

3. **Inserisci le tue credenziali**
   - Apri il file `.env.local`
   - Sostituisci i valori con quelli che hai copiato da Firebase:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIza... (il tuo apiKey)
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tuo-progetto.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=tuo-progetto
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tuo-progetto.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:...
   ```

4. **Salva il file**
   - Assicurati che il file sia salvato come `.env.local` (con il punto all'inizio!)
   - ⚠️ NON condividere mai questo file pubblicamente!

## 🔒 Passo 5: Configurare le Regole di Sicurezza

Le regole di sicurezza controllano chi può leggere e scrivere nel database.

1. **Vai a Firestore Database**
   - Nella Firebase Console, clicca su "Firestore Database"
   - Clicca sulla scheda "Regole" (Rules)

2. **Copia e incolla queste regole**
   - Sostituisci tutto il contenuto con questo:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Collezione RSVP - permetti a chiunque di creare risposte
       match /rsvps/{document} {
         // Chiunque può creare una nuova risposta RSVP
         allow create: if request.resource.data.keys().hasAll(['name', 'email', 'attendance']) &&
                          request.resource.data.name is string &&
                          request.resource.data.email is string &&
                          request.resource.data.attendance is string &&
                          request.resource.data.name.size() > 0 &&
                          request.resource.data.email.matches('.*@.*');
         
         // Solo tu (quando autenticato) puoi leggere le risposte
         allow read: if request.auth != null;
         
         // Nessuno può aggiornare o eliminare
         allow update, delete: if false;
       }
     }
   }
   ```

3. **Pubblica le regole**
   - Clicca sul pulsante "Pubblica" in alto
   - Le nuove regole saranno attive immediatamente

### 🤔 Cosa fanno queste regole?

- ✅ **Permette** a chiunque visiti il sito di inviare un RSVP
- ✅ **Valida** che i dati siano corretti (nome, email, presenza)
- ✅ **Protegge** i dati: solo tu autenticato puoi vederli
- ❌ **Impedisce** modifiche o cancellazioni

## 🧪 Passo 6: Testare l'Applicazione Localmente

1. **Installa le dipendenze**
   ```bash
   npm install
   ```

2. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```

3. **Apri il browser**
   - Vai su [http://localhost:3000](http://localhost:3000)
   - Dovresti vedere l'invito compleanno!

4. **Prova a inviare un RSVP**
   - Compila il modulo
   - Clicca "Conferma Presenza"
   - Se funziona, vedrai un messaggio di successo! 🎉

5. **Verifica in Firebase**
   - Torna alla Firebase Console
   - Vai su "Firestore Database" > scheda "Dati" (Data)
   - Dovresti vedere una collezione "rsvps" con la tua risposta!

## 🌐 Passo 7: Mettere Online il Sito (Deploy)

### Opzione A: Deploy su Vercel (Consigliato - Gratuito)

1. **Crea account Vercel**
   - Vai su [https://vercel.com](https://vercel.com)
   - Registrati con GitHub (gratuito)

2. **Carica il progetto su GitHub**
   - Crea un repository su GitHub
   - Carica il tuo codice (ma NON il file .env.local!)

3. **Importa su Vercel**
   - In Vercel, clicca "New Project"
   - Seleziona il repository GitHub
   - Clicca "Import"

4. **Aggiungi le variabili d'ambiente**
   - Nella sezione "Environment Variables"
   - Aggiungi TUTTE le variabili dal tuo .env.local:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`

5. **Deploy!**
   - Clicca "Deploy"
   - Aspetta 2-3 minuti
   - Il tuo sito sarà online! 🚀
   - Riceverai un URL tipo: `https://tuo-progetto.vercel.app`

### Opzione B: Deploy su Netlify (Alternativa)

1. Vai su [https://netlify.com](https://netlify.com)
2. Registrati gratuitamente
3. Carica il progetto da GitHub
4. Aggiungi le variabili d'ambiente
5. Deploy!

## 📊 Passo 8: Vedere le Risposte RSVP

### Nel Browser (Firebase Console)

1. Vai alla Firebase Console
2. Clicca "Firestore Database"
3. Scheda "Dati" (Data)
4. Clicca sulla collezione "rsvps"
5. Vedrai tutte le risposte ricevute!

### Esportare i Dati

Per salvare le risposte in un file:

1. **Installa Firebase CLI** (solo la prima volta)
   ```bash
   npm install -g firebase-tools
   ```

2. **Accedi a Firebase**
   ```bash
   firebase login
   ```

3. **Esporta i dati**
   ```bash
   firebase firestore:export ./backup-rsvp
   ```

## 🎨 Personalizzare l'Invito

Dopo aver configurato Firebase, puoi personalizzare:

- **Dettagli evento**: Modifica `app/page.tsx` (data, ora, luogo)
- **Colori**: Modifica `tailwind.config.ts` e `app/globals.css`
- **Testi**: Modifica `app/page.tsx` e `components/RSVPForm.tsx`

Vedi il file `CUSTOMIZATION.md` per dettagli completi!

## ❓ Problemi Comuni e Soluzioni

### Errore: "Permission denied" quando invio il form

**Soluzione**: Controlla le regole di sicurezza Firestore (Passo 5)

### Errore: "Firebase configuration not loading"

**Soluzione**: 
- Assicurati che il file si chiami `.env.local` (con il punto!)
- Verifica che tutte le variabili inizino con `NEXT_PUBLIC_`
- Riavvia il server di sviluppo (`npm run dev`)

### Le modifiche al .env.local non funzionano

**Soluzione**: 
- Ferma il server (Ctrl+C)
- Riavvia con `npm run dev`

### Il sito locale funziona ma online no

**Soluzione**: 
- Verifica di aver aggiunto le variabili d'ambiente su Vercel/Netlify
- Re-deploya il progetto

### Errore: "Firebase App already exists"

**Soluzione**: Questo è normale! Il codice gestisce già questa situazione.

## 📧 Ricevere Notifiche Email (Opzionale)

Per ricevere un'email quando qualcuno conferma la presenza:

1. Installa un'estensione Firebase:
   - Vai su "Extensions" nella Firebase Console
   - Cerca "Trigger Email"
   - Segui la procedura guidata

2. Oppure usa Zapier:
   - Collega Firestore a Gmail
   - Crea un'automazione che invia email quando arriva un nuovo RSVP

## 🔐 Sicurezza Importante

- ✅ NON condividere mai il file `.env.local`
- ✅ NON caricare mai `.env.local` su GitHub
- ✅ Usa sempre le regole di sicurezza Firestore
- ✅ Cambia le regole da "modalità test" a "produzione" (Passo 5)

## 🎉 Fatto!

Ora hai un invito compleanno online completamente funzionante!

Condividi il link con i tuoi invitati e ricevi le conferme in tempo reale! 🎂

---

**Hai bisogno di aiuto?**
- Apri un issue su GitHub
- Consulta la [documentazione Firebase](https://firebase.google.com/docs)
- Controlla la [documentazione Next.js](https://nextjs.org/docs)

Buon compleanno! 🎈
