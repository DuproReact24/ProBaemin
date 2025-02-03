'use client'
import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from 'axios';

const Page: React.FC = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        // Kiểm tra mật khẩu
        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu không khớp!");
            return;
        }

        try {
            // Gửi dữ liệu đến API
            const response = await axios.post('http://localhost:3300/account/register', {
                first_name: formData.firstName,
                last_name: formData.lastName,
                username: formData.username,
                phone_number: formData.phoneNumber,
                email: formData.email,
                password_hash: formData.password,
            });

            console.log("Response:", response.data);

            // Chuyển hướng đến trang đăng nhập nếu thành công
            router.push('/login');
        } catch (err: any) {
            console.error("Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Đã xảy ra lỗi khi đăng ký!");
        }
    };

    return (
        <>
            <div className="mt-28 w-1/3 bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
                <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
                    Đăng Kí
                </div>
                {error && (
                    <div className="text-red-500 text-center">
                        {error}
                    </div>
                )}
                <div className="flex flex-row w-full gap-2">
                    <Input
                        placeholder="Họ"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="h-[40px]"
                    />
                    <Input
                        placeholder="Tên"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="h-[40px]"
                    />
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input
                        placeholder="Tên đăng nhập"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="h-[40px]"
                    />
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input
                        placeholder="Số điện thoại"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="h-[40px]"
                    />
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-[40px]"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <Input.Password
                        placeholder="Mật khẩu"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="h-[40px]"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <Input.Password
                        placeholder="Nhập lại mật khẩu"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="h-[40px]"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <button
                        className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
                        onClick={handleSubmit}
                    >
                        Đăng Kí
                    </button>
                </div>
                <div className="flex items-center justify-center gap-1">
                    <span className="text-gray-600">Bạn đã có tài khoản?</span>
                    <Link className="text-beamin cursor-pointer" href={"/login"}>
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Page;
