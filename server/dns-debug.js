const dns = require('dns');

const host = 'faboradb.dizent0.mongodb.net';
const srv = '_mongodb._tcp.' + host;

console.log('Resolving SRV:', srv);
dns.resolveSrv(srv, (err, addresses) => {
    if (err) {
        console.error('SRV Resolution Error:', err);
        return;
    }
    console.log('SRV Addresses:', addresses);
    
    addresses.forEach(addr => {
        dns.resolve4(addr.name, (err, ips) => {
            if (err) {
                console.error('IP Resolution Error for', addr.name, ':', err);
                return;
            }
            console.log('IPs for', addr.name, ':', ips);
        });
    });
});
