import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

type ReqBody = {
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  orderType: "DINE_IN" | "TAKEAWAY" | "DELIVERY";
  address?: string;
  items: { title: string; price: number; qty: number; note?: string }[];
  totals: { subtotal: number; tax: number; service: number; total: number };
  cafe: string;
  timestamp: string;
};

function emailHTML(body: ReqBody) {
  const rows = body.items.map((it) => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #eee">${it.title}<br/>
        ${it.note ? `<em style="color:#555">Catatan: ${it.note}</em>` : ""}
      </td>
      <td style="padding:8px;border-bottom:1px solid #eee">${it.qty}</td>
      <td style="padding:8px;border-bottom:1px solid #eee">Rp ${it.price.toLocaleString("id-ID")}</td>
      <td style="padding:8px;border-bottom:1px solid #eee"><b>Rp ${(it.price*it.qty).toLocaleString("id-ID")}</b></td>
    </tr>
  `).join("");

  return `
  <div style="font-family:Inter,Arial,sans-serif">
    <h2 style="margin:0 0 6px 0">${body.cafe} — Pesanan Baru</h2>
    <p style="margin:0 0 12px 0;color:#555">${new Date(body.timestamp).toLocaleString("id-ID")}</p>

    <h3 style="margin:16px 0 6px 0">Detail Pemesan</h3>
    <ul style="margin:0 0 8px 18px;color:#333">
      <li><b>Nama:</b> ${body.customerName}</li>
      ${body.customerEmail ? `<li><b>Email:</b> ${body.customerEmail}</li>` : ""}
      <li><b>Telepon:</b> ${body.customerPhone}</li>
      <li><b>Tipe:</b> ${body.orderType.replace("_"," ")}</li>
      ${body.address ? `<li><b>Alamat:</b> ${body.address}</li>` : ""}
    </ul>

    <h3 style="margin:16px 0 6px 0">Item</h3>
    <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%">
      <thead>
        <tr>
          <th align="left" style="padding:8px;border-bottom:2px solid #ddd">Menu</th>
          <th align="left" style="padding:8px;border-bottom:2px solid #ddd">Qty</th>
          <th align="left" style="padding:8px;border-bottom:2px solid #ddd">Harga</th>
          <th align="left" style="padding:8px;border-bottom:2px solid #ddd">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <h3 style="margin:16px 0 6px 0">Ringkasan</h3>
    <ul style="margin:0 0 8px 18px;color:#333">
      <li>Subtotal: <b>Rp ${body.totals.subtotal.toLocaleString("id-ID")}</b></li>
      <li>Pajak (10%): <b>Rp ${body.totals.tax.toLocaleString("id-ID")}</b></li>
      <li>Biaya layanan: <b>Rp ${body.totals.service.toLocaleString("id-ID")}</b></li>
      <li>Total: <b style="font-size:16px">Rp ${body.totals.total.toLocaleString("id-ID")}</b></li>
    </ul>
  </div>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ReqBody;

    const to = process.env.MAIL_TO || "narenskii@gmail.com";
    const subject = `${body.cafe} — Pesanan Baru (${new Date(body.timestamp).toLocaleTimeString("id-ID")})`;
    const html = emailHTML(body);

    // Prioritize Resend if RESEND_API_KEY exists
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.MAIL_FROM || "orders@nj-cafe.example"; // must be verified in Resend
      const r = await resend.emails.send({
        from,
        to,
        subject,
        html,
      });
      if (r.error) throw new Error(r.error.message);
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      await transporter.sendMail({
        from: process.env.MAIL_FROM || `"NJ Cafe Orders" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
      });
    } else {
      throw new Error("Email service not configured. Set RESEND_API_KEY or SMTP_* env vars.");
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return new NextResponse(e?.message || "Internal Error", { status: 500 });
  }
}
