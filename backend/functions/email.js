const ACCOUNT_ID = process.env.ZOHO_MAIL_ACCOUNT_ID;

let maiiApi = `https://mail.zoho.com/api/accounts/${ACCOUNT_ID}/messages`
const fromAddress = "admin@residence541.com"
const domain = process.env.DOMAIN || "localhost:5173"
const proto = process.env.DOMAIN ? "https" : "http"
let confirmUrl = `${proto}://${domain}/booking-conf?token=`
// console.log(`confirmUrl: ${confirmUrl}`)

const TEST_EMAIL = "richie.okoro@gmail.com";

async function refreshAccessToken() {
  const refreshToken = process.env.REFRESH_TOKEN;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const tokenUrl = `https://accounts.zoho.com/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`;
  try {
    const response = await fetch(tokenUrl, {
      method: 'POST'
    });
    const jsonData = await response.json();
    return jsonData.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
}

export async function sendVerificationEmail(req, res) {
  try {
    if (!process.env.ACCESS_TOKEN_ZOHO_MAIL) {
      process.env.ACCESS_TOKEN_ZOHO_MAIL = await refreshAccessToken()
    }
    // console.log(`process.env.ACCESS_TOKEN_ZOHO_MAIL: ${process.env.ACCESS_TOKEN_ZOHO_MAIL}`);

    let booking = req.locals.booking
    booking.verificationLink = `${confirmUrl}${booking.token}`
    console.log(booking);

    let subject = "Please verify your booking at Residence 541"
    //     let body = `<h2>Thank you for choosing Residence 541!</h2>
    // <p>Please verify your booking by clicking the link below:</p>
    // <a href="${confirmUrl}${token}">Verify Booking</a>
    // <p>If you did not make this booking, please ignore this email.</p>`

    let body = generateBookingEmailHTML(req.locals.booking)

    let tries = process.env.VERIF_MAIL_SEND_ATTEMPTS || 3;
    while (tries > 0) {
      let response = await fetch(maiiApi, {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${process.env.ACCESS_TOKEN_ZOHO_MAIL}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "fromAddress": fromAddress,
          "toAddress": `${booking.email}`,
          "subject": subject,
          "content": body
        })
      });
      if (!response.ok) {
        throw new Error(`Failed to send email`);
      }
      const jsonData = await response.json();
      if (jsonData.data.errorCode) {
        if (jsonData.data.errorCode === "INVALID_OAUTHTOKEN") {
          console.log('Access token expired, refreshing token...');
          process.env.ACCESS_TOKEN_ZOHO_MAIL = await refreshAccessToken();
        }
      } else {
        // console.log('Email sent successfully:', jsonData);
        res.status(200).json({ message: 'Verification email sent successfully' })
        return;
      }
      tries -= 1;
    }
    res.status(400).json("Attempts exceeded")
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Failed to send verification email' })
  }

}

export const sendManagerNotificationEmail = async (req, res, next) => {
  const booking = req.locals.booking
  try {
    if (!process.env.ACCESS_TOKEN_ZOHO_MAIL) {
      process.env.ACCESS_TOKEN_ZOHO_MAIL = await refreshAccessToken()
    }
    let subject = "New Booking Verified at Residence 541"
    let body = `<h2>New Booking Verified</h2>
    <p>A new booking has been verified with the following details:</p>
    <ul>
      <li>Name: ${booking.firstName} ${booking.lastName}</li>
      <li>Email: ${booking.email}</li>
      <li>Phone: ${booking.phone}</li>
      <li>Check-In: ${booking.checkIn}</li>
      <li>Check-Out: ${booking.checkOut}</li>
    </ul>`
    let managerEmail = process.env.MANAGER_EMAIL || TEST_EMAIL;
    let tries = 3;
    while (tries > 0) {
      let response = await fetch(maiiApi, {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${process.env.ACCESS_TOKEN_ZOHO_MAIL}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "fromAddress": fromAddress,
          "toAddress": managerEmail,
          "subject": subject,
          "content": body
        })
      });
      if (!response.ok) {
        next(new Error(`Failed to send email`));
      }
      const jsonData = await response.json();
      if (jsonData.data.errorCode === "INVALID_OAUTHTOKEN") {
        console.log('Access token expired, refreshing token...');
        process.env.ACCESS_TOKEN_ZOHO_MAIL = await refreshAccessToken();
      } else {
        console.log('Manager notification email sent successfully:', jsonData);
        break;
      }
      tries -= 1;
    }
    next()
  } catch (error) {
    console.error('Failed to send manager notification email:', error.message)
    next(error)
  }
}

function generateBookingEmailHTML(data) {
  const { name, token, checkIn, checkOut, roomTypeObj = {}, verificationLink } = data;
  console.log(token)
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
  
  <!-- Main Container -->
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4;">
    <tr>
      <td style="padding: 20px 0;">
        
        <!-- Content Wrapper -->
        <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
          
          <!-- Header with Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; letter-spacing: -0.5px;">
                🏨 Booking Confirmation
              </h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                Your reservation is almost complete
              </p>
            </td>
          </tr>
          
          <!-- Body Content -->
          <tr>
            <td style="padding: 40px 30px; background-color: #f7fafc;">
              
              <!-- Greeting -->
              <h2 style="margin: 0 0 20px 0; color: #2d3748; font-size: 24px; font-weight: 600; text-transform: capitalize;">
                Hi ${name}! 👋
              </h2>
              
              <p style="margin: 0 0 25px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                Thank you for choosing us! Your booking has been created and is waiting for verification.
              </p>
              
              <!-- Booking ID Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0 0 25px 0;">
                <tr>
                  <td style="background-color: #ffffff; padding: 25px; border-radius: 8px; border: 2px solid #e2e8f0;">
                    <p style="margin: 0 0 8px 0; color: #718096; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                      Your Booking ID
                    </p>
                    <p style="margin: 0; font-size: 28px; font-weight: bold; color: #667eea; letter-spacing: 1px;">
                      ${token}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Booking Details -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0 0 30px 0;">
                <tr>
                  <td style="background-color: #ffffff; padding: 25px; border-radius: 8px;">
                    <h3 style="margin: 0 0 20px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                      📋 Booking Details
                    </h3>
                    
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 12px 0; color: #718096; font-size: 15px; border-bottom: 1px solid #e2e8f0;">
                          Room Type
                        </td>
                        <td style="padding: 12px 0; color: #2d3748; font-size: 15px; font-weight: 600; text-align: right; border-bottom: 1px solid #e2e8f0; text-transform: capitalize;">
                          ${roomTypeObj.name}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; color: #718096; font-size: 15px; border-bottom: 1px solid #e2e8f0;">
                          Check-in
                        </td>
                        <td style="padding: 12px 0; color: #2d3748; font-size: 15px; font-weight: 600; text-align: right; border-bottom: 1px solid #e2e8f0;">
                          ${checkIn}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; color: #718096; font-size: 15px;">
                          Check-out
                        </td>
                        <td style="padding: 12px 0; color: #2d3748; font-size: 15px; font-weight: 600; text-align: right;">
                          ${checkOut}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Message -->
              <p style="margin: 0 0 25px 0; color: #4a5568; font-size: 16px; line-height: 1.6; text-align: center;">
                Please verify your email address to confirm your booking:
              </p>
              
              <!-- Verify Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0 0 25px 0;">
                <tr>
                  <td style="text-align: center;">
                    <a href="${verificationLink}" 
                       style="display: inline-block; padding: 16px 45px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
                      ✓ Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Alternative Link -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0 0 25px 0;">
                <tr>
                  <td style="background-color: #edf2f7; padding: 15px; border-radius: 6px;">
                    <p style="margin: 0 0 8px 0; color: #718096; font-size: 13px; text-align: center;">
                      Or copy and paste this link:
                    </p>
                    <p style="margin: 0; color: #667eea; font-size: 12px; text-align: center; word-break: break-all;">
                      ${verificationLink}
                    </p>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #2d3748; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #a0aec0; font-size: 13px; line-height: 1.6;">
                ⏰ This verification link will expire in <strong style="color: #cbd5e0;">24 hours</strong>
              </p>
              <p style="margin: 0 0 10px 0; color: #a0aec0; font-size: 13px; line-height: 1.6;">
                📞 Save your booking ID: <strong style="color: #cbd5e0;">${token}</strong>
              </p>
              <p style="margin: 0; color: #718096; font-size: 12px; line-height: 1.6;">
                If you didn't make this booking, please ignore this email.
              </p>
              
              <!-- Social/Contact Links (Optional) -->
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #4a5568;">
                <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                  © 2024 Your Hotel Name. All rights reserved.
                </p>
              </div>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
  `;
}