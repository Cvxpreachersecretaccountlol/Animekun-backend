import os from 'os';

export function logNetworks(port) {
    const protocol = 'http';
    const localHost = 'localhost';
    const nets = os.networkInterfaces();
    let localIp = '127.0.0.1';
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                localIp = net.address;
                break;
            }
        }
        if (localIp !== '127.0.0.1') break;
    }
    console.log('Server is running!');
    console.log(`  - Local:   ${protocol}://${localHost}:${port}`);
    console.log(`  - Network: ${protocol}://${localIp}:${port}`);
}
