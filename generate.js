export async function onRequestPost({ request, env }) {
  try {
    if (!env.OPENROUTER_API_KEY) {
      return Response.json(
        { error: "Il server non ha ancora una chiave IA configurata." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const topic = typeof body.topic === "string" ? body.topic.trim() : "";
    const platform = ["Instagram", "TikTok", "LinkedIn", "Facebook"].includes(body.platform)
      ? body.platform : "Instagram";
    const tones = {
      friendly: "amichevole e spontaneo",
      professional: "professionale e chiaro",
      fun: "divertente, senza esagerare",
      inspiring: "motivazionale ma autentico"
    };
    const goals = {
      engage: "stimolare commenti in modo naturale",
      sell: "presentare un prodotto o servizio senza promesse ingannevoli",
      inform: "informare in modo utile",
      follow: "invitare le persone a seguire il profilo senza insistenza"
    };
    const tone = tones[body.tone] || tones.friendly;
    const goal = goals[body.goal] || goals.engage;

    if (!topic) {
      return Response.json({ error: "Inserisci l'argomento del post." }, { status: 400 });
    }
    if (topic.length > 500) {
      return Response.json({ error: "L'argomento deve contenere al massimo 500 caratteri." }, { status: 400 });
    }

    const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": new URL(request.url).origin,
        "X-Title": "PostPilot"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content: "Sei PostPilot, un assistente che scrive contenuti social in italiano. Produci una didascalia originale, utile e naturale, con una breve call to action e 3-6 hashtag pertinenti. Non inventare caratteristiche o risultati di prodotti. Restituisci solo il testo finale, senza spiegazioni sul processo."
          },
          {
            role: "user",
            content: `Argomento: ${topic}\nPiattaforma: ${platform}\nTono: ${tone}\nObiettivo: ${goal}\nScrivi una didascalia adatta alla piattaforma, con emoji solo se appropriate.`
          }
        ],
        temperature: 0.8,
        max_tokens: 350
      })
    });

    const result = await aiResponse.json().catch(() => ({}));
    if (!aiResponse.ok) {
      return Response.json(
        { error: "Il servizio IA non è disponibile al momento. Riprova più tardi." },
        { status: 502 }
      );
    }

    const text = result?.choices?.[0]?.message?.content;
    if (typeof text !== "string" || !text.trim()) {
      return Response.json({ error: "L'IA non ha restituito un testo. Riprova." }, { status: 502 });
    }

    return Response.json({ text: text.trim() }, {
      headers: { "Cache-Control": "no-store" }
    });
  } catch {
    return Response.json({ error: "Richiesta non valida o errore temporaneo." }, { status: 400 });
  }
}
