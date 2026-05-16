
async function askAboutJashwanth(userQuestion) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question: userQuestion })
  });

  const data = await res.json();
  return data?.answer || "Sorry, try again!";
}