/**
 * InForce ROI Calculator - Core Logic
 *
 * Based on whitepaper: "The Need to Turnaround Turnover" by Mirko Kovacevic
 * Implements Productivity Value Gap (PVG) framework
 *
 * Whitepaper-validated assumptions marked with ✅
 * Pending validation assumptions marked with ⚠️
 */

function calculator() {
    return {
        // INPUT VALUES (user-controlled via sliders)
        hourlyRate: 200,        // $150-$350, default $200
        teamSize: 12,           // 5-30 people, default 12
        projectDuration: 18,    // 6-36 months, default 18
        experienceLevel: 'mixed', // junior, mixed, senior

        // STATIC ASSUMPTIONS (whitepaper-validated)
        inForceTurnover: 0.05,     // ✅ 5% annual (95% retention - whitepaper confirmed)
        competitorTurnover: 0.30,  // ⚠️ 30% annual (requires Rick validation)
        vacancyWeeks: 2,           // ✅ 2 weeks (whitepaper page 3)
        vacancyPayment: 1.0,       // ✅ 100% payment (whitepaper page 4)
        onboardingDays: 5,         // ⚠️ 5 days (subset of whitepaper's 3-week total)
        onboardingPayment: 1.0,    // ✅ 100% payment

        // RAMP-UP TIMELINES BY EXPERIENCE LEVEL (⚠️ pending validation)
        rampUpTimelines: {
            junior: 60,   // 60 days to full productivity
            mixed: 45,    // 45 days average
            senior: 30    // 30 days (experienced professionals)
        },

        // CALCULATED PROPERTIES
        get hoursPerWeek() {
            return 40; // Standard full-time
        },

        get weeksPerYear() {
            return 52;
        },

        get projectWeeks() {
            return this.projectDuration;
        },

        get rampUpDays() {
            return this.rampUpTimelines[this.experienceLevel];
        },

        // TURNOVER EVENTS CALCULATION
        get competitorTurnoverEvents() {
            // Annual turnover rate × team size × (project duration / 12 months)
            const annualEvents = this.competitorTurnover * this.teamSize;
            const projectEvents = annualEvents * (this.projectDuration / 12);
            return Math.round(projectEvents);
        },

        get inforceTurnoverEvents() {
            // Annual turnover rate × team size × (project duration / 12 months)
            const annualEvents = this.inForceTurnover * this.teamSize;
            const projectEvents = annualEvents * (this.projectDuration / 12);
            return Math.round(projectEvents);
        },

        // COST PER TURNOVER EVENT
        get costPerEvent() {
            return this.idleTimeCost + this.onboardingCost + this.rampUpCost;
        },

        // COMPONENT 1: IDLE TIME (Vacancy Period)
        // ✅ Whitepaper: "2 weeks to find a replacement" (page 3)
        // ✅ Whitepaper: "The client continues to pay for a full team" (page 4)
        get idleTimeCost() {
            const hours = this.vacancyWeeks * this.hoursPerWeek;
            const cost = hours * this.hourlyRate * this.vacancyPayment;
            return cost;
        },

        // COMPONENT 2: ONBOARDING LAG (Onboarding Deadtime)
        // ⚠️ Assumption: 5 days (1 week) for permissions, access, setup
        // Whitepaper references "3 weeks for permissions, system access, and knowledge ramp-up"
        // We split this into 1 week onboarding + remainder in ramp-up
        get onboardingCost() {
            const hours = (this.onboardingDays / 5) * this.hoursPerWeek;
            const cost = hours * this.hourlyRate * this.onboardingPayment;
            return cost;
        },

        // COMPONENT 3: ACCLIMATION PERIOD (Ramp-Up)
        // ⚠️ Timelines vary by experience level (pending validation)
        // Assumption: Productivity ramps linearly from 0% → 100%
        // Average productivity during ramp-up: 50%
        get rampUpCost() {
            const rampUpWeeks = this.rampUpDays / 5;
            const hours = rampUpWeeks * this.hoursPerWeek;
            const averageProductivity = 0.5; // 50% average during ramp
            const productivityGap = 1 - averageProductivity; // 50% gap
            const cost = hours * this.hourlyRate * productivityGap;
            return cost;
        },

        // TOTAL COSTS
        get competitorTotal() {
            return this.competitorTurnoverEvents * this.costPerEvent;
        },

        get inforceTotal() {
            return this.inforceTurnoverEvents * this.costPerEvent;
        },

        get savings() {
            return this.competitorTotal - this.inforceTotal;
        },

        get savingsPercentage() {
            if (this.competitorTotal === 0) return 0;
            return (this.savings / this.competitorTotal) * 100;
        },

        // FORMATTED DISPLAY VALUES
        get formattedHourlyRate() {
            return '$' + this.hourlyRate;
        },

        get formattedCompetitorTotal() {
            return '$' + this.competitorTotal.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        },

        get formattedInforceTotal() {
            return '$' + this.inforceTotal.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        },

        get formattedSavings() {
            return '$' + this.savings.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        },

        get formattedSavingsPercentage() {
            return this.savingsPercentage.toFixed(1) + '%';
        },

        // EXPERIENCE LEVEL LABELS
        get experienceLevelLabel() {
            const labels = {
                junior: 'Junior Developers',
                mixed: 'Mixed Experience',
                senior: 'Senior Developers'
            };
            return labels[this.experienceLevel];
        },

        // BREAKDOWN FOR METHODOLOGY SECTION
        get costBreakdown() {
            return {
                idleTime: this.idleTimeCost,
                onboarding: this.onboardingCost,
                rampUp: this.rampUpCost,
                total: this.costPerEvent
            };
        },

        // FORMATTED BREAKDOWN
        get formattedIdleTimeCost() {
            return '$' + this.idleTimeCost.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        },

        get formattedOnboardingCost() {
            return '$' + this.onboardingCost.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        },

        get formattedRampUpCost() {
            return '$' + this.rampUpCost.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        },

        get formattedCostPerEvent() {
            return '$' + this.costPerEvent.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        },

        // ADDITIONAL COMPUTED VALUES FOR HTML
        get competitorEvents() {
            return this.competitorTurnoverEvents;
        },

        get inforceEvents() {
            return this.inforceTurnoverEvents;
        },

        get competitorIdleCost() {
            return this.competitorTurnoverEvents * this.idleTimeCost;
        },

        get inforceIdleCost() {
            return this.inforceTurnoverEvents * this.idleTimeCost;
        },

        get competitorOnboardingCost() {
            return this.competitorTurnoverEvents * this.onboardingCost;
        },

        get inforceOnboardingCost() {
            return this.inforceTurnoverEvents * this.onboardingCost;
        },

        get competitorRampCost() {
            return this.competitorTurnoverEvents * this.rampUpCost;
        },

        get inforceRampCost() {
            return this.inforceTurnoverEvents * this.rampUpCost;
        },

        get savingsPercent() {
            return this.savingsPercentage.toFixed(1);
        },

        get projectBudget() {
            // Estimate total project budget based on team size, hourly rate, and duration
            const weeks = this.projectDuration * 4.33; // Average weeks per month
            const totalHours = this.teamSize * this.hoursPerWeek * weeks;
            return totalHours * this.hourlyRate;
        }
    };
}

// Make calculator function available globally for Alpine.js
window.calculator = calculator;
