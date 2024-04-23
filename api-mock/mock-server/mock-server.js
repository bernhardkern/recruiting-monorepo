const mockServer = require('mockserver-node');
const mockServerClient = require('mockserver-client').mockServerClient;
const fs = require('fs');

// Pfad zur Konfigurationsdatei
const configPath = './initializerJson.json';

// MockServer starten
mockServer.start_mockserver({
    serverPort: 1080,
    verbose: true
}).then(() => {
    console.log('MockServer is running on port 1080');
    loadExpectations();
});

// Erwartungen aus der Konfigurationsdatei laden
function loadExpectations() {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const client = mockServerClient("localhost", 1080);

    config.forEach(expectation => {
        client.mockAnyResponse(expectation).then(
            () => console.log(`Expectation for ${expectation.httpRequest.path} created successfully`),
            error => console.error('Error creating expectation: ', error)
        );
    });
}