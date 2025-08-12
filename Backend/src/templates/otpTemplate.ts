export const otpEmailTemplate = (otp: string) => {
    return `
    <html>
    <head>
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                font-family: 'Helvetica Neue', Arial, sans-serif;
            }
            .wrapper {
                width: 100%;
                table-layout: fixed;
                background-color: #f4f4f4;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: linear-gradient(135deg, #ffffff 0%, #f9f9ff 100%);
                border-radius: 15px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(45deg, #FF6F91 0%, #FF9472 100%);
                padding: 30px 20px;
                text-align: center;
                position: relative;
                overflow: hidden;
            }
            .header h1 {
                color: white;
                margin: 0;
                font-size: 28px;
                font-weight: 700;
                letter-spacing: 1px;
            }
            .header-decor {
                position: absolute;
                opacity: 0.1;
                font-size: 80px;
                transform: rotate(-45deg);
                left: -20px;
                top: -20px;
            }
            .content {
                padding: 30px;
                color: #444;
            }
            .greeting {
                font-size: 18px;
                margin-bottom: 20px;
                line-height: 1.5;
            }
            .otp-section {
                text-align: center;
                margin: 30px 0;
            }
            .otp-box {
                display: inline-block;
                background: #FF6F91;
                color: white;
                font-size: 32px;
                font-weight: 700;
                padding: 15px 25px;
                border-radius: 10px;
                letter-spacing: 4px;
                box-shadow: 0 4px 15px rgba(255, 111, 145, 0.3);
            }
            .instructions {
                font-size: 14px;
                color: #666;
                line-height: 1.6;
                margin-top: 20px;
            }
            .footer {
                background-color: #f8f8ff;
                padding: 20px;
                text-align: center;
                border-top: 1px solid #eee;
            }
            .footer-text {
                color: #777;
                font-size: 13px;
                line-height: 1.4;
            }
            .brand {
                color: #FF6F91;
                font-weight: 700;
            }
            .social-links a {
                color: #FF6F91;
                text-decoration: none;
                margin: 0 5px;
            }
        </style>
    </head>
    <body>
        <table class="wrapper" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    <div class="container">
                        <!-- Header -->
                        <div class="header">
                            <h1>PixelNest</h1>
                            <div class="header-decor">📷</div>
                        </div>

                        <!-- Content -->
                        <div class="content">
                            <p class="greeting">Hey Creative Explorer,</p>
                            <p>Welcome to <strong>PixelNest</strong> — where your visual stories come to life! Use the OTP below to verify your account and start uploading and exploring stunning galleries.</p>
                            
                            <div class="otp-section">
                                <div class="otp-box">${otp}</div>
                            </div>
                            
                            <p class="instructions">
                                This OTP is valid for 10 minutes. If you didn't request this, just ignore it — no action needed.
                                Let's turn your memories into masterpieces ✨
                            </p>
                        </div>

                        <!-- Footer -->
                        <div class="footer">
                            <p class="footer-text">
                                Thanks for joining <span class="brand">PixelNest</span><br>
                                Curate. Capture. Celebrate.<br>
                                <div class="social-links">
                                    <a href="#">Support</a> | 
                                    <a href="#">Gallery</a> | 
                                    <a href="#">Contact</a>
                                </div>
                            </p>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};
