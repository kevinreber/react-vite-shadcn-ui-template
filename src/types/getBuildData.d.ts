export type Build = {
  device_name: string;
  device_role: string;
  rack_cabinet: string;
  position: string;
  ru: string;
  manufacturer: string;
  model: string;
  deployed: string;
  serial: string;
  l3_vni_mac: string;
  management_ip: string;
  bgp_as_number: string;
  bgp_router_id: string;
  vtep_ip: string;
  vrf: string;
  netbox_import?: string;
};

export type GetBuildDataAPIResponse = Build[];
