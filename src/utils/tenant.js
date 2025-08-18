/**
 * Get tenant subdomain from the current hostname
 * Returns:
 *  - 'default' for localhost, IP, or missing subdomain
 *  - subdomain for URLs like speedauto.local, tenant.example.com
 */
export function getTenantSubdomain() {
  const host = window.location.hostname;
  const parts = host.split(".");

  // Localhost or IP address
  if (host.includes("localhost") || /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    return "default";
  }

  // Local development with `.local`
  if (host.endsWith(".local") && parts.length >= 2) {
    return parts[0];
  }

  // Standard multi-level domain
  if (parts.length >= 3) {
    return parts[0];
  }

  return "default";
}
