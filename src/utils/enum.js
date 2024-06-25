export const busTypeEnum = {
  hiace: "hiace",
  siena: "siena",
  benz: "benz",
};

export const busClassEnum = {
  premium: "premium",
  normal: "normal",
};

export const BusCompany = {
  GUO: "guo",
  GOG: "gog",
  EKESON: "ekeson",
  LIBRA: "libra",
  THE_YOUNG: "young",
  PEACE_MASS_TRANSPORT: "peace",
  EFEX: "efex",
  NSIK_MOTORS: "nsik",
  OJ_TRANSPORT: "oj",
  ANAYALOKO_TRANSPORT: "anayaloko",
  FIRST_ANANMBRA_COMFORM_LINE: "acl",
  OVIAN_NORTH_TRANSPORT: "ovian",
  SUPREME_LINK_TRANSPORT: "supreme",
  AKWA_IBOM_TRANSPORT_COMPANY: "akwa_ibom",
  SOKOTO_TRANSPORT: "sokoto",
  E_EXPRESS_TRANSPORT: "e_express",
  AMINU_SOKOTO_TRANSPORT: "aminu",
  AWARASAKI_TRANSPORT: "awsarisaki",
  GCP_TRANSPORT: "gcp",
  ABIA_VOYAGE: "abia_voyage",
  AKUNMILI_MOTORS: "akunmili",
  AKAMBA_ABASI_TRANSPORT: "akamba_abasi_transport",
};

export const statusEnum = {
  Pending: "pending",
  Cancelled: "cancelled",
  Completed: "completed",
};
export const getDashboardRoutes = () => {
  return Object.freeze({
    LOGIN: "/login",
    DASHBOARD: "/",
    CUSTOMER_BOOKING: "/booking",
    PENDING_CUSTOMER_BOOKING: "/booking/pending",
    CUSTOMER_BOOKING_DETAILS: "/booking/:id",
    CUSTOMER: "/customers",
    CUSTOMER_DETAILS: "/customers/:id",
    TRANSPORT_COMPANY: "/transport_companies",
    TRANSPORT_COMPANY_DETAILS: "/transport_companies/:id",
    TRANSPORT_COMPANY_DETAILS_TRIP: "/transport_companies/:id/trips",
    ROUTES: "/routes",
    TERMINAL: "/terminals",
    ADMIN_PRICING: "/admin_pricing",
    PAYMENT: "/payment",
    PAYMENT_METHODS: "/payment_methods",
    CUSTOMER_ROUTE_REQ: "/customer_route_requests",
  });
};
export const IS_DEV = true;
export const actionStatus = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];