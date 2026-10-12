import dns from 'dns';

export function applyDnsServerOverride() {
  const servers = (process.env.DNS_SERVERS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (servers.length > 0) {
    dns.setServers(servers);
    dns.promises.setServers(servers);
  }
}
