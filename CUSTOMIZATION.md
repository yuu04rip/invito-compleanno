# Customization Guide

This guide will help you customize the birthday invitation website for your specific event.

## 📅 Update Event Details

Edit `app/page.tsx` to change the event information:

```typescript
// Around line 30-60, update the event details section:

<div className="bg-pastel-pink/20 p-4 rounded-2xl">
  <div className="flex items-center mb-2">
    <span className="text-3xl mr-3">📅</span>
    <div>
      <p className="font-semibold text-gray-800">Data</p>
      <p className="text-gray-600">Sabato 15 Marzo 2026</p>  {/* Change date here */}
    </div>
  </div>
</div>

<div className="bg-pastel-blue/20 p-4 rounded-2xl">
  <div className="flex items-center mb-2">
    <span className="text-3xl mr-3">⏰</span>
    <div>
      <p className="font-semibold text-gray-800">Orario</p>
      <p className="text-gray-600">18:00 - 23:00</p>  {/* Change time here */}
    </div>
  </div>
</div>

<div className="bg-pastel-mint/20 p-4 rounded-2xl md:col-span-2">
  <div className="flex items-center mb-2">
    <span className="text-3xl mr-3">📍</span>
    <div>
      <p className="font-semibold text-gray-800">Luogo</p>
      <p className="text-gray-600">Via Roma 123, Milano</p>  {/* Change location here */}
    </div>
  </div>
</div>
```

## 🎨 Change Colors

### Modify Pastel Colors

Edit `tailwind.config.ts` to change the color palette:

```typescript
colors: {
  pastel: {
    pink: '#FFB6D9',      // Soft pink
    purple: '#D5AAFF',    // Lavender purple
    blue: '#A8D8FF',      // Sky blue
    mint: '#A8FFE5',      // Mint green
    peach: '#FFD4B2',     // Peach orange
    lavender: '#E7C6FF',  // Light lavender
    yellow: '#FFF8B8',    // Pale yellow
  }
}
```

### Change Background Gradient

Edit `app/globals.css`:

```css
.gradient-bg {
  background: linear-gradient(
    135deg,
    #FFB6D9 0%,   /* Start color */
    #D5AAFF 25%,  /* Second color */
    #A8D8FF 50%,  /* Middle color */
    #A8FFE5 75%,  /* Fourth color */
    #FFD4B2 100%  /* End color */
  );
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
```

## 🎈 Customize Animations

### Adjust Balloon Count

Edit `components/AnimatedBackground.tsx`:

```typescript
// Line ~28: Change number of balloons
for (let i = 0; i < 15; i++) {  // Change 15 to any number
  balloons.push({
    // ... balloon properties
  });
}

// Line ~45: Change number of confetti pieces
for (let i = 0; i < 30; i++) {  // Change 30 to any number
  confetti.push({
    // ... confetti properties
  });
}
```

### Change Animation Speed

In `app/globals.css`:

```css
@keyframes gradient {
  /* Change 15s to speed up or slow down background animation */
  animation: gradient 15s ease infinite;
}
```

In `tailwind.config.ts`:

```typescript
animation: {
  'float': 'float 6s ease-in-out infinite',        // Element float speed
  'float-slow': 'float 8s ease-in-out infinite',   // Slower float
  'float-slower': 'float 10s ease-in-out infinite', // Even slower
}
```

## 🎂 Change Emoji/Icon

Edit `app/page.tsx`:

```typescript
// Line ~9: Change the main emoji
<div className="text-8xl mb-4">🎂</div>  {/* Change to any emoji */}

// Examples:
// 🎉 Party popper
// 🎈 Balloon
// 🎊 Confetti ball
// 🧁 Cupcake
// 🍰 Cake slice
// 🎁 Gift
```

## 📝 Customize Form Fields

### Add New Fields

Edit `components/RSVPForm.tsx`:

1. Add field to state (around line 14):
```typescript
const [formData, setFormData] = useState<FormData>({
  // ... existing fields
  phoneNumber: '',  // New field
});
```

2. Add TypeScript type (around line 6):
```typescript
interface FormData {
  // ... existing fields
  phoneNumber: string;  // New field
}
```

3. Add form input (around line 95):
```typescript
<div>
  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
    Numero di Telefono
  </label>
  <input
    type="tel"
    id="phoneNumber"
    name="phoneNumber"
    value={formData.phoneNumber}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-xl border-2 border-pastel-blue/30 focus:border-pastel-blue focus:outline-none transition-colors"
    placeholder="+39 123 456 7890"
  />
</div>
```

### Remove Fields

Simply delete or comment out the field sections you don't need in `components/RSVPForm.tsx`.

## 🌐 Change Language

The site is currently in Italian. To change to another language:

1. Edit all text in `app/page.tsx`:
   - "Sei Invitato!" → "You're Invited!"
   - "Vieni a festeggiare con noi!" → "Come celebrate with us!"
   - etc.

2. Edit all text in `components/RSVPForm.tsx`:
   - "Nome Completo" → "Full Name"
   - "Parteciperai?" → "Will you attend?"
   - etc.

3. Update metadata in `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Birthday Party Invitation",
  description: "You're invited to an amazing birthday celebration! RSVP now!",
};
```

## 📱 Add Social Media Sharing

Add sharing buttons to `app/page.tsx`:

```typescript
// Add after the main heading
<div className="flex justify-center gap-4 mt-6">
  <a 
    href={`https://wa.me/?text=${encodeURIComponent('Join my birthday party! RSVP at: https://yoursite.com')}`}
    className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
  >
    📱 Share on WhatsApp
  </a>
  <a 
    href={`https://www.facebook.com/sharer/sharer.php?u=https://yoursite.com`}
    className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
  >
    📘 Share on Facebook
  </a>
</div>
```

## 🎯 Add Google Maps Integration

Add a map for the location in `app/page.tsx`:

```typescript
<div className="mt-6">
  <iframe
    src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_URL"
    width="100%"
    height="300"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    className="rounded-2xl"
  />
</div>
```

Get your embed URL from Google Maps:
1. Search for your location on Google Maps
2. Click "Share"
3. Click "Embed a map"
4. Copy the iframe src URL

## 💝 Add Photo Gallery

Create a new file `components/PhotoGallery.tsx`:

```typescript
export default function PhotoGallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
      <img src="/photos/photo1.jpg" alt="Memory 1" className="rounded-xl" />
      <img src="/photos/photo2.jpg" alt="Memory 2" className="rounded-xl" />
      {/* Add more photos */}
    </div>
  );
}
```

Then add to `app/page.tsx`:
```typescript
import PhotoGallery from '@/components/PhotoGallery';

// Add in the main content
<PhotoGallery />
```

## 🔔 Add Countdown Timer

Create `components/Countdown.tsx`:

```typescript
'use client';
import { useState, useEffect } from 'react';

export default function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center">
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.days}</div>
        <div className="text-sm">Days</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.hours}</div>
        <div className="text-sm">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.minutes}</div>
        <div className="text-sm">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.seconds}</div>
        <div className="text-sm">Seconds</div>
      </div>
    </div>
  );
}
```

Use in `app/page.tsx`:
```typescript
<Countdown targetDate={new Date('2026-03-15T18:00:00')} />
```

## 🎨 Use Custom Fonts

1. Download a font from Google Fonts
2. Add to `app/layout.tsx`:

```typescript
import { Poppins } from 'next/font/google';

const poppins = Poppins({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'] 
});

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
```

---

For more advanced customization, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
