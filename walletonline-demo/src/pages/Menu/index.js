import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import User from "../User";
import Wallet from "../Wallet";
import Transaction from "../Transaction";
import { Menu as AntdMenu } from "antd";

const items = [
  {
    key: "sub1",
    label: "用户管理",
    icon: <MailOutlined />,
    children: [
      {
        key: "1",
        label: "修改资料",
      },
      {
        key: "2",
        label: "删除用户",
      },
    ],
  },
  {
    key: "sub2",
    label: "账户管理",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "3",
        label: "创建账户",
      },
      {
        key: "4",
        label: "删除账户",
      },
    ],
  },
  {
    key: "sub3",
    label: "转账",
    icon: <SettingOutlined />,
    children: [
      {
        key: "5",
        label: "转账",
      },
      {
        key: "6",
        label: "转账记录",
      },
    ],
  },
];

const Menu = () => {
  const [current, setCurrent] = useState("1");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <>
      <br />
      <br />
      <AntdMenu
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default Menu;
