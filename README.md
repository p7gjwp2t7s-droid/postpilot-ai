# PostPilot AI — guida semplice

Questa cartella contiene il sito e una funzione server che chiama un modello di IA.
Il sito **non funzionerà con IA reale finché non pubblichi il progetto e configuri la chiave segreta**.

## File
- `index.html`: sito web
- `functions/api/generate.js`: endpoint server `/api/generate`

## Pubblicazione con piano gratuito (se disponibile per il tuo account)
1. Crea un account Cloudflare e un repository GitHub, seguendo i requisiti di età e le condizioni dei servizi. Se serve, chiedi a un genitore/tutore di aiutarti.
2. Carica su un repository GitHub tutti i file di questa cartella, mantenendo esattamente la cartella `functions/api/`.
3. In Cloudflare apri **Workers & Pages** e crea un progetto Pages collegandolo al repository.
4. Per un semplice sito HTML statico, imposta la directory di output su `/` (oppure lascia il valore suggerito se Cloudflare riconosce correttamente il progetto). Non serve un comando di build.
5. Crea un account OpenRouter e genera una chiave API: https://openrouter.ai/keys
6. Nelle impostazioni del progetto Cloudflare Pages vai in **Settings → Variables and Secrets** e aggiungi una variabile di tipo **Secret** chiamata `OPENROUTER_API_KEY`. Incolla lì la chiave e salva. Non inserirla mai in `index.html` o in GitHub.
7. Avvia un nuovo deployment e apri il sito. Prova a generare una didascalia.

## Costi e limiti
- OpenRouter documenta modelli gratuiti e un router gratuito, ma disponibilità e limiti possono cambiare: https://openrouter.ai/pricing
- Il piano gratuito del servizio di hosting ha limiti; controlla le condizioni aggiornate prima di pubblicare.
- Non c'è garanzia che il servizio IA resti sempre gratuito o disponibile. Non attivare credito o piani a pagamento se vuoi mantenere il budget a zero.
- La funzione qui inclusa non implementa ancora account utente, database, sistema anti-abuso o limiti per utente. Prima di condividerla pubblicamente, aggiungi protezioni anti-abuso per evitare che altri consumino le richieste gratuite.

## Se non funziona
- Errore sulla chiave: controlla che `OPENROUTER_API_KEY` sia un Secret del progetto Pages e ridistribuisci.
- Errore 404 su `/api/generate`: controlla che il file sia esattamente `functions/api/generate.js` e che il progetto sia Pages con Functions attive.
- Errore temporaneo: il modello gratuito può essere occupato o non disponibile; riprova più tardi.

## Sicurezza
Non condividere la chiave API, nemmeno in screenshot o messaggi. Se la esponi per errore, revocala e creane una nuova.
