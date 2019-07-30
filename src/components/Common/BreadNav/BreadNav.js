import React from "react";
import { Link } from "react-router";
import { Breadcrumb } from "antd";
import "../../../App.css";

const BreadNav = props => {
  return (
    <Breadcrumb className="bread-crumb">
      {props.navlist.map((item, index) => (
        <Breadcrumb.Item key={index}>
          <Link color="textPrimary" key={index} to={item.url}>
            {item.name}
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadNav;
