/**
 * OpenAI API - AI Features
 * Phase 13 - AI product descriptions, marketing copy, recommendations
 */

import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function generateProductDescription(
  productName: string,
  keywords?: string[]
): Promise<string> {
  if (!openai) return "";

  const prompt = `Write a compelling, SEO-friendly product description for: "${productName}"${keywords?.length ? `. Include these keywords naturally: ${keywords.join(", ")}` : ""}. Keep it under 200 words.`;

  const { choices } = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 300,
  });
  return choices[0]?.message?.content?.trim() ?? "";
}

export async function generateMarketingCopy(
  productName: string,
  tone: "professional" | "casual" | "urgent" = "professional"
): Promise<string> {
  if (!openai) return "";

  const prompt = `Write a short marketing copy (2-3 sentences) for the product "${productName}" in a ${tone} tone. Make it persuasive and action-oriented.`;

  const { choices } = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 150,
  });
  return choices[0]?.message?.content?.trim() ?? "";
}

export async function getAffiliateRecommendations(
  productIds: string[],
  userPreferences?: string
): Promise<string[]> {
  if (!openai || !productIds.length) return productIds;

  const prompt = `Given these product IDs: ${productIds.join(", ")}${userPreferences ? `. User preferences: ${userPreferences}` : ""}. Return the top 3 product IDs that would perform best for affiliate marketing, in order. Return only the IDs, one per line.`;

  const { choices } = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 100,
  });
  const content = choices[0]?.message?.content?.trim() ?? "";
  return content.split("\n").filter(Boolean).slice(0, 3);
}
