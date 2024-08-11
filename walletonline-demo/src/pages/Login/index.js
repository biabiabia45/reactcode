import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const TrueLogin = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch(
        "http://localhost:8000/wallet-online/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: values.username,
            password: values.password,
          }),
        }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        navigate("/Menu");
        // Handle successful login, e.g., redirect or store token
      } else {
        console.error("Login failed:", response.data);
        // Handle unsuccessful login
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle network error
    }
  };

  return (
    <Form
      className="login"
      initialValues={{
        remember: true,
      }}
      style={{
        maxWidth: 360,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        className="username"
        name="username"
        rules={[
          {
            required: true,
            message: "请输入你的用户名!",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="账号/邮箱" />
      </Form.Item>

      <Form.Item
        className="password"
        name="password"
        rules={[
          {
            required: true,
            message: "请输入你的密码!",
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="密码" />
      </Form.Item>

      <Form.Item>
        <Space style={{ width: "100%" }} justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <a href="">找回密码</a>
        </Space>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          登录
        </Button>
        <Space>
          <Link to="/Register">注册账号</Link>
          <a href="">修改密码</a>
        </Space>
      </Form.Item>
    </Form>
  );
};

const Login = () => {
  return (
    <div className="centered-form">
      <TrueLogin />
    </div>
  );
};

export default Login;
