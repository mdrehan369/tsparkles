export const sendOtpTemplate = (otp: string) => {
  const template = `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="500" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; border-radius:12px; padding:40px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">

            <!-- Logo / App Name -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="margin:0; color:#111827;">
                  {{APP_NAME}}
                </h2>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td align="center" style="padding-bottom:10px;">
                <h3 style="margin:0; color:#1f2937;">
                  Your Verification Code
                </h3>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td align="center" style="padding:10px 0 20px 0; color:#6b7280; font-size:14px; line-height:1.6;">
                Use the OTP below to securely authenticate your account.
                This code will expire in {{EXPIRY_MIN}} minutes.
              </td>
            </tr>

            <!-- OTP Box -->
            <tr>
              <td align="center" style="padding:20px 0;">
                <div style="
                  display:inline-block;
                  background:#f3f4f6;
                  padding:16px 32px;
                  font-size:28px;
                  font-weight:bold;
                  letter-spacing:6px;
                  border-radius:8px;
                  color:#111827;">
                  {{OTP}}
                </div>
              </td>
            </tr>

            <!-- Warning -->
            <tr>
              <td align="center" style="padding-top:20px; font-size:12px; color:#9ca3af;">
                If you did not request this code, you can safely ignore this email.
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding-top:30px; font-size:12px; color:#9ca3af;">
                © {{YEAR}} {{APP_NAME}}. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
  const html = template
    .replace("{{OTP}}", otp)
    .replace(/{{APP_NAME}}/g, "Firdaus Collective")
    .replace("{{EXPIRY_MIN}}", "5")
    .replace("{{YEAR}}", new Date().getFullYear().toString());
  return html;
};

export const orderConfirmationEmail = ({
  customerName,
  orderId,
  orderDate,
  items,
  total,
  shippingAddress,
}: {
  customerName: string;
  orderId: string;
  orderDate: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  shippingAddress: string;
}) => {
  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px 0;">${item.name} × ${item.quantity}</td>
        <td style="padding: 8px 0; text-align:right;">
          ₹${item.price * item.quantity}
        </td>
      </tr>
    `,
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Confirmation</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:30px;">
            
            <!-- Header -->
            <tr>
              <td style="text-align:center;padding-bottom:20px;">
                <h2 style="margin:0;color:#111;">Order Confirmed 🎉</h2>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="padding-bottom:20px;color:#444;font-size:15px;">
                Hi <strong>${customerName}</strong>,<br/><br/>
                Thank you for your purchase! Your order has been successfully placed.
              </td>
            </tr>

            <!-- Order Info -->
            <tr>
              <td style="padding-bottom:20px;font-size:14px;color:#555;">
                <strong>Order ID:</strong> ${orderId} <br/>
                <strong>Order Date:</strong> ${orderDate}
              </td>
            </tr>

            <!-- Items -->
            <tr>
              <td>
                <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eee;border-bottom:1px solid #eee;padding:10px 0;">
                  ${itemsHtml}
                  
                  <tr>
                    <td style="padding-top:10px;font-weight:bold;">
                      Total
                    </td>
                    <td style="padding-top:10px;text-align:right;font-weight:bold;">
                      ₹${total}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Shipping Address -->
            <tr>
              <td style="padding-top:20px;font-size:14px;color:#555;">
                <strong>Shipping Address:</strong><br/>
                ${shippingAddress}
              </td>
            </tr>

            <!-- CTA Button -->
            <tr>
              <td align="center" style="padding:30px 0;">
                <a href="https://firdauscollective.com/orders/${orderId}"
                   style="background:#111;color:#fff;padding:12px 24px;
                          text-decoration:none;border-radius:6px;
                          display:inline-block;font-size:14px;">
                  View Order
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="font-size:12px;color:#999;text-align:center;padding-top:20px;">
                If you have any questions, reply to this email.<br/>
                © ${new Date().getFullYear()} Firdaus Collective
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};
