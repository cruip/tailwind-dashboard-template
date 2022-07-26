import React from "react";
const TabContext = React.createContext(null);

export const Tabs = (props) => {
    const { children, defaultTab } = props;
    const [activeTab, setActiveTab] = React.useState(defaultTab);
  
    return <TabContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabContext.Provider>;
  };
  
  export const Tab = (props) => {
    const { activeTab, setActiveTab } = React.useContext(TabContext);
    const { label, tabIndex } = props;
    const active = activeTab === tabIndex;
  
    return (
      <a
        className={` inline-block w-1/2  rounded-lg px-4 py-4 shadow relative ${active ? 'bg-blue-600 text-white' : 'text-slate-600'
          }`}
        onClick={() => setActiveTab(tabIndex)}
      >
       
        <h6 className="flex items-center mb-3 font-bold">
          {label}
        </h6>
      </a>
    );
  };
  
  export const TabPane = (props) => {
    const { activeTab } = React.useContext(TabContext);
    const { children, tabIndex } = props;
  
    if (activeTab === tabIndex) {
      return <div className="tabs-tab-pane">{children}</div>;
    } else {
      return null;
    }
  };
  