"use client";
import React, { useState, createContext, useContext } from "react";

const TabContext = createContext();

export const TabContainer = ({ children, defaultActiveKey }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  return (
    <TabContext.Provider value={{ activeKey, setActiveKey }}>
      {children}
    </TabContext.Provider>
  );
};

export const Nav = ({ as: Component = "div", className, children, ...props }) => {
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

export const NavItem = ({ as: Component = "div", children, ...props }) => {
  return <Component {...props}>{children}</Component>;
};

export const NavLink = ({
  as: Component = "a",
  eventKey,
  children,
  className = "",
  ...props
}) => {
  const context = useContext(TabContext);
  const isActive = context?.activeKey === eventKey;

  const handleClick = (e) => {
    e.preventDefault();
    if (context?.setActiveKey) {
      context.setActiveKey(eventKey);
    }
  };

  return (
    <Component
      className={`${className} ${isActive ? "active" : ""}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Component>
  );
};

export const TabContent = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const TabPane = ({ eventKey, className = "", children }) => {
  const context = useContext(TabContext);
  const isActive = context?.activeKey === eventKey;

  if (!isActive) return null;

  return (
    <div className={`${className} ${isActive ? "show active" : ""}`}>
      {children}
    </div>
  );
};

Nav.Item = NavItem;
Nav.Link = NavLink;

export const Tab = {
  Container: TabContainer,
  Content: TabContent,
  Pane: TabPane
};