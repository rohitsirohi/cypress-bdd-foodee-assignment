const report = require('multiple-cucumber-html-reporter')

report.generate({
	jsonDir: 'cypress/cucumber-json/',
	reportPath: 'cypress/reports/',
	metadata:{
        browser: {
            name: 'chrome',
            version: '98'
        },
        device: 'Rohit Sirohi Machine',
        platform: {
            name: 'Windows',
            version: 'X'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Foodee Assignment'},
            {label: 'Release', value: '0.0.1'},
            {label: 'Cycle', value: '0.0.1'},
            {label: 'Execution Start Time', value: 'March 8th 2022, 09:00 AM PST'},
            {label: 'Execution End Time', value: 'March 8th 2022, 09:05 AM PST'}
        ]
    }
});