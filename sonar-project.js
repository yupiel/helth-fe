const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
	{
		serverUrl: 'http://localhost:9000',
		options: {
			'sonar.sources': 'src',
			'sonar.login': 'admin',
			'sonar.password': 'aImSgEMTEnd91',
			'sonar.tests': 'src',
			'sonar.inclusions': '**', // Entry point of your code
			'sonar.test.inclusions':
				'src/**/*.test.ts,src/**/*.test.tsx',
			'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
			'sonar.testExecutionReportPaths': 'coverage/test-reporter.xml',
		},
	},
	() => {}
);
