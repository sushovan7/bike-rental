export const resetPasswordLinkEmail = (resetToken) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset=\"UTF-8\">
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
        <title>Reset Your Password</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }}
            .container {{
                max-width: 600px;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }}
            .btn {{
                display: inline-block;
                background-color: #007bff;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                margin-top: 20px;
            }}
        </style>
    </head>
    <body>
        <div class=\"container\">
            <h2>Reset Your Password</h2>
            <p>We received a request to reset your password. Click the button below to proceed:</p>
            <a href=\`${process.env.CLIENT_URL}/reset-password/${resetToken}\` class=\"btn\">Reset Password</a>
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
