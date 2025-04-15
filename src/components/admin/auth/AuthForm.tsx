
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (e: React.FormEvent) => void;
  onModeChange: () => void;
  formData: {
    email: string;
    password: string;
    confirmPassword?: string;
    fullName?: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const AuthForm = ({ mode, onSubmit, onModeChange, formData, onInputChange }: AuthFormProps) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Dashboard</CardTitle>
          <CardDescription className="text-center text-white/70">
            {mode === "login" 
              ? "Login to manage your personal website content" 
              : "Create a new admin account"}
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white/90">Full Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="John Doe" 
                  value={formData.fullName}
                  onChange={(e) => onInputChange('fullName', e.target.value)}
                  required
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                value={formData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={formData.password}
                onChange={(e) => onInputChange('password', e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white/90">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={formData.confirmPassword}
                  onChange={(e) => onInputChange('confirmPassword', e.target.value)}
                  required
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none"
            >
              {mode === "login" ? "Login" : "Register"}
            </Button>
            <p className="text-sm text-center text-white/70">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button 
                type="button"
                className="text-[#9b87f5] hover:text-[#D6BCFA] transition-colors"
                onClick={onModeChange}
              >
                {mode === "login" ? "Register" : "Login"}
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
