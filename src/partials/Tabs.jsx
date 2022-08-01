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
        className={` inline-flex items-center justify-center w-1/2  rounded-lg px-4 py-2 shadow relative ${active ? 'bg-slate-300 text-slate-700' : 'text-slate-600'
          }`}
        onClick={() => setActiveTab(tabIndex)}
      >
       
        <h6 className="font-bold">
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
  