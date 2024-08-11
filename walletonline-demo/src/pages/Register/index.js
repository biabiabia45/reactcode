import React, { useState } from "react";
import axios from "axios";
import { Button, Cascader, Checkbox, Form, Input, Select } from "antd";
import "./styles.css";

const { Option } = Select;
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Register = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch(
        "http://localhost:8000/wallet-online/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.nickname, // 对应 "username" 字段
            password: values.password, // 对应 "password" 字段
            contactInfo: {
              email: values.email, // 对应 "contactInfo.email" 字段
              address: values.residence.join(", "), // 对应 "contactInfo.address" 字段
            },
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("User created successfully:", result);
        // Handle successful user creation, e.g., redirect to login page or show a success message
      } else {
        const errorMessage = await response.text();
        console.error("Error creating user:", errorMessage);
        // Handle error response, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle network error
    }
  };


  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
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
          name="email"
          label="邮箱"
          rules={[
            {
              type: "email",
              message: "邮箱格式不符合!",
            },
            {
              required: true,
              message: "请输入您的邮箱!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
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
          name="confirm"
          label="确认密码"
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
          name="residence"
          label="现居住地"
          rules={[
            {
              type: "array",
              required: true,
              message: "请输入您的现居住地!",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>

        {/* <Form.Item
          name="phone"
          label="电话号码"
          rules={[
            {
              required: true,
              message: "请输入你的电话号码!",
            },
            {
              pattern: /^\d+$/,
              message: "电话号码必须为数字！",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item> */}

        {/* <Form.Item
          name="gender"
          label="性别"
          rules={[
            {
              required: true,
              message: "请选择您的性别!",
            },
          ]}
        >
          <Select placeholder="">
            <Option value="male">男</Option>
            <Option value="female">女</Option>
            <Option value="ig">保密</Option>
          </Select>
        </Form.Item> */}

        {/* <Form.Item
          label="Captcha"
          extra="We must make sure that your are a human."
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item> */}

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            我已阅读并同意<a href="">服务协议</a>
          </Checkbox>
        </Form.Item>
        <Form.Item
          className="center-button"
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 10, offset: 7 },
          }}
        >
          <Button type="primary" htmlType="submit">
            立即注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
