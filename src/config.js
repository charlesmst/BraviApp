let config
if (window.location.host === "localhost:3000") {
    // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ) {
    config = {
        apiUrl: 'https://localhost:5001/api/'
    }
} else {
    config = {
        apiUrl: 'https://bravitest.azurewebsites.net/api/'
    }
}
export default config;