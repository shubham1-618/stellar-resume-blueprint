import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSiteData } from "@/context/SiteDataContext";

const MainNavigation = () => {
  const location = useLocation();
  const { siteData } = useSiteData();
  
  return (
    <div className="w-full flex justify-center py-4 backdrop-blur-md bg-black/20 fixed top-0 z-50">
      <div className="container flex items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold text-white hover:text-[#9b87f5] transition-colors">
          {siteData.personalInfo.name}
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent hover:bg-white/10",
                    location.pathname === "/" && "text-[#9b87f5]"
                  )}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/blog">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent hover:bg-white/10",
                    location.pathname.includes("/blog") && "text-[#9b87f5]"
                  )}
                >
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <a href="#contact">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent hover:bg-white/10"
                  )}
                >
                  Contact
                </NavigationMenuLink>
              </a>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:block">
          <Button 
            className="rounded-full px-6 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none transition-all"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Let's Talk
          </Button>
        </div>

        <Button 
          variant="ghost" 
          className="md:hidden text-white hover:bg-white/10"
          onClick={() => {
            // Mobile menu logic would go here
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default MainNavigation;
