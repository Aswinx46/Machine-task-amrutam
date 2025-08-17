export const otpEmailTemplate = (otp: string) => {
    return `
    <html>
    <head>
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #f4f7fb;
                font-family: 'Helvetica Neue', Arial, sans-serif;
            }
            .wrapper {
                width: 100%;
                table-layout: fixed;
                background-color: #f4f7fb;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
                padding: 30px 20px;
                text-align: center;
                position: relative;
                overflow: hidden;
            }
            .header h1 {
                color: white;
                margin: 0;
                font-size: 26px;
                font-weight: 700;
                letter-spacing: 0.5px;
            }
            .header-decor {
                position: absolute;
                opacity: 0.08;
                font-size: 70px;
                transform: rotate(-20deg);
                left: 10px;
                top: -10px;
            }
            .content {
                padding: 30px;
                color: #333;
            }
            .greeting {
                font-size: 18px;
                margin-bottom: 20px;
                line-height: 1.5;
                font-weight: 500;
            }
            .otp-section {
                text-align: center;
                margin: 30px 0;
            }
            .otp-box {
                display: inline-block;
                background: #4facfe;
                color: white;
                font-size: 30px;
                font-weight: 700;
                padding: 14px 28px;
                border-radius: 8px;
                letter-spacing: 4px;
                box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
            }
            .instructions {
                font-size: 14px;
                color: #666;
                line-height: 1.6;
                margin-top: 20px;
                text-align: center;
            }
            .footer {
                background-color: #f9fbfd;
                padding: 20px;
                text-align: center;
                border-top: 1px solid #e6e6e6;
            }
            .footer-text {
                color: #777;
                font-size: 13px;
                line-height: 1.5;
            }
            .brand {
                color: #4facfe;
                font-weight: 700;
            }
            .social-links a {
                color: #4facfe;
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
                            <h1>DoctorConnect</h1>
                            <div class="header-decor">🩺</div>
                        </div>
  
                        <!-- Content -->
                        <div class="content">
                            <p class="greeting">Dear Patient,</p>
                            <p>Thank you for booking your appointment with <strong>DoctorConnect</strong>.  
                            To complete your booking, please use the OTP below to verify your account.</p>
                            
                            <div class="otp-section">
                                <div class="otp-box">${otp}</div>
                            </div>
                            
                            <p class="instructions">
                                This OTP is valid for <strong>10 minutes</strong>.  
                                If you did not request an appointment, you can safely ignore this message.
                            </p>
                        </div>
  
                        <!-- Footer -->
                        <div class="footer">
                            <p class="footer-text">
                                Stay healthy with <span class="brand">DoctorConnect</span><br>
                                Book. Consult. Recover.<br>
                                <div class="social-links">
                                    <a href="#">Support</a> | 
                                    <a href="#">Appointments</a> | 
                                    <a href="#">Contact Us</a>
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
  