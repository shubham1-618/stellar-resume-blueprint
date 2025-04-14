
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Mobile menu toggle */}
      <div className="flex md:hidden justify-between items-center p-4 bg-background/80 backdrop-blur-sm">
        <Link to="/" className="text-xl font-bold">Shubham Sahare</Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-50"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background pt-16 px-4">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="px-4 py-2 text-lg hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              className="px-4 py-2 text-lg hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/resume" 
              className="px-4 py-2 text-lg hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Video Resume
            </Link>
            <Link 
              to="/admin" 
              className="px-4 py-2 text-lg hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}

      {/* Desktop menu */}
      <NavigationMenu className="hidden md:flex max-w-full justify-between mx-auto p-4">
        <Link to="/" className="text-xl font-bold mr-10">Shubham Sahare</Link>
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/blog">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Blog
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/resume">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Video Resume
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/admin">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Admin
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navigation;
