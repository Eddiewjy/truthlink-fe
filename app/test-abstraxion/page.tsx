"use client";
import { useState } from "react";
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";
import "@burnt-labs/ui/dist/index.css";

export default function TestAbstraxionPage(): JSX.Element {
  const { data: account, login } = useAbstraxionAccount();
  const { logout } = useAbstraxionSigningClient();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (!account?.bech32Address) {
      setIsLoggingIn(true);
      try {
        console.log("开始登录...");
        console.log("Abstraxion 配置:", {
          rpcUrl: "https://rpc.xion-testnet-2.burnt.com:443",
          restUrl: "https://api.xion-testnet-2.burnt.com",
        });
        await login();
        console.log("登录成功");
      } catch (error) {
        console.error('Login failed:', error);
        console.error('错误详情:', error);
      } finally {
        setIsLoggingIn(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-8">Abstraxion 连接测试</h1>
      
      <div className="space-y-4">
        <div>
          <p>当前状态: {account?.bech32Address ? "已连接" : "未连接"}</p>
          {account?.bech32Address && (
            <p>地址: {account.bech32Address}</p>
          )}
        </div>
        
        <Button 
          onClick={handleLogin}
          disabled={isLoggingIn}
          structure="base"
          className="w-full"
        >
          {isLoggingIn ? "连接中..." : "连接钱包"}
        </Button>
        
        {account?.bech32Address && logout && (
          <Button 
            onClick={logout}
            structure="base"
            className="w-full bg-red-600"
          >
            断开连接
          </Button>
        )}
      </div>
    </div>
  );
} 