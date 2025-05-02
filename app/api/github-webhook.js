export default async function handler(req, res) {
    if (req.method === "POST") {
      console.log("Received GitHub webhook:", req.body);
      res.status(200).json({ message: "Webhook received" });
    } else {
      res.status(405).end("Method Not Allowed");
    }
  }
  