export const emailVerificationTemplate = (token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  return `<!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email Address</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
              }
              .container {
                  max-width: 600px;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  text-align: center;
              }
              .btn {
                  display: inline-block;
                  background-color: #28a745;
                  color: #ffffff;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  margin-top: 20px;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 12px;
                  color: #666;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Verify Your Email Address</h2>
              <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:</p>
              <a href="${verifyUrl}" >Verify Email</a>
              <p>This link will expire in 1 hour.</p>
              <div class="footer">
                  <p>If you didn't create an account with us, please ignore this email.</p>
                  <p>© ${new Date().getFullYear()} Reeliic. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>`;
};

export const resetPasswordLinkEmail = (resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      .btn {
        display: inline-block;
        background-color: #007bff;
        color: #ffffff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Reset Your Password</h2>
      <p>We received a request to reset your password. Click the button below to proceed:</p>
      <a href="${resetUrl}" class="btn">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    </div>
  </body>
  </html>`;
};

export const successPasswordResetMail = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
                margin: 0;
            }
            .container {
                max-width: 600px;
                background-color: #ffffff;
                padding: 20px;
                margin: 0 auto;
                border-radius: 8px;
                text-align: center;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .btn {
                display: inline-block;
                background-color: #28a745;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                margin-top: 20px;
            }
            h2 {
                color: #333;
            }
            p {
                color: #555;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Password Reset Successful</h2>
            <p>Your password has been successfully reset. You can now log in with your new password.</p>
            <p>If you didn't request this change, please ignore this message.</p>
            <a href="${process.env.CLIENT_URL}/login" class="btn">Go to Login</a>
        </div>
    </body>
    </html>`;

export const kycRejectionEmail = (userName, companyName) => {
  const rejectionReason =
    "The information provided in your KYC submission could not be verified. Please review your details and resubmit your application for approval.";

  return `<!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>KYC Verification Rejected</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      padding: 20px;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      background: #ffffff;
                      padding: 20px;
                      border-radius: 8px;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                      text-align: left;
                  }
                  h2 {
                      color: #333;
                  }
                  p {
                      color: #555;
                      line-height: 1.6;
                  }
                  .footer {
                      margin-top: 20px;
                      font-size: 14px;
                      color: #777;
                      text-align: center;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h2>KYC Verification Rejected</h2>
                  <p>Dear ${userName},</p>
                  <p>We regret to inform you that your KYC (Know Your Customer) verification request has been rejected. Below are the details of the rejection:</p>
                  <ul>
                      <li><strong>Reason for Rejection:</strong> ${rejectionReason}</li>
                    
                  </ul>
                  <p>Please review the information you submitted and ensure it meets our requirements. If you have any questions or need further assistance, feel free to reach out to our support team.</p>
                  <p>To resubmit your KYC request, please log in to your account and follow the instructions provided.</p>
                  <p>Thank you for your understanding and cooperation.</p>
                  <div class="footer">
                      <p>Best regards,</p>
                      <p><strong>${companyName}</strong></p>
                     
                  </div>
              </div>
          </body>
          </html>`;
};

export const kycVerificationSuccessEmail = (fullName, companyName) => {
  return `<!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>KYC Verification Successful</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  text-align: left;
              }
              h2 {
                  color: #333;
              }
              p {
                  color: #555;
                  line-height: 1.6;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 14px;
                  color: #777;
                  text-align: center;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>KYC Verification Successful</h2>
              <p>Dear ${fullName},</p>
              <p>We are pleased to inform you that your KYC (Know Your Customer) verification has been successfully completed. Your account is now fully verified and ready to use.</p>
              <p>If you have any questions or need further assistance, feel free to reach out to our support team .</p>
              <p>Thank you for choosing ${companyName}!</p>
              <div class="footer">
                  <p>Best regards,</p>
                  <p><strong>${companyName}</strong></p>
                  
              </div>
          </div>
      </body>
      </html>`;
};
