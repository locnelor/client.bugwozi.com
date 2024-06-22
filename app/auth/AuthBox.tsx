import { Button, Form, Input } from "antd"


const AuthBox = ({
    onSubmit = (data: any) => { },
    loading = false
}) => {
    return (
        <Form
            onFinish={onSubmit}
        >
            <Form.Item
                required
                name="account"
            >
                <Input placeholder="账号" />
            </Form.Item>
            <Form.Item
                required
                name="password"
            >
                <Input placeholder="密码" type="password" />
            </Form.Item>
            <Form.Item>
                <Button
                    loading={loading}
                    block htmlType="submit"
                >
                    登录
                </Button>
            </Form.Item>
        </Form>
    )
}
export default AuthBox