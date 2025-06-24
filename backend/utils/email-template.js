export const generateEmailTemplate = ({
    userName,
    subscriptionName,
    renewalDate,
    planName,
    price,
    paymentMethod,
    accountSettingsLink,
    supportLink,
    daysLeft,
}) => `
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #f6f9fc; color: #333; max-width: 640px; margin: 0 auto; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); background: #fff;">
        <tr>
            <td style="background: linear-gradient(90deg, #667eea, #764ba2); text-align: center; padding: 30px 0;">
                <h1 style="color: #fff; margin: 0; font-size: 36px;">🔔 SubTrackt</h1>
                <p style="color: #e3eaf5; font-size: 16px; margin-top: 5px;">Never miss a renewal again</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <p style="font-size: 18px; margin-bottom: 20px;">Hey <strong style="color: #4a90e2;">${userName}</strong> 👋,</p>

                <p style="font-size: 16px; margin-bottom: 25px;">
                    Your <strong>${subscriptionName}</strong> subscription is scheduled to renew on 
                    <strong style="color: #4a90e2;">${renewalDate}</strong> – that’s just <strong>${daysLeft} day${daysLeft > 1 ? "s" : ""}</strong> away!
                </p>

                <table cellpadding="12" cellspacing="0" width="100%" style="background-color: #f4f7fb; border-radius: 10px; margin-bottom: 25px;">
                    <tr>
                        <td style="font-size: 15px;"><strong>🧾 Plan:</strong> ${planName}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 15px;"><strong>💰 Price:</strong> ${price}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 15px;"><strong>💳 Payment Method:</strong> ${paymentMethod}</td>
                    </tr>
                </table>

                <a href="${accountSettingsLink}" style="display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; margin-bottom: 30px;">
                    ⚙️ Manage Your Subscription
                </a>

                <p style="font-size: 15px; margin-top: 30px;">
                    Need help or have questions? <a href="${supportLink}" style="color: #667eea; text-decoration: underline;">Contact our support team</a> anytime.
                </p>

                <p style="font-size: 15px; margin-top: 30px;">
                    Stay awesome ✨,<br>
                    <strong>The SubTrackt Team</strong>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #eef2f7; text-align: center; padding: 20px; font-size: 13px; color: #666;">
                <p style="margin-bottom: 10px;">SubTrackt Inc. • 123 Main St, Anytown, USA</p>
                <p style="margin: 0;">
                    <a href="#" style="color: #667eea; margin: 0 10px; text-decoration: none;">Unsubscribe</a> |
                    <a href="#" style="color: #667eea; margin: 0 10px; text-decoration: none;">Privacy Policy</a>
                </p>
            </td>
        </tr>
    </table>
</div>
`;


export const emailTemplates = [
    {
        label: "7 days before reminder",
        generateSubject: (data) =>
            `📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
    },
    {
        label: "5 days before reminder",
        generateSubject: (data) =>
            `⏳ ${data.subscriptionName} Renews in 5 Days – Stay Subscribed!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
    },
    {
        label: "2 days before reminder",
        generateSubject: (data) =>
            `🚀 2 Days Left!  ${data.subscriptionName} Subscription Renewal`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
    },
];