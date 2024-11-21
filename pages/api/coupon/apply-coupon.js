// /pages/api/coupon/apply-coupon.js
export default async function handler(req, res) {
    if (req.method === "POST") {
      const { couponCode } = req.body;
  
      // Validate coupon code (you can customize the validation logic here)
      if (!couponCode || typeof couponCode !== "string") {
        return res.status(400).json({ success: false, message: "Invalid coupon code." });
      }
  
      try {
        // Simulating a coupon validation process (you would likely query a database here)
        const validCoupons = [
          { code: "DISCOUNT10", discountAmount: "AED 10" },
          { code: "SAVE20", discountAmount: "AED 20" },
          { code: "UAE2024", discountAmount: "10%" },
      
        ];
  
        // Check if the coupon code exists
        const coupon = validCoupons.find((c) => c.code === couponCode.toUpperCase());
  
        if (coupon) {
          // Return success response with the discount amount
          return res.status(200).json({
            success: true,
            discountAmount: coupon.discountAmount,
          });
        } else {
          // Return error if coupon is not found
          return res.status(400).json({
            success: false,
            message: "Coupon not found.",
          });
        }
      } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({
          success: false,
          message: "An error occurred while applying the coupon.",
        });
      }
    } else {
      // Handle unsupported HTTP methods
      return res.status(405).json({
        success: false,
        message: "Method Not Allowed",
      });
    }
}
