// scripts/test-openai.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testKey() {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Say hello from OpenAI API!" }],
    });

    console.log("✅ API key works!");
    console.log("Response:", response.choices[0].message.content);
  } catch (err) {
    console.error("❌ Error testing API key:", err);
  }
}

testKey();
