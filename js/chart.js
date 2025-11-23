/**
 * INFORCE ROI Calculator - Productivity Curve Visualization
 *
 * Visualizes the Productivity Value Gap (PVG) concept from whitepaper
 * Shows how productivity ramps up after a turnover event
 */

function initProductivityChart() {
    const ctx = document.getElementById('productivityChart');

    if (!ctx) {
        console.error('Chart canvas element not found');
        return;
    }

    // Timeline in weeks (0-12 weeks after turnover)
    const labels = Array.from({ length: 13 }, (_, i) => i);

    // Productivity percentages over time
    // Week 0-2: Idle Time (vacancy) = 0% productivity
    // Week 2-3: Onboarding Lag = 0% productivity
    // Week 3+: Ramp-up from 0% → 100% (varies by experience)

    // Function to generate productivity curve
    function generateProductivityCurve(rampUpWeeks) {
        const curve = [];

        for (let week = 0; week <= 12; week++) {
            if (week < 2) {
                // Idle Time: 0% productivity
                curve.push(0);
            } else if (week < 3) {
                // Onboarding Lag: 0% productivity
                curve.push(0);
            } else {
                // Ramp-up: Linear increase to 100%
                const weeksIntoRampUp = week - 3;
                const productivity = Math.min(100, (weeksIntoRampUp / rampUpWeeks) * 100);
                curve.push(productivity);
            }
        }

        return curve;
    };

    // Generate curves for different experience levels
    const seniorCurve = generateProductivityCurve(6);  // 6 weeks to 100% (30 days)
    const mixedCurve = generateProductivityCurve(9);   // 9 weeks to 100% (45 days)
    const juniorCurve = generateProductivityCurve(12); // 12 weeks to 100% (60 days)

    const chartConfig = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Senior Developer',
                    data: seniorCurve,
                    borderColor: '#00C853',
                    backgroundColor: 'rgba(0, 200, 83, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Mixed Experience',
                    data: mixedCurve,
                    borderColor: '#0066CC',
                    backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Junior Developer',
                    data: juniorCurve,
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Productivity Recovery After Turnover Event',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: 20
                },
                subtitle: {
                    display: true,
                    text: 'Based on Mirko Kovacevic\'s Productivity Value Gap framework',
                    font: {
                        size: 14,
                        style: 'italic'
                    },
                    padding: {
                        bottom: 20
                    }
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 12
                        },
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(0) + '% productivity';
                            }
                            return label;
                        },
                        title: function(context) {
                            const week = context[0].label;
                            if (week < 2) {
                                return 'Week ' + week + ' (Idle Time)';
                            } else if (week < 3) {
                                return 'Week ' + week + ' (Onboarding)';
                            } else {
                                return 'Week ' + week + ' (Ramp-Up)';
                            }
                        }
                    }
                },
                annotation: {
                    annotations: {
                        idleTime: {
                            type: 'box',
                            xMin: 0,
                            xMax: 2,
                            backgroundColor: 'rgba(255, 107, 53, 0.1)',
                            borderColor: 'rgba(255, 107, 53, 0.5)',
                            borderWidth: 1,
                            label: {
                                display: true,
                                content: 'Idle Time',
                                position: 'center',
                                font: {
                                    size: 10
                                }
                            }
                        },
                        onboarding: {
                            type: 'box',
                            xMin: 2,
                            xMax: 3,
                            backgroundColor: 'rgba(255, 193, 7, 0.1)',
                            borderColor: 'rgba(255, 193, 7, 0.5)',
                            borderWidth: 1,
                            label: {
                                display: true,
                                content: 'Onboarding',
                                position: 'center',
                                font: {
                                    size: 10
                                }
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Weeks After Turnover Event',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Productivity (%)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    };

    // Create the chart
    const productivityChart = new Chart(ctx, chartConfig);

    return productivityChart;
}

// Initialize chart when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }

    initProductivityChart();
});
