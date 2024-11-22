export default function handler(req, res) {
    if (req.method === "POST") {
      // Log the data to test in Postman
      console.log("Received data:", req.body);
  
      return res.status(200).json({ message: "Data received successfully", data: req.body });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  }
  