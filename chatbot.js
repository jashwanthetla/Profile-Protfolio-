// No API key here! Key is safely hidden on Vercel server.
// This file calls /api/chat which is our Vercel serverless function.

async function askAboutJashwanth(userQuestion) {
    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userQuestion })
    });

    const data = await response.json();

    if (!response.ok) {
        return data.error || "Something went wrong";
    }

    return data.answer || "Sorry, try again!";
}