import { FaHome, FaEnvelope, FaCalendarAlt, FaBullhorn, FaChartPie, FaShoppingCart, FaUsers, FaWallet, FaTasks, FaCog, FaToolbox } from "react-icons/fa";

const Menus = [
  //Pages
  // Dashboard
  {
    id: 1,
    type: "submenu",
    title: "Dashboard",
    icon: FaChartPie,
    subItems: [
      { id: 1, title: "Main", path: "/" },
      { id: 2, title: "Analytics", path: "/analytics" },
      { id: 3, title: "Fintech", path: "/fintech" },
    ],
  },

  // E-Commerce
  {
    id: 2,
    type: "submenu",
    title: "E-Commerce",
    icon: FaShoppingCart,
    subItems: [
      { id: 1, title: "Customers", path: "/customers" },
      { id: 2, title: "Orders", path: "/orders" },
      { id: 3, title: "Invoices", path: "/invoices" },
      { id: 4, title: "Shop", path: "/shop" },
      { id: 5, title: "Single Product", path: "/product" },
      { id: 6, title: "Cart", path: "/cart" },
      { id: 7, title: "Checkout", path: "/checkout" },
    ],
  },

  // Community
  {
    id: 3,
    type: "submenu",
    title: "Community",
    icon: FaUsers,
    subItems: [
      { id: 1, title: "Users - Tabs", path: "/users/tabs" },
      { id: 2, title: "Users - Tiles", path: "/users/tiles" },
      { id: 3, title: "Profile", path: "/profile" },
      { id: 4, title: "Feed", path: "/feed" },
    ],
  },

  // Finance
  {
    id: 4,
    type: "submenu",
    title: "Finance",
    icon: FaWallet,
    subItems: [
      { id: 1, title: "Cards", path: "/cards" },
      { id: 2, title: "Transactions", path: "/transactions" },
    ],
  },

  // Tasks
  {
    id: 5,
    type: "submenu",
    title: "Tasks",
    icon: FaTasks,
    subItems: [
      { id: 1, title: "Kanban", path: "/kanban" },
      { id: 2, title: "List", path: "/list" },
    ],
  },

  // Utility
  {
    id: 6,
    type: "submenu",
    title: "Utility",
    icon: FaToolbox,
    subItems: [
      { id: 1, title: "Changelog", path: "/changelog" },
      { id: 2, title: "Roadmap", path: "/roadmap" },
      { id: 3, title: "FAQs", path: "/faqs" },
      { id: 4, title: "404", path: "/404" },
    ],
  },

  // Direct Links
  { id: 7, type: "direct", title: "Messages", path: "/messages", icon: FaEnvelope, badge: "5" },  
  { id: 8, type: "direct", title: "Calendar", path: "/calendar", icon: FaCalendarAlt },
  { id: 9, type: "direct", title: "Campaigns", path: "/campaigns", icon: FaBullhorn },
  
  // Settings

  // More Menus
  {
    id: 10,
    type: "submenu",
    title: "Settings",
    icon: FaCog,
    subItems: [
      { id: 1, title: "My Account", path: "/account" },
      { id: 2, title: "My Notifications", path: "/notifications" },
      { id: 3, title: "Connected Apps", path: "/apps" },
    ],
  },

];

export default Menus;
