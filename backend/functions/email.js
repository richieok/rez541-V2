const ACCOUNT_ID = process.env.ZOHO_MAIL_ACCOUNT_ID;

let maiiApi = `https://mail.zoho.com/api/accounts/${ACCOUNT_ID}/messages`
const fromAddress = "admin@residence541.com"
const domain = process.env.DOMAIN || "localhost:5173"
const proto = process.env.DOMAIN ? "https" : "http"
let confirmUrl = `${proto}://${domain}/booking-conf?token=`
// console.log(`confirmUrl: ${confirmUrl}`)

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
        
        let { email, token } = req;
        // console.log(email, token);
        
        let subject = "Please verify your booking at Residence 541"
        let body = `<h2>Thank you for choosing Residence 541!</h2>
    <p>Please verify your booking by clicking the link below:</p>
    <a href="${confirmUrl}${token}">Verify Booking</a>
    <p>If you did not make this booking, please ignore this email.</p>`
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
                    "toAddress": email,
                    "subject": subject,
                    "content": body
                })
            });
            if (!response.ok) {
                throw new Error(`Failed to send email`);
            }
            const jsonData = await response.json();
            if (jsonData.data.errorCode === "INVALID_OAUTHTOKEN") {
                console.log('Access token expired, refreshing token...');
                process.env.ACCESS_TOKEN_ZOHO_MAIL = await refreshAccessToken();
            } else {
                console.log('Email sent successfully:', jsonData);
                break;
            }
            tries -= 1;
        }
        res.status(200).json({ message: 'Verification email sent successfully' })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Failed to send verification email' })
    }

}

