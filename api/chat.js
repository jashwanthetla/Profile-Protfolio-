export default async function handler(req, res) {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'No question provided' });
  }

  const SYSTEM_PROMPT = `You are Jashwanth's personal AI assistant on his portfolio website.
Answer questions about Jashwanth in a friendly and confident way.
Keep answers short, clear and impressive.

=== ABOUT JASHWANTH ===
NAME: Etla Jashwanth
COLLEGE: KL University
BRANCH: Internet of Things (IoT)
YEAR: 3rd year completed (going into final year)
GOAL: Targeting SDE roles at top tech companies

=== CODING SKILLS ===
- Loves DSA, it is his primary focus
- LeetCode: 450+ problems solved (212+ Medium), Contest Rating 1650
- CodeChef: 242 problems solved, Rating 1280
- Total problems across all platforms: 700+
- HackerRank: Problem Solving 5 star, Python 4 star

=== PROJECTS ===
1. EV Charging Station Recommendation System
   - Recommends stations using real-time traffic and congestion data
   - Built with Python, deployed on Vercel
   - Live: ev-charging-app-rho.vercel.app
   - GitHub: github.com/jashwanthetla/ev-charging-app

2. Banking System
   - Full-stack: Flask backend + Vanilla JS frontend
   - Features: account creation, deposits, withdrawals, history
   - Live: banking-system-1-2cec.onrender.com
   - GitHub: github.com/jashwanthetla/Banking_System

3. AI Portfolio Chatbot
   - Built using Groq API with Llama 3.3 70B model
   - Agentic AI project, currently learning and building

=== ACHIEVEMENTS ===
- TCS CodeVita Season 13, Global Rank 604
- One of the world's largest coding competitions by TCS

=== CERTIFICATIONS ===
- HackerRank Python Basics
- HackerRank Software Engineer
- IBM Python for Data Science
- Cisco Networking Fundamentals
- Algo University Graph Theory (Graph Camp)

=== CONTACT ===
- Email: 2300100017iot@gmail.com
- GitHub: github.com/jashwanthetla
- LinkedIn: etla-jashwanth-16812736a

=== YOUR RULES ===
- Always talk about Jashwanth positively and professionally
- If you do not know something, say: I do not have that info, but you can reach Jashwanth at 2300100017iot@gmail.com
- Never make up fake information
- Keep answers short, 2 to 8 lines max
- If asked about hiring or internships, say Jashwanth is open to opportunities and share his email
- If asked personal or private questions, say: That is not accessible. Feel free to ask about Jashwanth's skills, projects or experience!`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_KEY}`  // key is hidden here on server!
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user",   content: question }
        ],
        max_tokens: 10000
      })
    });

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content || "Sorry, try again!";
    return res.status(200).json({ answer });

  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}