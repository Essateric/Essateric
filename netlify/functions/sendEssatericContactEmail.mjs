// =============================================
// File: netlify/functions/sendEssatericContactEmail.mjs
// - ESM, uses Nodemailer (same style as your example)
// - Expects POST JSON: { firstName, lastName, email, phone, subject, message }
// - Sends to your inbox (set via env var ESSATERIC_CONTACT_TO)
// - Sets replyTo = the user's email
//
// Env vars (recommended):
//   ESSATERIC_EMAIL_USER
//   ESSATERIC_EMAIL_PASS
//   ESSATERIC_EMAIL_HOST (optional, default smtp.gmail.com)
//   ESSATERIC_EMAIL_PORT (optional, default 465)
//   ESSATERIC_CONTACT_TO  (where YOU receive it)
//   ESSATERIC_CONTACT_CC  (optional)
//
// Notes:
// - For Gmail, use an App Password (not your normal password).
// =============================================

import "dotenv/config";
import nodemailer from "nodemailer";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const isEmail = (value = "") =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

const clean = (v = "") => String(v).replace(/\r/g, "").trim();
const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);

export const handler = async (event) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 200, headers, body: "ok" };
    }

    if (event.httpMethod !== "POST") {
      return { statusCode: 405, headers, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body || "{}");

    const firstName = clean(body.firstName);
    const lastName = clean(body.lastName);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const subject = clean(body.subject);
    const message = clean(body.message);

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: "Missing required fields (firstName, lastName, email, message).",
      };
    }

    if (!isEmail(email)) {
      return { statusCode: 400, headers, body: "Invalid email address." };
    }

    // SMTP config
    const user =
      process.env.ESSATERIC_EMAIL_USER || process.env.FRESHWAYS_ORDER_EMAIL_USER;
    const pass =
      process.env.ESSATERIC_EMAIL_PASS || process.env.FRESHWAYS_ORDER_EMAIL_PASS;
    const host = process.env.ESSATERIC_EMAIL_HOST || "smtp.gmail.com";
    const port = Number(process.env.ESSATERIC_EMAIL_PORT || 465);

    if (!user || !pass) {
      return {
        statusCode: 500,
        headers,
        body: "Missing SMTP credentials (ESSATERIC_EMAIL_USER/PASS).",
      };
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    // Where you receive it
    const to = process.env.ESSATERIC_CONTACT_TO || user;
    const cc = process.env.ESSATERIC_CONTACT_CC || undefined;

    const fullName = `${firstName} ${lastName}`.trim();
    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    // Useful meta
    const ip =
      event.headers["x-nf-client-connection-ip"] ||
      event.headers["x-forwarded-for"] ||
      "";
    const ua = event.headers["user-agent"] || "";

    const mailSubject = subject
      ? `Essateric Contact: ${subject} — ${fullName}`
      : `Essateric Contact — ${fullName}`;

    const text = [
      `New contact form submission`,
      ``,
      `Name: ${fullName}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      subject ? `Subject: ${subject}` : null,
      ``,
      `Message:`,
      message,
      ``,
      ip ? `IP: ${ip}` : null,
      ua ? `User-Agent: ${ua}` : null,
      `Time: ${new Date().toISOString()}`,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${safeFullName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      ${phone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ""}
      ${subject ? `<p><strong>Subject:</strong> ${safeSubject}</p>` : ""}
      <hr />
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;">${safeMessage}</p>
      <hr />
      <p><small>${ip ? `IP: ${ip}<br/>` : ""}${ua ? `UA: ${ua}<br/>` : ""}Time: ${new Date().toISOString()}</small></p>
    `;

    const info = await transporter.sendMail({
      from: user,
      to,
      cc,
      subject: mailSubject,
      text,
      html,
      replyTo: email, // so you can hit "reply" and respond to the user
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, messageId: info.messageId }),
    };
  } catch (err) {
    console.error("sendEssatericContactEmail error:", err);
    return {
      statusCode: 500,
      headers,
      body: err?.message || "Internal Server Error",
    };
  }
};
