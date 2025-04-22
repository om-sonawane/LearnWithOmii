"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block h-8 w-8 bg-purple-600 rounded-md"></span>
            <span className="text-xl font-bold">LearnWithOmii</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/courses"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/courses") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Courses
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 px-2">
                <span className="text-sm font-medium">Resources</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/about" className="w-full cursor-pointer">
                  About Us
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/faq" className="w-full cursor-pointer">
                  FAQ
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact" className="w-full cursor-pointer">
                  Contact Us
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/certificates"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/certificates") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Certificates
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="w-full cursor-pointer">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="w-full cursor-pointer">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="w-full cursor-pointer">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <Link
              href="/"
              className={`block py-2 text-base font-medium ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className={`block py-2 text-base font-medium ${
                isActive("/courses") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/about"
              className={`block py-2 text-base font-medium ${
                isActive("/about") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/faq"
              className={`block py-2 text-base font-medium ${
                isActive("/faq") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/certificates"
              className={`block py-2 text-base font-medium ${
                isActive("/certificates") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Certificates
            </Link>
            <div className="pt-4 border-t flex flex-col gap-2">
              <Button variant="outline" className="w-full justify-center">
                Log In
              </Button>
              <Button className="w-full justify-center">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
