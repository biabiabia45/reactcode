import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Cascader, Checkbox, Form, Input, Select } from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const ChangePassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const username = values.nickname; // 从表单获取用户名
    const oldPassword = values.oldPassword; // 从表单获取旧密码
    const newPassword = values.password; // 从表单获取新密码

    try {
      const response = await fetch(
        `http://localhost:8000/wallet-online/users/${username}/password`, // 动态替换用户名
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword: oldPassword, // 使用变量而非字符串
            newPassword: newPassword, // 确保这是新密码的字段名
          }),
        }
      );

      if (response.ok) {
        console.log("Password changed successfully");
        navigate("/"); // 跳转到主页或登录页面
      } else {
        const errorMessage = await response.text();
        console.error("Error changing password:", errorMessage);
        // 处理错误响应，例如显示错误消息给用户
      }
    } catch (error) {
      console.error("Network error:", error);
      // 处理网络错误
    }
  };

  return (
    <div className="register-container">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="nickname"
          label="用户名"
          rules={[
            {
              required: true,
              message: "请输入您的用户名称!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="oldpassword"
          label="旧密码"
          rules={[
            {
              required: true,
              message: "请输入您的密码!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="password"
          label="新密码"
          dependencies={["oldpassword"]}
          rules={[
            {
              required: true,
              message: "请输入您的密码!",
            },
            {
              pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/,
              message: "密码必须为8-16位的数字和字母的组合",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("oldpassword") != value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("新密码不能与旧密码相同!"));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认新密码"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "请确认您的密码是否正确!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次密码不匹配!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className="center-button"
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 10, offset: 7 },
          }}
        >
          <Button type="primary" htmlType="submit">
            确认修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
