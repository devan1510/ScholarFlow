import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();

// ✅ CORS (allow all for now to debug)
app.use(cors());

// ✅ Explicitly handle preflight
app.options("*", cors());

// ✅ JSON parser
app.use(express.json());

// ✅ Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// ✅ Email route
app.post("/send-report", async (req, res) => {
  console.log("📩 Request received");

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "tiwaridevansh1510@gmail.com",
      subject: "Financial Health Report - January to April 2026",
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Financial Health Report</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: #fff;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        h2 {
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
        }
        h3 {
          color: #34495e;
          margin-top: 25px;
        }
        .highlight {
          background-color: #f8f9fa;
          padding: 15px;
          border-left: 4px solid #3498db;
          margin: 20px 0;
        }
        .stat {
          font-size: 18px;
          font-weight: bold;
          color: #27ae60;
        }
        .warning {
          color: #e74c3c;
        }
        ul {
          padding-left: 20px;
        }
        li {
          margin: 10px 0;
        }
        hr {
          margin: 25px 0;
          border: none;
          border-top: 1px solid #e0e0e0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          font-size: 12px;
          color: #7f8c8d;
        }
        .badge {
          display: inline-block;
          background-color: #27ae60;
          color: white;
          padding: 3px 10px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>📊 Your Financial Health Report</h2>
        <p><strong>Period:</strong> January 1, 2026 - April 25, 2026</p>
        <p>Hi there,</p>
        <p>Based on your transaction data from the last four months, here is a detailed analysis of your finances, along with actionable strategies to optimize your savings and start investing for passive income.</p>
        
        <hr/>
        
        <h3>💰 1. Financial Analysis & Prediction</h3>
        <div class="highlight">
          <p><strong>📈 Total Income (4 Months):</strong> <span class="stat">$16,000</span></p>
          <p><strong>📉 Total Expenses (4 Months):</strong> <span class="stat">$7,995</span></p>
          <p><strong>💵 Net Savings (4 Months):</strong> <span class="stat">$8,005</span></p>
          <p><strong>🎯 Savings Rate:</strong> <span class="stat">50%</span> <span class="badge">Excellent!</span></p>
        </div>
        
        <p><strong>Key Insights:</strong></p>
        <ul>
          <li><strong>Income:</strong> Stable at <strong>$4,000/month</strong> (Scholarship: 41%, Part-time: 33%, Freelance: 26%)</li>
          <li><strong>Top Expense:</strong> Food is your largest variable cost at <strong>~$560/month</strong> ($18/day)</li>
          <li><strong>Fixed Costs:</strong> Rent ($650) + Utilities ($315) + Education ($390) = <strong>$1,355/month</strong></li>
          <li><strong>Subscriptions:</strong> $85/month - reasonable for essential services</li>
        </ul>
        
        <p><strong>📊 Expense Breakdown (4 Months):</strong></p>
        <ul>
          <li>🏠 Rent: $2,600 (32.5%)</li>
          <li>🍕 Food: $2,240 (28%)</li>
          <li>📚 Education: $1,560 (19.5%)</li>
          <li>💡 Utilities: $1,255 (15.7%)</li>
          <li>🎬 Subscriptions: $340 (4.3%)</li>
        </ul>
        
        <p><strong>🔮 Prediction for May 2026:</strong><br/>
        Based on the 4-month trend:
        <ul>
          <li><strong>Expected Income:</strong> $4,000 - $4,200</li>
          <li><strong>Fixed Expenses:</strong> ~$1,440 (Rent + Utilities + Education + Subscriptions)</li>
          <li><strong>Variable Expenses:</strong> $500 - $600 (Food)</li>
          <li><strong>Predicted Net Surplus:</strong> <span class="stat">$2,000 - $2,200</span></li>
        </ul>
        </p>
        
        <hr/>
        
        <h3>✂️ 2. Savings Techniques & Expenditure Cut-Downs</h3>
        <p>You have a great savings rate already! Here's how to optimize further:</p>
        
        <p><strong>🍽️ A. Food Optimization</strong> <span class="warning">(Potential Savings: $150 - $250/month)</span></p>
        <ul>
          <li><strong>Current:</strong> ~$560/month ($140/week)</li>
          <li><strong>Target:</strong> $400/month ($100/week)</li>
          <li><strong>Strategy:</strong> Implement "No-Spend Weekdays" - meal prep on Sundays for Monday-Thursday. Save eating out for weekends only.</li>
          <li><strong>Result:</strong> Save $160/month without sacrificing quality of life</li>
        </ul>
        
        <p><strong>💡 B. Utility Audit</strong> <span class="warning">(Potential Savings: $30 - $50/month)</span></p>
        <ul>
          <li>Review internet plans for student discounts</li>
          <li>Use programmable thermostat settings</li>
          <li>Unplug electronics when not in use</li>
        </ul>
        
        <p><strong>📋 C. Apply the 50/30/20 Rule for Students:</strong></p>
        <ul>
          <li><strong>50% Needs ($2,000):</strong> Rent, Utilities, Groceries, Education - Currently at $1,955 ✅</li>
          <li><strong>30% Wants ($1,200):</strong> Dining out, Entertainment - Currently overspending on food</li>
          <li><strong>20% Savings & Investments ($800):</strong> Currently saving more, which is great!</li>
        </ul>
        
        <hr/>
        
        <h3>📈 3. Investment Techniques (Student-Friendly)</h3>
        <p>With your consistent surplus, here are three ways to build passive income:</p>
        
        <p><strong>🏦 A. High-Yield Savings Account (Immediate Priority)</strong></p>
        <ul>
          <li><strong>Goal:</strong> Build 3-6 months of emergency fund</li>
          <li><strong>Action:</strong> Park <strong>$5,000 - $6,000</strong> in a HYSA (4-5% APY)</li>
          <li><strong>Benefit:</strong> Liquid, safe, and earns guaranteed interest</li>
        </ul>
        
        <p><strong>📊 B. Index Fund Investing (Start This Month)</strong></p>
        <ul>
          <li><strong>Recommendation:</strong> Systematic Investment Plan (SIP) of <strong>$300-500/month</strong></li>
          <li><strong>Options:</strong> S&P 500 ETF (VOO/SPY) or Global All-Cap ETF</li>
          <li><strong>Historical Returns:</strong> 7-10% annually</li>
          <li><strong>Why now:</strong> As a student, time is your biggest advantage for compound growth</li>
        </ul>
        
        <p><strong>💼 C. Reinvest in Yourself (Highest ROI)</strong></p>
        <ul>
          <li>You're already earning through freelancing - excellent!</li>
          <li><strong>Action:</strong> Invest $200 from food savings into a certification course</li>
          <li><strong>Result:</strong> Increase freelance rates by 20%, yielding $200/month extra income</li>
          <li><strong>ROI:</strong> 100% return - better than any market investment</li>
        </ul>
        
        <p><strong>⚡ D. Micro-Investing Apps (For Small Amounts)</strong></p>
        <ul>
          <li>Apps like Acorns or Stash round up spare change from purchases</li>
          <li>Set up automatic transfers of $25-50/week</li>
          <li>Makes investing effortless and builds habit</li>
        </ul>
        
        <hr/>
        
        <h3>🎯 Quick Action Plan for Next Month</h3>
        <div class="highlight">
          <ol style="margin: 0; padding-left: 20px;">
            <li><strong>Week 1:</strong> Open HYSA and transfer $5,000 emergency fund</li>
            <li><strong>Week 2:</strong> Set up $300/month auto-investment into S&P 500 ETF</li>
            <li><strong>Week 3:</strong> Start meal prepping; reduce food budget to $100/week</li>
            <li><strong>Week 4:</strong> Audit subscriptions and utilities for savings</li>
          </ol>
        </div>
        
        <hr/>
        
        <p><strong>🎉 Bottom Line:</strong> You have an excellent financial foundation with a 50% savings rate. By slightly optimizing your food spending and starting an automated investment plan, you can turn your current surplus into significant long-term wealth. Your consistent freelance and part-time income puts you ahead of most students your age!</p>
        
        <div class="footer">
          <p>This report was generated automatically based on your transaction data from Jan-Apr 2026.</p>
          <p>💡 <em>Remember: The best investment you can make is in your own skills and education.</em></p>
        </div>
      </div>
    </body>
    </html>
  `,
    });

    return res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("❌ Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
