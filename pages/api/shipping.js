// pages/api/saveShippingAddress.js




// Dummy formData for testing (use a database in a real application)
const formData = [
  
  { name: 'Akhila Thankachen', email: 'akhilathankachen@gmail.com', phone: '+971527992028',address:'A02,416,wasl village,Al qusais',city:'Dubai',zip:'00000',country:'United Arab Emirates',state:'Dubai' }
];


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, address, city, zip, country, state } = req.body;

    // Validate form data
    if (!name || !email || !phone || !address || !city ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Simulate saving data (e.g., to a database)
    // console.log('Form Data:', { name, email, phone, address, city, zip, country, state });

    const formDatas = {  name, email, phone, address, city, zip, country, state : 'Form Data' };

    formData.push(formDatas)

  
    

    // Send success response
    return res.status(200).json({ message: 'Shipping address saved successfully' });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
