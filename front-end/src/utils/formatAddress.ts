export function formatEthAddress(address: string) {
  address = address.slice(2);

  const prefix = address.slice(0, 4);
  const suffix = address.slice(-4);

  const formattedAddress = `0x${prefix}...${suffix}`;

  return formattedAddress;
}