import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const passkey = req.headers["x-admin-passkey"];
  const expectedPasskey = process.env.ADMIN_PASSKEY || "side2026";

  if (passkey !== expectedPasskey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // NOTE: This is where we hit the SQLite wall. 
  // On Vercel, we can't read 'sidequest.db' easily.
  res.status(200).json({ message: "Auth successful, but database needs migration" });
}